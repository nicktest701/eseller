import axios from "axios";
const BASE_URL = "http://localhost:5000";

///

export const getAllVouchersCategory = async (category) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category`,
      method: "GET",
      params: {
        category,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

///
export const postCategory = async (newCategory) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category`,
      method: "POST",
      data: newCategory,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
