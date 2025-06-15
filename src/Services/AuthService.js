import axios from "axios"
const API_BASE_URL = 'https://localhost:7174/api'
export const login = async(email,password,role)=>{
    const response =await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
    role,
  })
  return response.data;
};
const authAxios = axios.create({
  baseURL: API_BASE_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default authAxios;
