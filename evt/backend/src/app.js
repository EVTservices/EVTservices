const express = require("express");
const cors = require("cors");
const pool = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes"); // ✅ Add this line
const busTrackingRoutes = require("./routes/trackingRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes); // ✅ Register the reservation APIs
app.use("/api/buses", busTrackingRoutes);

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

module.exports = app;
