// // generateQR.js
// const QRCode = require("qrcode");
// const fs = require("fs");
// const path = require("path");

// async function generateBusQR(bus_id, type) {
//   // ✅ This should match your deployed backend base URL
//   const baseUrl = " https://3606-49-228-64-187.ngrok-free.app/api/checkin/scan"; // replace with real URL

//   // Encode query parameters into a URL
//   const fullUrl = `${baseUrl}?bus_id=${bus_id}&type=${type}`;

//   try {
//     const dir = path.join(__dirname, "../backend/src/qrs");
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     const outputFile = path.join(dir, `bus${bus_id}_${type}.png`);

//     await QRCode.toFile(outputFile, fullUrl, {
//       errorCorrectionLevel: "H",
//       width: 300,
//     });

//     console.log(`✅ QR code for ${type} saved to ${outputFile}`);
//   } catch (err) {
//     console.error("❌ Failed to generate QR code:", err);
//   }
// }

// // Example usage
// generateBusQR(1, "checkin");
// generateBusQR(1, "checkout");

// generateQR.js
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

// ✅ For production, QR should encode only essential payload (not full URL)
async function generateBusQR(bus_id, type) {
  // Encode the payload that your client app or LINE bot will decode and send to backend
  const payload = JSON.stringify({
    bus_id,
    type // "checkin" or "checkout"
  });

  try {
    const dir = path.join(__dirname, "../backend/src/qrs");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const outputFile = path.join(dir, `bus${bus_id}_${type}.png`);

    await QRCode.toFile(outputFile, payload, {
      errorCorrectionLevel: "H",
      width: 300,
    });

    console.log(`✅ QR code for ${type} saved to ${outputFile}`);
  } catch (err) {
    console.error("❌ Failed to generate QR code:", err);
  }
}

// Example usage
generateBusQR(1, "checkin");
generateBusQR(1, "checkout");
