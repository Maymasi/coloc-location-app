import  authAxios  from './AuthService'; 

export const getUserProfileSummary = async () => {
    try {
        const response = await authAxios.get(`/UserProfile/resume`);
        return {
            data: response.data,
            status: response.status,
            message: 'Résumé du profil utilisateur récupéré avec succès',
        };
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                error: error.response.data.error || 'Erreur lors de la récupération du résumé du profil utilisateur',
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                success: false,
                error: 'Échec de la connexion au serveur',
                status: null,
            };
        } else {
            return {
                success: false,
                error: 'Une erreur inattendue est survenue',
                status: null,
            };
        }
    }
};
