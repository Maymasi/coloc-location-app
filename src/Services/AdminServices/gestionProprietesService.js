import authAxios from '../AuthService';
export const getProprietes = async() => {
    try {
        const response = await authAxios.get(`/GestionProprietes`);
        return response.data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
}
export const verifierPropriete = async(id) => {
    try {
        const response = await authAxios.post(`/GestionProprietes/Verify?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("Error verifying property:", error);
        throw error;
    }
}
export const rejeterPropriete = async(id) => {
    try {
        const response = await authAxios.post(`/GestionProprietes/Rejete?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("Error rejecting property:", error);
        throw error;
    }
}