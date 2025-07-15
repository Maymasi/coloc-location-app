import authAxios from './AuthService';

/**
 * Récupère les statistiques générales de la plateforme (About Us)
 * @returns {Promise<Object>} Un objet contenant les stats ou une erreur
 */
export const getAboutUsStats = async () => {
  try {
    const response = await authAxios.get('/AboutUs/stats');
    return {
      data: response.data,
      status: response.status,
      message: 'Statistiques récupérées avec succès',
      success: true,
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        error: error.response.data.error || 'Erreur lors de la récupération des statistiques',
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
