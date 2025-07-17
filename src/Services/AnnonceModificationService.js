import authAxios from './AuthService';

/**
 * Récupérer une annonce spécifique par son ID
 * @param {number} annonceId - L'ID de l'annonce à récupérer
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export async function getAnnonceById(annonceId) {
  try {
    const response = await authAxios.get(`/AnnonceModification/${annonceId}`);
    return {
      success: true,
      data: response.data,
      message: 'Annonce récupérée avec succès'
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'annonce:', error);
    
    // Gestion des différents types d'erreurs
    if (error.response) {
      // Erreur de réponse du serveur
      if (error.response.status === 404) {
        return {
          success: false,
          error: 'Annonce introuvable',
          status: 404
        };
      } else if (error.response.status === 401) {
        return {
          success: false,
          error: 'Non autorisé - Veuillez vous connecter',
          status: 401
        };
      } else if (error.response.status === 403) {
        return {
          success: false,
          error: 'Accès refusé - Permissions insuffisantes',
          status: 403
        };
      } else {
        return {
          success: false,
          error: error.response.data.error || 'Erreur lors de la récupération de l\'annonce',
          status: error.response.status
        };
      }
    } else if (error.request) {
      // Erreur de réseau
      return {
        success: false,
        error: 'Erreur de connexion au serveur',
        status: null
      };
    } else {
      // Autre erreur
      return {
        success: false,
        error: 'Une erreur inattendue s\'est produite',
        status: null
      };
    }
  }
}