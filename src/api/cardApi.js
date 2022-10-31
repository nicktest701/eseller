import axios from "axios";

let BASE_URL;
if (process.env.NODE_ENV !== "production") {
  BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL;
}

export const getBeceCard = async (quantity) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/bece`,
      params: {
        q: quantity,
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
export const addBeceCard = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/bece`,
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
