import authAxios from './AuthService';

/**
 * Creer une conversation avec un autre utilisateur
 * @param {int} utilisateurId - L'ID de l'utilisateur avec lequel creer la conversation
 * @return {Promise<Object>} - La conversation creee
 */
export const creerConversation = async (utilisateurId) => {
    try {
        const response = await authAxios.post('/Messages/conversations', {
            utilisateurId,
        });
        return {
            success: true,
            data: response.data,
            Message: 'Conversation creee avec succes',
        };

    }
    catch (error) {
        console.error('Erreur lors de la creation de la conversation:', error);
        if (error.response) {
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors de la creation de la conversation',
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
 * Recuperer les conversations de l'utilisateur
 * @return {Promise<Object>} - Les conversations de l'utilisateur
 * */
export const recupererConversations = async () => {
    try {
        const response = await authAxios.get('/Messages/conversations');
        return {
            success: true,
            data: response.data,
            Message: 'Conversations recuperees avec succes',
        };
    } catch (error) {
        console.error('Erreur lors de la recuperation des conversations:', error);
        if (error.response) {
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors de la recuperation des conversations',
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
 * Recuperer les messages d'une conversation
 * @param {int} conversationId - L'ID de la conversation
 * @return {Promise<Object>} - Les messages de la conversation
 */
export const recupererMessages = async (conversationId) => {
    try {
        const response = await authAxios.get(`/Messages/conversations/${conversationId}/messages`);
        return {
            success: true,
            data: response.data,
            Message: 'Messages recuperees avec succes',
        };
    } catch (error) {
        console.error('Erreur lors de la recuperation des messages:', error);
        if (error.response) {
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors de la recuperation des messages',
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
 * Envoyer un message dans une conversation
 * @param {int} conversationId - L'ID de la conversation
 * @param {string} contenu - Le contenu du message
 * @return {Promise<Object>} - Le message envoye
 */
export const envoyerMessage = async (conversationId, contenu) => {
    try {
        const response = await authAxios.post(`/Messages/conversations/${conversationId}/messages`, {
            contenu,
        });
        return {
            success: true,
            data: response.data,
            Message: 'Message envoye avec succes',
        };
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        if (error.response) {
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors de l\'envoi du message',
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
 * marquer un message comme lu
 * @param {int} conversationId - L'ID de la conversation a supprimer
 * @return {Promise<Object>} - Le resultat de la suppression
 */
export const marquerMessageCommeLu = async (conversationId) => {
    try {
        const response = await authAxios.put(`/Messages/conversations/${conversationId}/read`);
        console.log('Message marque comme lu avec succes:', response.data);
        return {
            success: true,
            data: response.data,
            Message: 'Message marque comme lu avec succes',
        };
    } catch (error) {
        console.error('Erreur lors de la marque du message comme lu:', error);
        if (error.response) {
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors de la marque du message comme lu',
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