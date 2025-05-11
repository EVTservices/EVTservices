// src/seeders/seedBusSchedule.js

const Bus = require('../models/Bus');
const BusSchedule = require('../models/BusSchedule');
const sequelize = require('../config/database');

const busesWithShifts = [
  { bus_number: "B001", shift_name: "Morning", start_time: "04:55:00", end_time: "06:40:00" },
  { bus_number: "B001", shift_name: "Afternoon", start_time: "12:55:00", end_time: "14:40:00" },
  { bus_number: "B001", shift_name: "Night", start_time: "20:55:00", end_time: "22:40:00" },
  { bus_number: "B002", shift_name: "Morning", start_time: "05:05:00", end_time: "06:40:00" },
  { bus_number: "B002", shift_name: "Afternoon", start_time: "13:05:00", end_time: "14:40:00" },
  { bus_number: "B002", shift_name: "Night", start_time: "21:05:00", end_time: "22:40:00" },
  { bus_number: "B003", shift_name: "Morning", start_time: "05:05:00", end_time: "06:40:00" },
  { bus_number: "B003", shift_name: "Afternoon", start_time: "13:05:00", end_time: "14:40:00" },
  { bus_number: "B003", shift_name: "Night", start_time: "21:05:00", end_time: "22:40:00" },
  { bus_number: "B004", shift_name: "Morning", start_time: "05:00:00", end_time: "06:40:00" },
  { bus_number: "B004", shift_name: "Afternoon", start_time: "13:00:00", end_time: "14:40:00" },
  { bus_number: "B004", shift_name: "Night", start_time: "21:00:00", end_time: "22:40:00" },
  { bus_number: "B005", shift_name: "Morning", start_time: "04:50:00", end_time: "06:40:00" },
  { bus_number: "B005", shift_name: "Afternoon", start_time: "12:40:00", end_time: "14:40:00" },
  { bus_number: "B005", shift_name: "Night", start_time: "20:40:00", end_time: "22:40:00" },
  { bus_number: "B006", shift_name: "Morning", start_time: "05:30:00", end_time: "06:40:00" },
  { bus_number: "B006", shift_name: "Afternoon", start_time: "13:30:00", end_time: "14:40:00" },
  { bus_number: "B006", shift_name: "Night", start_time: "21:30:00", end_time: "22:40:00" },
  { bus_number: "B007", shift_name: "Morning", start_time: "04:45:00", end_time: "06:40:00" },
  { bus_number: "B007", shift_name: "Afternoon", start_time: "12:40:00", end_time: "14:40:00" },
  { bus_number: "B007", shift_name: "Night", start_time: "20:40:00", end_time: "22:40:00" },
  { bus_number: "B008", shift_name: "Morning", start_time: "04:50:00", end_time: "06:40:00" },
  { bus_number: "B008", shift_name: "Afternoon", start_time: "12:35:00", end_time: "14:40:00" },
  { bus_number: "B008", shift_name: "Night", start_time: "20:35:00", end_time: "22:40:00" },
  { bus_number: "B009", shift_name: "Morning", start_time: "04:35:00", end_time: "06:40:00" },
  { bus_number: "B009", shift_name: "Afternoon", start_time: "12:25:00", end_time: "14:40:00" },
  { bus_number: "B009", shift_name: "Night", start_time: "20:25:00", end_time: "22:40:00" },
  { bus_number: "B010", shift_name: "Office", start_time: "06:20:00", end_time: "17:10:00" },
  { bus_number: "B011", shift_name: "Office", start_time: "06:05:00", end_time: "17:10:00" },
  { bus_number: "B012", shift_name: "Office", start_time: "06:15:00", end_time: "17:10:00" },
  { bus_number: "B013", shift_name: "Office", start_time: "06:10:00", end_time: "17:10:00" },
];

const seedBusSchedules = async () => {
  try {
    await sequelize.sync();

    for (const shift of busesWithShifts) {
      const bus = await Bus.findOne({ where: { bus_number: shift.bus_number } });
      if (!bus) {
        console.warn(`Bus not found: ${shift.bus_number}`);
        continue;
      }

      for (let day = 1; day <= 5; day++) {
        await BusSchedule.create({
          bus_id: bus.bus_id,
          shift_name: shift.shift_name,
          start_time: shift.start_time,
          end_time: shift.end_time,
          day_of_week: day
        });
      }
    }

    console.log("✅ Bus schedules seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding bus schedules:", err);
    process.exit(1);
  }
};

seedBusSchedules();
