// controllers/busTrackingController.js
require('dotenv').config()
const axios = require("axios");

console.log("🔑 GOOGLE_API_KEY =", process.env.GOOGLE_API_KEY);
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GPS_API_URL = process.env.GPS_API_URL;
const GPS_API_TOKEN = process.env.GPS_API_TOKEN;

const Bus = require("../models/Bus");
const Stop = require("../models/Stop");

//update bus location from GPS
exports.updateBusLocation = async (req, res) => {
    const { device_id, latitude, longitude } = req.body;
  
    try {
      const bus = await Bus.findOne({ where: { device_id } });
      if (!bus) return res.status(404).json({ error: "Bus not found for device_id" });
  
      bus.current_latitude = latitude;
      bus.current_longitude = longitude;
      bus.last_updated = new Date();
      await bus.save();
  
      res.json({ message: "Bus location updated", bus });
    } catch (err) {
      console.error("Error updating bus location:", err);
      res.status(500).json({ error: "Failed to update location" });
    }
  };

// Get real-time bus location and estimate arrival time to each stop
exports.getBusETA = async (req, res) => {
  try {
    const buses = await Bus.findAll(); 
    const gpsIds = buses.map(bus => bus.device_id);

    // const gpsResponse = await axios.post(`${GPS_API_URL}/getRealtimeData`, {
    //   api_token_key: GPS_API_TOKEN,
    //   gps_list: gpsIds
    // });

    // const realtimeData = gpsResponse.data.data;

    // With a mock version:
    const realtimeData = [
        {
        gps_id: "mock_device_001",

        truck_name: "B001",
        lat: 13.736717,
        lon: 100.523186,
        },
        {
        gps_id: "mock_device_002",
        truck_name: "B002",
        lat: 13.745443,
        lon: 100.535673,
        },
    ];

    const response = [];

    for (const busData of realtimeData) {
      const { gps_id, truck_name, lat, lon } = busData;

      if (!lat || !lon) {
        console.warn(`⚠️ Invalid GPS coordinates for bus ${gps_id} – skipping...`);
        continue; // Skip this bus
      }

      // Reverse geocoding (lat/lon to readable address)
      const geocodeRes = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`
      );
      const address = geocodeRes.data.results?.[0]?.formatted_address || "Unknown location";

      // Get all stops for this bus's route
      const bus = await Bus.findOne({ where: { device_id: gps_id } });
      const stops = await Stop.findAll({ where: { route_id: bus.route_id } });

      const stopCoords = stops.map(stop => `${stop.latitude},${stop.longitude}`).join("|");

      if (!stopCoords) {
        console.warn(`⚠️ No valid stop coordinates for bus ${bus.bus_id}`);
        continue;
      }

      // ETA with Distance Matrix API
      const etaRes = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json`, {
          params: {
            origins: `${lat},${lon}`,
            destinations: stopCoords,
            key: GOOGLE_API_KEY
          }
      });

      if (!etaRes.data.rows || !etaRes.data.rows[0]) {
        console.warn(`⚠️ No ETA data from Google for bus ${bus.bus_id}`);
        continue;
      }
      
      console.log("🛰️ Google ETA response:", JSON.stringify(etaRes.data, null, 2));

      const etas = etaRes.data.rows[0].elements;

      const stopsWithETA = stops.map((stop, i) => {
        const eta = etas[i];
      
        if (!eta || eta.status !== "OK" || !eta.duration || !eta.distance) {
          return {
            stop_id: stop.stop_id,
            stop_name: stop.name,
            eta_minutes: null,
            distance_text: "Unavailable"
          };
        }
      
        return {
          stop_id: stop.stop_id,
          stop_name: stop.name,
          eta_minutes: Math.floor(eta.duration.value / 60),
          distance_text: eta.distance.text
        };
      });

      response.push({
        bus_id: bus.bus_id,
        license_plate: bus.bus_number,
        location: address,
        lat, lon,
        stops: stopsWithETA
      });
    }

    res.json(response);
  } catch (error) {
    console.error("❌ Error in getBusETA:", error);
    res.status(500).json({ error: "Error fetching bus ETA data" });
  }
};
