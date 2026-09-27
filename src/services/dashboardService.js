import axios from "axios";

const API_URL =
  "https://munazer.pythonanywhere.com/api";

export const getDashboardData = async () => {
  const token =
    localStorage.getItem("access_token");

  const response = await axios.get(
    `${API_URL}/dashboard/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};