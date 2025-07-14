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
                <div style={{ 
                    padding: '50px 20px', 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, hsl(6, 100%, 72%) 0%, hsl(6, 85%, 65%) 100%)',
                    borderRadius: '12px',
                    margin: '20px 0',
                    boxShadow: '0 6px 20px rgba(255, 99, 99, 0.25)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(255,255,255,0.3)',
                        borderTop: '3px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }}></div>
                    <p style={{ fontSize: '16px', fontWeight: '500', margin: '0' }}>Chargement des demandes...</p>
                    <style jsx>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
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
                                padding: '8px 16px', 
                                fontSize: '14px',
                                cursor: 'pointer',
                                background: 'linear-gradient(135deg, hsl(6, 100%, 72%), hsl(6, 85%, 65%))',
                                color: 'white',
                                border: 'none',
                                borderRadius: '20px',
                                boxShadow: '0 4px 12px rgba(255, 99, 99, 0.3)',
                                transition: 'all 0.3s ease',
                                fontWeight: '500'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 16px rgba(255, 99, 99, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(255, 99, 99, 0.3)';
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
                    color: '#c62828', 
                    fontSize: '14px', 
                    marginBottom: '20px',
                    padding: '14px 18px',
                    background: 'linear-gradient(135deg, #ffebee, #ffcdd2)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 99, 99, 0.3)',
                    boxShadow: '0 2px 8px rgba(255, 99, 99, 0.15)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        height: '100%',
                        width: '4px',
                        background: 'hsl(6, 100%, 72%)',
                        borderRadius: '0 2px 2px 0'
                    }}></div>
                    <div style={{ marginLeft: '10px' }}>
                        ⚠️ {error}
                    </div>
                </div>
            )}
            
            {roommateRequests.length === 0 ? (
                <div style={{ 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px 20px',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgb(254, 247, 240) 0%, rgb(255, 245, 245) 100%)',
                    borderRadius: '16px',
                    border: '2px dashed rgb(255, 186, 179)',
                    margin: '20px 0px',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Geometric decorative elements */}
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255, 186, 179, 0.2)',
                        borderRadius: '8px',
                        transform: 'rotate(45deg)',
                        animation: 'float 4s ease-in-out infinite'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: '30px',
                        width: '24px',
                        height: '24px',
                        background: 'rgba(255, 186, 179, 0.15)',
                        borderRadius: '50%',
                        animation: 'float 3s ease-in-out infinite reverse'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '20px',
                        width: '16px',
                        height: '16px',
                        background: 'rgba(255, 186, 179, 0.1)',
                        borderRadius: '2px',
                        transform: 'translateY(-50%) rotate(30deg)',
                        animation: 'float 5s ease-in-out infinite'
                    }}></div>
                    
                    {/* Main content */}
                    <div style={{
                        position: 'relative',
                        zIndex: '1'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'rgba(255, 186, 179, 0.2)',
                            borderRadius: '50%',
                            margin: '0 auto 24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '36px',
                            border: '2px solid rgba(255, 186, 179, 0.3)'
                        }}>
                            🏠
                        </div>
                        
                        <h3 style={{ 
                            color: 'hsl(6, 100%, 72%)',
                            fontSize: '24px',
                            fontWeight: '600',
                            margin: '0 0 12px 0'
                        }}>
                            Aucune demande de colocation
                        </h3>
                        
                        <p style={{ 
                            color: 'rgba(255, 99, 99, 0.8)',
                            fontSize: '15px',
                            lineHeight: '1.5',
                            margin: '0 0 28px 0',
                            maxWidth: '350px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            Les nouvelles demandes apparaîtront ici automatiquement. 
                            Vous serez notifié dès qu'une demande vous sera adressée.
                        </p>
                        
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'rgba(255, 186, 179, 0.2)',
                            padding: '10px 20px',
                            borderRadius: '25px',
                            border: '1px solid rgba(255, 186, 179, 0.3)'
                        }}>
                            <div style={{
                                width: '6px',
                                height: '6px',
                                background: '#10b981',
                                borderRadius: '50%',
                                animation: 'pulse 2s infinite'
                            }}></div>
                            <span style={{ 
                                color: 'hsl(6, 100%, 72%)',
                                fontSize: '13px',
                                fontWeight: '500'
                            }}>
                                Mise à jour automatique
                            </span>
                        </div>
                    </div>
                    
                    <style jsx>{`
                        @keyframes float {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-15px); }
                        }
                        
                        @keyframes pulse {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.5; }
                        }
                    `}</style>
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
                    fontStyle: 'italic',
                    background: 'rgba(255,255,255,0.9)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        border: '2px solid #f3f3f3',
                        borderTop: '2px solid #666',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    Mise à jour...
                </div>
            )}
        </div>
    );
}