import React, { useState, useEffect } from 'react';
import '../../assets/styles/AdminStyles/Analytiques.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import VueDensembleAnalytiques from './tabsAnalytiques/VueDensembleAnalytiques';
import Etudiants from './tabsAnalytiques/etudiants';
import Logements from './tabsAnalytiques/Logements';
import {getAnalytiquesAdminService} from '../../Services/AdminServices/analytiquesAdminService.js';

const Analytiques = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const data = await getAnalytiquesAdminService();
                setData(data);
                setCardsData([
                    {
                        title: "Taux d'occupation",
                        value: `${data?.tauxOccupation}%`,
                        desc: "Logements actuellement occupés",
                        icon: "fas fa-home",
                        bar: true,
                        fill: data?.tauxOccupation,
                        bg: "blue-bg"
                    },
                    {
                        title: "Utilisateurs",
                        value: data?.totalUtilisateurs,
                        desc: `${data?.totalEtudiants} Étudiants · ${data?.totalProprietaires} propriétaires`,
                        icon: "fas fa-user-friends",
                        bg: "green-bg"
                    },
                    {
                        title: "Réservations",
                        value: data?.totalReservations,
                        change: `${data?.evolutionReservationsPourcentage}%`,
                        changeType: data?.evolutionReservationsPourcentage > 0 ? "positive" : "negative",
                        desc: "vs mois dernier",
                        icon: "fas fa-calendar-alt",
                        bg: "purple-bg"
                    },
                    {
                        title: "Loyer moyen",
                        value: `${data?.prixLoyerMoyen}DH`,
                        desc: "Par mois, tous logements",
                        icon: "fas fa-building",
                        bg: "orange-bg"
                    }
                ])
                console.log("analytiques data",data);
            }
            catch(error){
                console.error("Error fetching analytiques data:", error);
            }
        }
        fetchData();
    },[]);
    const [cardsData, setCardsData] = useState([]);
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div style={{padding:"0px 10px"}} >
            <div className="top-analytiques">
                <div className="right-side-analytiques">
                    <div className="big-title-analytiques">Analytiques</div>
                    <div className="under-title-analytiques">Statistiques et performances de la plateforme de logement étudiant</div>
                </div>              
            </div>
            <div className="cards-analytiques">
                {cardsData.map((card, index) => (
                    <div className="card-analytiques" key={index}>
                    <div className="card-header">
                        <span className="card-title">{card.title}</span>
                        <div className={`card-icon ${card.bg}`}>
                        <i className={card.icon}></i>
                        </div>
                    </div>

                    <div className="card-value">{card.value}</div>

                    {card.bar && (
                        <div className="card-bar">
                        <div className="card-bar-fill" style={{ width: `${card.fill}%` }}></div>
                        </div>
                    )}

                    {card.change && (
                        <div className={`card-change ${card.changeType}`}>
                        {card.change} <span>{card.desc}</span>
                        </div>
                    )}

                    {!card.change && card.desc && (
                        <div className="card-desc">{card.desc}</div>
                    )}
                    </div>
                ))}
            </div>
            <div className="tabs-analytiques">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Vue d'ensemble" value="1" />
                                <Tab label="Logements" value="2" />
                                <Tab label="Etudiants" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1" style={{width:"100%"}}>
                            <VueDensembleAnalytiques data={data}/>
                        </TabPanel>
                        <TabPanel value="2">
                            <Logements data={data}/>
                        </TabPanel>
                        <TabPanel value="3">
                            <Etudiants data={data}/>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export default Analytiques
