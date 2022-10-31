import axios from "axios";
const BASE_URL = "http://localhost:5000";

///

export const getAllCategoriesByName = async (category) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category?category=${category}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

///
export const newCategory = async (newCategory) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category`,
      method: "POST",
      data: newCategory,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
