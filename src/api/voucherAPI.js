import axios from "axios";

let BASE_URL;
if (process.env.NODE_ENV !== "production") {
  BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL;
}

export const getVoucherByDataType = async (dataType) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/voucher`,
      params: {
        dataType,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.status === 200 && response.data;
  } catch (error) {
    const err = new Error(error);
    throw err.message;
  }
};
export const buyVoucher = async (paymentInfo) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/voucher/buy`,
      params: {
        paymentInfo,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.status === 200 && response.data;
  } catch (error) {
    const err = new Error(error);
    throw err.message;
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
    return response.status === 201 && response.data;
  } catch (error) {
    const err = new Error(error);
    throw err.message;
  }
};
