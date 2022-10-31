const router = require("express").Router();
const axios = require("axios");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { v4 } = require("uuid");
const Key = require("../models/keysModel");
const {
  generateToken,
  requestToPay,
  transactionReference,
} = require("../config/momoHelper");

const BASE_URL = process.env.MOMO_URL_LOCAL;

// @GET get api keys from database
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const id = process.env.KEY_ID;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json("server error");
    }

    let keys = await Key.findById(id);

    if (!keys) {
      return res.status(500).json("server error");
    }

    const bearerToken = await generateToken(keys.basicAuth, keys.primaryKey);
    if (bearerToken) {
      // console.log(bearerToken);
      keys.me = "Hello";
      keys.token = bearerToken;
      const generatedKeys = {
        ...keys._doc,
        token: bearerToken,
      };
      req.session.keys = generatedKeys;

 
      res.sendStatus(200);
    }
  })
);

// @POST update api keys in database
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const id = process.env.KEY_ID;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json("server error");
    }

    const data = req.body;
    const keys = await Key.findByIdAndUpdate(id, data, {
      upsert: true,
      new: true,
    });

    res.json(keys);
  })
);

// @POST Generate token for transaction
router.post(
  "/token",
  asyncHandler(async (req, res) => {
    const token = req.session.keys.basicAuth;
    const sub_key = req.session.keys.primaryKey;

    const response = await axios({
      url: `${BASE_URL}/collection/token/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
        "Ocp-Apim-Subscription-Key": sub_key,
      },
    });

    req.session.keys.token = response.data.access_token;
    res.status(200).json("token generated");
  })
);

// @GET Get account balance of user
router.post(
  "/account-balance",
  asyncHandler(async (req, res) => {
    const access_token = req.session.keys.token;
    const sub_key = req.session.keys.primaryKey;

    const response = await axios({
      url: `${BASE_URL}/collection/v1_0/account/balance/GHS`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
        "Ocp-Apim-Subscription-Key": sub_key,
        "X-Target-Environment": "sandbox",
      },
    });

    res.json(response.data);
  })
);

// @POST request to pay
router.post(
  "/request-to-pay",
  asyncHandler(async (req, res) => {
    const sub_key = req.session.keys.primaryKey;
    const access_token = req.session.keys.token;
    // console.log(access_token);
    // console.log(sub_key);
    const transaction_reference_id = v4();
    const body = {
      amount: "20",
      currency: "EUR",
      externalId: "1234454433",
      payer: {
        partyIdType: "MSISDN",
        partyId: "0244599123",
      },
      payerMessage: "kjhkjhkjhkj",
      payeeNote: "strikjjhkjhkjhkjng",
    };

    const response = await axios({
      url: `${BASE_URL}/collection/v1_0/requesttopay`,
      method: "POST",
      data: body,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "X-Reference-Id": transaction_reference_id,
        "X-Target-Environment": "sandbox",
        "Ocp-Apim-Subscription-Key": sub_key,
      },
    });

    if (response.status === 202) {
      req.session.keys.transaction_reference_id = transaction_reference_id;
      res.json(response.status);
    }
  })
);

// @POST get transaction reference

router.post(
  "/transaction-ref",
  asyncHandler(async (req, res) => {
    const transaction_reference_id = req.session.keys.transaction_reference_id;
    const sub_key = req.session.keys.primaryKey;
    const access_token = req.session.keys.token;

    const response = await axios({
      url: `${BASE_URL}/collection/v1_0/requesttopay/${transaction_reference_id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "X-Target-Environment": "sandbox",
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": sub_key,
      },
    });

    res.send(response.data);
  })
);

router.post(
  "/notification",
  asyncHandler(async (req, res) => {
    const transaction_reference_id = req.session.keys.transaction_reference_id;
    const sub_key = req.session.keys.primaryKey;
    const access_token = req.session.keys.token;
    const xReferenceId = req.session.keys.xReferenceId;

    const body = {
      notificationMessage: "We have successfully purchased our products",
    };

    const response = await axios({
      url: `${BASE_URL}/collection/v1_0/requesttopay/${transaction_reference_id}/deliverynotification`,
      method: "POST",
      data: body,
      headers: {
        notificationMessage: body.notificationMessage,
        Authorization: `Bearer ${access_token}`,
        "X-Reference-Id": xReferenceId,
        "X-Target-Environment": "sandbox",
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": sub_key,
      },
    });
    if (response.status === 200) {
      res.json({ message: body.notificationMessage });
    }
  })
);

//GET user info
router.get(
  "/user-info",
  asyncHandler(async (req, res) => {
    const sub_key = req.session.keys.primaryKey;
    const access_token = req.session.keys.token;
    // const basicAuth = req.session.keys.basicAuth;
    const accountHolderMSISDN = "0244583726";

    const response = await axios({
      url: `${BASE_URL}/collection/v1_0/accountholder/msisdn/${accountHolderMSISDN}/basicuserinfo`,
      method: "GET",
      headers: {
        // Authorization: `Basic ${basicAuth}`,
        Authorization: `Bearer ${access_token}`,
        "X-Target-Environment": "sandbox",
        "Ocp-Apim-Subscription-Key": sub_key,
      },
    });
    if (response.status === 200) {
      res.json(response.data);
    }
  })
);


router.get(
  "/holder",
  asyncHandler(async (req, res) => {
    const sub_key = req.session.keys.primaryKey;
    const access_token = req.session.keys.token;
    const accountHolderIdType = "msisdn";
    const accountHolderMSISDN = "0244583726";

    const response = await axios({
      url: `${BASE_URL}/collection/v1_0/accountholder/${accountHolderIdType}/${accountHolderMSISDN}/active`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "X-Target-Environment": "sandbox",
        "Ocp-Apim-Subscription-Key": sub_key,
      },
    });
    if (response.status === 200) {
      res.json(response.data);
    }
  })
);

router.post(
  "/payment",
  asyncHandler(async (req, res) => {
    console.log(req.session.keys)

    // const sub_key = req.session.keys.primaryKey;
    // const access_token = req.session.keys.token;

    // //Get transaction id
    // const transaction_reference_id = await requestToPay(
    //   null,
    //   access_token,
    //   sub_key
    // );

    // //Generate transaction reference
    // const transactionDetails = await transactionReference(
    //   transaction_reference_id,
    //   access_token,
    //   sub_key
    // );

    // res.json(transactionDetails);
    res.json('pk');
  })
);

module.exports = router;
