import axios from "axios";
const BASE_URL = "";

///

export const getAllVouchersCategory = async (category) => {
  try {
    const res = await axios({
      url: `/category`,
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
      url: `/category`,
      method: "POST",
      data: newCategory,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
