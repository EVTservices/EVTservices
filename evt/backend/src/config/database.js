const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, // Disable logging for clean console output
});

sequelize.authenticate()
    .then(() => console.log("✅ PostgreSQL connected successfully!"))
    .catch(err => console.error("❌ Unable to connect:", err));

module.exports = sequelize;
