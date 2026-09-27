import axios from "axios";

const API_URL = "https://munazer.pythonanywhere.com/api";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

export const getStaffDashboard = async () => {
  const response = await axios.get(`${API_URL}/staff-dashboard/`, {
    headers: getHeaders(),
  });
  // Extract the results array directly from the DRF paginated response
  return response.data?.results || []; 
};