import authAxios from './AuthService';

/**
 * Dashboard owner Stats
 * @returns {Promise} - Promesse contenant les statistiques du dashboard propriétaire
 */
export async function getDashboardStats() {
  try {
    const response = await authAxios.get('/DashboardOwner/stats');
    console.log('Statistiques du dashboard récupérées avec succès:', response.data);

    return {
      success: true,
      data: response.data,
      message: 'Statistiques du dashboard récupérées avec succès'
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    
    // Gestion des différents types d'erreurs
    if (error.response) {
      // Erreur de réponse du serveur
      return {
        success: false,
        error: error.response.data.error || 'Erreur lors de la récupération des statistiques',
        status: error.response.status
      };
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

/**
 * Récupère les propriétés d'un propriétaire connecté
 * @returns {Promise} - Promesse contenant la liste des propriétés
 */
export async function getOwnerProperties() {
  try {
    const response = await authAxios.get('/DashboardOwner/proprietes');
    console.log('Propriétés récupérées avec succès:', response.data);

    return {
      success: true,
      data: response.data,
      message: 'Propriétés récupérées avec succès'
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des propriétés:', error);

    if (error.response) {
      return {
        success: false,
        error: error.response.data.error || 'Erreur lors de la récupération des propriétés',
        status: error.response.status
      };
    } else if (error.request) {
      return {
        success: false,
        error: 'Erreur de connexion au serveur',
        status: null
      };
    } else {
      return {
        success: false,
        error: 'Une erreur inattendue s\'est produite',
        status: null
      };
    }
  }
}