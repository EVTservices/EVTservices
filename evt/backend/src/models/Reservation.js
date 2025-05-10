// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const User = require("./User");
// const Bus = require("./Bus");
// const Route = require("./Route");
// const Stop = require("./Stop");

// const Reservation = sequelize.define("Reservation", {
//     reservation_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     user_id: { 
//         type: DataTypes.INTEGER, 
//         allowNull: false,
//         references: { model: User, key: "user_id" }, 
//         onDelete: "CASCADE"
//     },
//     bus_id: { 
//         type: DataTypes.INTEGER, 
//         allowNull: false,
//         references: { model: Bus, key: "bus_id" }, 
//         onDelete: "CASCADE"
//     },
//     route_id: { 
//         type: DataTypes.INTEGER, 
//         allowNull: false,
//         references: { model: Route, key: "route_id" }, 
//         onDelete: "CASCADE"
//     },
//     stop_id: { 
//         type: DataTypes.INTEGER, 
//         allowNull: false,
//         references: { model: Stop, key: "stop_id" }, 
//         onDelete: "CASCADE"
//     },
//     seat_number: { type: DataTypes.INTEGER, allowNull: true },
//     status: { type: DataTypes.STRING, defaultValue: "Confirmed" },
//     booking_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
//     check_in_status: { type: DataTypes.BOOLEAN, defaultValue: false }
// }, { timestamps: false, freezeTableName: true });

// module.exports = Reservation;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Reservation = sequelize.define("Reservation", {
  reservation_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  bus_id: { type: DataTypes.INTEGER, allowNull: false },
  route_id: { type: DataTypes.INTEGER, allowNull: false },
  stop_id: { type: DataTypes.INTEGER, allowNull: false },
  factory_id: { type: DataTypes.INTEGER, allowNull: false },
  seat_number: { type: DataTypes.INTEGER, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: "Confirmed" },
  booking_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  check_in_status: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Reservation;

