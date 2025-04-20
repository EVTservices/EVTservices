// const axios = require("axios");
// const moment = require("moment");
// require("dotenv").config();

// const Bus = require("../models/Bus");
// const BusSchedule = require("../models/BusSchedule");

// const GPS_API_URL = process.env.GPS_API_URL;
// const GPS_API_TOKEN = process.env.GPS_API_TOKEN;

// async function pollBusLocations() {
//   try {
//     const now = moment();
//     const currentTime = now.format("HH:mm:ss");
//     const currentDay = now.isoWeekday(); // 1 (Mon) - 7 (Sun)

//     console.log("🕒 Current time:", currentTime, "| 📅 Day of week:", currentDay);

//     const allSchedules = await BusSchedule.findAll({ include: [{ model: Bus, as: "bus" }] });

//     const activeDeviceIds = [];

//     for (const schedule of allSchedules) {
//       const oneHourBefore = moment(schedule.start_time, "HH:mm:ss").subtract(1, "hours");
//       const scheduleEnd = moment(schedule.end_time, "HH:mm:ss");

//       if (
//         schedule.day_of_week === currentDay &&
//         now.isBetween(oneHourBefore, scheduleEnd)
//       ) {
//         if (schedule.bus?.device_id) {
//           activeDeviceIds.push(schedule.bus.device_id);
//         }
//       }
//     }

//     if (activeDeviceIds.length === 0) {
//       console.log("No active buses to poll at this time.");
//       return;
//     }

//     const gpsResponse = await axios.post(`${GPS_API_URL}/getRealtimeData`, {
//       api_token_key: GPS_API_TOKEN,
//       gps_list: activeDeviceIds
//     });

//     const realtimeData = gpsResponse.data.data;

//     for (const busData of realtimeData) {
//       const { gps_id, lat, lon } = busData;
//       const bus = await Bus.findOne({ where: { device_id: gps_id } });
//       if (!bus) continue;

//       bus.current_latitude = lat;
//       bus.current_longitude = lon;
//       bus.last_updated = new Date();
//       await bus.save();
//     }

//     console.log("✅ GPS polling updated for active buses.");
//   } catch (err) {
//     console.error("❌ Error in polling bus locations:", err);
//   }
// }

// module.exports = pollBusLocations;
