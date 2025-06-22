import React from 'react';
import PropTypes from 'prop-types';
import { useState ,useEffect} from 'react';
// MUI Components
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';


// Icons
import { Users, Search, X ,} from 'lucide-react';

// Styles
import '../../assets/styles/roomateCss/rommateComp.css';
//components
import RoommateCardRequest from './rommateCardRequest';
import ListRommatePage from './ListRommatePage';
//import context
import { RommateContext } from '../../context/RommateContext';
//services
import * as roommateService from '../../Services/RoommateService';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

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

function getStyles(name, preference, theme) {
  return {
    fontWeight: preference.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function RoommateComp(){

    const [filterData, setFilterData] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterLoading, setFilterLoading] = useState(false);


      const [coloc,setColoc]=useState({
        preferences:[],
        budget:1,
      });

    // État pour gérer l'ouverture/fermeture du modal
    const [openDialog, setOpenDialog] = useState(false);

    // État pour gérer les données du formulaire
    const [formData, setFormData] = useState({
        quartier: '',
        ville: '',
        budget: '',
        type: 'demande',
        dateDebutDisponibilite: '',
        preferences: []
    });

    // États pour les erreurs et snackbars
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error'
    });

        // Theme for MUI components
        const theme = useTheme();

        // State for managing the active tab
        const [value, setValue] = React.useState(0);

        // State for managing selected preferences
        const [preference, setPreference] = React.useState([]);

        // State for managing the selected budget
        const [budget, setBudget] = React.useState('');

        // State for controlling the open/close state of the budget dropdown
        const [open, setOpen] = React.useState(false);

          // Fonction pour charger les données depuis l'API
    const loadRoommateRequests = async () => {
        try {
            setLoading(true);
            const result = await roommateService.getRoommateRequests();
            
            if (result.success) {
                console.log('Données récupérées:', result.data.data.$values);
                setData(result.data.data.$values || []);
                setFilterData(result.data.data.$values || []);
            } else {
                console.error('Erreur lors du chargement:', result.error);
                showSnackbar(result.error || 'Erreur lors du chargement des données', 'error');
                // En cas d'erreur, on peut garder un tableau vide ou des données par défaut
                setData([]);
                setFilterData([]);
            }
        } catch (error) {
            console.error('Erreur inattendue lors du chargement:', error);
            showSnackbar('Erreur inattendue lors du chargement des données', 'error');
            setData([]);
            setFilterData([]);
        } finally {
            setLoading(false);
        }
    };
        // Fonction pour appliquer les filtres via l'API
 const applyFilters = async () => {
    try {
        setFilterLoading(true);
        
        // Validation et préparation des paramètres de filtrage
        const budgetValue = budget === '' || budget === '1' || budget === 1 ? null : Number(budget);
        const preferencesValue = preference && preference.length > 0 ? preference : null;
        
        // Validation du budget si fourni
        if (budgetValue !== null && (isNaN(budgetValue) || budgetValue <= 0)) {
            showSnackbar('Le budget doit être un nombre positif', 'error');
            return;
        }
        
        // Si aucun filtre n'est appliqué, on affiche toutes les données
        if (!budgetValue && !preferencesValue) {
            console.log('Aucun filtre appliqué, affichage de toutes les données');
            setFilterData(data);
            showSnackbar('Filtres supprimés', 'info');
            return;
        }
        
        console.log('Application des filtres:', { 
            budget: budgetValue, 
            preferences: preferencesValue,
            originalDataCount: data?.length || 0
        });
        
        // 🔥 CORRECTION MAJEURE: Ajouter await pour l'appel asynchrone
        const result = await roommateService.filterRoommateRequests(budgetValue, preferencesValue);
        
        if (result.success) {
            console.log('Réponse du service de filtrage:', result);
            
            // Extraction des données avec gestion robuste de la structure
            let filteredData = [];
            
            // Gérer différentes structures possibles de réponse
            if (result.data) {
                // Structure: result.data.data.$values
                if (result.data.data?.$values) {
                    filteredData = result.data.data.$values;
                }
                // Structure: result.data.$values  
                else if (result.data.$values) {
                    filteredData = result.data.$values;
                }
                // Structure: result.data (array direct)
                else if (Array.isArray(result.data)) {
                    filteredData = result.data;
                }
                // Structure: result.data (objet avec propriétés)
                else if (typeof result.data === 'object') {
                    // Chercher la première propriété qui est un array
                    const arrayKeys = Object.keys(result.data).filter(key => 
                        Array.isArray(result.data[key])
                    );
                    if (arrayKeys.length > 0) {
                        filteredData = result.data[arrayKeys[0]];
                    }
                }
            }
            
            // Validation que nous avons bien un array
            if (!Array.isArray(filteredData)) {
                console.warn('Données filtrées non valides:', filteredData);
                filteredData = [];
            }
            
            console.log(`Données filtrées récupérées: ${filteredData.length} résultats`);
            setFilterData(filteredData);
            
            // Messages informatifs
            if (filteredData.length === 0) {
                showSnackbar('Aucun résultat trouvé avec ces critères', 'info');
            } else {
                const message = `${filteredData.length} résultat${filteredData.length > 1 ? 's' : ''} trouvé${filteredData.length > 1 ? 's' : ''}`;
                showSnackbar(message, 'success');
            }
            
        } else {
            console.error('Erreur lors du filtrage:', {
                error: result.error,
                status: result.status,
                details: result.details
            });
            
            // Messages d'erreur spécifiques
            let errorMessage = result.error || 'Erreur lors du filtrage des données';
            
            // Personnaliser selon le type d'erreur
            if (result.status === 400) {
                errorMessage = 'Paramètres de filtrage invalides';
            } else if (result.status === 401) {
                errorMessage = 'Session expirée. Veuillez vous reconnecter';
            } else if (result.isNetworkError) {
                errorMessage = 'Problème de connexion. Vérifiez votre réseau';
            }
            
            showSnackbar(errorMessage, 'error');
            
            // En cas d'erreur, on garde les données originales
            setFilterData(data);
        }
        
    } catch (error) {
        console.error('Erreur inattendue lors du filtrage:', {
            message: error.message,
            stack: error.stack,
            budget,
            preference
        });
        
        // 🔥 CORRECTION: Passer le bon type à showSnackbar (string, pas error object)
        showSnackbar('Erreur inattendue lors du filtrage des données', 'error');
        
        // Fallback vers les données originales
        setFilterData(data);
        
    } finally {
        setFilterLoading(false);
    }
};

    // useEffect pour charger les données au montage du composant
    useEffect(() => {
        loadRoommateRequests();
    }, []);
        // Handle tab change
        const handleChange = (event, newValue) => {
            setValue(newValue);

            // Update tab styles dynamically
            const tabs = document.querySelectorAll('button.MuiTab-root');
            tabs.forEach(tab => {
          tab.style.backgroundColor = ''; // Reset background color for all tabs
          tab.style.color = ''; // Reset text color for all tabs
            });
            tabs[newValue].style.backgroundColor = 'white'; // Highlight the active tab
            tabs[newValue].style.color = 'black'; // Change text color for the active tab
        };

        // Handle budget selection change
        const handleChangeSelect = (event) => {
            setBudget(event.target.value);
            console.log(event.target.value); // Log the selected budget value
            setColoc({...coloc,budget:event.target.value});
            console.log(coloc)
        };

        // Close the budget dropdown
        const handleClose = () => {
            setOpen(false);
        };

        // Open the budget dropdown
        const handleOpen = () => {
            setOpen(true);
        };

        // Handle preference selection change
        const handleChangePreferences = (event) => {
            const {
          target: { value },
            } = event;

            // Limiter à 4 préférences maximum
            const newPreferences = typeof value === 'string' ? value.split(',') : value;
            
            if (newPreferences.length <= 4) {
                // Update preferences state only if 4 or fewer items
                setPreference(newPreferences);
                setColoc({...coloc, preferences: newPreferences});
                console.log(coloc)
            } else {
                // Si l'utilisateur essaie de sélectionner plus de 4, on garde les 4 premiers
                const limitedPreferences = newPreferences.slice(0, 4);
                setPreference(limitedPreferences);
                setColoc({...coloc, preferences: limitedPreferences});
            }
        };

        //search filter
        const handleSearch = (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const filteredData = data.filter((item) =>
              item.name.toLowerCase().includes(searchTerm) ||
              item.school.toLowerCase().includes(searchTerm) ||
              item.preferredZone.toLowerCase().includes(searchTerm)
            );
            setFilterData(filteredData);
          };

    // Fonction pour ouvrir le modal
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Fonction pour fermer le modal
    const handleCloseDialog = () => {
        setOpenDialog(false);
        // Réinitialiser le formulaire
        setFormData({
            quartier: '',
            ville: '',
            budget: '',
            type: 'demande',
            dateDebutDisponibilite: '',
            preferences: []
        });
        setErrors({});
    };

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleFormChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Supprimer l'erreur pour ce champ si elle existe
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    // Fonction pour gérer les préférences du formulaire
    const handleFormPreferencesChange = (event) => {
        const {
            target: { value },
        } = event;

        const newPreferences = typeof value === 'string' ? value.split(',') : value;
        
        if (newPreferences.length <= 4) {
            handleFormChange('preferences', newPreferences);
        } else {
            const limitedPreferences = newPreferences.slice(0, 4);
            handleFormChange('preferences', limitedPreferences);
        }
    };

    // Fonction de validation
    const validateForm = () => {
        const newErrors = {};

        // Validation du quartier
        if (!formData.quartier.trim()) {
            newErrors.quartier = 'Le quartier est obligatoire';
        } else if (formData.quartier.trim().length < 2) {
            newErrors.quartier = 'Le quartier doit contenir au moins 2 caractères';
        }

        // Validation de la ville
        if (!formData.ville.trim()) {
            newErrors.ville = 'La ville est obligatoire';
        } else if (formData.ville.trim().length < 2) {
            newErrors.ville = 'La ville doit contenir au moins 2 caractères';
        }

        // Validation du budget
        if (!formData.budget) {
            newErrors.budget = 'Le budget est obligatoire';
        } else if (isNaN(formData.budget) || formData.budget <= 0) {
            newErrors.budget = 'Le budget doit être un nombre positif';
        } else if (formData.budget < 500) {
            newErrors.budget = 'Le budget minimum est de 500 MAD';
        } else if (formData.budget > 10000) {
            newErrors.budget = 'Le budget maximum est de 10000 MAD';
        }

        // Validation de la date
        if (!formData.dateDebutDisponibilite) {
            newErrors.dateDebutDisponibilite = 'La date de disponibilité est obligatoire';
        } else {
            const selectedDate = new Date(formData.dateDebutDisponibilite);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                newErrors.dateDebutDisponibilite = 'La date ne peut pas être antérieure à aujourd\'hui';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Fonction pour afficher un snackbar
    const showSnackbar = (message, severity = 'error') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    // Fonction pour fermer le snackbar
    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({
            ...prev,
            open: false
        }));
    };

    // Fonction pour soumettre le formulaire
    const handleSubmitForm = async () => {
        if (!validateForm()) {
            showSnackbar('Veuillez corriger les erreurs dans le formulaire', 'error');
            return;
        }

        try {
            // Afficher un état de chargement (optionnel)
            showSnackbar('Création de la demande en cours...', 'info');

            // Formater les données pour l'API
            const apiData = roommateService.formatDataForAPI(formData);
            
            console.log('Données envoyées à l\'API:', apiData);

            // Appeler le service pour créer la demande
            const result = await roommateService.createRoommateRequest(apiData);

            if (result.success) {
                console.log('Demande créée avec succès:', result.data);
                showSnackbar(result.message || 'Demande créée avec succès!', 'success');
                handleCloseDialog();
                
                // Optionnel : recharger la liste des demandes
                // await loadRoommateRequests();
            } else {
                console.error('Erreur lors de la création:', result.error);
                showSnackbar(result.error || 'Une erreur est survenue lors de la création de la demande', 'error');
            }
        } catch (error) {
            console.error('Erreur inattendue:', error);
            showSnackbar('Une erreur inattendue est survenue', 'error');
        }
    };

    // Fonction pour obtenir la date minimum (aujourd'hui)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().slice(0, 16); // Format YYYY-MM-DDTHH:MM
    };

    return (
      <div className="roommate-page"> 
        <div className="header">
          <div className="title">
          <div className="fonctionnality">Trouver des colocataires</div>
          <div className="description">Connectez-vous avec des colocataires potentiels près de votre campus</div>
          </div>
          <div className="create-request" onClick={handleOpenDialog}>
            <Users size={16} style={{marginRight:'10px'}} />Créer une demande
          </div>
        </div>

        {/* Modal pour créer une demande */}
        <Dialog 
            open={openDialog} 
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
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
            }}>
                <Typography variant="h6" component="div">
                    Créer une nouvelle demande
                </Typography>
                <Button 
                    onClick={handleCloseDialog}
                    sx={{ minWidth: 'auto', p: 1 }}
                >
                    <X size={20} />
                </Button>
            </DialogTitle>
            
            <DialogContent sx={{ pt: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Adresse - Quartier et Ville */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Quartier"
                                placeholder="Ex: Agdal, Hay Riad..."
                                value={formData.quartier}
                                onChange={(e) => handleFormChange('quartier', e.target.value)}
                                error={!!errors.quartier}
                                helperText={errors.quartier}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'hsl(6 100% 72%)',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Ville"
                                placeholder="Ex: Rabat, Casablanca..."
                                value={formData.ville}
                                onChange={(e) => handleFormChange('ville', e.target.value)}
                                error={!!errors.ville}
                                helperText={errors.ville}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'hsl(6 100% 72%)',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                    {/* Budget */}
                    <TextField
                        fullWidth
                        label="Budget (MAD)"
                        type="number"
                        placeholder="Ex: 2400"
                        value={formData.budget}
                        onChange={(e) => handleFormChange('budget', e.target.value)}
                        error={!!errors.budget}
                        helperText={errors.budget}
                        InputProps={{
                            inputProps: { min: 500, max: 10000 }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'hsl(6 100% 72%)',
                                },
                            },
                        }}
                    />

                    {/* Type */}
                    <FormControl component="fieldset">
                        <FormLabel component="legend" sx={{ color: 'rgba(0, 0, 0, 0.87)', fontWeight: 500 }}>
                            Type de demande
                        </FormLabel>
                        <RadioGroup
                            row
                            value={formData.type}
                            onChange={(e) => handleFormChange('type', e.target.value)}
                        >
                            <FormControlLabel 
                                value="demande" 
                                control={<Radio sx={{ '&.Mui-checked': { color: 'hsl(6 100% 72%)' } }} />} 
                                label="Demande" 
                            />
                            <FormControlLabel 
                                value="offre" 
                                control={<Radio sx={{ '&.Mui-checked': { color: 'hsl(6 100% 72%)' } }} />} 
                                label="Offre" 
                            />
                        </RadioGroup>
                    </FormControl>

                    {/* Date de début de disponibilité */}
                    <TextField
                        fullWidth
                        label="Date de début de disponibilité"
                        type="datetime-local"
                        value={formData.dateDebutDisponibilite}
                        onChange={(e) => handleFormChange('dateDebutDisponibilite', e.target.value)}
                        error={!!errors.dateDebutDisponibilite}
                        helperText={errors.dateDebutDisponibilite}
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
                        }}
                    />

                    {/* Préférences */}
                    <FormControl sx={{ 
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: 'hsl(6 100% 72%)',
                            },
                        },
                    }}>
                        <InputLabel 
                            id="form-preferences-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'hsl(6 100% 78%)',
                                },
                            }}
                        >
                            Préférences (max 4)
                        </InputLabel>
                        <Select
                            labelId="form-preferences-label"
                            id="form-preferences"
                            multiple
                            value={formData.preferences}
                            onChange={handleFormPreferencesChange}
                            input={<OutlinedInput label="Préférences (max 4)" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} size="small" />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, formData.preferences, theme)}
                                    disabled={formData.preferences.length >= 4 && !formData.preferences.includes(name)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
                <Button 
                    onClick={handleCloseDialog}
                    sx={{ 
                        color: 'gray',
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                    }}
                >
                    Annuler
                </Button>
                <Button 
                    onClick={handleSubmitForm}
                    variant="contained"
                    sx={{ 
                        backgroundColor: 'hsl(6 100% 72%)',
                        '&:hover': { backgroundColor: 'hsl(6 100% 65%)' }
                    }}
                >
                    Créer la demande
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

        <div className="roommate-filter">
          <TextField
            placeholder='Rechercher par nom, université, ville...'
            id="outlined-start-adornment"
            sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
              borderColor: 'hsl(6 100% 72%)', // Change border color on focus
              },
            },
            }}
            slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
            },
            }}
            onChange={handleSearch} // Call the search function on input change
          />
          <div className="search-field">
            <FormControl
              className='select-budget'
              sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                
                borderColor: 'hsl(6 100% 72%)', // Change border color on focus
                }, 
              },
              }}
            >
              <InputLabel id="demo-controlled-open-select-label" sx={{
              '&.Mui-focused': {
                color: 'hsl(6 100% 78%)', // Change label color on focus
              },
              }}  >Budget</InputLabel>
              <Select
              
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={budget}
              label="Budget"
              onChange={handleChangeSelect}
              >
              <MenuItem value="1">
                Tout les budgets
              </MenuItem>
              <MenuItem value={1000}>Moins de 1000 Mad/mois</MenuItem>
              <MenuItem value={1500}>Moins de 1500 Mad/mois</MenuItem>
              <MenuItem value={2000}>Moins de 2000 Mad/mois</MenuItem>
              <MenuItem value={2500}>Moins de 2500 Mad/mois</MenuItem>
              <MenuItem value={3000}>Moins de 3000 Mad/mois</MenuItem>
              <MenuItem value={3500}>Moins de 3500 Mad/mois</MenuItem>
              <MenuItem value={4000}>Plus de 4000 Mad/mois</MenuItem>
              </Select>
            </FormControl>
            <div 
              className="search-btn" 
              onClick={applyFilters}
              style={{ 
                cursor: 'pointer',
                opacity: filterLoading ? 0.6 : 1,
                pointerEvents: filterLoading ? 'none' : 'auto',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {filterLoading ? (
                <CircularProgress size={17} style={{ marginRight: '14px' }} />
              ) : (
                <Search size={17} style={{ marginRight: '14px' }} />
              )}
              {filterLoading ? 'Filtrage...' : 'Rechercher'}
            </div>
          </div>
          <FormControl sx={{ m: 1, width: '60%' ,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                  
                  borderColor: 'hsl(6 100% 72%)', // Change border color on focus
                  },
                  
                },
          }}>
            <InputLabel id="demo-multiple-chip-label" sx={{
            '&.Mui-focused': {
              color: 'hsl(6 100% 78%)', // Change label color on focus
            },

            }} >Préférences (max 4)</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={preference}
              onChange={handleChangePreferences}
              input={<OutlinedInput id="select-multiple-chip" label="Préférences (max 4)" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 ,maxLines: 1}}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, preference, theme)}
                  disabled={preference.length >= 4 && !preference.includes(name)} // Désactive les options non sélectionnées si 4 sont déjà choisies
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Box sx={{ width: '100%', gap: '39px' }} className="tabs">
          <AppBar position="static" className="bar">
          <Tabs
            className="tabs-nav"
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Toutes les demandes" {...a11yProps(0)} className="tab" style={{ backgroundColor: 'white' }} />
            <Tab label="Recherche colocation" {...a11yProps(1)} className="tab" />
            <Tab label="Offre colocation" {...a11yProps(2)} className="tab" />
          </Tabs>
          </AppBar>
            <TabPanel value={value} index={0} style={{ width: '100%', marginTop: '10px' }}>
            <ListRommatePage data={filterData}/>
            </TabPanel>
            <TabPanel value={value} index={1} style={{ width: '100%', marginTop: '10px' }}>
              <ListRommatePage data={
                filterData.filter((item) => item.type.toLowerCase() === 'demande')
              }/>
            </TabPanel>
            <TabPanel value={value} index={2} style={{ width: '100%', marginTop: '10px' }}>
              <ListRommatePage data={
                filterData.filter((item) => item.type.toLowerCase() === 'offre')
              }/>
            </TabPanel>
        </Box>
      </div>
    );
}