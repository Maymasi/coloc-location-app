import React, { useState, useEffect } from 'react';
import { getRecentInquiries } from '../../Services/DashboardOwnerService'; 
import { useNavigate } from 'react-router-dom';

export default function RecentInquiries() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    // Fonction pour récupérer les demandes récentes
    const fetchRecentInquiries = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const result = await getRecentInquiries(3);
            
            if (result.success) {
                setInquiries(result.data.$values);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Une erreur inattendue s\'est produite');
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    };

    // Charger les demandes au montage du composant
    useEffect(() => {
        fetchRecentInquiries();
    }, []);

    const handleViewAll = () => {
        // Rediriger vers la page des demandes reçues
       navigate('/owner/OwnerDemandesRecus');
    };



    if (loading) {
        return (
            <div className="recent-inquiries">
                <div className="inquiries-header">
                    <h2>Demandes Récentes</h2>
                    <p>Chargement des demandes...</p>
                </div>
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="recent-inquiries">
                <div className="inquiries-header">
                    <h2>Demandes Récentes</h2>
                    <p className="error-message">Erreur : {error}</p>
                </div>
                <div className="error-actions">
                    <button onClick={fetchRecentInquiries} className="retry-btn">
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="recent-inquiries">
            {/* En-tête de la section */}
            <div className="inquiries-header">
                <h2>Demandes Récentes</h2>
                <p>Demandes d'étudiants concernant vos propriétés</p>
            </div>
            
            {/* Liste des demandes */}
            <div className="inquiries-list">
                {inquiries.length === 0 ? (
                    <div className="no-inquiries">
                        <div className="no-inquiries-icon">📧</div>
                        <h3>Aucune demande récente</h3>
                        <p>Vous n'avez pas encore reçu de demandes pour vos propriétés.</p>
                    </div>
                ) : (
                    inquiries.map((demande) => (
                        <div key={demande.id} className="inquiry-item">
                            {/* Avatar avec initiale */}
                            <div className="inquiry-avatar">
                                {demande.initialeEtudiant}
                            </div>
                            
                            {/* Contenu principal de la demande */}
                            <div className="inquiry-content">
                                {/* En-tête avec infos et statut */}
                                <div className="inquiry-header">
                                    <div className="inquiry-info">
                                        <h4>{demande.nomEtudiant}</h4>
                                        <p>Concernant : {demande.titrePropriete}</p>
                                    </div>
                                    <div className="inquiry-meta">
                                        <span className="inquiry-time">{demande.heureAffichage}</span>
                                        <span className={`inquiry-status ${demande.statut.toLowerCase().replace('é', 'e')}`}>
                                            {demande.statut}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Message de la demande */}
                                <div className="inquiry-message">
                                    {demande.message || "Aucun message spécifique"}
                                </div>
                                
                              
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            {/* Bouton pour voir toutes les demandes */}
            <div className="view-all">
                <button 
                    className="view-all-btn"
                    onClick={handleViewAll}
                >
                    Voir Toutes les Demandes
                </button>
            </div>
        </div>
    );
}