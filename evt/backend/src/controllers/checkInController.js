// // CheckInController.js
// const { Op } = require("sequelize");
// const Reservation = require("../models/Reservation");
// const CheckIn = require("../models/CheckIn");
// const BusSchedule = require("../models/BusSchedule");
// const User = require("../models/User");
// const moment = require("moment");

// exports.handleQRCodeScan = async (req, res) => {
//   try {
//     const { type, bus_id } = req.body; // 'checkin' or 'checkout', scanned from QR code
//     const user_id = req.user.user_id; // from authenticated session/token

//     const now = moment();
//     const currentTime = now.format("HH:mm:ss");
//     const currentDay = now.isoWeekday(); // Monday = 1

//     // Step 1: Get current schedule based on bus_id, time, and day
//     const schedule = await BusSchedule.findOne({
//       where: {
//         bus_id,
//         day_of_week: currentDay,
//         start_time: { [Op.lte]: currentTime },
//         end_time: { [Op.gte]: currentTime },
//       },
//     });

//     if (!schedule) {
//       return res.status(400).json({ message: "No active schedule found for this bus right now." });
//     }

//     // Step 2: Find the correct reservation using user, bus, and shift
//     const reservation = await Reservation.findOne({
//       where: {
//         user_id,
//         bus_id,
//         shift_name: schedule.shift_name,
//         status: "Confirmed",
//       },
//     });

//     if (!reservation) {
//       return res.status(404).json({ message: "No matching reservation found for this time." });
//     }

//     // Step 3: Handle check-in or check-out
//     if (type === "checkin") {
//       // Prevent duplicate check-in
//       const existing = await CheckIn.findOne({
//         where: { user_id, bus_id, route_id: reservation.route_id, stop_id: reservation.stop_id, check_out_time: null },
//       });

//       if (existing) {
//         return res.status(400).json({ message: "Already checked in but not checked out yet." });
//       }

//       await CheckIn.create({
//         user_id,
//         bus_id,
//         route_id: reservation.route_id,
//         stop_id: reservation.stop_id,
//         qr_code_scanned: true,
//         check_in_time: now.toDate(),
//       });

//       await reservation.update({ check_in_status: true });

//       return res.status(200).json({ message: "✅ Check-in successful." });
//     }

//     if (type === "checkout") {
//       const checkin = await CheckIn.findOne({
//         where: {
//           user_id,
//           bus_id,
//           route_id: reservation.route_id,
//           stop_id: reservation.stop_id,
//           check_out_time: null,
//         },
//       });

//       if (!checkin) {
//         return res.status(404).json({ message: "No check-in record found. Please check in first." });
//       }

//       await checkin.update({ check_out_time: now.toDate() });

//       return res.status(200).json({ message: "✅ Check-out successful." });
//     }

//     return res.status(400).json({ message: "Invalid QR type. Must be 'checkin' or 'checkout'." });
//   } catch (err) {
//     console.error("❌ Error in check-in/out:", err);
//     res.status(500).json({ message: "Server error." });
//   }
// };


const { Op } = require("sequelize");
const Reservation = require("../models/Reservation");
const CheckIn = require("../models/CheckIn");
const BusSchedule = require("../models/BusSchedule");
const User = require("../models/User");
const moment = require("moment");

exports.handleQRCodeScan = async (req, res) => {
  try {
    const { type, bus_id } = req.body; // 'checkin' or 'checkout', scanned from QR code
    const user_id = req.user.user_id; // from authenticated session/token

    const now = moment();
    const currentTime = now.format("HH:mm:ss");
    const currentDay = now.isoWeekday(); // Monday = 1

    // Step 1: Get current schedule based on bus_id, time, and day
    const schedule = await BusSchedule.findOne({
      where: {
        bus_id,
        day_of_week: currentDay,
        start_time: { [Op.lte]: currentTime },
        end_time: { [Op.gte]: currentTime },
      },
    });

    if (!schedule) {
      return res.status(400).json({ message: "No active schedule found for this bus right now." });
    }

    // Step 2: Find the correct reservation using user, bus, and schedule
    const reservation = await Reservation.findOne({
      where: {
        user_id,
        bus_id,
        schedule_id: schedule.schedule_id,
        status: "Confirmed",
      },
    });

    if (!reservation) {
      return res.status(404).json({ message: "No matching reservation found for this time." });
    }

    // Step 3: Handle check-in or check-out
    if (type === "checkin") {
      // Prevent duplicate check-in
      const existing = await CheckIn.findOne({
        where: {
          user_id,
          bus_id,
          route_id: reservation.route_id,
          stop_id: reservation.stop_id,
          check_out_time: null,
        },
      });

      if (existing) {
        return res.status(400).json({ message: "Already checked in but not checked out yet." });
      }

      await CheckIn.create({
        user_id,
        bus_id,
        route_id: reservation.route_id,
        stop_id: reservation.stop_id,
        qr_code_scanned: true,
        check_in_time: now.toDate(),
      });

      await reservation.update({ check_in_status: true });

      return res.status(200).json({ message: "✅ Check-in successful." });
    }

    if (type === "checkout") {
      const checkin = await CheckIn.findOne({
        where: {
          user_id,
          bus_id,
          route_id: reservation.route_id,
          stop_id: reservation.stop_id,
          check_out_time: null,
        },
      });

      if (!checkin) {
        return res.status(404).json({ message: "No check-in record found. Please check in first." });
      }

      await checkin.update({ check_out_time: now.toDate() });

      return res.status(200).json({ message: "✅ Check-out successful." });
    }

    return res.status(400).json({ message: "Invalid QR type. Must be 'checkin' or 'checkout'." });
  } catch (err) {
    console.error("❌ Error in check-in/out:", err);
    res.status(500).json({ message: "Server error." });
  }
};
