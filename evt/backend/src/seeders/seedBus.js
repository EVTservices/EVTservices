// seedBus.js
const sequelize = require("../config/database");
const Bus = require("../models/Bus");
const Route = require("../models/Route");

const seedBuses = async () => {
  try {
    await sequelize.sync(); // or use `sequelize.sync({ force: true })` if needed

    // Optional: Fetch route IDs dynamically
    const routes = await Route.findAll();
    const routeMap = {};
    routes.forEach(route => {
      routeMap[route.route_name] = route.route_id;
    });

    // Sample bus data
    const buses = [
      { bus_number: "B001", capacity: 45, route_id: routeMap["สายหัวตะเข้"], status: "active" },
      { bus_number: "B002", capacity: 45, route_id: routeMap["สายร่มเกล้า"], status: "active" },
      { bus_number: "B003", capacity: 45, route_id: routeMap["สายหนองจอกคันที่1"], status: "active" },
      { bus_number: "B004", capacity: 45, route_id: routeMap["สายหนองจอกคันที่2"], status: "active" },
      { bus_number: "B005", capacity: 45, route_id: routeMap["สายกม8"], status: "active" },
      { bus_number: "B006", capacity: 43, route_id: routeMap["สายหน้านิคม"], status: "active" },
      { bus_number: "B007", capacity: 45, route_id: routeMap["สายตลาดเอี่ยม"], status: "active" },
      { bus_number: "B008", capacity: 20, route_id: routeMap["สายบางกะปิ(กะ)"], status: "active" },
      { bus_number: "B009", capacity: 44, route_id: routeMap["สายตำหรุ(กะ)"], status: "active" },
      { bus_number: "B010", capacity: 43, route_id: routeMap["สายรามอินทรา(สำนักงาน)"], status: "active" },
      { bus_number: "B011", capacity: 43, route_id: routeMap["สายอนุสาวรีย์(สำนักงาน)"], status: "active" },
      { bus_number: "B012", capacity: 44, route_id: routeMap["สายบางกะปิ(สำนักงาน)"], status: "active" },
      { bus_number: "B013", capacity: 45, route_id: routeMap["สายตำหรุ(สำนักงาน)"], status: "active" },

    ];

    await Bus.bulkCreate(buses);
    console.log("Bus data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding buses:", error);
    process.exit(1);
  }
};

seedBuses();
