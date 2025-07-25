import AuthAxios from '../AuthService';
export const getAllUsers = async () => {
  try {
    const response = await AuthAxios.get('/GestionUtilisateurs/GetAllUsers');
    console.log('Response from getAllUsers:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}
export const bannirUser =  async (userId) => {
  try {
    const response = await AuthAxios.post(`/Utilisateur/DeleteUser?IdUser=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error banning user:', error);
    throw error;
  }
}
export const suspendreUser =  async (userId) => {
  try{
    const response = await AuthAxios.post(`/Utilisateur/SuspendreUser?IdUser=${userId}&suspendre=${true}`);
    return response.data;
  } catch(error){
    console.error('Error suspending user:', error);
    throw error;
  }
}