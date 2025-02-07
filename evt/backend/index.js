const app = require("./src/app"); // Import app.js
const sequelize = require("./src/config/database");
const User = require("./src/models/User");
const Route = require("./src/models/Route");
const Bus = require("./src/models/Bus");
const Stop = require("./src/models/Stop");
const Reservation = require("./src/models/Reservation");
const CheckIn = require("./src/models/CheckIn");
const Notification = require("./src/models/Notification");

require("dotenv").config(); // Load environment variables

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Sync models with database
sequelize.sync({ alter: true }) // Change to { force: true } if you want to reset database
    .then(() => console.log("✅ All models synced with PostgreSQL!"))
    .catch(err => console.error("❌ Model synchronization failed:", err));

module.exports = { User, Route, Bus, Stop, Reservation, CheckIn, Notification };
