const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Bus = require("./Bus");
const Route = require("./Route");
const Stop = require("./Stop");

const CheckIn = sequelize.define("CheckIn", {
    checkIn_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: User, key: "user_id" }, // Fix reference
        onDelete: "CASCADE"
    },
    bus_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: Bus, key: "bus_id" }, // Fix reference
        onDelete: "CASCADE"
    },
    route_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: Route, key: "route_id" }, // Fix reference
        onDelete: "CASCADE"
    },
    stop_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: Stop, key: "stop_id" }, // Fix reference
        onDelete: "CASCADE"
    },
    qr_code_scanned: { type: DataTypes.BOOLEAN, defaultValue: false },
    check_in_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    check_out_time: { type: DataTypes.DATE, allowNull: true },

}, { timestamps: false, freezeTableName: true });

module.exports = CheckIn;
