const express = require("express");
const router = express.Router();
const { generateToken, verifyToken } = require("../authentication/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { phone_number, password, name, line_id, factory_name } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { phone_number } });
        if (existingUser) {
            return res.status(400).json({ error: "Phone number already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            phone_number,
            password: hashedPassword,
            name,
            line_id,
            factory_name,
        });

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
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const token = generateToken(user);
        res.json({ message: "Login successful", token, user: {
            user_id: user.user_id,
            name: user.name,
            factory_name: user.factory_name
          } });
    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Example protected route
router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "Protected route accessed!", user: req.user });
});

module.exports = router;

