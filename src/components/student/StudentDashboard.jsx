import React, { useState, useEffect } from 'react';
import { Home, Users, Heart, MessageSquare } from 'lucide-react';
import '../../assets/styles/userCss/dashbordStudent.css';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RecentActivity from './RecentActivity';
import RecommededHome from './RecommededHome';
import RoommateRequests from './RoommateRequests';
import { useAuth } from '../../context/AuthContext';
import { getStudentDashboardStates } from '../../Services/studentDashboardService'; 

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

const roommateRequests = [
  {
    id: 1,
    name: "John Doe",
    school: "University of XYZ",
    Budget: "2500",
    date: "2023-10-01",
    location: "City Center",
  },
  {
    id: 2,
    name: "Jane Smith",
    school: "University of ABC",
    Budget: "3000",
    date: "2023-10-05",
    location: "Downtown",
  },
  {
    id: 3,
    name: "Alice Johnson",
    school: "University of DEF",
    Budget: "2800",
    date: "2023-10-10",
    location: "Suburbia",
  },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [value, setValue] = useState(0);
  
  // État pour les statistiques du dashboard
  const [dashboardStats, setDashboardStats] = useState({
    savedProperties: 3,
    unreadMessages: 5,
    roommateRequests: 8,
    myRequests: 12
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les statistiques
  const fetchDashboardStats = async () => {
    try {
      const result = await getStudentDashboardStates();
      
      if (result.data) {
        setDashboardStats({
          savedProperties: result.data.proprietesEnregistrees || 0,
          unreadMessages: result.data.messagesNonLus || 0,
          roommateRequests: result.data.demandesDeColocataires || 0,
          myRequests: result.data.mesColocations || 0
        });
        setError(null);
      } else {
        setError(result.error || 'Erreur lors du chargement des données');
      }
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  // Hook pour charger les données au montage du composant
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Hook pour la mise à jour automatique toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardStats();
    }, 20000); // 20 secondes

    // Cleanup: nettoyer l'intervalle quand le composant se démonte
    return () => clearInterval(interval);
  }, []);

  // Hook pour écouter les changements de focus de l'onglet
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Rafraîchir les données quand l'utilisateur revient sur l'onglet
        fetchDashboardStats();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const tabs = document.querySelectorAll('button.MuiTab-root');
    tabs.forEach(tab => {
      tab.style.backgroundColor = '';
      tab.style.color = '';
    });
    tabs[newValue].style.backgroundColor = 'white';
    tabs[newValue].style.color = 'black';
  };

  // Fonction pour rafraîchir manuellement les données
  const handleRefresh = () => {
    setLoading(true);
    fetchDashboardStats();
  };

  if (loading && !dashboardStats) {
    return (
      <div className="student-dashboard" style={{ padding: '20px', textAlign: 'center' }}>
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '60px', height: '100%' }} className="student-dashboard">
      <header>
        <div className="info-student">
          <h1>Bienvenue, {user.nom}</h1>
          <p>Gérez vos recherches de logement et vos demandes de colocation</p>
          {error && (
            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
              {error}
              <button 
                onClick={handleRefresh}
                style={{ 
                  marginLeft: '10px', 
                  padding: '2px 8px', 
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Réessayer
              </button>
            </div>
          )}
        </div>
        <div className="links">
          <div className="homes">
            <Home className="icon" />
            <div>Parcourir les propriétés</div>
          </div>
          <div className="colocations">
            <Users className="icon" />
            <div>Trouver des colocataires</div>
          </div>
        </div>
      </header>
      
      <div className="data-student">
        <div className="card">
          <div className="content">
            <div className="title">Propriétés enregistrées</div>
            <div className="number">{dashboardStats.savedProperties}</div>
          </div>
          <div className="icon">
            <Heart />
          </div>
        </div>
        
        <div className="card">
          <div className="content">
            <div className="title">Messages non lus</div>
            <div className="number">{dashboardStats.unreadMessages}</div>
          </div>
          <div className="icon">
            <MessageSquare />
          </div>
        </div>
        
        <div className="card">
          <div className="content">
            <div className="title">Mes candidatures</div>
            <div className="number">{dashboardStats.roommateRequests}</div>
          </div>
          <div className="icon">
            <Users />
          </div>
        </div>
        
        <div className="card">
          <div className="content">
            <div className="title">Mes publications</div>
            <div className="number">{dashboardStats.myRequests}</div>
          </div>
          <div className="icon">
            <Home />
          </div>
        </div>
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
            <Tab label="Activité récente" {...a11yProps(0)} className="tab" style={{ backgroundColor: 'white' }} />
            <Tab label="Recommandé" {...a11yProps(1)} className="tab" />
            <Tab label="Favoris" {...a11yProps(2)} className="tab" />
          </Tabs>
        </AppBar>
        
        <TabPanel value={value} index={0} style={{ width: '100%', marginTop: '10px' }}>
          <RecentActivity />
        </TabPanel>
        
        <TabPanel value={value} index={1} style={{ width: '100%', marginTop: '10px' }}>
          <RecommededHome />
        </TabPanel>
        
        <TabPanel value={value} index={2} style={{ width: '100%', marginTop: '10px' }}>
          <RecommededHome />
        </TabPanel>
      </Box>

      <RoommateRequests roommateRequests={roommateRequests} />
    </div>
  );
}