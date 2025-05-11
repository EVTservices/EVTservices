const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
});

// This function sends a push message to a specific user
async function sendLineMessage(userId, message) {
  try {
    await client.pushMessage(userId, {
      type: 'text',
      text: message,
    });
    console.log("✅ LINE message sent!");
  } catch (err) {
    console.error("❌ Failed to send LINE message:", err);
  }
}

module.exports = { sendLineMessage };
