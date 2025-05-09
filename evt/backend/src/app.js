const express = require("express");
const cors = require("cors");
const pool = require("./config/database");

const app = express();

require("dotenv").config();

const pollBusLocations = require("./polling/pollingBusLocation");
const cron = require("node-cron");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const busTrackingRoutes = require("./routes/trackingRoutes");
const checkInRoutes = require("./routes/checkRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/buses", busTrackingRoutes);
app.use("/api/checkin", checkInRoutes);  // Endpoint: /api/checkin/scan
app.use("/api/checkout", checkInRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Test DB route
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Database connected!", time: result.rows[0].now });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Start polling every minute
cron.schedule("* * * * *", () => {
    console.log("⏱️ Running GPS polling...");
    pollBusLocations();
  });

module.exports = app;
