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
          error: error.response.data.error || 'Erreur lors de la création de la demande',
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
            error: error.response.data.error || 'Erreur lors de la récupération des colocations',
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
  * filter les demandes/offres de colocation par budget et par preferences
  * @param {number} budget - Budget maximum
  * @param {Array} preferences - Tableau des préférences
  * @returns {Array} - Liste filtrée des colocations
  */
export async function filterRoommateRequests(budget, preferences) {
    try {
        const response = await authAxios.post('/Colocation/filtrer', {
            budgetMax: budget,
            preferences: preferences
        });
        
        return {
            success: true,
            data: response.data,
            message: 'Colocations filtrées avec succès'
        };
    } catch (error) {
        console.error('Erreur lors du filtrage des colocations:', error);
        if (error.response) {
            // Erreur de réponse du serveur
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors du filtrage des colocations',
                status: error.response.status
            };
        } else if (error.request) {
            // Erreur de réseau
            console.error('Erreur de connexion au serveur:', error);
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
 * postuler une demande de colocation
 * @param {string} colocId - ID de la colocation
 * @param {string} Budget - Budget proposé
 * @param {string} message - Message de la candidature
 * @param {string} DateEmmenagement - Date d'emménagement souhaitée
 * @param {string} preferences - Préférences de colocation
 * @param {string} address - Adresse de la colocation
 * @returns {Promise} - Promesse contenant la réponse de l'API
  */
export async function applyForRoommate(colocId, Budget, message, DateEmmenagement, preferences, address) {
    try {
        const response = await authAxios.post('/Colocation/postuler', {
            ColocationId: colocId,
            budget: Budget,
            message,
            dateEmmenagement: new Date(DateEmmenagement).toISOString(),
            preferences,
            Adresse: address
        });
        
        return {
            success: true,
            data: response.data,
            message: 'Candidature postée avec succès'
        };
    } catch (error) {
        console.error('Erreur lors de la candidature à la colocation:', error);
        
        if (error.response) {
            // Erreur de réponse du serveur
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors de la candidature',
                status: error.status
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
 * Récupérer  mes demandes  de colocation par ID
 * @returns {Promise} - Promesse contenant la liste des colocations
 */
export async function getMyRoommateRequests() {
    try {
        const response = await authAxios.get('/Colocation/mes-demandes');
        console.log('Liste de mes colocations récupérée avec succès:', response.data);

        return {
            success: true,
            data: response.data,
            message: 'Liste de mes colocations récupérée avec succès'
        };
    } catch (error) {
        console.error('Erreur lors de la récupération de mes colocations:', error);
        
        // Gestion des différents types d'erreurs
        if (error.response) {
            // Erreur de réponse du serveur
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors de la récupération de mes colocations',
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
 * ANNULE une demande de colocation
 * @param {string} demandeId - ID de la colocation
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export async function cancelRoommateRequest(demandeId) {
    try {
        const response = await authAxios.delete('/Colocation/annuler-demande', {
            data: { demandeId }
        });

        return {
            success: true,
            data: response.data,
            message: 'Demande de colocation annulée avec succès'
        };
    } catch (error) {
        console.error('Erreur lors de l\'annulation de la demande de colocation:', error);
        
        if (error.response) {
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors de l\'annulation de la demande',
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
 * Les demades de colacation recues par l'utilisateur pour ses offres ou ses demandes
 * @returns {Promise} - Promesse contenant la liste des demandes de colocation
 */
export async function getReceivedRoommateRequests() {
    try {
        const response = await authAxios.get('/Colocation/demandes-recues');
        console.log('Liste des demandes de colocation reçues:', response.data);

        return {
            success: true,
            data: response.data,
            message: 'Liste des demandes de colocation reçues récupérée avec succès'
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes de colocation reçues:', error);
        
        if (error.response) {
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors de la récupération des demandes de colocation reçues',
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
