import axios from "axios";
const API_URL = "https://localhost:7174/api/"; 
//get Statistics
export const getStatistics = async () => {
  try {
    const response = await axios.get(`${API_URL}Home/statistic`);
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};
export const getFeaturedProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}Home/Featured`);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    throw error;
  }
}