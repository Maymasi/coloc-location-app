import React, { useState } from 'react'
import { 
    AppBar, 
    Box, 
    Tab, 
    Tabs, 
    Typography, 
    CircularProgress, 
    Alert, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    Button,
    Snackbar
} from '@mui/material'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import { stringAvatar } from '../../utils/avatarUtils'
import { MessageSquare, Check, X } from 'lucide-react'
import { respondToRoommateRequest } from '../../Services/RoommateService'

export default function ReceivedRequestCard({ demande, onStatusChange }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [responseType, setResponseType] = useState('') // 'Acceptee' ou 'Refusee'
    const [customMessage, setCustomMessage] = useState('')
    
    // États pour les snackbars
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('success') // 'success', 'error', 'warning', 'info'

    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message)
        setSnackbarSeverity(severity)
        setSnackbarOpen(true)
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbarOpen(false)
    }

    const handleResponse = async (nouveauStatut, message) => {
        try {
            setLoading(true)
            setError(null)
            
            const result = await respondToRoommateRequest(
                demande.demandeId, 
                nouveauStatut, 
                message
            )
            
            if (result.success) {
                // Appeler la fonction de callback pour mettre à jour la liste parent
                if (onStatusChange) {
                    onStatusChange()
                }
                // Fermer le modal et réinitialiser
                setModalOpen(false)
                setCustomMessage('')
                setResponseType('')
                
                // Afficher le snackbar de succès
                showSnackbar(
                    `Demande ${nouveauStatut.toLowerCase()} avec succès !`, 
                    'success'
                )
            } else {
                const errorMessage = result.error || `Erreur lors de la ${nouveauStatut.toLowerCase()} de la demande`
                setError(errorMessage)
                showSnackbar(errorMessage, 'error')
            }
        } catch (err) {
            const errorMessage = 'Une erreur inattendue s\'est produite'
            setError(errorMessage)
            showSnackbar(errorMessage, 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleAccept = () => {
        setResponseType('Acceptee')
        setModalOpen(true)
    }
    
    const handleRefuse = () => {
        setResponseType('Refusee')
        setModalOpen(true)
    }

    const handleConfirmResponse = () => {
        if (customMessage.trim().length < 20) {
            showSnackbar('Le message doit contenir au moins 20 caractères', 'warning')
            return
        }
        
        if (customMessage.trim().length > 80) {
            showSnackbar('Le message ne peut pas dépasser 80 caractères', 'warning')
            return
        }
        
        if (customMessage.trim()) {
            handleResponse(responseType, customMessage)
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setCustomMessage('')
        setResponseType('')
    }

    const handleMessage = () => {
        // Logique pour ouvrir/naviguer vers la messagerie
        console.log('Ouvrir conversation avec:', demande.nomEtudiant)
        showSnackbar('Redirection vers la messagerie...', 'info')
        // Exemple: navigate('/messages', { state: { recipientId: demande.etudiantId } })
    }

    const handleViewProfile = () => {
        // Logique pour voir le profil
        console.log('Voir profil de:', demande.nomEtudiant)
        showSnackbar('Ouverture du profil...', 'info')
        // Exemple: navigate('/profil', { state: { userId: demande.etudiantId } })
    }

    const isMessageValid = customMessage.trim().length >= 20 && customMessage.trim().length <= 80

    return (
        <>
            <div className="receivedRequestCard" sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <div className="header-card" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <div variant="h6" className='title'>Demandes de colocation</div>
                    <div variant="body2" className="state" sx={{ color: 'gray'}}   style={{
                            backgroundColor:
                            demande.statut === 'Acceptée' ? 'rgb(34 197 94)' :
                            demande.statut === 'Refusée' ? 'rgb(239 68 68)' :
                            'rgb(245 158 11)' // par défaut "En attente"
                        }}
                    >{demande.statut || 'En attente'}</div>
                </div>


                <div className="content">
                    <div className="user-info">
                        <Avatar {...stringAvatar(demande.nomEtudiant)} sx={{ width: 50, height: 50 }} />
                        <div className="user-details">
                            <div className='name'>{demande.nomEtudiant}</div>
                            <div className='school'>{demande.ecoleEtudiant}</div>
                        </div>
                    </div>
                    <div className="message">
                        <span>Message:</span> {demande.message}
                    </div>
                    <div className="home-details">
                        <div className="detail">
                            <div className='label'>Budget:</div>
                            <div className='value'>{demande.budget}</div>
                        </div>
                        <div className="detail">
                            <div className='label'>Date d'emménagement:</div>
                            <div className='value'>{demande.dateEmmenagement}</div>
                        </div>
                        <div className="detail">
                            <div className='label'>Quartier préféré:</div>
                            <div className='value'>{demande.colocationAdresse}</div>
                        </div>
                        <div className="preferences">
                            {demande.preferences.$values.map((pref, index) => (
                                <div className="preference" key={index}>{pref}</div>
                            ))}
                        </div>
                    </div>
                    <div className="buttons">
                        <div className="first">
                            <div 
                                className="profil bt" 
                                onClick={handleViewProfile}
                                style={{ cursor: 'pointer' }}
                            >
                                Voir profil
                            </div>
                            <div 
                                className="message bt"
                                onClick={demande.statut === 'Acceptée' ? handleMessage : undefined}
                                disabled={demande.statut !== 'Acceptée'}
                                style={{ 
                                    cursor: demande.statut === 'Acceptée' ? 'pointer' : 'not-allowed',
                                    opacity: demande.statut === 'Acceptée' ? 1 : 0.6,
                                    pointerEvents: demande.statut === 'Acceptée' ? 'auto' : 'none'
                                }}
                            >
                                <MessageSquare style={{ marginRight: '8px' }} size={15} /> Message
                            </div>
                        </div>
                        
                        {demande.statut === 'En attente' && (
                            <div className="second">
                                <div 
                                    className="accept bt" 
                                    onClick={!loading ? handleAccept : undefined}
                                    disabled={loading}
                                    style={{ 
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        opacity: loading ? 0.6 : 1,
                                        position: 'relative',
                                        pointerEvents: loading ? 'none' : 'auto'
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress size={15} style={{ marginRight: '8px' }} />
                                    ) : (
                                        <Check style={{ marginRight: '8px' }} size={15} />
                                    )}
                                    Accepter
                                </div>
                                <div 
                                    className="refuse bt" 
                                    onClick={!loading ? handleRefuse : undefined}
                                    disabled={loading}
                                    style={{ 
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        opacity: loading ? 0.6 : 1,
                                        pointerEvents: loading ? 'none' : 'auto'
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress size={15} style={{ marginRight: '8px' }} />
                                    ) : (
                                        <X style={{ marginRight: '8px' }} size={15} />
                                    )}
                                    Refuser
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal pour saisir le message de réponse */}
                <Dialog 
                    open={modalOpen} 
                    onClose={handleCloseModal}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: '16px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            overflow: 'hidden'
                        }
                    }}
                >
                    <DialogTitle sx={{ 
                        background: responseType === 'Acceptee' 
                            ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' 
                            : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        textAlign: 'center',
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        py: 3,
                        position: 'relative'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                            {responseType === 'Acceptee' ? (
                                <Check size={24} />
                            ) : (
                                <X size={24} />
                            )}
                            {responseType === 'Acceptee' ? 'Accepter la demande' : 'Refuser la demande'}
                        </div>
                    </DialogTitle>
                    
                    <DialogContent sx={{ p: 4, backgroundColor: '#fafafa' }}>
                        <div style={{ 
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    mb: 3, 
                                    color: '#374151',
                                    fontWeight: '500',
                                    textAlign: 'center'
                                }}
                            >
                                {responseType === 'Acceptee' 
                                    ? '🎉 Rédigez un message de bienvenue pour ce futur colocataire'
                                    : '💭 Expliquez poliment les raisons de votre refus'
                                }
                            </Typography>
                            
                            <TextField
                                autoFocus
                                label="Votre message personnalisé (20-80 caractères)"
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                inputProps={{ maxLength: 80 }}
                                placeholder={
                                    responseType === 'Acceptee' 
                                        ? "Ravi d'accepter votre demande ! Contactez-moi pour organiser une visite." 
                                        : "Merci pour votre demande, mais nos profils ne sont pas compatibles."
                                }
                                sx={{ 
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: '#ffffff',
                                        '&:hover fieldset': {
                                            borderColor: responseType === 'Acceptee' ? '#22c55e' : '#ef4444',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: responseType === 'Acceptee' ? '#22c55e' : '#ef4444',
                                        }
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: responseType === 'Acceptee' ? '#22c55e' : '#ef4444',
                                    }
                                }}
                            />
                            
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                marginTop: '12px',
                                fontSize: '0.875rem',
                                color: '#6b7280'
                            }}>
                                <span>{customMessage.length}/80 caractères</span>
                                <span style={{ 
                                    color: !isMessageValid ? '#ef4444' : '#22c55e',
                                    fontWeight: '500'
                                }}>
                                    {customMessage.length < 20 ? 'Minimum 20 caractères' : 
                                     customMessage.length > 80 ? 'Maximum 80 caractères' : 
                                     'Message valide'}
                                </span>
                            </div>
                        </div>
                    </DialogContent>
                    
                    <DialogActions sx={{ 
                        p: 3, 
                        backgroundColor: '#f9fafb',
                        gap: 2,
                        justifyContent: 'center'
                    }}>
                        <Button 
                            onClick={handleCloseModal}
                            disabled={loading}
                            variant="outlined"
                            sx={{
                                borderRadius: '8px',
                                px: 3,
                                py: 1.5,
                                borderColor: '#d1d5db',
                                color: '#6b7280',
                                '&:hover': {
                                    borderColor: '#9ca3af',
                                    backgroundColor: '#f3f4f6'
                                }
                            }}
                        >
                            Annuler
                        </Button>
                        <Button 
                            onClick={handleConfirmResponse}
                            variant="contained"
                            disabled={loading || !isMessageValid}
                            sx={{
                                borderRadius: '8px',
                                px: 4,
                                py: 1.5,
                                background: responseType === 'Acceptee' 
                                    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                    : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                '&:hover': {
                                    background: responseType === 'Acceptee' 
                                        ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
                                        : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                                },
                                '&:disabled': {
                                    background: '#d1d5db',
                                    color: '#9ca3af'
                                }
                            }}
                        >
                            {loading ? (
                                <>
                                    <CircularProgress size={16} style={{ marginRight: '8px', color: 'white' }} />
                                    Envoi en cours...
                                </>
                            ) : (
                                <>
                                    {responseType === 'Acceptee' ? (
                                        <Check size={16} style={{ marginRight: '8px' }} />
                                    ) : (
                                        <X size={16} style={{ marginRight: '8px' }} />
                                    )}
                                    {responseType === 'Acceptee' ? 'Accepter la demande' : 'Refuser la demande'}
                                </>
                            )}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            {/* Snackbar pour les notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbarSeverity}
                    sx={{ 
                        width: '100%',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

ReceivedRequestCard.propTypes = {
    demande: PropTypes.object.isRequired,
    onStatusChange: PropTypes.func
}