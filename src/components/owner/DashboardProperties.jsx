import React, { useState, useEffect } from 'react';
import DashboardCardProperty from './DashboardCardProperty';
import AddPropertyCard from './AddPropertyCard';
import { getOwnerProperties } from '../../Services/DashboardOwnerService';

export default function DashboardProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(6); // 6 propriétés par page (incluant la carte "Ajouter")

    useEffect(() => {
        loadProperties();
    }, []);

    // Auto-refresh toutes les 30 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            loadProperties();
        }, 90000); // 90 secondes

        // Nettoyage de l'interval lors du démontage du composant
        return () => clearInterval(interval);
    }, []);

    const loadProperties = async () => {
        try {
            setLoading(true);
            const response = await getOwnerProperties();
            
            if (response.success) {
                setProperties(response.data.$values);
                setError(null);
            } else {
                setError(response.error || 'Erreur lors du chargement des propriétés');
            }
        } catch (err) {
            setError('Une erreur inattendue s\'est produite');
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    };

    // Calcul de la pagination
    const indexOfLastProperty = currentPage * (propertiesPerPage - 1); // -1 pour la carte "Ajouter"
    const indexOfFirstProperty = indexOfLastProperty - (propertiesPerPage - 1);
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(properties.length / (propertiesPerPage - 1));

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-properties">
                <div className="loading-message">
                    <p>Chargement des propriétés...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-properties">
                <div className="error-message">
                    <p>Erreur: {error}</p>
                    <button onClick={loadProperties} className="btn-retry">
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

  if (properties.length === 0) {
    return (
        <div className="dashboard-properties">
            <AddPropertyCard />
        </div>
    );
}

    return (
        <div className="dashboard-properties">
            
                {currentProperties.map((property) => (
                    <DashboardCardProperty 
                        key={property.id} 
                        property={property} 
                    />
                ))}
                <AddPropertyCard />
            
            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={prevPage} 
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        Précédent
                    </button>
                    
                    <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    
                    <button 
                        onClick={nextPage} 
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Suivant
                    </button>
                </div>
            )}
        </div>
    );
}