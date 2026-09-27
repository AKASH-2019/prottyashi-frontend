import axios from "axios";

const API_URL = "https://munazer.pythonanywhere.com/api";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

export const getSchools = async () => {
  const response = await axios.get(`${API_URL}/schools/`, {
    headers: getHeaders(),
  });
  
  // Extract the results array directly from the DRF paginated response
  return response.data?.results || []; 
};

export const createSchool = async (schoolData) => {
  const response = await axios.post(`${API_URL}/schools/`, schoolData, {
    headers: getHeaders(),
  });
  return response.data;
};

export const deleteSchool = async (id) => {
  return axios.delete(`${API_URL}/schools/${id}/`, {
    headers: getHeaders(),
  });
};

export const updateSchool = async (
  id,
  schoolData
) => {

  const response = await axios.put(
    `${API_URL}/schools/${id}/`,
    schoolData,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};




// ................. Previous ................
// import axios from "axios";

// const API_URL =
//   "https://munazer.pythonanywhere.com/api";

// const getHeaders = () => ({
//   Authorization: `Bearer ${localStorage.getItem(
//     "access_token"
//   )}`,
// });

// export const getSchools = async () => {
//   const response = await axios.get(
//     `${API_URL}/schools/`,
//     {
//       headers: getHeaders(),
//     }
//   );

//   return response.data;
// };

// export const createSchool = async (
//   schoolData
// ) => {
//   const response = await axios.post(
//     `${API_URL}/schools/`,
//     schoolData,
//     {
//       headers: getHeaders(),
//     }
//   );

//   return response.data;
// };

// export const deleteSchool = async (
//   id
// ) => {
//   return axios.delete(
//     `${API_URL}/schools/${id}/`,
//     {
//       headers: getHeaders(),
//     }
//   );
// };