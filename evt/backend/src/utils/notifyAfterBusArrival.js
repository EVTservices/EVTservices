// notifyAfterBusArrival.js
const { Bus, Route, Stop, User, Notification } = require("../models");
const Reservation = require("../models/Reservation");
const axios = require("axios");
const { Op } = require("sequelize");
const { sendLineMessage } = require("../utils/lineNotifier");
require("dotenv").config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;


async function notifyAfterBusArrival() {
  console.log("🚀 Starting notifyAfterBusArrival...");

  const buses = await Bus.findAll({
    where: {
      current_latitude: { [Op.ne]: null },
      current_longitude: { [Op.ne]: null },
    },
    include: [{ model: Route, as: "route", include: [Stop] }],
  });

  for (const bus of buses) {
    console.log(`🚌 BUS #${bus.bus_id} | Bus Number: ${bus.bus_number}`);

    const stops = bus.route?.Stops || [];
    if (stops.length === 0) {
      console.log("⚠️ No stops found for this route.");
      continue;
    }

    for (const stop of stops) {
      console.log(`📍 Checking stop: ${stop.name} (${stop.latitude}, ${stop.longitude})`);
      const origin = `${bus.current_latitude},${bus.current_longitude}`;
      const destination = `${stop.latitude},${stop.longitude}`;

      let etaRes;
      try {
        etaRes = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
          params: {
            origins: origin,
            destinations: destination,
            key: GOOGLE_API_KEY,
          },
        });
      } catch (apiErr) {
        console.error("❌ Google API error:", apiErr.message);
        continue;
      }

      const eta = etaRes.data.rows?.[0]?.elements?.[0];
      if (!eta || eta.status !== "OK") {
        console.log(`❌ Could not calculate ETA for stop ${stop.name}`);
        continue;
      }

      const minutes = Math.floor(eta.duration.value / 60);
      console.log(`⏱️ ETA to stop "${stop.name}": ${minutes} minute(s)`);

      if (minutes <= 1) {
        console.log(`✅ Bus has ARRIVED at stop: ${stop.name}`);
        const arrivalTag = `${bus.bus_id}_${stop.stop_id}`;

        const alreadySent = await Notification.findOne({
          where: {
            type: "Post-Arrival Reminder",
            message: { [Op.like]: `%[ARRIVED:${arrivalTag}]%` },
            sent_at: {
              [Op.gte]: new Date(Date.now() - 10 * 60 * 1000),
            },
          },
        });

        if (alreadySent) {
          console.log(`⚠️ Notification already sent for stop ${stop.name} in the last 10 minutes.`);
          continue;
        }

        console.log(`⏳ Waiting 5 minutes to notify users for stop: ${stop.name}`);
        setTimeout(async () => {
          console.log(`🔔 Notifying users for stop: ${stop.name}`);
          console.log(`🔍 Matching bus_id: ${bus.bus_id}`);
          console.log(`🔍 Matching route_id: ${bus.route.route_id}`);
          console.log(`🔍 Matching stop_id: ${stop.stop_id}`);

        const reservations = await Reservation.findAll({
        where: {
            bus_id: bus.bus_id,
            route_id: bus.route.route_id,
            stop_id: stop.stop_id,
            status: "Confirmed",
        },
        include: [{
            model: User,
            as: "User" // ✅ use the alias from your association
        }],
        });
          

          if (reservations.length === 0) {
            console.log("ℹ️ No confirmed reservations for this stop.");
          }

          for (const res of reservations) {
            const user = res.User;
            if (!user?.line_user_id) {
              console.log(`❌ User ${user.user_id} has no LINE ID.`);
              continue;
            }

            const msg = `📍คุณยังไม่ได้เช็คอินที่ป้าย: ${stop.name} \n \nรถได้มาถึงป้ายแล้วกรุณาสแกน QR เช็คอินหากคุณได้ขึ้นรถ`;
            console.log(`📨 Sending LINE message to user ${user.user_id} (${user.line_user_id})`);

            try {
              await sendLineMessage(user.line_user_id, msg);
              await Notification.create({
                user_id: user.user_id,
                type: "Post-Arrival Reminder",
                message: msg,
                status: "Sent",
                method: "LINE OA",
              });
              console.log(`✅ Notification sent and logged for user ${user.user_id}`);
            } catch (err) {
              await Notification.create({
                user_id: user.user_id,
                type: "Post-Arrival Reminder",
                message: msg,
                status: "Failed",
                method: "LINE OA",
              });
              console.error(`❌ Failed to send LINE to user ${user.user_id}:`, err.message);
            }
          }
        }, 1 * 30 * 1000); // 5 minutes delay
      }
    }
  }
}

module.exports = { notifyAfterBusArrival };
