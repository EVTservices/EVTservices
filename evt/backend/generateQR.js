// generateQR.js
const QRCode = require("qrcode");
const fs = require("fs");

async function generateBusQR(bus_id, type) {
  const payload = {
    bus_id,
    type, // either "checkin" or "checkout"
  };

  const dataString = JSON.stringify(payload);

  try {
    const outputFile = `./qrs/bus${bus_id}_${type}.png`;

    await QRCode.toFile(outputFile, dataString, {
      errorCorrectionLevel: "H",
      width: 300,
    });

    console.log(`✅ QR code saved to ${outputFile}`);
  } catch (err) {
    console.error("❌ Failed to generate QR code:", err);
  }
}

// Example usage
generateBusQR(5, "checkin");
generateBusQR(5, "checkout");
