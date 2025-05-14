// const Reservation = require("./Reservation");
// const User = require("./User");
// const Bus = require("./Bus");
// const Route = require("./Route");
// const Stop = require("./Stop");
// const Factory = require("./Factory");

// // Reservation belongsTo
// Reservation.belongsTo(User, { foreignKey: "user_id", as: "User" });
// Reservation.belongsTo(Bus, { foreignKey: "bus_id", as: "Bus" });
// Reservation.belongsTo(Route, { foreignKey: "route_id", as: "Route" });
// Reservation.belongsTo(Stop, { foreignKey: "stop_id", as: "Stop" });
// Reservation.belongsTo(Factory, { foreignKey: "factory_id", as: "Factory" });

// // Reverse
// User.hasMany(Reservation, { foreignKey: "user_id", as: "UserReservations" });
// Bus.hasMany(Reservation, { foreignKey: "bus_id", as: "BusReservations" });
// Route.hasMany(Reservation, { foreignKey: "route_id", as: "RouteReservations" });
// Stop.hasMany(Reservation, { foreignKey: "stop_id", as: "StopReservations" });
// Factory.hasMany(Reservation, { foreignKey: "factory_id", as: "FactoryReservations" });


// module.exports = {
//   Reservation,
//   User,
//   Bus,
//   Route,
//   Stop,
//   Factory
// };

// models/associations.js
const Reservation = require("./Reservation");
const User = require("./User");
const Bus = require("./Bus");
const Route = require("./Route");
const Stop = require("./Stop");
const Factory = require("./Factory");
const BusSchedule = require("./BusSchedule"); // ✅ Add this

// Reservation belongsTo
Reservation.belongsTo(User, { foreignKey: "user_id", as: "User" });
Reservation.belongsTo(Bus, { foreignKey: "bus_id", as: "Bus" });
Reservation.belongsTo(Route, { foreignKey: "route_id", as: "Route" });
Reservation.belongsTo(Stop, { foreignKey: "stop_id", as: "Stop" });
Reservation.belongsTo(Factory, { foreignKey: "factory_id", as: "Factory" });
Reservation.belongsTo(BusSchedule, { foreignKey: "schedule_id", as: "Schedule" }); // ✅ New association

// Reverse
User.hasMany(Reservation, { foreignKey: "user_id", as: "UserReservations" });
Bus.hasMany(Reservation, { foreignKey: "bus_id", as: "BusReservations" });
Route.hasMany(Reservation, { foreignKey: "route_id", as: "RouteReservations" });
Stop.hasMany(Reservation, { foreignKey: "stop_id", as: "StopReservations" });
Factory.hasMany(Reservation, { foreignKey: "factory_id", as: "FactoryReservations" });
BusSchedule.hasMany(Reservation, { foreignKey: "schedule_id", as: "ScheduleReservations" }); // ✅ Reverse

module.exports = {
  Reservation,
  User,
  Bus,
  Route,
  Stop,
  Factory,
  BusSchedule // ✅ Export new model
};

