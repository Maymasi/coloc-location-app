import authAxios from './AuthService';

/**
 * Récupère les statistiques du propriétaire (messages non lus, demandes en attente, etc.)
 * @returns {Promise<Object>} - Résultat de la requête avec statut de succès ou d'erreur
 */
export async function getOwnerStats() {
  try {
    const response = await authAxios.get('/OwnerStats');
    console.log('Statistiques récupérées avec succès :', response.data);

    return {
      success: true,
      data: response.data,
      message: 'Statistiques récupérées avec succès'
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error);

    if (error.response) {
      // Erreur côté serveur
      return {
        success: false,
        error: error.response.data?.message || 'Erreur lors de la récupération des statistiques',
        status: error.response.status
      };
    } else if (error.request) {
      // Pas de réponse du serveur
      return {
        success: false,
        error: 'Pas de réponse du serveur',
        status: null
      };
    } else {
      // Erreur autre
      return {
        success: false,
        error: 'Erreur inconnue',
        status: null
      };
    }
  }
}
