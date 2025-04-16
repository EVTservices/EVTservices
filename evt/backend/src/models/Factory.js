// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Factory = sequelize.define("Factory", {
//   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   address: { type: DataTypes.STRING },
// }, { timestamps: false, freezeTableName: true });

// module.exports = Factory;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Factory = sequelize.define("Factory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
}, { timestamps: false, freezeTableName: true });

module.exports = Factory;

