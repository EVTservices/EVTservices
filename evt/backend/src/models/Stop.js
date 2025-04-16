// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Route = require("./Route");

// const Stop = sequelize.define("Stop", {
//     stop_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//     name: { type: DataTypes.STRING, allowNull: false },
//     // latitude: { type: DataTypes.DECIMAL(9,6), allowNull: false },
//     // longitude: { type: DataTypes.DECIMAL(9,6), allowNull: false },
//     route_id: { 
//         type: DataTypes.UUID, 
//         allowNull: false,
//         references: { model: Route, key: "route_id" }, // Fix reference
//         onDelete: "CASCADE"
//     }
// }, { timestamps: false, freezeTableName: true });

// // Define association
// Route.hasMany(Stop, { foreignKey: "route_id", as: "stops" });
// Stop.belongsTo(Route, { foreignKey: "route_id", as: "route" });

// module.exports = Stop;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Stop = sequelize.define("Stop", {
  stop_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  route_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: false, freezeTableName: true });

module.exports = Stop;

