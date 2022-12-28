const db = require("../db/dbConnection");

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    voucherType: {
      type: String,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = db.model("Category", CategorySchema);
