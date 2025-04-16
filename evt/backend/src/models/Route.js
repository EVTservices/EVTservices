// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Factory = require("./Factory");

// const Route = sequelize.define("Route", {
//     route_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//     route_name: { type: DataTypes.STRING, allowNull: false },
//     start_location: { type: DataTypes.STRING, allowNull: false },
//     end_location: { type: DataTypes.STRING, allowNull: false },
//     factory_id: {
//         type: DataTypes.UUID,
//         references: { model: Factory, key: "id" },
//         onDelete: "CASCADE"
//       }
// }, { timestamps: false , freezeTableName: true}
//     );

// module.exports = Route;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Route = sequelize.define("Route", {
  route_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  route_name: { type: DataTypes.STRING, allowNull: false },
  start_location: { type: DataTypes.STRING, allowNull: false },
  end_location: { type: DataTypes.STRING, allowNull: false },
  factory_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: false, freezeTableName: true });

module.exports = Route;
