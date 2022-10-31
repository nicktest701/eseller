const router = require("express").Router();
const asyncHandler = require("express-async-handler");

//model
const BeceCard = require("../models/beceCardModel");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const limit = req.query.q || 1;
    const cards = await BeceCard.find({ active: true }).limit(limit);
    res.status(200).json(cards);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newCards = req.body;

    const cards = await BeceCard.insertMany(newCards);
    if (!cards) {
      res.status(404).json("Error saving pins.Please try again later");
    }
    res.sendStatus(201);
  })
);

module.exports = router;
