import axios from "axios";

const API_URL = "https://munazer.pythonanywhere.com/api";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Fixed key from access_token to access
});

export const getHolidays = async () => {
  const response = await axios.get(`${API_URL}/holidays/`, {
    headers: getHeaders(),
  });
  return response.data.results;
};

export const createHoliday = async (data) => {
  const response = await axios.post(`${API_URL}/holidays/`, data, {
    headers: getHeaders(),
  });
  return response.data;
};

export const updateHoliday = async (id, data) => {
  const response = await axios.put(`${API_URL}/holidays/${id}/`, data, {
    headers: getHeaders(),
  });
  return response.data;
};

export const deleteHoliday = async (id) => {
  return axios.delete(`${API_URL}/holidays/${id}/`, {
    headers: getHeaders(),
  });
};