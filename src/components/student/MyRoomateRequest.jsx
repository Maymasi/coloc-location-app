import React from 'react';
import { AppBar, Box, Tab, Tabs, Typography, Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import MyRequestCard from './MyRequestCard';

import '../../assets/styles/roomateCss/receivedRequest.css';
import '../../assets/styles/roomateCss/myrequest.css';

export default function MyRoomateRequest() {
const MesDemadesColocation = [
    { id: 1, nom: 'Oussama Nouhar', ecole: 'ENSA de Safi', message: 'Salut ! Je cherche un coloc sympa et calme.', date: '2023-10-01', statut: 'En attente' },
    { id: 2, nom: 'Sara Benali', ecole: 'Université Cadi Ayyad', message: `J'ai un chat, j'aimerais un coloc qui aime les animaux 🐱`, date: '2023-09-15', statut: 'Acceptée', reponse: `Salut Sara ! Je suis aussi fan des chats 😺. On peut discuter davantage ?` },
    { id: 3, nom: 'Youssef El Arabi', ecole: 'ENSA de Marrakech', message: `Je suis souvent en télétravail, j'ai besoin d'un endroit calme.`, date: '2023-11-01', statut: 'Refusée', reponse: `Bonjour Youssef, désolé, je cherche quelqu’un avec un emploi du temps plus flexible.` },
    { id: 4, nom: 'Lina Zahraoui', ecole: 'Faculté des Sciences', message: 'Je cherche un logement proche des transports en commun.', budget: '1500 MAD/mois', date: '2023-08-20', quartier: 'Daoudiate', preferences: ['Flexible', 'Amicale'], statut: 'En attente' },
    { id: 5, nom: 'Hicham Bouziane', ecole: 'ENSA de Fès', message: 'Je préfère vivre avec un étudiant de la même filière.', date: '2023-09-10', statut: 'Refusée', reponse: `Bonjour Hicham, je ne suis pas de la même filière, donc ça risque de ne pas matcher.` },
    { id: 6, nom: 'Fatima Zahra', ecole: 'Faculté des Sciences', message: 'Je suis végétarienne et je préfère un coloc qui respecte ça.', date: '2023-09-18', statut: 'Acceptée', reponse: `Bonjour Fatima ! Je respecte totalement les choix alimentaires, on peut en discuter !` },
    { id: 7, nom: 'Fatima Zahra', ecole: 'Faculté des Sciences', message: 'Je suis végétarienne et je préfère un coloc qui respecte ça.', date: '2023-09-18', statut: 'En attente' },
    { id: 8, nom: 'Fatima Zahra', ecole: 'Faculté des Sciences', message: 'Je suis végétarienne et je préfère un coloc qui respecte ça.', date: '2023-09-18', statut: 'Refusée', reponse: `Bonjour Fatima, je ne pense pas qu’on soit compatibles niveau style de vie.` },
    { id: 9, nom: 'Fatima Zahra', ecole: 'Faculté des Sciences', message: 'Je suis végétarienne et je préfère un coloc qui respecte ça.', date: '2023-09-18', statut: 'Acceptée', reponse: `Merci pour ton message Fatima, ton profil me semble compatible, parlons-en !` },
    { id: 10, nom: 'Fatima Zahra', ecole: 'Faculté des Sciences', message: 'Je suis végétarienne et je préfère un coloc qui respecte ça.', date: '2023-09-18', statut: 'En attente' },
        { id: 11, nom: 'Fatima Zahra', ecole: 'Faculté des Sciences', message: 'Je suis végétarienne et je préfère un coloc qui respecte ça.', date: '2023-09-18', statut: 'En attente' },
            { id: 12, nom: 'Fatima Zahra', ecole: 'Faculté des Sciences', message: 'Je suis végétarienne et je préfère un coloc qui respecte ça.', date: '2023-09-18', statut: 'Acceptée', reponse: `Merci pour ton message Fatima, ton profil me semble compatible, parlons-en !` },


];


    const [value, setValue] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [currentPageAccepted, setCurrentPageAccepted] = React.useState(1);
    const [currentPageRefused, setCurrentPageRefused] = React.useState(1);
    const cardsPerPage = 3;

    const handlePageChange = (event, value) => setCurrentPage(value);
    const handlePageChangeAccepted = (event, value) => setCurrentPageAccepted(value);
    const handlePageChangeRefused = (event, value) => setCurrentPageRefused(value);

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
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {paginate(enAttente, currentPage).map(demande => (
                                <MyRequestCard key={demande.id} demande={demande} />
                            ))}
                        </Box>
                        {enAttente.length > cardsPerPage && (
                            <Box mt={3} display="flex" justifyContent="center">
                                <Pagination
                                    count={Math.ceil(enAttente.length / cardsPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="rgb(245 158 11)"
                                />
                            </Box>
                        )}
                    </TabPanel>

                    {/* Acceptées */}
                    <TabPanel value={value} index={1}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {paginate(accepted, currentPageAccepted).map(demande => (
                                <MyRequestCard key={demande.id} demande={demande} />
                            ))}
                        </Box>
                        {accepted.length > cardsPerPage && (
                            <Box mt={3} display="flex" justifyContent="center">
                                <Pagination
                                    count={Math.ceil(accepted.length / cardsPerPage)}
                                    page={currentPageAccepted}
                                    onChange={handlePageChangeAccepted}
                                    color="rgb(245 158 11)"
                                />
                            </Box>
                        )}
                    </TabPanel>

                    {/* Refusées */}
                    <TabPanel value={value} index={2}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {paginate(refused, currentPageRefused).map(demande => (
                                <MyRequestCard key={demande.id} demande={demande} />
                            ))}
                        </Box>
                        {refused.length > cardsPerPage && (
                            <Box mt={3} display="flex" justifyContent="center">
                                <Pagination
                                    count={Math.ceil(refused.length / cardsPerPage)}
                                    page={currentPageRefused}
                                    onChange={handlePageChangeRefused}
                                    color="rgb(245 158 11)"
                                />
                            </Box>
                        )}
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
}
