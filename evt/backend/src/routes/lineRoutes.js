const express = require("express");
const axios = require("axios");
const qs = require("qs"); // ✅ Add this line
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    // ✅ 1. Exchange LINE code for access token (corrected format)
    const tokenRes = await axios.post(
      "https://api.line.me/oauth2/v2.1/token",
      qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINE_REDIRECT_URI,
        client_id: process.env.LINE_CHANNEL_ID,
        client_secret: process.env.LINE_CHANNEL_SECRET
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const access_token = tokenRes.data.access_token;

    // 2. Get LINE user profile
    const profileRes = await axios.get("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const { userId: line_user_id, displayName } = profileRes.data;

    // 3. Try to find a user with this line_user_id
    let user = await User.findOne({ where: { line_user_id } });

    if (user) {
      return res.send("✅ Your LINE account is already linked.");
    }

    // Optional: Create a new user
    user = await User.create({
      name: displayName,
      phone_number: "0000000000", // placeholder
      password: "dummy",          // placeholder (make sure to hash in beforeCreate)
      factory_name: "Unknown",    // placeholder
      line_user_id
    });

    return res.send("✅ LINE account linked and user created!");
  } catch (error) {
    console.error("LINE callback error:", error.response?.data || error.message);
    return res.status(500).send("❌ Failed to link LINE account.");
  }
});

module.exports = router;
