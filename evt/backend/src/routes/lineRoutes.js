const express = require("express");
const axios = require("axios");
const qs = require("qs");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// router.get("/callback", async (req, res) => {
//   try {
//     const { code, state } = req.query;

//     // 🔁 Exchange code for access token using correct body
//     const tokenRes = await axios.post("https://api.line.me/oauth2/v2.1/token", 
//       qs.stringify({
//         grant_type: "authorization_code",
//         code,
//         redirect_uri: process.env.LINE_REDIRECT_URI,
//         client_id: process.env.LINE_CHANNEL_ID,
//         client_secret: process.env.LINE_CHANNEL_SECRET
//       }),
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         }
//       }
//     );

//     const access_token = tokenRes.data.access_token;

//     // ✅ Fetch LINE profile
//     const profileRes = await axios.get("https://api.line.me/v2/profile", {
//       headers: { Authorization: `Bearer ${access_token}` }
//     });

//     const { userId: line_user_id, displayName } = profileRes.data;

//     const userId = parseInt(state);
//     if (isNaN(userId)) {
//     console.error("❌ Invalid state value. Expected numeric user_id, got:", state);
//     return res.status(400).send("Invalid state parameter");
//     }

//     // ✅ Match user and update line_user_id
//     const user = await User.findByPk(parseInt(state));
//     if (!user) return res.status(404).send("User not found");

//     user.line_user_id = line_user_id;
//     await user.update({ line_user_id }, { fields: ["line_user_id"] });


//     res.send("✅ LINE account successfully linked");
//   } catch (error) {
//     console.error("LINE callback error:", error.response?.data || error.message);
//     res.status(500).send("❌ LINE linking failed");
//   }
// });

router.get("/callback", async (req, res) => {
    try {
      const { code, state } = req.query;
  
      const userId = parseInt(state);
      if (isNaN(userId)) {
        return res.status(400).send("Invalid state parameter");
      }
  
      // Exchange code for access token
      const tokenRes = await axios.post("https://api.line.me/oauth2/v2.1/token",
        qs.stringify({
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.LINE_REDIRECT_URI,
          client_id: process.env.LINE_CHANNEL_ID,
          client_secret: process.env.LINE_CHANNEL_SECRET
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
  
      const access_token = tokenRes.data.access_token;
  
      // Get LINE profile
      const profileRes = await axios.get("https://api.line.me/v2/profile", {
        headers: { Authorization: `Bearer ${access_token}` }
      });
  
      const { userId: line_user_id } = profileRes.data;
  
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).send("User not found");
  
      const existing = await User.findOne({
        where: { line_user_id }
      });
  
      if (existing && existing.user_id !== userId) {
        return res.status(409).send("❌ This LINE account is already linked to another user.");
      }
  
      await user.update(
        { line_user_id },
        { fields: ["line_user_id"], validate: false }
      );
  
      res.send("✅ LINE account successfully linked");
    } catch (error) {
      if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        console.error("🔥 Sequelize validation error:", error.errors.map(e => e.message));
        return res.status(400).send("❌ Validation error: " + error.errors.map(e => e.message).join(", "));
      }
  
      console.error("LINE callback error:", error.response?.data || error.message);
      res.status(500).send("❌ LINE linking failed");
    }
  });

module.exports = router;
