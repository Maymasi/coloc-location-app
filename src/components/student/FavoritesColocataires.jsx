import { useState } from "react";
import FavoriteColocCard from "./FavoriteColocCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

export default function FavoritesColocataires() {
    const favorites = [
        { id: 1, name: "Oussama Nouhar", school: "Ensa Safi", budget: 299, moveInDate: "2023-10-01", preferredZone: "Centre Ville" },
        { id: 2, name: "Sarah El Amrani", school: "Ensa Marrakech", budget: 500, moveInDate: "2023-11-15", preferredZone: "Gueliz" },
        { id: 3, name: "Youssef Benali", school: "Ensa Casablanca", budget: 700, moveInDate: "2023-12-01", preferredZone: "Maarif" },
        { id: 4, name: "Amine Lahlou", school: "Ensa Rabat", budget: 450, moveInDate: "2023-09-20", preferredZone: "Agdal" },
        { id: 5, name: "Fatima Zahra", school: "Ensa Fès", budget: 600, moveInDate: "2023-10-10", preferredZone: "Centre Ville" },
    ]; // Example data

    const cardsPerPage = 3; // Number of cards per page
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Calculate the cards to display for the current page
    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentCards = favorites.slice(startIndex, startIndex + cardsPerPage);

    return (
        <div className="favorites-colocataires">
            {currentCards.map((favorite) => (
                <FavoriteColocCard key={favorite.id} favorite={favorite} />
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
