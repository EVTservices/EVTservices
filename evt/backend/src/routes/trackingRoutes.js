const express = require("express");
const router = express.Router();
const busTrackingController = require("../controllers/trackingController");

// Update bus location (for polling)
router.post("/update-location", busTrackingController.updateBusLocation);

// Get ETA for all buses
router.get("/eta", busTrackingController.getBusETA);

module.exports = router;
