import axios from "axios";



export const makePayment = async (paymentInfo) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/payment`,
      data: paymentInfo,
      onDownloadProgress: (p) => {
        console.log(p.loaded);
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const getPayment = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `/`,
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
