const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Bus = require("./Bus");
const Route = require("./Route");
const Stop = require("./Stop");

const Reservation = sequelize.define("Reservation", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: { type: DataTypes.UUID, references: { model: User, key: "id" } },
    bus_id: { type: DataTypes.UUID, references: { model: Bus, key: "id" } },
    route_id: { type: DataTypes.UUID, references: { model: Route, key: "id" } },
    stop_id: { type: DataTypes.UUID, references: { model: Stop, key: "id" } },
    seat_number: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "Confirmed" },
    booking_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    check_in_status: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: false });

module.exports = Reservation;
