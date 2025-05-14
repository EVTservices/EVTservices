const express = require("express");
const crypto = require("crypto");
const line = require("@line/bot-sdk");
const { handleBusETARequest } = require("../utils/busETAService");
require("dotenv").config();

const router = express.Router();

// ✅ LINE client
const client = new line.Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
});

// ✅ Validate LINE signature manually
function isValidSignature(rawBody, headerSignature, secret) {
  if (!rawBody || !headerSignature) return false;

  const hash = crypto
    .createHmac("SHA256", secret)
    .update(rawBody)
    .digest("base64");

  return hash === headerSignature;
}

router.post("/webhook", async (req, res) => {
  const rawBody = req.rawBody;
  const signature = req.headers["x-line-signature"];
  const secret = process.env.LINE_CHANNEL_SECRET_API;

  if (!isValidSignature(rawBody, signature, secret)) {
    console.warn("❌ Invalid signature");
    return res.status(401).send("Invalid signature");
  }

  try {
    const events = req.body.events || [];

    for (const event of events) {
      if (event.type !== "message" || event.message.type !== "text") continue;

      const message = event.message.text.trim();

      // ✅ Only trigger if user message includes the Thai format
      const isStructuredThaiInput = message.includes("โรงงาน:") &&
                                     message.includes("เวลา(กะ):") &&
                                     message.includes("สายรถ:") &&
                                     message.includes("ป้าย:");

      const replyText = isStructuredThaiInput
        ? await handleBusETARequest(message)
        : "❓ กรุณาระบุ:\n- โรงงาน:\n- เวลา(กะ):\n- สายรถ:\n- ป้าย:";

      await client.replyMessage(event.replyToken, {
        type: "text",
        text: replyText,
      });
    }

    res.status(200).end();
  } catch (err) {
    console.error("❌ LINE Webhook Error:", err);
    res.status(500).end();
  }
});

module.exports = router;
