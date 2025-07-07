import authAxios from './AuthService';
/**
 * Récupère les propriétés favorites de l'étudiant.
 * @returns {Promise<Object>} - Un objet contenant les données de la réponse, le statut et un message de succès ou d'erreur
 */
export const getStudentFavoritesProperties = async () => {
  try {
    const response = await authAxios.get(`/Favoris/annoncesFavoris`);
    return {
      data: response.data,
      status: response.status,
      message: 'Etudiant properties favoris recuperes avec succes',
    };
  } catch (error) {

    if (error.response) {
        console.error('Error response:', error.response);
      return {
        success: false,
        error: error.response.data.error || 'Erreur lors de la recuperation des etudiants favoris properties',
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
}
/** * Récupère les colocations favorites de l'étudiant.
 * @returns {Promise<Object>} - Un objet contenant les données de la réponse, le statut et un message de succès ou d'erreur
 */
export const getStudentFavoritesColocations = async () => {
    try {
        const response = await authAxios.get(`/Favoris/colocationsFavoris`);
        return {
        data: response.data,
        status: response.status,
        message: 'Colocations favorites de l\'etudiant recuperes avec succes',
        };
    } catch (error) {
        if (error.response) {
        return {
            success: false,
            error: error.response.data.error || 'Erreur lors de la recuperation des colocations favorites',
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
    }

/**
 * Ajoute une colocation aux favoris de l'étudiant.
 * @param {number} ElementId - L'ID de l'élément à ajouter
 * @param {string} Type - Le type de l'élément (par exemple, "Colocation")
 * @returns {Promise<Object>} - Un objet contenant les données de la réponse, le statut et un message de succès ou d'erreur
 */
export const addFavoriteColocation = async (ElementId, Type) => {
  try {
    const response = await authAxios.post(`/Favoris/ajouter`, { ElementId, Type });
    return {
      data: response.data,
      status: response.status,
      message: 'Colocation ajoutée aux favoris avec succès',
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        error: error.response.data.error || 'Erreur lors de l\'ajout de la colocation aux favoris',
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
}
/**
 * Supprime une colocation des favoris de l'étudiant.
 * @param {number} ElementId - L'ID de l'élément à supprimer
 * @param {string} Type - Le type de l'élément (par exemple, "Colocation")
 * @returns {Promise<Object>} - Un objet contenant les données de la réponse, le statut et un message de succès ou d'erreur
 */
export const removeFavoriteColocation = async (ElementId, Type) => {
  try {
    const response = await authAxios.post(`/Favoris/supprimer`, { ElementId, Type });
    return {
      data: response.data,
      status: response.status,
      message: 'Colocation supprimée des favoris avec succès',
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        error: error.response.data.error || 'Erreur lors de la suppression de la colocation des favoris',
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
}