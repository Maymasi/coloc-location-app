import axios from "axios";
import authAxios from "./AuthService";
const API_BASE_URL = 'https://localhost:7174/api'
// eslint-disable-next-line react-refresh/only-export-components
export const getAllAnnonces = async () =>{
    const response = await axios.get(`${API_BASE_URL}/FilterAnnonce`);
    return response.data;
}
// eslint-disable-next-line react-refresh/only-export-components
export const filterAvancee = async (price ,propertyType,bedrooms,bathrooms,amenities) =>{
    const response = await axios.post(`${API_BASE_URL}/FilterAnnonce/advanced`,{
        price,
        propertyType,
        bedrooms,
        bathrooms,
        amenities,
    });
    return response.data;
}
// eslint-disable-next-line react-refresh/only-export-components
export const basicFilter = async (ville ,propertyType,minPrice)=>{
    const response = await axios.post(`${API_BASE_URL}/FilterAnnonce/basic`,{
        ville,
        propertyType,
        minPrice,
    });
    return response.data.$values;
}
export const AddFavorisAnnonce = async (ElementId)=>{
    const response = await authAxios.post(`${API_BASE_URL}/Favoris/ajouter`,{
        ElementId
    })
    return response.data;
}
export const RemoveFavorisAnnonce = async (ElementId)=>{
    const response = await authAxios.post(`${API_BASE_URL}/Favoris/supprimer`,{
        ElementId
    })
    return response.data;
}
export const getMyFavoris = async ()=>{
    const response = await authAxios.get(`${API_BASE_URL}/Favoris/annoncesFavoris`)
    return response.data;
}