import axios from "axios";

const BASE_URL = "http://localhost:5000/auth_key";

export const makePayment = async (paymentInfo) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/payment`,
      data: paymentInfo,
      timeout: 15000,
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

export const getPayment = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}`,
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
