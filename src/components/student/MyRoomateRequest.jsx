import React, { useState, useEffect } from 'react';
import { AppBar, Box, Tab, Tabs, Typography, Pagination, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import MyRequestCard from './MyRequestCard';
import { getMyRoommateRequests } from '../../Services/RoommateService'; 

import '../../assets/styles/roomateCss/receivedRequest.css';
import '../../assets/styles/roomateCss/myrequest.css';

export default function MyRoommateRequest() {
    // États pour les données et le chargement
    const [MesDemadesColocation, setMesDemadesColocation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0); 

    // États existants
    const [value, setValue] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageAccepted, setCurrentPageAccepted] = useState(1);
    const [currentPageRefused, setCurrentPageRefused] = useState(1);
    const cardsPerPage = 3;

    // Fonction pour récupérer les données
    const fetchMyRequests = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const result = await getMyRoommateRequests();
            
            if (result.success) {
                let processedData = [];
                
                if (result.data.$values) {
                    processedData = result.data.$values.map(item => ({
                        id: item.id,
                        nom: item.nom,
                        ecole: item.ecole,
                        message: item.message,
                        date: item.date,
                        statut: item.statut,
                        budget: item.budget,
                        quartier: item.quartier,
                        preferences: item.preferences?.$values || [],
                        reponse: item.reponse,
                        colocationId: item.colocationId,
                        colocationAdresse: item.colocationAdresse,
                        colocationBudget: item.colocationBudget,
                        colocationPreferences: item.colocationPreferences?.$values || []
                    }));
                } else {
                    processedData = result.data;
                }
                
                setMesDemadesColocation(processedData);
            } else {
                throw new Error(result.error || 'Erreur lors du chargement des demandes');
            }
            
        } catch (err) {
            console.error('Erreur lors du chargement des demandes:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect pour récupérer les données au montage ET quand refreshTrigger change
    useEffect(() => {
        fetchMyRequests();
    }, [refreshTrigger]); // Dépendance sur refreshTrigger

    const handleRequestCanceled = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    // Handlers existants
    const handlePageChange = (event, value) => setCurrentPage(value);
    const handlePageChangeAccepted = (event, value) => setCurrentPageAccepted(value);
    const handlePageChangeRefused = (event, value) => setCurrentPageRefused(value);

    // Calculs basés sur les données chargées
    const nombreRequests = MesDemadesColocation.filter(r => r.statut === 'En attente').length;
    const nombreAccepted = MesDemadesColocation.filter(r => r.statut === 'Acceptée').length;
    const nombreRefused = MesDemadesColocation.filter(r => r.statut === 'Refusée').length;

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div role="tabpanel" hidden={value !== index} {...other}>
                {value === index && <Box sx={{ p: 3 }}><Typography>{children}</Typography></Box>}
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

    // Données filtrées
    const enAttente = MesDemadesColocation.filter(d => d.statut === 'En attente');
    const accepted = MesDemadesColocation.filter(d => d.statut === 'Acceptée');
    const refused = MesDemadesColocation.filter(d => d.statut === 'Refusée');

    // Découpe pagination
    const paginate = (data, page) => data.slice((page - 1) * cardsPerPage, page * cardsPerPage);

    // Fonction pour tronquer le message
    const truncateMessage = (message, maxLength = 100) => {
        if (!message) return '';
        if (message.length <= maxLength) return message;
        return message.substring(0, maxLength) + '...';
    };

    // Composant pour afficher quand il n'y a pas de demandes
    const EmptyState = ({ type, icon, title, description }) => (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="300px"
            textAlign="center"
            sx={{ 
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                border: '2px dashed #e0e0e0',
                padding: '40px',
                margin: '20px 0'
            }}
        >
            <Box
                sx={{
                    fontSize: '4rem',
                    marginBottom: '16px',
                    opacity: 0.6
                }}
            >
                {icon}
            </Box>
            <Typography 
                variant="h6" 
                sx={{ 
                    marginBottom: '8px',
                    color: '#666',
                    fontWeight: 600
                }}
            >
                {title}
            </Typography>
            <Typography 
                variant="body2" 
                sx={{ 
                    color: '#999',
                    maxWidth: '400px',
                    lineHeight: 1.6
                }}
            >
                {description}
            </Typography>
            {type === 'pending' && (
                <Box
                    sx={{
                        marginTop: '24px',
                        padding: '12px 24px',
                        backgroundColor: '#fff3cd',
                        borderRadius: '8px',
                        border: '1px solid #ffeaa7'
                    }}
                >
                    <Typography variant="body2" sx={{ color: '#856404' }}>
                        💡 Astuce : Parcourez les colocations disponibles et envoyez vos premières demandes !
                    </Typography>
                </Box>
            )}
        </Box>
    );

    // Affichage conditionnel selon l'état de chargement
    if (loading) {
        return (
            <div className="rommate-request-page">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress size={60} />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        Chargement de vos demandes...
                    </Typography>
                </Box>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rommate-request-page">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <Typography variant="h6" color="error">
                        Erreur lors du chargement: {error}
                    </Typography>
                </Box>
            </div>
        );
    }

    return (
        <div className="rommate-request-page">
            <div className="header-myrequest">
                <div className="part1">
                    <div className='title'>Mes demandes</div>
                    <div className='sub-title'>Gérez les demandes de colocation que vous avez envoyées</div>
                </div>
                <div className="find-roomate">Trouver des colocataires</div>
            </div>

            <div className="content">
                <Box sx={{ width: '100%', gap: '39px' }} className="tabs">
                    <AppBar position="static" className="bar" sx={{ backgroundColor: '#3f51b5' }}>
                        <Tabs
                            value={value}
                            onChange={(_, newValue) => {
                                setValue(newValue);
                                setCurrentPage(1);
                                setCurrentPageAccepted(1);
                                setCurrentPageRefused(1);
                            }}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                        >
                            <Tab label={`En attente ${nombreRequests}`} {...a11yProps(0)} sx={{ backgroundColor: value === 0 ? 'rgb(245 158 11)' : 'inherit', color: value === 0 ? 'white' : 'black' }} />
                            <Tab label={`Acceptées ${nombreAccepted}`} {...a11yProps(1)} sx={{ backgroundColor: value === 1 ? 'rgb(34 197 94)' : 'inherit', color: value === 1 ? 'white' : 'black' }} />
                            <Tab label={`Refusées ${nombreRefused}`} {...a11yProps(2)} sx={{ backgroundColor: value === 2 ? 'rgb(239 68 68)' : 'inherit', color: value === 2 ? 'white' : 'black' }} />
                        </Tabs>
                    </AppBar>

                    {/* En attente */}
                    <TabPanel value={value} index={0}>
                        {enAttente.length === 0 ? (
                            <EmptyState 
                                type="pending"
                                icon="⏳"
                                title="Aucune demande en attente"
                                description="Vous n'avez pas encore de demandes en attente de réponse. Explorez les colocations disponibles et postulez à celles qui vous intéressent !"
                            />
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                    {paginate(enAttente, currentPage).map(demande => (
                                        <MyRequestCard 
                                            key={demande.id} 
                                            demande={{
                                                ...demande,
                                                message: truncateMessage(demande.message)
                                            }}
                                            onRequestCanceled={handleRequestCanceled}
                                        />
                                    ))}
                                </Box>
                                {enAttente.length > cardsPerPage && (
                                    <Box mt={3} display="flex" justifyContent="center">
                                        <Pagination
                                            count={Math.ceil(enAttente.length / cardsPerPage)}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                            color="primary"
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </TabPanel>

                    {/* Acceptées */}
                    <TabPanel value={value} index={1}>
                        {accepted.length === 0 ? (
                            <EmptyState 
                                icon="✅"
                                title="Aucune demande acceptée"
                                description="Vos demandes acceptées apparaîtront ici."
                            />
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                    {paginate(accepted, currentPageAccepted).map(demande => (
                                        <MyRequestCard 
                                            key={demande.id} 
                                            demande={demande}
                                            onRequestCanceled={handleRequestCanceled}
                                        />
                                    ))}
                                </Box>
                                {accepted.length > cardsPerPage && (
                                    <Box mt={3} display="flex" justifyContent="center">
                                        <Pagination
                                            count={Math.ceil(accepted.length / cardsPerPage)}
                                            page={currentPageAccepted}
                                            onChange={handlePageChangeAccepted}
                                            color="primary"
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </TabPanel>

                    {/* Refusées */}
                    <TabPanel value={value} index={2}>
                        {refused.length === 0 ? (
                            <EmptyState 
                                icon="❌"
                                title="Aucune demande refusée"
                                description="Vos demandes refusées apparaîtront ici."
                            />
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                    {paginate(refused, currentPageRefused).map(demande => (
                                        <MyRequestCard 
                                            key={demande.id} 
                                            demande={demande}
                                            onRequestCanceled={handleRequestCanceled}
                                        />
                                    ))}
                                </Box>
                                {refused.length > cardsPerPage && (
                                    <Box mt={3} display="flex" justifyContent="center">
                                        <Pagination
                                            count={Math.ceil(refused.length / cardsPerPage)}
                                            page={currentPageRefused}
                                            onChange={handlePageChangeRefused}
                                            color="primary"
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
}