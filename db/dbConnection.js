const mongoose = require("mongoose");

const db = mongoose.createConnection(process.env.MONGO_URL_LOCAL);

db.on("connected", () => {
  console.log("connnected");
});

db.on("disconnected", () => {
  console.log("disconnected");
});

process.on("SIGINT", () => {
  db.close();
});

module.exports = db;
