import FavoritePropCard from "./FavoritePropCard";
import React, { useState } from 'react';
import '../../assets/styles/userCss/Favorites.css';
import { Stack, Pagination } from "@mui/material";

export default function FavoritesProperties() {
    const favorites = [
        { id: 1, title: "Studio propre à Marrakech", type: "Studio", price: 800, location: "Marrakech", bathrooms: 2, chambres: 2, state: "Disponible",image: "/src/assets/images/home.jpg" },
        { id: 2, title: "Appartement centre ville", type: "Appartement", price: 1700, location: "Casablanca", bathrooms: 2, chambres: 3, state: "Disponible" ,image: "/src/assets/images/fallback.jpg" },
        { id: 3, title: "Studio à agdal Rabat", type: "Studio", price: 1500, location: "Rabat", bathrooms: 3, chambres: 4, state: "Indisponible" ,image: "/src/assets/images/maison-moderne-46517595.webp" },
        { id: 4, title: "Appartement 4", type: "Studio", price: 400, location: "Fès", bathrooms: 1, chambres: 1, state: "Disponible" },
        { id: 5, title: "Appartement 5", type: "Appartement", price: 600, location: "Tanger", bathrooms: 1, chambres: 2, state: "Disponible" },
        { id: 6, title: "Appartement 6", type: "Studio", price: 450, location: "Agadir", bathrooms: 1, chambres: 1, state: "Indisponible" },
        { id: 7, title: "Appartement 7", type: "Appartement", price: 800, location: "Meknès", bathrooms: 2, chambres: 3, state: "Disponible" },
        { id: 8, title: "Appartement 8", type: "Villa", price: 2000, location: "Oujda", bathrooms: 4, chambres: 5, state: "Disponible" },
        { id: 9, title: "Appartement 9", type: "Studio", price: 350, location: "Essaouira", bathrooms: 1, chambres: 1, state: "Disponible" },
        { id: 10, title: "Appartement 10", type: "Appartement", price: 750, location: "Tétouan", bathrooms: 2, chambres: 2, state: "Indisponible" },
    ]; // Exemple de données
    const cardsPerPage = 3; // Nombre de cartes par page
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Calculer les cartes à afficher pour la page actuelle
    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentCards = favorites.slice(startIndex, startIndex + cardsPerPage);

    return (
        <div className="favorites-colocataires">
            {currentCards.map((favorite) => (
                <FavoritePropCard key={favorite.id} favorite={favorite} />
            ))}
            <Stack spacing={2} sx={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
                <Pagination
                    count={Math.ceil(favorites.length / cardsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    siblingCount={0}
                />
            </Stack>
        </div>
    );
}
