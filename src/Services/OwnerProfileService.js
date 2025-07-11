import axios from 'axios';
import authAxios from './AuthService';
export const getOwnerProfile = async (ownerId) => {
  try {
    const response = await axios.get(`https://localhost:7174/api/OwnerProfile/info?id=${ownerId}`);
    console.log("Owner profile data:", response.data);
    return response.data;

  } catch (error) {
    console.error("Error fetching owner profile:", error);
    throw error;
  }
}
export const addAvis = async (avisData) => {
  try {
    await authAxios.post('/OwnerProfile/AddAvis', avisData);
    return {
      success: true,
      message: 'Avis added successfully',
    };
  } catch (error) {
    console.error("Error adding avis:", error);
    throw error;
  }
}