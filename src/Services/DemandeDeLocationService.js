import authAxios from "./AuthService";

export const envoyerDemandeLocation = async (demandeData) => {
    try {
        const response = await authAxios.post("/demandesLocation/envoyer", demandeData);
        return {
            success: true,
            message: "Demande de location envoyée avec succès.",
            data: response.data
        };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 409) {
                return {
                    success: false,
                    error: error.response.data.message || "Une  de location existe déjà pour cette annonce.",
                    status: 409
                };
            }
            return {
                success: false,
                error: error.response.data.error || "Erreur lors de l'envoi de la demande de location",
                status: error.response.status
            };
        } else if (error.request) {
            return {
                success: false,
                error: "Erreur de connexion au serveur",
                status: null
            };
        } else {
            return {
                success: false,
                error: "Une erreur inattendue s'est produite",
                status: null
            };
        }
    }
};

