const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { verifyToken } = require("../authentication/auth");

// NEW: Get routes based on user's factory and optional shift (no more factory selection)
router.get("/routes/my", verifyToken, reservationController.getMyRoutesByShift);

// Stops for a given route
router.get("/routes/:routeId/stops", verifyToken, reservationController.getStopsByRoute);

// Reservations
router.post("/", verifyToken, reservationController.createReservation);
router.get("/user/:userId", verifyToken, reservationController.getUserReservations);
router.delete("/:reservationId", verifyToken, reservationController.cancelReservation);


module.exports = router;
