import axios from "axios";

const BASE_URL = "";

export const makeTransaction = async (transactionInfo) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/transaction`,
      data: transactionInfo,
      timeout: 15000,
      timeoutErrorMessage: "Error connecting to the server",
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getTransaction = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `/transaction`,
      timeout: 10000,
      timeoutErrorMessage: "Error connecting to the server",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const sendVoucherMail = async (id) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/transaction/send-mail`,
      data: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
