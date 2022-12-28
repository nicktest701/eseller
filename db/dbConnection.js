const mongoose = require("mongoose");

const db = mongoose.createConnection(process.env.MONGO_URL_LOCAL, {
  serverSelectionTimeoutMS: 0,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0,
});

db.on("connected", () => {
  console.log("connnected");
});

db.on("disconnected", () => {
  console.log("disconnected");
});

process.on("SIGINT", async () => {
  await db.close();
  process.exit(0);
});

module.exports = db;
