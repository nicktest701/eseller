const router = require("express").Router();
const asyncHandler = require("express-async-handler");

//model
const Voucher = require("../models/voucherModel");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { dataType } = req.query;
    const cards = await Voucher.find({ dataType });
    res.status(200).json(cards);
  })
);

router.get(
  "/buy",
  asyncHandler(async (req, res) => {
    const { quantity, dataType } = req.query.paymentInfo;
    const cards = await Voucher.find({ dataType, active: true }).limit(
      quantity
    );
    res.status(200).json(cards);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newCards = req.body;

    const cards = await Voucher.insertMany(newCards);
    if (!cards) {
      res.status(404).json("Error saving pins.Please try again later");
    }
    res.sendStatus(201);
  })
);

module.exports = router;
