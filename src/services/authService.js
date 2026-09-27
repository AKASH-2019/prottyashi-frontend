import axios from "axios";

const API_URL = "https://munazer.pythonanywhere.com/api";

export const loginUser = async (credentials) => {
  const response = await axios.post(
    `${API_URL}/token/`,
    credentials
  );

  return response.data;
};