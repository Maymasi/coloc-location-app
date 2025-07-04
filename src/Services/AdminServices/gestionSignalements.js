 import authAxios from '../AuthService';
 export const getSignalements = async () => {
     try {
         const response = await authAxios.get('/GestionSignalements');
         return response.data;
     } catch (error) {
         console.error("Error fetching reports:", error);
         throw error;
     }
 }
 export const resolveSignalement = async (id) => {
     try {
         const response = await authAxios.post(`/GestionSignalements/Resout?id=${id}`);
         return response.data;
     } catch (error) {
         console.error("Error resolving report:", error);
         throw error;
     }
 }
export const rejectSignalement = async (id) => {
    try {
        const response = await authAxios.post(`/GestionSignalements/Rejete?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("Error rejecting report:", error);
        throw error;
    }
} 