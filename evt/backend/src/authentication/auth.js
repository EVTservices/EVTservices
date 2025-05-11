const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ user_id: user.user_id, phone_number: user.phone_number, factory_name: user.factory_name }, SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// Verify JWT Token Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(403).json({ error: "Access Denied" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid Token" });
        req.user = decoded; // Store user details in request
        next();
    });
};

module.exports = { generateToken, verifyToken };
