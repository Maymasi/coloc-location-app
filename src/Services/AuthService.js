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
// ----- REGISTER (Étudiant & Propriétaire) -----
export const register = async (userType, formData, profileImage) => {
  const endpoint =
    userType === 'student'
      ? '/Auth/register-etudiant'
      : '/Auth/register-proprietaire';

  const form = new FormData();

  // Champs communs
  form.append('nom', formData.nom);
  form.append('prenom', formData.prenom);
  form.append('email', formData.email);
  form.append('password', formData.motDePasse);
  form.append('telephone', formData.telephone);

  if (userType === 'student') {
    form.append('universite', formData.universite);
    form.append('domaineEtudes', formData.domaineEtudes);
    form.append('niveauEtudes', formData.niveauEtudes);
    form.append('adresse', formData.adresse);
    form.append('budget', parseInt(formData.budget));
    form.append('bio', formData.bio);

    // Tableaux (habitudes, centres d’intérêt, style de vie)
    formData.habitudes.forEach((val) => form.append('habitudes[]', val));
    formData.centresInteret.forEach((val) => form.append('centresInteret[]', val));
    formData.styleDeVie.forEach((val) => form.append('styleDeVie[]', val));
  } else {
    // Propriétaire
    form.append('adresse', formData.adresseProprietaire);
    form.append('ville', formData.ville);
    form.append('codePostal', formData.codePostal);
    form.append('pays', formData.pays);
  }

  // Ajout de la photo si elle existe
  if (profileImage) {
    form.append('photoUrl', profileImage); 
  }
  const response = await axios.post(`${API_BASE_URL}${endpoint}`, form, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
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

