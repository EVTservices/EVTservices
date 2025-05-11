// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");
const userController = require("../controllers/userController");

router.get("/profile", verifyToken, userController.getUserProfile);

module.exports = router;
