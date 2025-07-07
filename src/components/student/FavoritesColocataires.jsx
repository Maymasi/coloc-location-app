import { useState, useEffect } from "react";
import FavoriteColocCard from "./FavoriteColocCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { getStudentFavoritesColocations } from "../../Services/studentFavoritesService"; 

export default function FavoritesColocataires() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [onchangeState, setOnchangeState] = useState(false); // Pour forcer la mise à jour de la liste
    
    const cardsPerPage = 3; // Nombre de cartes à afficher par page

    // Fonction pour récupérer les colocations favorites
    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const response = await getStudentFavoritesColocations();
            
            if (response.success === false) {
                setError(response.error);
                setFavorites([]);
            } else {
                setFavorites(response.data.$values || []);
                setError(null);
            }
        } catch (err) {
            setError("Une erreur inattendue s'est produite");
            setFavorites([]);
        } finally {
            setLoading(false);
        }
    };

    // Charger les données au montage du composant
    useEffect(() => {
        fetchFavorites();
    }, [onchangeState]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Calculate the cards to display for the current page
    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentCards = favorites.slice(startIndex, startIndex + cardsPerPage);

    // Affichage pendant le chargement
    if (loading) {
        return (
            <div className="favorites-colocataires">
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    Chargement des colocations favorites...
                </div>
            </div>
        );
    }

    // Affichage en cas d'erreur
    if (error) {
        return (
            <div className="favorites-colocataires">
                <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                    <p>Erreur : {error}</p>
                    <button onClick={fetchFavorites} style={{ marginTop: '10px', padding: '8px 16px' }}>
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

 // Affichage quand il n'y a pas de favoris
    if (favorites.length === 0) {
        return (
            <div className="favorites-colocataires" style={{
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                borderRadius: '16px',
                border: '1px solid #fecaca'
            }}>
                <div style={{
                    textAlign: 'center',
                    maxWidth: '480px',
                    padding: '40px 20px',
                
                }}>
                    <div style={{
                        marginBottom: '24px',
                        animation: 'pulse 2s infinite'
                    }}>
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="hsl(6 100% 72%)" strokeWidth="1.5" style={{opacity: 0.8}}>
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </div>
                    <div>
                        <h3 style={{
                            color: '#7c2d12',
                            fontSize: '24px',
                            fontWeight: '600',
                            marginBottom: '12px',
                            marginTop: '0'
                        }}>Aucune colocation favorite</h3>
                        <p style={{
                            color: '#a16207',
                            fontSize: '16px',
                            lineHeight: '1.6',
                            marginBottom: '32px',
                            margin: '0 0 32px 0'
                        }}>
                            Vous n'avez pas encore ajouté de colocations à vos favoris.
                            Explorez nos annonces et cliquez sur le cœur pour les sauvegarder ici !
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <button 
                                onClick={fetchFavorites} 
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 20px',
                                    background: '#fef2f2',
                                    border: '1px solid hsl(6 100% 72%)',
                                    borderRadius: '10px',
                                    color: '#7c2d12',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    ':hover': {
                                        background: '#fee2e2',
                                        transform: 'translateY(-1px)'
                                    }
                                }}
                                aria-label="Actualiser les favoris"
                                onMouseOver={(e) => {
                                    e.target.style.background = '#fee2e2';
                                    e.target.style.transform = 'translateY(-1px)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = '#fef2f2';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M1 4v6h6"/>
                                    <path d="M23 20v-6h-6"/>
                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                </svg>
                                Actualiser
                            </button>
                            <button 
                                onClick={() => window.location.href = '/student/colocations'} 
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 20px',
                                    background: `linear-gradient(135deg, hsl(6 100% 72%) 0%, hsl(6 100% 65%) 100%)`,
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = `linear-gradient(135deg, hsl(6 100% 65%) 0%, hsl(6 100% 58%) 100%)`;
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.4)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = `linear-gradient(135deg, hsl(6 100% 72%) 0%, hsl(6 100% 65%) 100%)`;
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.3)';
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9,22 9,12 15,12 15,22"/>
                                </svg>
                                Parcourir les colocations
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-colocataires">
            {currentCards.map((favorite) => (
                <FavoriteColocCard key={favorite.id} favorite={favorite} onchangeState={onchangeState} setOnchangeState={setOnchangeState} />
            ))}
            
            {/* Pagination seulement si on a plus d'une page */}
            {Math.ceil(favorites.length / cardsPerPage) > 1 && (
                <Stack spacing={2} sx={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
                    <Pagination
                        count={Math.ceil(favorites.length / cardsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        siblingCount={0}
                    />
                </Stack>
            )}
        </div>
    );
}