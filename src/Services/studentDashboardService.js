import authAxios from './AuthService';

/**
 * Recuper les states du dashboard de l'étudiant : nombre de favoris,messages non lus, demande de colocations,mes colocations publiees
 * @returns {Promise<Object>} Un objet contenant les états du dashboard de l'étudiant
 */
export const getStudentDashboardStates = async () => {
  try {
    const response = await authAxios.get('/DashboardStudent/stats');
    return {
        data: response.data,
        status: response.status,
        message:'States recuperes avec succes',
    }
  } catch (error) {
          if (error.response) {
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors de la recuperation des states',
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
};
/**
 * Recupere les messages recents de l'étudiant
 * @returns {Promise<Object>} Un objet contenant les messages récents de l'étudiant
 * */
export const getRecentMessages = async () => {

    try {
        const response = await authAxios.get('/DashboardStudent/recent-messages');
        return {
            data: response.data,
            status: response.status,
            message:'Messages recents recuperes avec succes',
        }
    } catch (error) {
            if (error.response) {
                return {
                    success: false,
                    error: error.response.data.error || 'Erreur lors de la recuperation des messages recents',
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

/**
 * Recupere les proprietes recemment publiees
 * @returns {Promise<Object>} Un objet contenant les proprietes recemment publiées
 */

export const getRecentProperties = async () => {
  try {
    const response = await authAxios.get('/DashboardStudent/recent-properties');
    return {
      data: response.data,
      status: response.status,
      message: 'Propriétés récentes récupérées avec succès',
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        error: error.response.data.error || 'Erreur lors de la récupération des propriétés récentes',
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
 * Recupere les demandes de colocations recues par l'étudiant
 * @returns {Promise<Object>} Un objet contenant les demandes de colocations recues
 */

export const getRoommateRequests = async () => {
  try {
    const response = await authAxios.get('/DashboardStudent/demandes-colocations');
    return {
      data: response.data,
      status: response.status,
      message: 'Demandes de colocations récupérées avec succès',
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        error: error.response.data.error || 'Erreur lors de la récupération des demandes de colocations',
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
