import axios from "axios";

const API_URL = "https://munazer.pythonanywhere.com/api";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

export const getStaffDashboard = async () => {
  const response = await axios.get(`${API_URL}/staff-dashboard/`, {
    headers: getHeaders(),
  });
  // This endpoint returns a plain object (not a paginated DRF response),
  // so return response.data directly instead of response.data.results.
  return response.data;
};