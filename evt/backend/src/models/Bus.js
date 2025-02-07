const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Route = require("./Route");

const Bus = sequelize.define("Bus", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    bus_number: { type: DataTypes.STRING, allowNull: false, unique: true },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    route_id: { type: DataTypes.UUID, references: { model: Route, key: "id" } },
    status: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

module.exports = Bus;
