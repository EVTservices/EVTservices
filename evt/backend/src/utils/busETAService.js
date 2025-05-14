const { Bus, Route, Stop, Factory } = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function handleBusETARequest(message) {
  try {
    // ✅ Step 1: Remove any prefix (e.g. user types "ติดตามสายรถ")
    const lines = message.trim().split("\n").map(line => line.trim());

    const factoryLine = lines.find(line => line.startsWith("- โรงงาน:"));
    const shiftLine = lines.find(line => line.startsWith("- เวลา(กะ):"));
    const routeLine = lines.find(line => line.startsWith("- สายรถ:"));
    const stopLine = lines.find(line => line.startsWith("- ป้าย:"));

    if (!factoryLine || !shiftLine || !routeLine || !stopLine) {
      return "❌ กรุณาระบุ:\n- โรงงาน:\n- เวลา(กะ):\n- สายรถ:\n- ป้าย:";
    }

    const factoryName = factoryLine.replace("- โรงงาน:", "").trim();
    const shiftName = shiftLine.replace("- เวลา(กะ):", "").trim();
    const routeName = routeLine.replace("- สายรถ:", "").trim();
    const stopName = stopLine.replace("- ป้าย:", "").trim();

    // ✅ Step 2: Query database
    const factory = await Factory.findOne({ where: { name: factoryName } });
    if (!factory) return "❌ ไม่พบโรงงานที่ระบุ";

    const route = await Route.findOne({
      where: {
        factory_id: factory.factory_id,
        shift_name: shiftName,
        route_name: routeName,
      },
    });
    if (!route) return "❌ ไม่พบสายรถสำหรับโรงงานและกะที่ระบุ";

    const stop = await Stop.findOne({
      where: {
        route_id: route.route_id,
        name: stopName,
      },
    });
    if (!stop) return "❌ ไม่พบป้ายในสายรถที่ระบุ";

    const bus = await Bus.findOne({
        where: {
          route_id: route.route_id,
          current_latitude: { [Op.ne]: null },
          current_longitude: { [Op.ne]: null },
        },
      });

    if (!bus) return "🚌 ขณะนี้ไม่มีรถที่กำลังวิ่งในสายนี้";

    // ✅ Step 3: Use Google API to calculate ETA
    const origin = `${bus.current_latitude},${bus.current_longitude}`;
    const destination = `${stop.latitude},${stop.longitude}`;

    const etaRes = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
      params: {
        origins: origin,
        destinations: destination,
        key: GOOGLE_API_KEY,
      },
    });

    const eta = etaRes.data.rows?.[0]?.elements?.[0];
    if (!eta || eta.status !== "OK") {
      return "⚠️ ไม่สามารถคำนวณเวลาถึงได้ในขณะนี้ กรุณาลองใหม่ภายหลัง";
    }

    const minutes = Math.floor(eta.duration.value / 60);

    // ✅ Step 4: Return formatted Thai response
    return (
      `- โรงงาน: ${factory.name}\n` +
      `- เวลา(กะ): ${route.shift_name}\n` +
      `- สายรถ: ${route.route_name}\n` +
      `- ป้าย: ${stop.name}\n\n` +
      `รถสายนี้จะถึงป้าย ${stop.name}\n` +
      `ในอีก ${minutes} นาที`
    );
  } catch (err) {
    console.error("ETA Error:", err);
    return "❌ เกิดข้อผิดพลาดจากระบบ กรุณาลองใหม่ภายหลัง";
  }
}

module.exports = { handleBusETARequest };
