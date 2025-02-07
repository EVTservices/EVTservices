const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Bus = require("./Bus");
const Route = require("./Route");
const Stop = require("./Stop");

const CheckIn = sequelize.define("CheckIn", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: { type: DataTypes.UUID, references: { model: User, key: "id" } },
    bus_id: { type: DataTypes.UUID, references: { model: Bus, key: "id" } },
    route_id: { type: DataTypes.UUID, references: { model: Route, key: "id" } },
    stop_id: { type: DataTypes.UUID, references: { model: Stop, key: "id" } },
    qr_code_scanned: { type: DataTypes.BOOLEAN, defaultValue: false },
    check_in_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

module.exports = CheckIn;
