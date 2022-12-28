import axios from "axios";

const BASE_URL = "http://localhost:5000";
// if (process.env.NODE_ENV !== "production") {
//   BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL;
// }

export const getVoucherByVoucherType = async (voucherType) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/voucher`,
      params: {
        voucherType,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const addVoucher = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/voucher`,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
