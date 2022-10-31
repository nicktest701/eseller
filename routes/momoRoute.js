const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const generateBasicToken = require("../config/generateBasicToken");
const {
  generateToken,
  requestToPay,
  transactionReference,
} = require("../config/momoHelper");

const Keys = require("../models/keysModel");

const x_reference_id = process.env.X_REFERENCE_ID;
const momo_api_key = process.env.MOMO_API_KEY;
const sub_key = process.env.PRIMARY_KEY;
const key_id = process.env.KEY_ID;

// @GET get api keys from database
router.get(
  "/",
  asyncHandler(async (req, res) => {
    //Generate Basic token
    const basicAuth = generateBasicToken(x_reference_id, momo_api_key);

    if (basicAuth) {
      const bearerToken = await generateToken(basicAuth, sub_key);
      if (bearerToken) {
        const keysToken = {
          basicAuth,
          accessToken: bearerToken,
        };

        const keys = await Keys.findByIdAndUpdate(key_id, keysToken, {
          upsert: true,
          new: true,
        });
        if (!keys) {
          return res.sendStatus(404);
        }
        res.sendStatus(200);
      }
    }
  })
);

router.post(
  "/payment",
  asyncHandler(async (req, res) => {
    const keys = await Keys.findById(key_id);
    const access_token = keys.accessToken;

    //Get transaction id
    const transaction_reference_id = await requestToPay(
      null,
      access_token,
      sub_key
    );

    //Generate transaction reference
    const transactionDetails = await transactionReference(
      transaction_reference_id,
      access_token,
      sub_key
    );

    res.json(transactionDetails);
  })
);

module.exports = router;
