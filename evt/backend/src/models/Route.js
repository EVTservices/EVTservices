const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Route = sequelize.define("Route", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    route_name: { type: DataTypes.STRING, allowNull: false },
    start_location: { type: DataTypes.STRING, allowNull: false },
    end_location: { type: DataTypes.STRING, allowNull: false },
    estimated_time: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false });

module.exports = Route;
