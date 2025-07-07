import { Avatar, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { stringAvatar } from '../../utils/avatarUtils';
import { Trash2, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { removeFavoriteColocation } from '../../Services/studentFavoritesService'; 
import '../../assets/styles/userCss/dashbordStudent.css';
import '../../assets/styles/userCss/Favorites.css';

export default function FavoriteColocCard({ favorite, onchangeState, setOnchangeState }) {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' // 'success', 'error', 'warning', 'info'
    });
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleDeleteClick = () => {
        setConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        setConfirmDialog(false);
        
        if (isDeleting) return; // Empêcher les clics multiples

        setIsDeleting(true);
        
        try {
            const result = await removeFavoriteColocation(favorite.id, 'colocation');
            
            if (result.success !== false) {
                // Succès
                showSnackbar(result.message || 'Colocation supprimée des favoris avec succès', 'success');
                setTimeout(() => {
                    setOnchangeState(!onchangeState); // Forcer la mise à jour de la liste
                }, 900);
                
            } else {
                // Erreur
                showSnackbar(result.error || 'Erreur lors de la suppression', 'error');
            }
        } catch (error) {
            showSnackbar('Une erreur inattendue s\'est produite', 'error');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setConfirmDialog(false);
    };

    return (
        <>
            <div className="colocataire">
                <div className="header">
                    <div 
                        className={`delete ${isDeleting ? 'deleting' : ''}`}
                        onClick={handleDeleteClick}
                        style={{ 
                            cursor: isDeleting ? 'not-allowed' : 'pointer',
                            opacity: isDeleting ? 0.6 : 1
                        }}
                    >
                        <Trash2 size={18} className='delete-icon' />
                    </div>
                    <div className="name">
                        <Avatar {...stringAvatar(favorite.name, 'hsl(6deg 100% 72% / 10%)')} className='avatar' />
                    </div>
                </div>
                <div className="info-coloc">
                    <div className="name-person">{favorite.name}</div>
                    <div className="school">{favorite.school}</div>
                </div>
                <div className="content">
                    <div className="detail">
                        <div className="label">Budget :</div>
                        <div className="value">{favorite.budget} Mad/mois</div>
                    </div>
                    <div className="detail">
                        <div className="label">Date d'emménagement :</div>
                        <div className="value">{favorite.moveInDate}</div>
                    </div>
                    <div className="detail">
                        <div className="label">Zone privilégiée :</div>
                        <div className="value">{favorite.preferredZone}</div>
                    </div>
                </div>
                <div className="footer">
                    <div className="seeProfil">Voir le profil</div>
                    <div className="sendMessage">
                        <MessageSquare size={17} strokeWidth={2} style={{ marginRight: '20px' }} />
                        Contact
                    </div>
                </div>
            </div>

            {/* Dialog de confirmation */}
            <Dialog
                open={confirmDialog}
                onClose={handleCancelDelete}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">
                    Confirmer la suppression
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        Êtes-vous sûr de vouloir supprimer "{favorite.name}" de vos favoris ?
                        Cette action est irréversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Annuler
                    </Button>
                    <Button 
                        onClick={handleConfirmDelete} 
                        color="error" 
                        variant="contained"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Suppression...' : 'Supprimer'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar pour les notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}