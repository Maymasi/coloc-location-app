import authAxios from "./AuthService";

/**
 * Envoie une demande de location pour une annonce spécifique.
 * @param {Object} demandeData - Les données de la demande de location.
 * @returns {Promise<Object>} - Un objet contenant le statut de la requête et les
 * données de la réponse ou une erreur.
 * @throws {Error} - Si une erreur se produit lors de l'envoi de la
 * demande de location.
 */
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

/**
 * Récupère toutes les demandes de location reçues par le propriétaire de toutes ses annonces.
 * @returns {Promise<Object>} - Un objet contenant le statut de la requête et les
 * données de la réponse ou une erreur.
 * @throws {Error} - Si une erreur se produit lors de la récupération des demandes
 * de location.
 */
export const GetAllReceivedRequestsLocationOwner = async () => {
    try {
        const response = await authAxios.get("/DemandesLocation/proprietaire/demandes-recues");
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                error: error.response.data.error || "Erreur lors de la récupération des demandes de location",
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
}
/**
 * Accepte ou refuse une demande de location spécifique.
 * @param {string} demandeId - L'ID de la demande de location à accepter ou refuser.
 * @param {string} message - Le message à envoyer avec la réponse .
 * @param {string} action - L'action à effectuer, soit "accepter" soit "refuser
 * @returns {Promise<Object>} - Un objet contenant le statut de la requête et les
 * données de la réponse ou une erreur.
 * @throws {Error} - Si une erreur se produit lors de l'acceptation ou du refus de la demande de location.
 * */
export const accepterOuRefuserDemandeLocation = async (demandeId, messageReponse, nouveauStatus) => {
    try {
        const response = await authAxios.put(`DemandesLocation/changer-status`, {
            demandeId,
            messageReponse,
            nouveauStatus
        });
        return {
            success: true,
            message: `Demande de location ${nouveauStatus === "Accepté" ? "acceptée" : "refusée"} avec succès.`,
            data: response.data
        };
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                error: error.response.data.error || `Erreur lors de l'${nouveauStatus === "Accepté" ? "acceptation" : "refus"} de la demande de location`,
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
}