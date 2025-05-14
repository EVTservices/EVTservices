// // seedBus.js
// const sequelize = require("../config/database");
// const Bus = require("../models/Bus");
// const Route = require("../models/Route");

// const seedBuses = async () => {
//   try {
//     await sequelize.sync(); // or use `sequelize.sync({ force: true })` if needed

//     // Optional: Fetch route IDs dynamically
//     const routes = await Route.findAll();
//     const routeMap = {};
//     routes.forEach(route => {
//       routeMap[route.route_name] = route.route_id;
//     });

//     // Sample bus data
//     const buses = [
//       { bus_number: "B001", capacity: 45, route_id: routeMap["สายหัวตะเข้"], shift_name: "Morning", status: "active" },
//       { bus_number: "B001", capacity: 45, route_id: routeMap["สายหัวตะเข้"], shift_name: "Afternoon", status: "active" },
//       { bus_number: "B001", capacity: 45, route_id: routeMap["สายหัวตะเข้"], shift_name: "Night", status: "active" },
//       { bus_number: "B002", capacity: 45, route_id: routeMap["สายร่มเกล้า"], shift_name: "Morning", status: "active" },
//       { bus_number: "B002", capacity: 45, route_id: routeMap["สายร่มเกล้า"], shift_name: "Afternoon", status: "active" },
//       { bus_number: "B002", capacity: 45, route_id: routeMap["สายร่มเกล้า"], shift_name: "Night", status: "active" },
//       { bus_number: "B003", capacity: 45, route_id: routeMap["สายหนองจอกคันที่1"], shift_name: "Morning", status: "active" },
//       { bus_number: "B003", capacity: 45, route_id: routeMap["สายหนองจอกคันที่1"], shift_name: "Afternoon", status: "active" },
//       { bus_number: "B003", capacity: 45, route_id: routeMap["สายหนองจอกคันที่1"], shift_name: "Night", status: "active" },
      // { bus_number: "B004", capacity: 45, route_id: routeMap["สายหนองจอกคันที่2"], shift_name: "Morning", status: "active" },
      // { bus_number: "B004", capacity: 45, route_id: routeMap["สายหนองจอกคันที่2"], shift_name: "Afternoon", status: "active" },
      // { bus_number: "B004", capacity: 45, route_id: routeMap["สายหนองจอกคันที่2"], shift_name: "Night", status: "active" },
      // { bus_number: "B005", capacity: 45, route_id: routeMap["สายกม8"], shift_name: "Morning", status: "active" },
      // { bus_number: "B005", capacity: 45, route_id: routeMap["สายกม8"], shift_name: "Afternoon", status: "active" },
      // { bus_number: "B005", capacity: 45, route_id: routeMap["สายกม8"], shift_name: "Night", status: "active" },
      // { bus_number: "B006", capacity: 43, route_id: routeMap["สายหน้านิคม"], shift_name: "Morning", status: "active" },
      // { bus_number: "B006", capacity: 43, route_id: routeMap["สายหน้านิคม"], shift_name: "Afternoon", status: "active" },
      // { bus_number: "B006", capacity: 43, route_id: routeMap["สายหน้านิคม"], shift_name: "Night", status: "active" },
      // { bus_number: "B007", capacity: 45, route_id: routeMap["สายตลาดเอี่ยม"], shift_name: "Morning", status: "active" },
      // { bus_number: "B007", capacity: 45, route_id: routeMap["สายตลาดเอี่ยม"], shift_name: "Afternoon", status: "active" },
      // { bus_number: "B007", capacity: 45, route_id: routeMap["สายตลาดเอี่ยม"], shift_name: "Night", status: "active" },
      // { bus_number: "B008", capacity: 20, route_id: routeMap["สายบางกะปิ(กะ)"], shift_name: "Morning", status: "active" },
      // { bus_number: "B008", capacity: 20, route_id: routeMap["สายบางกะปิ(กะ)"], shift_name: "Afternoon", status: "active" },
      // { bus_number: "B008", capacity: 20, route_id: routeMap["สายบางกะปิ(กะ)"], shift_name: "Night", status: "active" },
      // { bus_number: "B009", capacity: 44, route_id: routeMap["สายตำหรุ(กะ)"], shift_name: "Morning", status: "active" },
      // { bus_number: "B009", capacity: 44, route_id: routeMap["สายตำหรุ(กะ)"], shift_name: "Afternoon", status: "active" },
      // { bus_number: "B009", capacity: 44, route_id: routeMap["สายตำหรุ(กะ)"], shift_name: "Night", status: "active" },
//       { bus_number: "B010", capacity: 43, route_id: routeMap["สายรามอินทรา(สำนักงาน)"], shift_name: "Office", status: "active" },
//       { bus_number: "B011", capacity: 43, route_id: routeMap["สายอนุสาวรีย์(สำนักงาน)"], shift_name: "Office", status: "active" },
//       { bus_number: "B012", capacity: 44, route_id: routeMap["สายบางกะปิ(สำนักงาน)"], shift_name: "Office", status: "active" },
//       { bus_number: "B013", capacity: 45, route_id: routeMap["สายตำหรุ(สำนักงาน)"], shift_name: "Office", status: "active" },

//     ];

//     await Bus.bulkCreate(buses);
//     console.log("Bus data seeded successfully!");
//     process.exit();
//   } catch (error) {
//     console.error("Error seeding buses:", error);
//     process.exit(1);
//   }
// };

// seedBuses();

const sequelize = require("../config/database");
const Bus = require("../models/Bus");
const Route = require("../models/Route");

const seedBuses = async () => {
  try {
    await sequelize.sync();

    // Create a map: route_name + shift_name -> route_id
    const routes = await Route.findAll();
    const routeMap = {};
    routes.forEach(route => {
      const key = `${route.route_name}-${route.shift_name}`;
      routeMap[key] = route.route_id;
    });

    // Bus list (make sure these routes and shifts exist in your Route table)
    const buses = [
      { bus_number: "B001", capacity: 45, route_key: "สายหัวตะเข้-Morning", shift_name: "Morning", status: "active" },
      { bus_number: "B001", capacity: 45, route_key: "สายหัวตะเข้-Afternoon", shift_name: "Afternoon", status: "active" },
      { bus_number: "B001", capacity: 45, route_key: "สายหัวตะเข้-Night", shift_name: "Night", status: "active" },

      { bus_number: "B002", capacity: 45, route_key: "สายร่มเกล้า-Morning", shift_name: "Morning", status: "active" },
      { bus_number: "B002", capacity: 45, route_key: "สายร่มเกล้า-Afternoon", shift_name: "Afternoon", status: "active" },
      { bus_number: "B002", capacity: 45, route_key: "สายร่มเกล้า-Night", shift_name: "Night", status: "active" },

      { bus_number: "B003", capacity: 45, route_key: "สายหนองจอกคันที่1-Morning", shift_name: "Morning", status: "active" },
      { bus_number: "B003", capacity: 45, route_key: "สายหนองจอกคันที่1-Afternoon", shift_name: "Afternoon", status: "active" },
      { bus_number: "B003", capacity: 45, route_key: "สายหนองจอกคันที่1-Night", shift_name: "Night", status: "active" },

      { bus_number: "B004", capacity: 45, route_key: "สายหนองจอกคันที่2-Morning", shift_name: "Morning", status: "active" },
      { bus_number: "B004", capacity: 45, route_key: "สายหนองจอกคันที่2-Afternoon", shift_name: "Afternoon", status: "active" },
      { bus_number: "B004", capacity: 45, route_key: "สายหนองจอกคันที่2-Night", shift_name: "Night", status: "active" },

      { bus_number: "B005", capacity: 45, route_key: "สายกม8-Morning", shift_name: "Morning", status: "active" },
      { bus_number: "B005", capacity: 45, route_key: "สายกม8-Afternoon", shift_name: "Afternoon", status: "active" },
      { bus_number: "B005", capacity: 45, route_key: "สายกม8-Night", shift_name: "Night", status: "active" },
      
      { bus_number: "B006", capacity: 43, route_key: "สายหน้านิคม-Morning", shift_name: "Morning", status: "active" },
      { bus_number: "B006", capacity: 43, route_key: "สายหน้านิคม-Afternoon", shift_name: "Afternoon", status: "active" },
      { bus_number: "B006", capacity: 43, route_key: "สายหน้านิคม-Night", shift_name: "Night", status: "active" },

      { bus_number: "B007", capacity: 45, route_key: "สายตลาดเอี่ยม-Morning", shift_name: "Morning", status: "active" },
      { bus_number: "B007", capacity: 45, route_key: "สายตลาดเอี่ยม-Afternoon", shift_name: "Afternoon", status: "active" },
      { bus_number: "B007", capacity: 45, route_key: "สายตลาดเอี่ยม-Night", shift_name: "Night", status: "active" },

      { bus_number: "B008", capacity: 20, route_key: "สายบางกะปิ(กะ)-Morning", shift_name: "Morning", status: "active" },
      { bus_number: "B008", capacity: 20, route_key: "สายบางกะปิ(กะ)-Afternoon", shift_name: "Afternoon", status: "active" },
      { bus_number: "B008", capacity: 20, route_key: "สายบางกะปิ(กะ)-Night", shift_name: "Night", status: "active" },

      { bus_number: "B009", capacity: 44, route_key: "สายตำหรุ(กะ)-Morning", shift_name: "Morning", status: "active" },
      { bus_number: "B009", capacity: 44, route_key: "สายตำหรุ(กะ)-Afternoon", shift_name: "Afternoon", status: "active" },
      { bus_number: "B009", capacity: 44, route_key: "สายตำหรุ(กะ)-Night", shift_name: "Night", status: "active" },

      { bus_number: "B010", capacity: 43, route_key: "สายรามอินทรา(สำนักงาน)-Office", shift_name: "Office", status: "active" },
      { bus_number: "B011", capacity: 43, route_key: "สายอนุสาวรีย์(สำนักงาน)-Office", shift_name: "Office", status: "active" },
      { bus_number: "B012", capacity: 44, route_key: "สายบางกะปิ(สำนักงาน)-Office", shift_name: "Office", status: "active" },
      { bus_number: "B013", capacity: 45, route_key: "สายตำหรุ(สำนักงาน)-Office", shift_name: "Office", status: "active" },
    ];

    // Convert bus data to insert format
    const busRecords = buses.map(bus => {
      const route_id = routeMap[bus.route_key];
      if (!route_id) {
        throw new Error(`Route not found for key: ${bus.route_key}`);
      }
      return {
        bus_number: bus.bus_number,
        capacity: bus.capacity,
        route_id: route_id,
        shift_name: bus.shift_name,
        status: "active",
      };
    });

    await Bus.bulkCreate(busRecords);
    console.log("✅ Buses seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding buses:", error);
    process.exit(1);
  }
};

seedBuses();

