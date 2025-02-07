const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Stop = sequelize.define("Stop", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    latitude: { type: DataTypes.DECIMAL(9,6), allowNull: false },
    longitude: { type: DataTypes.DECIMAL(9,6), allowNull: false }
}, { timestamps: false });

module.exports = Stop;
