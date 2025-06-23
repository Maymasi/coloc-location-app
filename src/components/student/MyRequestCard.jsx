import React, { useState } from 'react'
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar, Alert } from '@mui/material'
import { stringAvatar } from '../../utils/avatarUtils'
import { MessageSquare, Check, X } from 'lucide-react'
import { cancelRoommateRequest } from '../../Services/RoommateService'

export default function MyRequestCard({ demande, onRequestCanceled }) {
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' // 'success', 'error', 'warning', 'info'
    });

    const isPending = demande.statut === 'En attente';
    const isAcceptedOrRefused = demande.statut === 'Acceptée' || demande.statut === 'Refusée';

    // Gérer l'ouverture du dialog de confirmation
    const handleCancelClick = () => {
        setConfirmDialogOpen(true);
    };

    // Gérer la fermeture du dialog
    const handleDialogClose = () => {
        setConfirmDialogOpen(false);
    };

    // Gérer la confirmation d'annulation
    const handleConfirmCancel = async () => {
        setLoading(true);
        setConfirmDialogOpen(false);

        try {
            const result = await cancelRoommateRequest(demande.id);
            
            if (result.success) {
                setSnackbar({
                    open: true,
                    message: result.message,
                    severity: 'success'
                });
                
                // Notifier le parent pour rafraîchir les données
                if (onRequestCanceled) {
                    onRequestCanceled();
                }
            } else {
                setSnackbar({
                    open: true,
                    message: result.error || 'Erreur lors de l\'annulation',
                    severity: 'error'
                });
            }
        } catch (error) {
            console.error('Erreur:', error);
            setSnackbar({
                open: true,
                message: 'Une erreur inattendue s\'est produite',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    // Gérer la fermeture du snackbar
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <div className="receivedRequestCard" sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <div className="header-card" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <div className="title">Demandes de colocation</div>
                    <div
                        className="state"
                        style={{
                            color: 'white',
                            backgroundColor:
                                demande.statut === 'Acceptée' ? 'rgb(34 197 94)' :
                                demande.statut === 'Refusée' ? 'rgb(239 68 68)' :
                                'rgb(245 158 11)' // "En attente"
                        }}
                    >
                        {demande.statut || 'En attente'}
                    </div>
                </div>

                <div className="content">
                    <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Avatar {...stringAvatar(demande.nom)} sx={{ width: 50, height: 50 }} />
                        <div className="user-details">
                            <div className='name'>{demande.nom}</div>
                            <div className='school'>{demande.ecole}</div>
                        </div>
                    </div>

                    <div className="message" style={{ marginTop: 12 }}>
                        <span>Message:</span> {demande.message}
                    </div>

                    <div className="home-details" style={{ marginTop: 12 }}>
                        <div className="detail">
                            <div className='label'>Envoyée le:</div>
                            <div className='value'>{demande.date}</div>
                        </div>
                        {isAcceptedOrRefused && (
                            <div className="response" >
                                <h6>Réponse:</h6>
                                <div>{demande.reponse}</div>
                            </div>
                        )}
                    </div>

                    <div className="buttons" style={{ marginTop: 16 }}>
                        <div className="first" style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                            <div className="profil bt">Voir profil</div>
                            <div className="message bt"><MessageSquare size={15} style={{ marginRight: 8 }} /> Message</div>
                        </div>

                        {isPending && (
                            <div className="" style={{ marginTop: 8 }}>
                                <div 
                                    className="cancel bt" 
                                    style={{ 
                                        color: 'red', 
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        opacity: loading ? 0.6 : 1
                                    }}
                                    onClick={loading ? undefined : handleCancelClick}
                                >
                                    {loading ? 'Annulation...' : 'Annuler la demande'}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Dialog de confirmation */}
            <Dialog
                open={confirmDialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">
                    Confirmer l'annulation
                </DialogTitle>
                <DialogContent>
                    <p>
                        Êtes-vous sûr de vouloir annuler votre demande de colocation pour <strong>{demande.nom}</strong> ?
                    </p>
                    <p style={{ color: '#666', fontSize: '0.9em', marginTop: '8px' }}>
                        Cette action est irréversible.
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="inherit">
                        Non, garder
                    </Button>
                    <Button 
                        onClick={handleConfirmCancel} 
                        color="error" 
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? 'Annulation...' : 'Oui, annuler'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar pour les notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}