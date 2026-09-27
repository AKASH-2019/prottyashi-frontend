import axios from "axios";

const API_URL =
  "https://munazer.pythonanywhere.com/api";


const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

// GET ALL RATION SETTINGS
export const getRationSettings = async () => {
  const response = await axios.get(
    `${API_URL}/ration-settings/`, {
    headers: getHeaders(),
  });

  return response.data;
};

// CREATE NEW RATION SETTING
export const createRationSetting = async (
  data
) => {
  const response = await axios.post(
    `${API_URL}/ration-settings/`,data, {
    headers: getHeaders(),
  });
  return response.data;
};

// UPDATE RATION SETTING
export const updateRationSetting = async (
  id,
  data
) => {
  const response = await axios.patch(
    `${API_URL}/ration-settings/${id}/`,data, {
    headers: getHeaders(),
  });

  return response.data;
};

// GET SINGLE RATION SETTING
export const getRationSetting = async (
  id
) => {
  const response = await axios.get(
    `${API_URL}/ration-settings/${id}/`, {
    headers: getHeaders(),
  });

  return response.data;
};