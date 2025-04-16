// controllers/reservationController.js

const { Reservation, Route, Stop, Factory, Bus } = require("../models");
const { Op } = require("sequelize");

// 1. Get all factories
exports.getAllFactories = async (req, res) => {
  try {
    const factories = await Factory.findAll();
    res.json(factories);
  } catch (err) {
    res.status(500).json({ error: "Error fetching factories" });
  }
};

// 2. Get routes by factory
exports.getRoutesByFactory = async (req, res) => {
  const { factoryId } = req.params;
  try {
    const routes = await Route.findAll({ where: { factory_id: factoryId } });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching routes" });
  }
};

// 3. Get stops by route
exports.getStopsByRoute = async (req, res) => {
  const { routeId } = req.params;
  try {
    const stops = await Stop.findAll({ where: { route_id: routeId } });
    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: "Error fetching stops" });
  }
};

// 4. Create a reservation
exports.createReservation = async (req, res) => {
  const { user_id, bus_id, route_id, stop_id } = req.body;

  try {
    const bus = await Bus.findByPk(bus_id);
    if (!bus) return res.status(404).json({ error: "Bus not found" });

    const bookingLimit = Math.floor(bus.capacity * 0.8); // Allow only 80% of seats to be reserved

    const reservationCount = await Reservation.count({
      where: {
        bus_id,
        route_id,
        stop_id,
        status: { [Op.in]: ["Confirmed", "Waitlist"] },
      },
    });

    const status = reservationCount < bookingLimit ? "Confirmed" : "Waitlist";

    const newReservation = await Reservation.create({
      user_id,
      bus_id,
      route_id,
      stop_id,
      seat_number: 0, // user picks freely on bus
      status,
    });

    const message =
      status === "Confirmed"
        ? "Reservation confirmed."
        : "Bus is full. You're on the waitlist. Please come to the stop early to get a seat if available.";

    res.status(201).json({ message, reservation: newReservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating reservation" });
  }
};

// 5. Get all reservations for a user
exports.getUserReservations = async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const authenticatedUserId = req.user.user_id;

        console.log("Token user ID is", authenticatedUserId);
        console.log("Requested user ID:", userId);

  
      if (userId !== authenticatedUserId) {
        return res.status(403).json({ message: "Access denied. You can only view your own reservations." });
      }
  
      const reservations = await Reservation.findAll({
        where: { user_id: userId },
        include: [Bus, Route, Stop],
      });
  
      res.json({ reservations });
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Server error while fetching reservations." });
    }
  };
  

// 6. Cancel a reservation
exports.cancelReservation = async (req, res) => {
    const reservationId = parseInt(req.params.reservationId);
    const authenticatedUserId = req.user.user_id;
  
    try {
      const reservation = await Reservation.findByPk(reservationId);
      if (!reservation) return res.status(404).json({ message: "Reservation not found." });
  
      if (reservation.user_id !== authenticatedUserId) {
        return res.status(403).json({ message: "You can only cancel your own reservation." });
      }
  
      await reservation.destroy();
      res.json({ message: "Reservation canceled successfully." });
    } catch (error) {
      console.error("Error canceling reservation:", error);
      res.status(500).json({ message: "Server error while canceling reservation." });
    }
  };
  
