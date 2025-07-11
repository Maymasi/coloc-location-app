import authAxios from './AuthService';

/**
 * Récupère le profil du propriétaire connecté
 * @returns {Promise<Object>} Un objet contenant les informations du profil
 */
export const getProprietaireProfil = async () => {
  try {
    const response = await authAxios.get('/ProfilProprietaire');
    return {
      data: response.data,
      status: response.status,
      message: 'Profil récupéré avec succès',
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        error: error.response.data.error || 'Erreur lors de la récupération du profil',
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        success: false,
        error: 'Erreur de connexion au serveur',
        status: null,
      };
    } else {
      return {
        success: false,
        error: 'Une erreur inattendue s\'est produite',
        status: null,
      };
    }
  }
};

/**
 * Met à jour le profil du propriétaire connecté
 * @param {Object} profilData Les nouvelles données du profil à mettre à jour
 * @returns {Promise<Object>} Un objet contenant le nouveau profil mis à jour
 */
export const updateProprietaireProfil = async (profilData) => {
  try {
    const response = await authAxios.put('/ProfilProprietaire', profilData);
    return {
      data: response.data.profil,
      status: response.status,
      message: response.data.message || 'Profil mis à jour avec succès',
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        error: error.response.data.error || 'Erreur lors de la mise à jour du profil',
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        success: false,
        error: 'Erreur de connexion au serveur',
        status: null,
      };
    } else {
      return {
        success: false,
        error: 'Une erreur inattendue s\'est produite',
        status: null,
      };
    }
  }
};
