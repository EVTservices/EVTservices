// generateQR.js
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

async function generateBusQR(bus_id, type) {
  // Replace this with your actual local or ngrok-hosted frontend base URL
  const frontendUrl = `http://localhost:3000/scan-checkin.html?bus_id=${bus_id}&type=${type}`;

  try {
    const dir = path.resolve(__dirname, "./qrs"); // Save QR in ./qrs
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const outputFile = path.join(dir, `bus${bus_id}_${type}.png`);

    await QRCode.toFile(outputFile, frontendUrl, {
      errorCorrectionLevel: "H",
      width: 300,
    });

    console.log(`✅ QR code for ${type} saved to ${outputFile}`);
  } catch (err) {
    console.error("❌ Failed to generate QR code:", err);
  }
}

// Run generator
generateBusQR(1, "checkin");
generateBusQR(1, "checkout");
