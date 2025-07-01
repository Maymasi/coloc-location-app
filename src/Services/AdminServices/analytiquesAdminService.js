import authAxios from '../AuthService';
export const getAnalytiquesAdminService= async () =>{
    const res = await authAxios.get("/Analytics/VueDensemble");
    return res.data;
}