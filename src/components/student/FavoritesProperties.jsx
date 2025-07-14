import FavoritePropCard from "./FavoritePropCard";
import React, { useState, useEffect } from 'react';
import '../../assets/styles/userCss/Favorites.css';
import { Stack, Pagination, CircularProgress, Snackbar, Alert, Typography, Box, Button } from "@mui/material";
import { FavoriteOutlined, RefreshOutlined } from "@mui/icons-material";
import { getStudentFavoritesProperties } from '../../Services/studentFavoritesService'; 

export default function FavoritesProperties() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 3;
    const [onchangeState, setOnchangeState] = useState(false);

    // Fonction pour fermer la snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    // Fonction pour afficher une snackbar
    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    // Fonction pour récupérer les favoris
    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const response = await getStudentFavoritesProperties();
            
            if (response.data) {
                setFavorites(response.data.$values);
                if (response.data.length === 0) {
                    showSnackbar('Aucune propriété favorite trouvée', 'info');
                } 
            } else {
                showSnackbar(response.error || 'Erreur lors de la récupération des favoris', 'error');
            }
        } catch (err) {
            showSnackbar('Une erreur inattendue s\'est produite', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Charger les favoris au montage du composant
    useEffect(() => {
        fetchFavorites();
    }, [onchangeState]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Calculer les cartes à afficher pour la page actuelle
    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentCards = favorites.slice(startIndex, startIndex + cardsPerPage);

    // Affichage du loader
    if (loading) {
        return (
            <div className="favorites-colocataires" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <CircularProgress size={50} />
            </div>
        );
    }

    // Affichage si aucun favori
    if (favorites.length === 0) {
        return (
            <div className="favorites-colocataires">
                <div style={{
                    minHeight: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0px 20px',
                    background: 'linear-gradient(135deg, #fefcfc 0%, #fdf8f8 100%)',
                    borderRadius: '24px',
                    border: '2px solid hsl(6 15% 92%)',
                    position: 'relative',
                    overflow: 'hidden',
                    width:'100%'

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
                            animation: 'propertyFloat 3s ease-in-out infinite'
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
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9,22 9,12 15,12 15,22"/>
                                    <path d="M12 2L12 10M6 6L18 6" stroke="hsl(6 45% 75%)" strokeWidth="1.5" opacity="0.6"/>
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
                            }}>Aucune propriété favorite</h3>
                            <p style={{
                                color: 'hsl(6 15% 45%)',
                                fontSize: '17px',
                                lineHeight: '1.7',
                                marginBottom: '40px',
                                margin: '0 0 40px 0',
                                fontWeight: '400'
                            }}>
                                Vous n'avez pas encore ajouté de propriétés à vos favoris.
                                <br />
                                Commencez à explorer les propriétés disponibles !
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
                                    onClick={() => window.location.href = '/student/properties'}
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
                                    Explorer les propriétés
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Style pour l'animation */}
                    <style jsx>{`
                        @keyframes propertyFloat {
                            0%, 100% { transform: rotate(-5deg) translateY(0px); }
                            50% { transform: rotate(-5deg) translateY(-10px); }
                        }
                    `}</style>
                </div>
                
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </div>
        );
    }

    return (
        <div className="favorites-colocataires">
            {currentCards.map((favorite) => (
                <FavoritePropCard key={favorite.id} favorite={favorite} onchangeState={onchangeState} setOnchangeState={setOnchangeState} />
            ))}
            <Stack spacing={2} sx={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
                <Pagination
                    count={Math.ceil(favorites.length / cardsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    siblingCount={0}
                />
            </Stack>
            
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}