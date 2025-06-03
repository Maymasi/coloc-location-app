export default function RecentInquiries() {
    // TODO: Remplacer par un appel API pour récupérer les demandes récentes
    // Endpoint suggéré: GET /api/inquiries/recent?limit=3
    const inquiries = [
        {
            id: 1,
            nom: "Emma Johnson",
            initiale: "E",
            propriete: "Studio Moderne",
            message: "Bonjour, je suis intéressée par votre studio. Est-il toujours disponible pour le semestre d'automne ? J'aimerais programmer une visite si possible.",
            heure: "Aujourd'hui, 10:23",
            statut: "Nouveau",
            estRepondu: false,
            // TODO: Ajouter email et téléphone pour les réponses
            // email: "emma.johnson@example.com",
            // telephone: "+33 6 12 34 56 78"
        },
        {
            id: 2,
            nom: "Michael Chen",
            initiale: "M",
            propriete: "Appartement Spacieux 2 Chambres",
            message: "Bonjour, je cherche un appartement 2 chambres à partager avec mon colocataire. Nous sommes tous les deux étudiants en ingénierie. Cette propriété dispose-t-elle d'Internet haut débit ?",
            heure: "Hier",
            statut: "Répondu",
            estRepondu: true
        },
        {
            id: 3,
            nom: "Sarah Williams",
            initiale: "S",
            propriete: "Maison de Ville Luxueuse 3 Chambres",
            message: "Je suis intéressée par votre maison de ville pour moi et deux autres étudiants en médecine. Nous cherchons un endroit calme proche de l'école de médecine. Le parking est-il inclus ?",
            heure: "Il y a 2 jours",
            statut: "Nouveau",
            estRepondu: false
        }
    ];

    // TODO: Fonction pour gérer les réponses
    // const handleReply = async (inquiryId) => {
    //     // Ouvrir modal de réponse ou rediriger vers page de réponse
    //     // POST /api/inquiries/{id}/reply
    // };

    // TODO: Fonction pour marquer comme lu
    // const handleMarkAsRead = async (inquiryId) => {
    //     // PATCH /api/inquiries/{id}/mark-read
    //     // Mettre à jour le statut local et sur le serveur
    // };

    // TODO: Fonction pour voir toutes les demandes
    // const handleViewAll = () => {
    //     // Rediriger vers /dashboard/inquiries
    // };

    return (
        <div className="recent-inquiries">
            {/* En-tête de la section */}
            <div className="inquiries-header">
                <h2>Demandes Récentes</h2>
                <p>Demandes d'étudiants concernant vos propriétés</p>
            </div>
            
            {/* Liste des demandes */}
            <div className="inquiries-list">
                {inquiries.map((demande) => (
                    <div key={demande.id} className="inquiry-item">
                        {/* Avatar avec initiale */}
                        <div className="inquiry-avatar">
                            {demande.initiale}
                        </div>
                        
                        {/* Contenu principal de la demande */}
                        <div className="inquiry-content">
                            {/* En-tête avec infos et statut */}
                            <div className="inquiry-header">
                                <div className="inquiry-info">
                                    <h4>{demande.nom}</h4>
                                    <p>Concernant : {demande.propriete}</p>
                                </div>
                                <div className="inquiry-meta">
                                    <span className="inquiry-time">{demande.heure}</span>
                                    <span className={`inquiry-status ${demande.statut.toLowerCase().replace('é', 'e')}`}>
                                        {demande.statut}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Message de la demande */}
                            <div className="inquiry-message">
                                {demande.message}
                            </div>
                            
                            {/* Boutons d'action */}
                            <div className="inquiry-actions">
                                <button 
                                    className="reply-btn"
                                    onClick={() => {
                                        // TODO: Implémenter handleReply(demande.id)
                                        console.log('Répondre à la demande:', demande.id);
                                    }}
                                >
                                    Répondre
                                </button>
                                <button 
                                    className="mark-read-btn"
                                    onClick={() => {
                                        // TODO: Implémenter handleMarkAsRead(demande.id)
                                        console.log('Marquer comme lu:', demande.id);
                                    }}
                                >
                                    Marquer comme lu
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Bouton pour voir toutes les demandes */}
            <div className="view-all">
                <button 
                    className="view-all-btn"
                    onClick={() => {
                        // TODO: Implémenter handleViewAll()
                        console.log('Voir toutes les demandes');
                    }}
                >
                    Voir Toutes les Demandes
                </button>
            </div>
        </div>
    );
}