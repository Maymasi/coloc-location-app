import authAxios from "../AuthService";
export const getAdminDashboardStates = async () => {
    const response = await authAxios.get('/Dashboard/overview');
    return response.data;
}