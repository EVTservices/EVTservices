// Parse query parameters
const params = new URLSearchParams(window.location.search);
const bus_id = parseInt(params.get("bus_id"));
const type = params.get("type");
const token = localStorage.getItem("token"); // must be set by login

const statusDiv = document.getElementById("status");

// Validate inputs
if (!bus_id || !type) {
  statusDiv.textContent = "❌ Invalid QR code.";
} else if (!token) {
  statusDiv.textContent = "❌ You are not logged in.";
} else {
  // Send POST request to backend
  fetch("http://localhost:5001/api/checkin/scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ bus_id, type })
  })
    .then(res => res.json())
    .then(data => {
      statusDiv.textContent = `✅ ${data.message}`;
    })
    .catch(err => {
      console.error("❌ Error:", err);
      statusDiv.textContent = "❌ Check-in failed.";
    });
}
