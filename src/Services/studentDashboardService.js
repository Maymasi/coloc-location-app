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