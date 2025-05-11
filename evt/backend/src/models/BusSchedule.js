const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Bus = require("./Bus");

const BusSchedule = sequelize.define("BusSchedule", {
  schedule_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bus_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Bus, key: "bus_id" },
    onDelete: "CASCADE"
  },
  shift_name: { type: DataTypes.STRING }, // e.g., "Morning"
  start_time: { type: DataTypes.TIME },
  end_time: { type: DataTypes.TIME },
  day_of_week: { type: DataTypes.INTEGER, allowNull: false }, // 1 (Mon) to 5 (Fri)
}, {
  timestamps: false,
  freezeTableName: true
});

Bus.hasMany(BusSchedule, { foreignKey: "bus_id", as: "schedules" });
BusSchedule.belongsTo(Bus, { foreignKey: "bus_id", as: "bus" });

module.exports = BusSchedule;
