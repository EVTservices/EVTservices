const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { verifyToken } = require("../authentication/auth");

// Factory → Routes → Stops
router.get("/factories", reservationController.getAllFactories);
router.get("/factories/:factoryId/routes", reservationController.getRoutesByFactory);
router.get("/routes/:routeId/stops", reservationController.getStopsByRoute);

// Reservation
router.get("/user/:userId", verifyToken, reservationController.getUserReservations);
router.delete("/:reservationId", verifyToken, reservationController.cancelReservation);
router.post("/", verifyToken, reservationController.createReservation);

module.exports = router;

