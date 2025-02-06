const app = require("./src/app"); // Import app.js
require("dotenv").config(); // Load environment variables

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
