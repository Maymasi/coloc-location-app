import RequestCard from "./RequestCard";
import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { getRoommateRequests } from '../../Services/studentDashboardService'; 

export default function RoommateRequests() {
    const [currentPage, setCurrentPage] = useState(1);
    const [roommateRequests, setRoommateRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 3;
    
    // Fonction pour récupérer les demandes de colocation
    const fetchRoommateRequests = async () => {
        try {
            const result = await getRoommateRequests();
            
            if (result.data) {
                setRoommateRequests(result.data.$values || []);
                setError(null);
            } else {
                setError(result.error || 'Erreur lors du chargement des demandes');
                // En cas d'erreur, garder les données existantes si disponibles
                if (roommateRequests.length === 0) {
                    setRoommateRequests([]);
                }
            }
        } catch (err) {
            setError('Erreur lors du chargement des demandes');
            console.error('Erreur:', err);
            // En cas d'erreur, garder les données existantes si disponibles
            if (roommateRequests.length === 0) {
                setRoommateRequests([]);
            }
        } finally {
            setLoading(false);
        }
    };

    // Hook pour charger les données au montage du composant
    useEffect(() => {
        fetchRoommateRequests();
    }, []);

    // Hook pour la mise à jour automatique toutes les 45 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            fetchRoommateRequests();
        }, 45000); // 45 secondes (un peu plus long car les demandes changent moins souvent)

        return () => clearInterval(interval);
    }, []);

    // Hook pour écouter les changements de focus de l'onglet
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchRoommateRequests();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Fonction pour rafraîchir manuellement les données
    const handleRefresh = () => {
        setLoading(true);
        fetchRoommateRequests();
    };
    
    // Calcul du nombre total de pages
    const totalPages = Math.ceil(roommateRequests.length / itemsPerPage);
    
    // Calcul des indices de début et fin pour la page actuelle
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Récupération des éléments pour la page actuelle
    const currentRequests = roommateRequests.slice(startIndex, endIndex);
    
    // Gestionnaire de changement de page
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Reset de la page si elle devient invalide après mise à jour des données
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [roommateRequests.length, totalPages, currentPage]);
    
    // Affichage du loading initial
    if (loading && roommateRequests.length === 0) {
        return (
            <div className="roommate-requests">
                <div className="head">
                    <h2>Demandes de colocation reçues</h2>
                </div>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p>Chargement des demandes...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="roommate-requests">
            <div className="head">
                <h2>Demandes de colocation reçues</h2>
                <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {error && (
                        <button 
                            onClick={handleRefresh}
                            style={{ 
                                padding: '4px 8px', 
                                fontSize: '12px',
                                cursor: 'pointer',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                        >
                            Réessayer
                        </button>
                    )}
                    <div className="see-all" style={{ width: 'fit-content' }}>
                        Voir Tout
                    </div>
                </div>
            </div>

            {error && (
                <div style={{ 
                    color: '#f44336', 
                    fontSize: '14px', 
                    marginBottom: '10px',
                    padding: '8px',
                    backgroundColor: '#ffebee',
                    borderRadius: '4px',
                    border: '1px solid #ffcdd2'
                }}>
                    {error}
                </div>
            )}
            
            {roommateRequests.length === 0 ? (
                <div style={{ 
                    padding: '40px 20px', 
                    textAlign: 'center',
                    color: '#666',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    margin: '20px 0'
                }}>
                    <p>Aucune demande de colocation pour le moment</p>
                    <p style={{ fontSize: '14px', marginTop: '8px' }}>
                        Les nouvelles demandes apparaîtront ici automatiquement
                    </p>
                </div>
            ) : (
                <>
                    <div className="requests-list">
                        {currentRequests.map((request, index) => (
                            <RequestCard 
                                key={request.id || startIndex + index} 
                                request={request} 
                            />
                        ))}
                    </div>
                    
                    {totalPages > 1 && (
                        <div className="pagination-container" style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            marginTop: '20px', 
                            width: '100%'
                        }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="hsl(210, 100%, 50%)"
                                size="medium"
                            />
                        </div>
                    )}
                </>
            )}

            {loading && roommateRequests.length > 0 && (
                <div style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px',
                    fontSize: '12px',
                    color: '#666',
                    fontStyle: 'italic'
                }}>
                    Mise à jour...
                </div>
            )}
        </div>
    );
}