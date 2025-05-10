// src/controllers/userController.js
const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
  try {
    const { user_id } = req.user; // Decoded from JWT

    const user = await User.findOne({
      where: { user_id },
      attributes: ["user_id", "name", "email", "phone_number", "factory_name", "line_user_id"]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
