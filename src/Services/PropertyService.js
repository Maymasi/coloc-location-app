import axios from 'axios';

const API_BASE_URL = 'https://localhost:7174/api';

export const saveProperty = async (propertyData, logementId = null) => {
  if (!propertyData || typeof propertyData !== 'object') {
    throw new Error('Invalid property data provided.');
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');
    let payload = {};
    if(logementId ==null){
         payload = {
            ...propertyData,
        };
    }
    else if(logementId != null){
        payload = {
            ...propertyData,
            logementId: logementId
        };
    }

    console.log('Payload to be sent:', payload);
    console.log('Authorization token:', token);
    // Ensure the payload is properly formatted
    const response = await axios.post(`${API_BASE_URL}/Proprietaire/save`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error saving property:', error?.response?.data || error.message);
    throw new Error(error?.response?.data?.error || 'Failed to save property.');
  }
};
// Fonction pour récupérer toutes les propriétés
export const getAllProperties = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');
    
    const response = await axios.get(`${API_BASE_URL}/Proprietaire/annonces`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    // Extraire les données du format "$values"
    return response.data.$values || response.data;
  } catch (error) {
    console.error('Error fetching properties:', error?.response?.data || error.message);
    throw new Error(error?.response?.data?.error || 'Failed to fetch properties.');
  }
};

// Fonction pour supprimer une propriété
export const deleteProperty = async (propertyId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');
    
    const response = await axios.delete(`${API_BASE_URL}/proprietaire/supprimer`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        logementId: propertyId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting property:', error?.response?.data || error.message);
    throw new Error(error?.response?.data?.error || 'Failed to delete property.');
  }
};

// Fonction pour changer le statut d'une propriété
export const changePropertyStatus = async (propertyId, newStatus) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authorization token found.');
    
    // Convertir le statut en nombre (0 = brouillon, 1 = actif, etc.)
    const statusMap = {
      'brouillon': 0,
      'active': 1,
      'louee': 2
    };
    
    const nouveauStatut = statusMap[newStatus] !== undefined ? statusMap[newStatus] : 0;
    
    const response = await axios.put(`${API_BASE_URL}/Proprietaire/changer-statut`, 
      { 
        annonceId: propertyId,
        nouveauStatut: nouveauStatut
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error changing property status:', error?.response?.data || error.message);
    throw new Error(error?.response?.data?.error || 'Failed to change property status.');
  }
};