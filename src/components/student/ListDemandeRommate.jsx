import React from 'react';
import { AppBar, Box, Tab, Tabs, Typography, Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import ReceivedRequestCard from './ReceivedRequestCard';
import '../../assets/styles/roomateCss/receivedRequest.css';

export default function ListDemandeRommate() {
    const demandesColocation = [
        {
            id: 1,
            nom: 'Oussama Nouhar',
            ecole: 'ENSA de Safi',
            message: 'Salut ! Je cherche un coloc sympa et calme.',
            budget: '2500 MAD/mois',
            date: '2023-10-01',
            quartier: 'Centre-ville',
            preferences: ['Non-fumeur', 'Animaux acceptés', 'Propre'],
            statut: 'En attente'
        },
        {
            id: 2,
            nom: 'Sara Benali',
            ecole: 'Université Cadi Ayyad',
            message: `J'ai un chat, j'aimerais un coloc qui aime les animaux 🐱`,
            budget: '1800 MAD/mois',
            date: '2023-09-15',
            quartier: 'Guéliz',
            preferences: ['Femme uniquement', 'Animaux acceptés'],
            statut: 'En attente'
        },
        {
            id: 3,
            nom: 'Youssef El Arabi',
            ecole: 'ENSA de Marrakech',
            message: `Je suis souvent en télétravail, j'ai besoin d'un endroit calme.`,
            budget: '2000 MAD/mois',
            date: '2023-11-01',
            quartier: 'Semlalia',
            preferences: ['Non-fumeur', 'Silencieux', 'Travailleur'],
            statut: 'Refusée'
        },
        {
            id: 4,
            nom: 'Lina Zahraoui',
            ecole: 'Faculté des Sciences',
            message: 'Je cherche un logement proche des transports en commun.',
            budget: '1500 MAD/mois',
            date: '2023-08-20',
            quartier: 'Daoudiate',
            preferences: ['Flexible', 'Amicale'],
            statut: 'En attente'
        },
        {
            id: 5,
            nom: 'Ahmed Zidane',
            ecole: 'ENSA de Fès',
            message: 'Disponible dès septembre.',
            budget: '1900 MAD/mois',
            date: '2023-09-01',
            quartier: 'Agdal',
            preferences: ['Fumeur', 'Flexible'],
            statut: 'Acceptée'
        },
        {
            id: 6,
            nom: 'Yasmine Bouzid',
            ecole: 'EMI Rabat',
            message: 'Je préfère une colocatrice calme.',
            budget: '2100 MAD/mois',
            date: '2023-07-10',
            quartier: 'Hassan',
            preferences: ['Non-fumeur'],
            statut: 'Refusée'
        },
    ];

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

    const [value, setValue] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState([1, 1, 1]);
    const cardsPerPage = 3;

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const handlePageChange = (event, newPage) => {
        const updatedPages = [...currentPage];
        updatedPages[value] = newPage;
        setCurrentPage(updatedPages);
    };

    const filteredDemandes = (statut) => demandesColocation.filter(d => d.statut === statut);
    
    const paginatedDemandes = (statut, tabIndex) => {
        const data = filteredDemandes(statut);
        const indexOfLast = currentPage[tabIndex] * cardsPerPage;
        const indexOfFirst = indexOfLast - cardsPerPage;
        return data.slice(indexOfFirst, indexOfLast);
    };

    return (
        <div className="rommate-request-page">
            <div className="header">
                <div className='title'>Demandes de colocation</div>
                <div className='sub-title'>Connectez-vous avec des colocataires potentiels près de votre campus</div>
            </div>
            <div className="content">
                <Box sx={{ width: '100%', gap: '39px' }} className="tabs">
                    <AppBar position="static" className="bar" sx={{ backgroundColor: '#3f51b5' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab 
                                label={`En attente ${filteredDemandes('En attente').length}`} 
                                {...a11yProps(0)} 
                                sx={{ backgroundColor: value === 0 ? 'rgb(245 158 11)' : 'inherit', color: value === 0 ? 'white' : 'black' }} 
                            />
                            <Tab 
                                label={`Acceptées ${filteredDemandes('Acceptée').length}`} 
                                {...a11yProps(1)} 
                                sx={{ backgroundColor: value === 1 ? 'rgb(34 197 94)' : 'inherit', color: value === 1 ? 'white' : 'black' }} 
                            />
                            <Tab 
                                label={`Refusées ${filteredDemandes('Refusée').length}`} 
                                {...a11yProps(2)} 
                                sx={{ backgroundColor: value === 2 ? 'rgb(239 68 68)' : 'inherit', color: value === 2 ? 'white' : 'black' }} 
                            />
                        </Tabs>
                    </AppBar>

                    <TabPanel value={value} index={0}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {paginatedDemandes('En attente', 0).map(demande => (
                                <ReceivedRequestCard key={demande.id} demande={demande} />
                            ))}
                        </Box>
                        <Pagination
                            count={Math.ceil(filteredDemandes('En attente').length / cardsPerPage)}
                            page={currentPage[0]}
                            onChange={handlePageChange}
                            color="standard"
                            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                        />
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {paginatedDemandes('Acceptée', 1).map(demande => (
                                <ReceivedRequestCard key={demande.id} demande={demande} />
                            ))}
                        </Box>
                        <Pagination
                            count={Math.ceil(filteredDemandes('Acceptée').length / cardsPerPage)}
                            page={currentPage[1]}
                            onChange={handlePageChange}
                            color="standard"
                            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                        />
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {paginatedDemandes('Refusée', 2).map(demande => (
                                <ReceivedRequestCard key={demande.id} demande={demande} />
                            ))}
                        </Box>
                        <Pagination
                            count={Math.ceil(filteredDemandes('Refusée').length / cardsPerPage)}
                            page={currentPage[2]}
                            onChange={handlePageChange}
                            color="standard"
                            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                        />
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
}
