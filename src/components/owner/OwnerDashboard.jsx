import React, { useState, useEffect, useCallback } from 'react';
import { House, Users, Heart, MessageSquare, HousePlus, Eye } from 'lucide-react';
import '../../assets/styles/userCss/dashbordStudent.css';
import '../../assets/styles/ownerCss/dashboardOwnerCss.css';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import DashboardProperties from './DashboardProperties';
import RecentInquiries from './RecentInquiries';
import PropertyAnalytics from './PropertyAnalytics';
import RecentActivitydashboard from './RecentActivitydashboard';
import { useAuth } from '../../context/AuthContext';
import { getDashboardStats } from '../../services/DashboardOwnerService';

// Hook personnalisé pour debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

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

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [value, setValue] = React.useState(0);
  const [stats, setStats] = useState({
    annoncesActives: 0,
    nouvellesDemandes: 0,
    totalVues: 0,
    locatairesPotentiels: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  
  // Snackbar states
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' // 'error', 'warning', 'info', 'success'
  });

  // Debounce le refresh trigger pour éviter trop d'appels API
  const debouncedRefresh = useDebounce(refreshTrigger, 1000);

  // Fonction pour afficher les snackbars
  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Fonction pour fermer les snackbars
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Fonction pour récupérer les statistiques
  const fetchStats = useCallback(async () => {
    try {
      if (!isAutoRefresh) {
        setLoading(true);
      }
      const result = await getDashboardStats();
      
      if (result.success) {
        setStats(result.data);
        setError(null);
        if (refreshTrigger > 0 && !isAutoRefresh) { // Ne pas afficher le message pour l'auto-refresh
          showSnackbar('Statistiques mises à jour avec succès', 'success');
        }
      } else {
        setError(result.error);
        if (!isAutoRefresh) {
          showSnackbar(`Erreur: ${result.error}`, 'error');
        }
      }
    } catch (err) {
      const errorMessage = 'Une erreur inattendue s\'est produite';
      setError(errorMessage);
      if (!isAutoRefresh) {
        showSnackbar(errorMessage, 'error');
      }
    } finally {
      if (!isAutoRefresh) {
        setLoading(false);
      }
      setIsAutoRefresh(false); // Reset le flag après chaque fetch
    }
  }, [refreshTrigger, isAutoRefresh]);

  // Récupération des statistiques au montage du composant
  useEffect(() => {
    fetchStats();
  }, []);

  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAutoRefresh(true);
      setRefreshTrigger(prev => prev + 1);
    }, 30000); // 30 secondes

    // Nettoyage de l'interval lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  // Effet pour le refresh avec debouncing
  useEffect(() => {
    if (debouncedRefresh > 0) {
      fetchStats();
    }
  }, [debouncedRefresh, fetchStats]);

  // Fonction pour déclencher un refresh manuel
  const handleRefresh = () => {
    setIsAutoRefresh(false);
    setRefreshTrigger(prev => prev + 1);
    showSnackbar('Actualisation en cours...', 'info');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const tabs = document.querySelectorAll('button.MuiTab-root');
    tabs.forEach(tab => {
      tab.style.backgroundColor = '';
      tab.style.color = ''; // Reset background color for all tabs
    });
    tabs[newValue].style.backgroundColor = 'white';
    tabs[newValue].style.color = 'black';
  };

  return (
    <div style={{ marginBottom: '60px', height: '100%' }} className="student-dashboard">
      <header>
        <div className="info-student">
          <h1>Bienvenue, {user.nom}</h1>
          <p>Gérez vos propriétés et les demandes des étudiants</p>
        </div>
        <div className="links">
          <div className="homes">
            <HousePlus className="icon" />
            <div>Ajouter une propriété</div>
          </div>
          <IconButton 
            onClick={handleRefresh} 
            disabled={loading}
            title="Actualiser les statistiques"
            sx={{ color: 'white', marginLeft: 2 }}
          >
            <RefreshIcon />
          </IconButton>
        </div>
      </header>
      
      <div className="data-student">
        <div className="card">
          <div className="content">
            <div className="title">Annonces actives</div>
            <div className="number">
              {loading ? '...' : error ? '!' : stats.annoncesActives}
            </div>
          </div>
          <div className="icon">
            <House />
          </div>
        </div>
        
        <div className="card">
          <div className="content">
            <div className="title">Nouvelles demandes</div>
            <div className="number">
              {loading ? '...' : error ? '!' : stats.nouvellesDemandes}
            </div>
          </div>
          <div className="icon">
            <MessageSquare />
          </div>
        </div>
        
        <div className="card">
          <div className="content">
            <div className="title">Nombre total de vues</div>
            <div className="number">
              {loading ? '...' : error ? '!' : stats.totalVues}
            </div>
          </div>
          <div className="icon">
            <Eye />
          </div>
        </div>
        
        <div className="card">
          <div className="content">
            <div className="title">Locataires potentiels</div>
            <div className="number">
              {loading ? '...' : error ? '!' : stats.locatairesPotentiels}
            </div>
          </div>
          <div className="icon">
            <Users />
          </div>
        </div>
      </div>

      {/* Affichage d'erreur si nécessaire - maintenant remplacé par les Snackbars */}
      
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
            <Tab label="Mes propriétés" {...a11yProps(0)} className="tab" style={{ backgroundColor: 'white' }} />
            <Tab label="Demande récentes " {...a11yProps(1)} className="tab" style={{ paddingRight: 0 }} />
            <Tab label="Analytique" {...a11yProps(2)} className="tab" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} style={{ width: '100%', marginTop: '10px' }}>
          <DashboardProperties />
        </TabPanel>
        <TabPanel value={value} index={1} style={{ width: '100%', marginTop: '10px' }}>
          <RecentInquiries />
        </TabPanel>
        <TabPanel value={value} index={2} style={{ width: '100%', marginTop: '10px' }}>
          <PropertyAnalytics />
        </TabPanel>
      </Box>
      <RecentActivitydashboard />
      
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
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}