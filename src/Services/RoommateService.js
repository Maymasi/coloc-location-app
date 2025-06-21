import authAxios from './AuthService';
 /**
   * Créer une nouvelle demande/offre de colocation
   * @param {Object} colocData - Les données de la colocation
   * @param {string} colocData.adresse - L'adresse complète
   * @param {number} colocData.budget - Le budget en MAD
   * @param {number} colocData.type - Type de demande (1 = demande, 0 = offre)
   * @param {string} colocData.dateDebutDisponibilite - Date de disponibilité au format ISO
   * @param {string[]} colocData.preferences - Tableau des préférences
   * @returns {Promise} - Promesse contenant la réponse de l'API
   */
  export async function  createRoommateRequest(colocData) {
    try {
      const response = await authAxios.post('/Colocation/create', colocData);
      return {
        success: true,
        data: response.data,
        message: 'Demande de colocation créée avec succès'
      };
    } catch (error) {
      console.error('Erreur lors de la création de la demande:', error);
      
      // Gestion des différents types d'erreurs
      if (error.response) {
        // Erreur de réponse du serveur
        return {
          success: false,
          error: error.response.data?.message || 'Erreur lors de la création de la demande',
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
   * Transformer les données du formulaire au format attendu par l'API
   * @param {Object} formData - Données du formulaire
   * @returns {Object} - Données formatées pour l'API
   */
  export function formatDataForAPI(formData) {
    return {
      adresse: `${formData.quartier}, ${formData.ville}`,
      budget: Number(formData.budget),
      type: formData.type === 'demande' ? 1 : 0, // 1 = demande, 2 = offre
      dateDebutDisponibilite: new Date(formData.dateDebutDisponibilite).toISOString(),
      preferences: formData.preferences || []
    };
  }

  /**
   * Récupérer les demandes/offres de colocation
   * @returns {Promise} - Promesse contenant la liste des colocations
   */
export async function getRoommateRequests() {
    try {
        const response = await authAxios.get('/Recommendation/colocations');
                console.log('Liste des colocations récupérée avec succès:', response.data);

        return {
        success: true,
        data: response.data,
        message: 'Liste des colocations récupérée avec succès'
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des colocations:', error);
        
        // Gestion des différents types d'erreurs
        if (error.response) {
        // Erreur de réponse du serveur
        return {
            success: false,
            error: error.response.data?.message || 'Erreur lors de la récupération des colocations',
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