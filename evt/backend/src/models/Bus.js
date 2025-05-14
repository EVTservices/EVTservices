const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Route = require("./Route");

const Bus = sequelize.define("Bus", {
    bus_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    bus_number: { type: DataTypes.STRING, allowNull: false},
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    route_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: Route, key: "route_id" }, // Fix reference
        onDelete: "CASCADE"
    },
    shift_name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    device_id: { type: DataTypes.STRING, allowNull: true }, // Link to GPS device
    current_latitude: { type: DataTypes.FLOAT, allowNull: true },
    current_longitude: { type: DataTypes.FLOAT, allowNull: true },
    last_updated: { type: DataTypes.DATE, allowNull: true },

}, { timestamps: false, freezeTableName: true });

// Define association
Route.hasMany(Bus, { foreignKey: "route_id", as: "buses" });
Bus.belongsTo(Route, { foreignKey: "route_id", as: "route" });

module.exports = Bus;
