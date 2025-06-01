import RequestCard from "./RequestCard";
import React, { useState } from "react";
import { Pagination } from "@mui/material";

export default function RoommateRequests({ roommateRequests }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    
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
    
    return (
        <div className="roommate-requests">
            <div className="head">
                <h2>Roommate Requests</h2>
                <div className="see-all" style={{ width: 'fit-content' }}>
                    Voir Tout
                </div>
            </div>
            
            <div className="requests-list">
                {currentRequests.map((request, index) => (
                    <RequestCard key={startIndex + index} request={request} />
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
                        color="hsl(6 100% 72%)"
                        size="medium"
                        
                        
                    />
                </div>
            )}
        </div>
    );
}