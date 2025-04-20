const { Reservation, Route, Stop, Factory, Bus, User } = require("../models");
const { Op } = require("sequelize");

// 1. Get available routes by the user's factory and optional shift
exports.getMyRoutesByShift = async (req, res) => {
  const userFactoryName = req.user.factory_name;
  const { shift } = req.query;

  try {
    const factory = await Factory.findOne({ where: { name: userFactoryName } });
    if (!factory) return res.status(404).json({ error: "Factory not found for user." });

    const routes = await Route.findAll({
      where: {
        factory_id: factory.factory_id,
        ...(shift && { shift_name: shift }) // optional shift filter
      }
    });

    res.json(routes);
  } catch (err) {
    console.error("Error fetching routes:", err);
    res.status(500).json({ error: "Error fetching routes for your factory and shift." });
  }
};

// 2. Get stops by route
exports.getStopsByRoute = async (req, res) => {
  const { routeId } = req.params;
  try {
    const stops = await Stop.findAll({ where: { route_id: routeId } });
    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: "Error fetching stops." });
  }
};

// 3. Create a reservation
exports.createReservation = async (req, res) => {
  const user_id = req.user.user_id; // from token
  const userFactoryName = req.user.factory_name;
  const { bus_id, route_id, stop_id } = req.body;

  try {
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: "User not found." });

    const route = await Route.findByPk(route_id);
    if (!route) return res.status(404).json({ error: "Route not found." });

    const factory = await Factory.findByPk(route.factory_id);
    if (!factory) return res.status(404).json({ error: "Factory not found for route." });

    if (userFactoryName !== factory.name) {
      return res.status(403).json({ error: "You are not allowed to book this route." });
    }

    const bus = await Bus.findByPk(bus_id);
    if (!bus) return res.status(404).json({ error: "Bus not found." });

    const bookingLimit = Math.floor(bus.capacity * 0.8);

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
      factory_id: factory.factory_id,
      seat_number: 0,
      status,
    });

    const message =
      status === "Confirmed"
        ? "Reservation confirmed."
        : "Bus is full. You're on the waitlist. Please come to the stop early to get a seat if available.";

    res.status(201).json({ message, reservation: newReservation });
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(500).json({ error: "Error creating reservation." });
  }
};

// 4. Get all reservations for a user
exports.getUserReservations = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const authenticatedUserId = req.user.user_id;

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

// 5. Cancel a reservation
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
