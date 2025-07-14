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
                minHeight: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px',
                background: 'linear-gradient(135deg, #fefcfc 0%, #fdf8f8 100%)',
                borderRadius: '24px',
                border: '2px solid hsl(6 15% 92%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Motif de fond subtil */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    background: `
                        radial-gradient(circle at 20% 80%, hsl(6 40% 85% / 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, hsl(6 60% 80% / 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, hsl(6 30% 90% / 0.06) 0%, transparent 50%)
                    `,
                    zIndex: 1
                }}></div>
                
                <div style={{
                    textAlign: 'center',
                    maxWidth: '500px',
                    padding: '50px 30px',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <div style={{
                        marginBottom: '32px',
                        animation: 'heartFloat 3s ease-in-out infinite'
                    }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '20px',
                            background: 'linear-gradient(135deg, hsl(6 25% 97%) 0%, hsl(6 20% 95%) 100%)',
                            borderRadius: '50%',
                            border: '3px solid hsl(6 50% 85%)',
                            transform: 'rotate(-5deg)'
                        }}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="hsl(6 70% 65%)" strokeWidth="2" style={{display: 'block'}}>
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                <path d="M12 8v8M8 12h8" stroke="hsl(6 45% 75%)" strokeWidth="1.5" opacity="0.6"/>
                            </svg>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style={{
                            color: '#2d1b1b',
                            fontSize: '28px',
                            fontWeight: '700',
                            marginBottom: '16px',
                            marginTop: '0',
                            letterSpacing: '-0.02em'
                        }}>Aucune colocation favorite</h3>
                        <p style={{
                            color: 'hsl(6 15% 45%)',
                            fontSize: '17px',
                            lineHeight: '1.7',
                            marginBottom: '40px',
                            margin: '0 0 40px 0',
                            fontWeight: '400'
                        }}>
                            Vous n'avez pas encore ajouté de colocations à vos favoris.
                            <br />
                            Explorez nos annonces et cliquez sur le cœur pour les sauvegarder ici !
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            gap: '16px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <button 
                                onClick={fetchFavorites} 
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '14px 24px',
                                    background: '#ffffff',
                                    border: '2px solid hsl(6 25% 85%)',
                                    borderRadius: '16px',
                                    color: 'hsl(6 20% 40%)',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    outline: 'none'
                                }}
                                aria-label="Actualiser les favoris"
                                onMouseOver={(e) => {
                                    e.target.style.background = 'hsl(6 30% 98%)';
                                    e.target.style.borderColor = 'hsl(6 35% 75%)';
                                    e.target.style.transform = 'translateY(-2px) scale(1.02)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = '#ffffff';
                                    e.target.style.borderColor = 'hsl(6 25% 85%)';
                                    e.target.style.transform = 'translateY(0) scale(1)';
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
                                    gap: '10px',
                                    padding: '14px 28px',
                                    background: 'linear-gradient(135deg, hsl(6 100% 72%) 0%, hsl(6 100% 68%) 100%)',
                                    border: 'none',
                                    borderRadius: '16px',
                                    color: 'white',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    outline: 'none'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = 'linear-gradient(135deg, hsl(6 100% 68%) 0%, hsl(6 100% 64%) 100%)';
                                    e.target.style.transform = 'translateY(-2px) scale(1.02)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = 'linear-gradient(135deg, hsl(6 100% 72%) 0%, hsl(6 100% 68%) 100%)';
                                    e.target.style.transform = 'translateY(0) scale(1)';
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9,22 9,12 15,12 15,22"/>
                                </svg>
                                Parcourir les colocations
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Style pour l'animation */}
                <style jsx>{`
                    @keyframes heartFloat {
                        0%, 100% { transform: rotate(-5deg) translateY(0px); }
                        50% { transform: rotate(-5deg) translateY(-10px); }
                    }
                `}</style>
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