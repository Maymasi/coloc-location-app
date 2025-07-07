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
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        minHeight: '300px',
                        textAlign: 'center',
                        padding: 3,
                        width: '100%',

                    }}
                >
                    <FavoriteOutlined sx={{ fontSize: 80, color: '#ddd', marginBottom: 2 }} />
                    <Typography variant="h6" sx={{ marginBottom: 1, color: '#666' }}>
                        Aucune propriété favorite
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 3, color: '#999' }}>
                        Vous n'avez pas encore ajouté de propriétés à vos favoris.
                        Commencez à explorer les propriétés disponibles !
                    </Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<RefreshOutlined />}
                        onClick={fetchFavorites}
                        sx={{ marginTop: 2,backgroundColor:'hsl(6 100% 72%)' }}
                    >
                        Actualiser
                    </Button>
                </Box>
                
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