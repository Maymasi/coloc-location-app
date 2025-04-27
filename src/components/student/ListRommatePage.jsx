import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import RoommateCardRequest from './rommateCardRequest';
export default function ListRommatePage({data}) {
    // Données fictives pour les colocataires

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;

    // Calculer les cartes à afficher pour la page actuelle
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    console.log(data)

    return (
        <div className="roomate-all-page">
            <div className="list-roommate-page">
                {currentCards.map((card) => (
                    <RoommateCardRequest key={card.id} data={card} />
                ))}
            </div>
            <div className="pagination">
                <Pagination
                    count={Math.ceil(data.length / cardsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="hsl(6deg 100% 72% / 10%)"
                />
            </div>
        </div>
    );
}