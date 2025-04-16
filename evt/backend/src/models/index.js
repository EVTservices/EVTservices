const sequelize = require("../config/database");
const User = require("./User");
const Route = require("./Route");
const Stop = require("./Stop");
const Factory = require("./Factory");
const Bus = require("./Bus");
const Reservation = require("./Reservation");
const CheckIn = require("./CheckIn");
const Notification = require("./Notification");

// ✅ Define associations here
Factory.hasMany(Route, { foreignKey: "factory_id" });
Route.belongsTo(Factory, { foreignKey: "factory_id" });

Route.hasMany(Stop, { foreignKey: "route_id" });
Stop.belongsTo(Route, { foreignKey: "route_id" });

// You can add more associations here as needed

module.exports = {
  sequelize,
  User,
  Route,
  Stop,
  Factory,
  Bus,
  Reservation,
  CheckIn,
  Notification
};
