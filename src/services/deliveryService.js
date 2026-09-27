import axios from "axios";

const API_URL =
  "https://munazer.pythonanywhere.com/api";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem(
    "access_token"
  )}`,
});

export const getDeliveries =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/deliveries/`,
        {
          headers: getHeaders(),
        }
      );

    return response.data.results;;
  };

export const createDelivery =
  async (formData) => {

    const response =
      await axios.post(
        `${API_URL}/deliveries/`,
        formData,
        {
          headers: {
            ...getHeaders(),
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const updateDelivery =
  async (id, formData) => {

    const response =
      await axios.put(
        `${API_URL}/deliveries/${id}/`,
        formData,
        {
          headers: {
            ...getHeaders(),
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const deleteDelivery =
  async (id) => {

    return axios.delete(
      `${API_URL}/deliveries/${id}/`,
      {
        headers: getHeaders(),
      }
    );
  };