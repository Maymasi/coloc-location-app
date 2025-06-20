import axios from "axios";
const API_BASE_URL = 'https://localhost:7174/api'
export const getAllAnnonces = async () =>{
    const response = await axios.get(`${API_BASE_URL}/FilterAnnonce`);
    return response.data;
}
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
export const basicFilter = async (ville ,propertyType,minPrice)=>{
    const response = await axios.post(`${API_BASE_URL}/FilterAnnonce/basic`,{
        ville,
        propertyType,
        minPrice,
    });
    return response.data.$values;
}
export const AddFavorisAnnonce = async (ElementId)=>{
    const response = await axios.post(`${API_BASE_URL}/Favoris/ajouter`,{
        ElementId
    })
    return response.data.$values;
}