const express = require("express");
const router = express.Router();
const { generateToken, verifyToken } = require("../authentication/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register a new user (with phone_number and password)
router.post("/register", async (req, res) => {
    try {
        const { phone_number, password, name, email, line_id } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { phone_number } });
        if (existingUser) return res.status(400).json({ error: "Phone number already registered" });

        // Create new user
        const user = await User.create({ phone_number, password, name, email, line_id });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Login user and generate JWT token
router.post("/login", async (req, res) => {
    try {
        const { phone_number, password } = req.body;
        const user = await User.findOne({ where: { phone_number } });

        // Check if user exists and password is correct
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // Generate JWT token
        const token = generateToken(user);
        res.json({ message: "Login Successful", token });
    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Protected Route Example
router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "Protected route accessed!", user: req.user });
});

module.exports = router;
