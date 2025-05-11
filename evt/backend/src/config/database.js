// const { Sequelize } = require("sequelize");
// import dotenv from "dotenv";
// // require("dotenv").config();
// dotenv.config;
// console.log("🔍 Loaded ENV:", process.env); // <--- Add this

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 5432,
//     dialect: "postgres",
//     logging: false, // Disable logging for clean console output
// });


// sequelize.authenticate()
//     .then(() => console.log("✅ PostgreSQL connected successfully!"))
//     .catch(err => console.error("❌ Unable to connect:", err));

// module.exports = sequelize;

const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("🔍 Loaded ENV:", {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
});

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log("✅ PostgreSQL connected successfully!"))
  .catch(err => console.error("❌ Unable to connect:", err));

module.exports = sequelize;

