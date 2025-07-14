import React, { useState, useEffect } from 'react';
import { Trash2, Dot, MapPin, AlertCircle, Heart, X } from "lucide-react";
import { getStudentFavoritesProperties, removeFavoriteColocation } from '../../Services/studentFavoritesService';

function truncateString(str, maxLength) {
    if (typeof str !== 'string') {
        return '';
    }
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '...';
}

// Composant Modal de Confirmation
const ConfirmationModal = ({ isOpen, onClose, onConfirm, propertyTitle }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '24px',
                maxWidth: '400px',
                width: '90%',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h3 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1f2937'
                    }}>
                        Confirmer la suppression
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            color: '#6b7280'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <p style={{
                    margin: '0 0 20px 0',
                    color: '#4b5563',
                    fontSize: '14px',
                    lineHeight: '1.5'
                }}>
                    Êtes-vous sûr de vouloir supprimer "<strong>{truncateString(propertyTitle, 40)}</strong>" de vos favoris ?
                </p>
                
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            color: '#374151',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '6px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

// Composant Snack Bar
const SnackBar = ({ message, type, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const getSnackBarStyle = () => {
        const baseStyle = {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 16px',
            borderRadius: '6px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            animation: 'slideIn 0.3s ease-out'
        };

        switch (type) {
            case 'success':
                return { ...baseStyle, backgroundColor: '#10b981' };
            case 'error':
                return { ...baseStyle, backgroundColor: '#ef4444' };
            case 'warning':
                return { ...baseStyle, backgroundColor: '#f59e0b' };
            default:
                return { ...baseStyle, backgroundColor: '#6b7280' };
        }
    };

    return (
        <div style={getSnackBarStyle()}>
            <AlertCircle size={16} />
            <span>{message}</span>
            <button 
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '0 4px',
                    fontSize: '16px'
                }}
            >
                ×
            </button>
        </div>
    );
};

// Composant Empty State amélioré avec la couleur spécifiée
const EmptyState = () => (
    <div style={{
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #fef7f0 0%, #fff5f5 100%)',
        borderRadius: '16px',
        border: '2px dashed hsl(6 100% 85%)',
        margin: '20px 0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }}>
        <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, hsl(6 100% 72%) 0%, hsl(6 100% 80%) 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                width: '80px',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                top: '10px',
                left: '10px'
            }} />
            <Heart size={50} style={{ color: 'white', zIndex: 1 }} />
        </div>
        
        <h3 style={{ 
            margin: '0 0 12px 0', 
            fontSize: '24px', 
            fontWeight: '700',
            color: '#1f2937',
            background: 'linear-gradient(135deg, hsl(6 100% 72%) 0%, hsl(6 100% 65%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        }}>
            Aucun favori pour le moment
        </h3>
        
        <p style={{ 
            margin: '0 0 32px 0', 
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.6',
            maxWidth: '450px'
        }}>
            Vous n'avez pas encore ajouté de propriétés à vos favoris. Explorez nos offres et cliquez sur le cœur pour sauvegarder vos coups de cœur !
        </p>
        
        <button style={{
            padding: '14px 32px',
            background: 'linear-gradient(135deg, hsl(6 100% 72%) 0%, hsl(6 100% 65%) 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease',
            transform: 'translateY(0)'
        }}
        onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        >
            Découvrir les propriétés
        </button>
    </div>
);

// Composant Loading
const LoadingSpinner = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px'
    }}>
        <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid hsl(6 100% 72%)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }}></div>
    </div>
);

export default function RecommededHome() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        propertyId: null,
        propertyTitle: ''
    });
    const [snackBar, setSnackBar] = useState({
        message: '',
        type: 'success',
        isVisible: false
    });

    const showSnackBar = (message, type = 'success') => {
        setSnackBar({
            message,
            type,
            isVisible: true
        });
    };

    const hideSnackBar = () => {
        setSnackBar(prev => ({ ...prev, isVisible: false }));
    };

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const result = await getStudentFavoritesProperties();
            
            if (result.success === false) {
                showSnackBar(result.error || 'Erreur lors du chargement des favoris', 'error');
                setFavorites([]);
            } else {
                // Gestion correcte de la structure de données de l'API
                const favoritesData = result.data?.$values || result.data || [];
                setFavorites(favoritesData);
                
                // Pas de message de succès si la liste est vide
                if (favoritesData.length > 0 && result.message) {
                    showSnackBar(result.message, 'success');
                }
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris:', error);
            showSnackBar('Erreur lors du chargement des favoris', 'error');
            setFavorites([]);
        } finally {
            setLoading(false);
        }
    };

    const openConfirmModal = (propertyId, propertyTitle) => {
        setConfirmModal({
            isOpen: true,
            propertyId,
            propertyTitle
        });
    };

    const closeConfirmModal = () => {
        setConfirmModal({
            isOpen: false,
            propertyId: null,
            propertyTitle: ''
        });
    };

    const handleRemoveFavorite = async () => {
        try {
            const result = await removeFavoriteColocation(confirmModal.propertyId, "propriete");
            
            if (result.success === false) {
                showSnackBar(result.error || 'Erreur lors de la suppression', 'error');
            } else {
                showSnackBar(result.message || 'Propriété supprimée des favoris', 'success');
                // Mettre à jour la liste locale
                setFavorites(prev => prev.filter(fav => fav.id !== confirmModal.propertyId));
            }
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            showSnackBar('Erreur lors de la suppression', 'error');
        } finally {
            closeConfirmModal();
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <>
            <style>
                {`
                    @keyframes slideIn {
                        from {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                    
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            
            <div className="recommended-home-title">
                <div className="see-all" style={{ marginBottom: "20px", width: 'fit-content' }}>
                    Mes Favoris
                </div>
                
                <div className="all-recommended-home">
                    {loading ? (
                        <LoadingSpinner />
                    ) : favorites.length === 0 ? (
                        <EmptyState />
                    ) : (
                        favorites.map((home) => (
                            <div className="recommended-home" key={home.id}>
                                <div className="image" style={{ backgroundImage: `url('${home.image}')` }}>
                                    <div className="info">
                                        <div className="type">{home.type}</div>
                                        <div 
                                            className="favorite"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => openConfirmModal(home.id, home.titre || home.title)}
                                        >
                                            <Trash2 size={18} strokeWidth={2.4} />
                                        </div>
                                    </div>
                                </div>
                                <div className="description">
                                    <div className="title-price">
                                        <div className="title">
                                            {truncateString(home.titre || home.title, 30)}
                                        </div>
                                        <div className="price">{home.prix}Dhs/mois</div>
                                    </div>
                                    <div className="location">
                                        <MapPin size={20} className="icon" />
                                        <div>{truncateString(home.location, 40)}</div>
                                    </div>
                                    <div className="details">
                                        <div className="rooms">
                                            <div>{home.chambres} Chambres</div>
                                            <Dot strokeWidth={4} />
                                            <div>{home.bathrooms} Salle de bain</div>
                                        </div>
                                        <div className="available">
                                            {home.state === 'Active' ? 'Active' : 'Non disponible'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={closeConfirmModal}
                onConfirm={handleRemoveFavorite}
                propertyTitle={confirmModal.propertyTitle}
            />

            <SnackBar
                message={snackBar.message}
                type={snackBar.type}
                isVisible={snackBar.isVisible}
                onClose={hideSnackBar}
            />
        </>
    );
}