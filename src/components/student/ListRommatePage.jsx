import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import RoommateCardRequest from './rommateCardRequest';

export default function ListRommatePage({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;

    // Vérifier si data existe et est un tableau
    if (!data || !Array.isArray(data)) {
        return (
            <div className="roomate-all-page">
                <div style={{
                    textAlign: 'center',
                    padding: '60px 30px',
                    margin: '20px auto',
                    maxWidth: '500px',
                    backgroundColor: 'hsl(6deg 100% 72% / 10%)',
                    borderRadius: '12px',
                    border: '1px solid hsl(6deg 100% 72% / 20%)',
                    boxShadow: '0 4px 6px hsl(6deg 100% 72% / 5%)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'hsl(6deg 100% 72% / 15%)',
                        borderRadius: '50%',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        color: 'hsl(6deg 100% 45%)'
                    }}>
                        ⚠️
                    </div>
                    <h3 style={{
                        marginBottom: '16px',
                        color: 'hsl(6deg 100% 35%)',
                        fontSize: '22px',
                        fontWeight: '600',
                        letterSpacing: '-0.5px'
                    }}>Aucune donnée disponible</h3>
                    <p style={{
                        fontSize: '16px',
                        lineHeight: '1.6',
                        color: 'hsl(6deg 60% 50%)',
                        margin: '0'
                    }}>Les informations sur les colocataires ne sont pas disponibles pour le moment.</p>
                </div>
            </div>
        );
    }

    // Vérifier si le tableau est vide
    if (data.length === 0) {
        return (
            <div className="roomate-all-page">
                <div style={{
                    textAlign: 'center',
                    padding: '60px 30px',
                    margin: '20px auto',
                    maxWidth: '500px',
                    backgroundColor: 'hsl(6deg 100% 72% / 10%)',
                    borderRadius: '12px',
                    border: '1px solid hsl(6deg 100% 72% / 20%)',
                    boxShadow: '0 4px 6px hsl(6deg 100% 72% / 5%)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'hsl(6deg 100% 72% / 15%)',
                        borderRadius: '50%',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        color: 'hsl(6deg 100% 45%)'
                    }}>
                        👥
                    </div>
                    <h3 style={{
                        marginBottom: '16px',
                        color: 'hsl(6deg 100% 35%)',
                        fontSize: '22px',
                        fontWeight: '600',
                        letterSpacing: '-0.5px'
                    }}>Aucun colocataire trouvé</h3>
                    <p style={{
                        fontSize: '16px',
                        lineHeight: '1.6',
                        color: 'hsl(6deg 60% 50%)',
                        margin: '0'
                    }}>Il n'y a actuellement aucune demande de colocataire disponible.</p>
                </div>
            </div>
        );
    }

    // Calculer les cartes à afficher pour la page actuelle
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const totalPages = Math.ceil(data.length / cardsPerPage);

    console.log(data);

    return (
        <div className="roomate-all-page">
            <div className="list-roommate-page">
                {currentCards.map((card) => (
                    <RoommateCardRequest key={card.id} data={card} />
                ))}
            </div>
            
            {/* Afficher la pagination seulement s'il y a plus d'une page */}
            {totalPages > 1 && (
                <div className="pagination">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'hsl(6deg 100% 45%)',
                                borderColor: 'hsl(6deg 100% 72% / 30%)',
                                '&:hover': {
                                    backgroundColor: 'hsl(6deg 100% 72% / 15%)',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'hsl(6deg 100% 72% / 25%)',
                                    color: 'hsl(6deg 100% 35%)',
                                    '&:hover': {
                                        backgroundColor: 'hsl(6deg 100% 72% / 35%)',
                                    }
                                }
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}