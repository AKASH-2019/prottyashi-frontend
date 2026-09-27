import axios from "axios";

const API_URL =
  "https://munazer.pythonanywhere.com/api";

export const getForm4Report = async (
  month,
  year
) => {

  const token =
    localStorage.getItem(
      "access_token"
    );

  const response =
    await axios.get(
      `${API_URL}/reports/form4/?month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const getForm7Report = async (
  month,
  year
) => {

  const token =
    localStorage.getItem(
      "access_token"
    );

  const response =
    await axios.get(
      `${API_URL}/reports/form07/?month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const getForm10Report = async (
  month,
  year
) => {

  const token =
    localStorage.getItem(
      "access_token"
    );

  const response =
    await axios.get(
      `${API_URL}/reports/form10/?month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};


export const getForm1213Report = async (
  month,
  year
) => {

  const token =
    localStorage.getItem(
      "access_token"
    );

  const response =
    await axios.get(
      `${API_URL}/reports/form12-13/?month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};