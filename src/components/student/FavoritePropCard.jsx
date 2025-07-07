import React from 'react';
import { MapPin, Dot, Trash2, MessageSquare } from 'lucide-react';
import '../../assets/styles/userCss/Favorites.css';
import '../../assets/styles/userCss/dashbordStudent.css';
import {RemoveFavorisAnnonce} from '../../Services/AnnonceService';
import { Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

export default function FavoritePropCard({ favorite, setOnchangeState, onchangeState }) {
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success',
    });
    
    // État pour la boîte de dialogue de confirmation
    const [confirmDialog, setConfirmDialog] = React.useState({
        open: false,
    });

    const handleRemoveFavorite = () => {
        RemoveFavorisAnnonce(favorite.id)
            .then(() => {
                setSnackbar({
                    open: true,
                    message: 'Annonce retirée des favoris',
                    severity: 'success',
                });
                console.log('Annonce retirée des favoris');
                setTimeout(() => {
                    setOnchangeState(!onchangeState);
                }, 900); 

            })
            .catch((error) => {
                setSnackbar({
                    open: true,
                    message: error.response?.data?.error || 'Erreur lors de la suppression de l\'annonce des favoris',
                    severity: 'error',
                });
            })
            .finally(() => {
                setConfirmDialog({ open: false });
            });
    };

    // Ouvrir la boîte de dialogue de confirmation
    const handleDeleteClick = () => {
        setConfirmDialog({ open: true });
    };

    // Fermer la boîte de dialogue de confirmation
    const handleConfirmCancel = () => {
        setConfirmDialog({ open: false });
    };

    return (
        <>
            <div className="colocataire">
                <div className="head" style={{ backgroundImage: `url(${favorite.image || '/src/assets/images/home.jpg'})` }}>
                    <div className="info">
                        <div className="type">{favorite.type || 'Type inconnu'}</div>
                        <div className="delete" onClick={handleDeleteClick} style={{ cursor: 'pointer' }}>
                            <Trash2 size={18} />
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="title-price">
                        <div className="title">{favorite.titre || 'Titre non disponible'}</div>
                        <div className="price">{favorite.prix ? `${favorite.prix} MAD/mois` : 'Prix non disponible'}</div>
                    </div>
                    <div className="location">
                        <MapPin className="location-icon" size={15} />
                        <span className="location-text">{favorite.location || 'Localisation inconnue'}</span>
                    </div>
                    <div className="details">
                        <div className='details-info'>
                            <div className="detail">{favorite.chambres ? `${favorite.chambres} chambres` : 'Chambres non spécifiées'}</div>
                            <Dot />
                            <div className="detail">{favorite.bathrooms ? `${favorite.bathrooms} salles de bain` : 'Salles de bain non spécifiées'}</div>
                        </div>
                        <div className="state">{favorite.state === "Louee" ? 'Louée' : 'Disponible'}</div>
                    </div>
                </div>
                <div className="footer">
                    <div className="seeProfil">Voir</div>
                    <div className="sendMessage"><MessageSquare size={17} strokeWidth={2} style={{ marginRight: '20px' }} />Contact</div>
                </div>
            </div>

            {/* Boîte de dialogue de confirmation */}
            <Dialog
                open={confirmDialog.open}
                onClose={handleConfirmCancel}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">
                    Confirmer la suppression
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        Êtes-vous sûr de vouloir retirer cette annonce de vos favoris ?
                        Cette action est irréversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmCancel} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleRemoveFavorite} color="error" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <MuiAlert
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                        elevation={6}
                        variant="filled"
                    >
                        {snackbar.message}
                    </MuiAlert>
                </Snackbar>
        </>
    );
}