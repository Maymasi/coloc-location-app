import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { Send, X } from 'lucide-react';
import {stringAvatar} from '../../utils/avatarUtils';
import {applyForRoommate} from '../../Services/RoommateService';

const names = [
  'Non-fumeur',
  'Pas d\'animaux',
  'Étudiant',
  'Travailleur',
  'Calme',
  'Amical',
  'Propre',
  'Sportif',
  'Végétarien',
  'Musicien',
  'Cuisinier',
  'Voyageur',
  'Joueur',
  'Timide',
  'Sociable',
  'Simple',
  'Créatif',
  'Aime les films',
  'Aime la photo',
  'Aime lire',
  'Reste tard',
  'Se lève tôt',
  'Fêtard',
  'Travaille à distance',
  'Silencieux',
  'Bavard',
  'Organisé',
  'Flexible',
  'Chaleureux',
  'Respectueux',
  'Réservé',
  'Gaming'
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, preferences, theme) {
  return {
    fontWeight: preferences.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function RoommateCardRequest({data}) {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ColocationId: data.id || 2,
    Budget: '',
    Message: '',
    DateEmmenagement: '',
    Preferences: [],
    address: ''
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      ColocationId: data.id ,
      Budget: '',
      Message: '',
      DateEmmenagement: '',
      Preferences: [],
      address: ''
    });
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferencesChange = (event) => {
    const {
      target: { value },
    } = event;

    const newPreferences = typeof value === 'string' ? value.split(',') : value;
    
    if (newPreferences.length <= 4) {
      handleFormChange('Preferences', newPreferences);
    } else {
      const limitedPreferences = newPreferences.slice(0, 4);
      handleFormChange('Preferences', limitedPreferences);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSubmit = async () => {
    // Validation des champs requis
    if (!formData.Budget || !formData.DateEmmenagement || !formData.address) {
      showSnackbar('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Formatage de la date pour l'API
      const formattedData = {
        ...formData,
        DateEmmenagement: formData.DateEmmenagement ? new Date(formData.DateEmmenagement).toISOString() : ""
      };
      
      console.log('Données à envoyer:', formattedData);
      
      const result = await applyForRoommate(
        formattedData.ColocationId,
        formattedData.Budget,
        formattedData.Message,
        formattedData.DateEmmenagement,
        formattedData.Preferences,
        formattedData.address
      );

      if (result.success) {
        console.log('Candidature envoyée avec succès:', result);
        showSnackbar(result.message || 'Candidature envoyée avec succès !', 'success');
        handleCloseDialog();
      } else {
        console.error('Erreur lors de l\'envoi de la candidature:', result.error);
        showSnackbar(result.error || 'Erreur lors de l\'envoi de la candidature', 'error');
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      showSnackbar('Une erreur inattendue s\'est produite', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().slice(0, 16);
  };

  return (
    <>
      <div className="roommate-card">
        <div className="header">
          <div className="state">
            <div className="state-text" style={{ backgroundColor: data.type.toLowerCase() === 'demande' ? 'hsl(6deg 100% 72%)' : 'rgba(246, 156, 18, 0.984)' }}>
              {data.type} colocation
            </div>
          </div>
          <div className="name">
            <Avatar {...stringAvatar(`${data.name}`, 'hsl(6deg 100% 72% / 10%)')} className='avatar' sx={{ width: 80, height: 80, backgroundColor: 'hsl(6deg 100% 72% / 10%)', color: 'hsl(6deg 100% 72%)', fontSize: '30px' }} />
          </div>
        </div>
        <div className="content">
          <div className="user-info">
            <div className="user-name">{data.name}</div>
            <div className="user-school">{data.school}</div>
          </div>
          <div className="user-details">
            <div className="detail">
              <div className="label">Budget :</div>
              <div className="value">{data.budget} Mad/mois</div>
            </div>
            <div className="detail">
              <div className="label">Date d'emménagement :</div>
              <div className="value">{data.moveInDate}</div>
            </div>
            <div className="detail">
              <div className="label">Zone privilégiée :</div>
              <div className="value">{data.preferredZone}</div>
            </div>
            <div className="preferences">
              {data.preferences.$values.map((preference, index) => (
                <div key={index} className="item" style={{textTransform: 'capitalize'}}>
                  {preference}
                </div>
              ))}
            </div>
            <div className="btns">
              <div className="seeProfil btn">Voir le profil</div>
              <div className="postulate btn" onClick={handleOpenDialog}>
                <Send size={15} style={{marginRight:'10px'}}/>
                Candidater
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour postuler */}
<Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        // maxWidth="md"
        fullWidth
        sx={{
           '& .MuiDialog-root': {
                width: 'calc(100vw - 256px)',
                justifyContent: 'center',
                '@media (max-width: 1280px)': {
                    width: '100vw',
                },
                },
                '& .MuiDialog-container': {
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                },
                '& .MuiDialog-paper': {
                    '@media (min-width: 1280px)': {
                        marginLeft: '256px',
                    },
                    width: '100%',
                    '@media (max-width: 768px)': {
                        margin: '16px',
                        width: 'calc(100% - 32px)',
                        maxHeight: 'calc(100vh - 64px)',
                    },
                    '@media (max-width: 480px)': {
                        margin: '8px',
                        width: 'calc(100% - 16px)',
                        maxHeight: 'calc(100vh - 32px)',
                    },
                }
        }}
        PaperProps={{
          style: {
            borderRadius: '12px',
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
          pb: 2,
          marginBottom: 2,
          '@media (max-width: 768px)': {
            pb: 1.5,
            marginBottom: 1.5,
          },
          '@media (max-width: 480px)': {
            pb: 1,
            marginBottom: 1,
          },
        }}>
          <Typography variant="h6" component="div" sx={{
            '@media (max-width: 768px)': {
              fontSize: '1.1rem',
            },
            '@media (max-width: 480px)': {
              fontSize: '1rem',
            },
          }}>
            Postuler à cette colocation
          </Typography>
          <Button 
            onClick={handleCloseDialog}
            sx={{ 
              minWidth: 'auto', 
              p: 1,
              '@media (max-width: 480px)': {
                p: 0.5,
              },
            }}
          >
            <X size={20} />
          </Button>
        </DialogTitle>
        
        <DialogContent sx={{ 
          pt: 3,
          '@media (max-width: 768px)': {
            pt: 2,
            px: 2,
          },
          '@media (max-width: 480px)': {
            pt: 1.5,
            px: 1.5,
          },
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            '@media (max-width: 768px)': {
              gap: 2.5,
            },
            '@media (max-width: 480px)': {
              gap: 2,
            },
          }}>
            <Grid container spacing={2} sx={{
              '@media (max-width: 768px)': {
                spacing: 1.5,
              },
              '@media (max-width: 480px)': {
                spacing: 1,
              },
            }}>
              <Grid item xs={6} sx={{
                '@media (max-width: 480px)': {
                  xs: 12,
                },
              }}>
                <TextField
                  fullWidth
                  label="Budget (MAD) *"
                  type="number"
                  placeholder="Ex: 600"
                  value={formData.Budget}
                  onChange={(e) => handleFormChange('Budget', e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'hsl(6 100% 72%)',
                      },
                    },
                    '@media (max-width: 480px)': {
                      '& .MuiInputLabel-root': {
                        fontSize: '0.9rem',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sx={{
                '@media (max-width: 480px)': {
                  xs: 12,
                },
              }}>
                <TextField
                  fullWidth
                  label="Adresse *"
                  placeholder="Ex: Agdal, Rabat"
                  value={formData.address}
                  onChange={(e) => handleFormChange('address', e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'hsl(6 100% 72%)',
                      },
                    },
                    '@media (max-width: 480px)': {
                      '& .MuiInputLabel-root': {
                        fontSize: '0.9rem',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Date d'emménagement *"
              type="datetime-local"
              value={formData.DateEmmenagement}
              onChange={(e) => handleFormChange('DateEmmenagement', e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: { min: getMinDate() }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'hsl(6 100% 72%)',
                  },
                },
                '@media (max-width: 480px)': {
                  '& .MuiInputLabel-root': {
                    fontSize: '0.9rem',
                  },
                },
              }}
            />

            <FormControl sx={{ 
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'hsl(6 100% 72%)',
                },
              },
              '@media (max-width: 480px)': {
                '& .MuiInputLabel-root': {
                  fontSize: '0.9rem',
                },
              },
            }}>
              <InputLabel 
                id="preferences-label"
                sx={{
                  '&.Mui-focused': {
                    color: 'hsl(6 100% 78%)',
                  },
                }}
              >
                Préférences (max 4)
              </InputLabel>
              <Select
                labelId="preferences-label"
                multiple
                value={formData.Preferences}
                onChange={handlePreferencesChange}
                input={<OutlinedInput label="Préférences (max 4)" />}
                renderValue={(selected) => (
                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 0.5,
                    '@media (max-width: 480px)': {
                      gap: 0.3,
                    },
                  }}>
                    {selected.map((value) => (
                      <Chip 
                        key={value} 
                        label={value} 
                        size="small" 
                        sx={{
                          '@media (max-width: 480px)': {
                            fontSize: '0.7rem',
                            height: '24px',
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, formData.Preferences, theme)}
                    disabled={formData.Preferences.length >= 4 && !formData.Preferences.includes(name)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              placeholder="Ex: Salut, je suis très intéressé par votre colocation..."
              value={formData.Message}
              onChange={(e) => handleFormChange('Message', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'hsl(6 100% 72%)',
                  },
                },
                '@media (max-width: 768px)': {
                  '& .MuiInputBase-root': {
                    minHeight: '80px',
                  },
                },
                '@media (max-width: 480px)': {
                  '& .MuiInputLabel-root': {
                    fontSize: '0.9rem',
                  },
                  '& .MuiInputBase-root': {
                    minHeight: '70px',
                  },
                },
              }}
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          borderTop: '1px solid #e0e0e0',
          '@media (max-width: 768px)': {
            p: 2,
            flexDirection: 'column-reverse',
            gap: 1,
          },
          '@media (max-width: 480px)': {
            p: 1.5,
            gap: 0.5,
          },
        }}>
          <Button 
            onClick={handleCloseDialog}
            disabled={isSubmitting}
            sx={{ 
              color: 'gray',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
              '@media (max-width: 768px)': {
                width: '100%',
                order: 2,
              },
              '@media (max-width: 480px)': {
                fontSize: '0.9rem',
                py: 1.5,
              },
            }}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            disabled={isSubmitting}
            sx={{ 
              backgroundColor: 'hsl(6 100% 72%)',
              '&:hover': { backgroundColor: 'hsl(6 100% 65%)' },
              '&:disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' },
              '@media (max-width: 768px)': {
                width: '100%',
                order: 1,
              },
              '@media (max-width: 480px)': {
                fontSize: '0.9rem',
                py: 1.5,
              },
            }}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer la candidature'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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