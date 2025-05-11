const express = require("express");
const router = express.Router();
const checkInController = require("../controllers/checkInController");
const { verifyToken } = require("../authentication/auth");

// POST request triggered by QR code scan
router.post("/scan", verifyToken, checkInController.handleQRCodeScan);

module.exports = router;
