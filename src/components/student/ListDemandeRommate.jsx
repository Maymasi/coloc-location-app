import React, { useState, useEffect } from 'react';
import { AppBar, Box, Tab, Tabs, Typography, Pagination, CircularProgress, Alert } from '@mui/material';
import PropTypes from 'prop-types';
import ReceivedRequestCard from './ReceivedRequestCard';
import { getReceivedRoommateRequests } from '../../Services/RoommateService';
import '../../assets/styles/roomateCss/receivedRequest.css';

export default function ListDemandeRommate() {
    const [demandesColocation, setDemandesColocation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [value, setValue] = useState(0);
    const [currentPage, setCurrentPage] = useState([1, 1, 1]);
    const cardsPerPage = 3;

    // Récupération des données depuis l'API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getReceivedRoommateRequests();
                
                if (result.success) {
                    setDemandesColocation(result.data.$values);
                    setError(null);
                } else {
                    setError(result.error || 'Erreur lors du chargement des demandes');
                    setDemandesColocation([]);
                }
            } catch (err) {
                setError('Une erreur inattendue s\'est produite');
                setDemandesColocation([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    // Fonction pour rafraîchir les données
    const refreshData = async () => {
        setLoading(true);
        try {
            const result = await getReceivedRoommateRequests();
            if (result.success) {
                setDemandesColocation(result.data);
                setError(null);
            } else {
                setError(result.error || 'Erreur lors du rechargement');
            }
        } catch (err) {
            setError('Erreur lors du rechargement');
        } finally {
            setLoading(false);
        }
    };

    // Affichage du loader pendant le chargement initial
    if (loading && demandesColocation.length === 0) {
        return (
            <div className="rommate-request-page">
                <div className="header">
                    <div className='title'>Demandes de colocation</div>
                    <div className='sub-title'>Connectez-vous avec des colocataires potentiels près de votre campus</div>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <CircularProgress size={50} />
                </Box>
            </div>
        );
    }

    return (
        <div className="rommate-request-page">
            <div className="header">
                <div className='title'>Demandes de colocation</div>
                <div className='sub-title'>Connectez-vous avec des colocataires potentiels près de votre campus</div>
                {error && (
                    <Alert 
                        severity="error" 
                        sx={{ mt: 2 }}
                        action={
                            <button onClick={refreshData} style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: 'inherit', 
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}>
                                Réessayer
                            </button>
                        }
                    >
                        {error}
                    </Alert>
                )}
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
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                    {paginatedDemandes('En attente', 0).length > 0 ? (
                                        paginatedDemandes('En attente', 0).map(demande => (
                                            <ReceivedRequestCard key={demande.id} demande={demande} />
                                        ))
                                    ) : (
                                        <Typography variant="body1" sx={{ textAlign: 'center', width: '100%', py: 4 }}>
                                            Aucune demande en attente
                                        </Typography>
                                    )}
                                </Box>
                                {filteredDemandes('En attente').length > cardsPerPage && (
                                    <Pagination
                                        count={Math.ceil(filteredDemandes('En attente').length / cardsPerPage)}
                                        page={currentPage[0]}
                                        onChange={handlePageChange}
                                        color="standard"
                                        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                                    />
                                )}
                            </>
                        )}
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                    {paginatedDemandes('Acceptée', 1).length > 0 ? (
                                        paginatedDemandes('Acceptée', 1).map(demande => (
                                            <ReceivedRequestCard key={demande.id} demande={demande} />
                                        ))
                                    ) : (
                                        <Typography variant="body1" sx={{ textAlign: 'center', width: '100%', py: 4 }}>
                                            Aucune demande acceptée
                                        </Typography>
                                    )}
                                </Box>
                                {filteredDemandes('Acceptée').length > cardsPerPage && (
                                    <Pagination
                                        count={Math.ceil(filteredDemandes('Acceptée').length / cardsPerPage)}
                                        page={currentPage[1]}
                                        onChange={handlePageChange}
                                        color="standard"
                                        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                                    />
                                )}
                            </>
                        )}
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                    {paginatedDemandes('Refusée', 2).length > 0 ? (
                                        paginatedDemandes('Refusée', 2).map(demande => (
                                            <ReceivedRequestCard key={demande.id} demande={demande} />
                                        ))
                                    ) : (
                                        <Typography variant="body1" sx={{ textAlign: 'center', width: '100%', py: 4 }}>
                                            Aucune demande refusée
                                        </Typography>
                                    )}
                                </Box>
                                {filteredDemandes('Refusée').length > cardsPerPage && (
                                    <Pagination
                                        count={Math.ceil(filteredDemandes('Refusée').length / cardsPerPage)}
                                        page={currentPage[2]}
                                        onChange={handlePageChange}
                                        color="standard"
                                        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                                    />
                                )}
                            </>
                        )}
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
}