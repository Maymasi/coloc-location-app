import React, { useState } from 'react';
import '../../assets/styles/AdminStyles/Analytiques.css';
import { Menu, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VueDensembleAnalytiques from './tabsAnalytiques/VueDensembleAnalytiques';
import Etudiants from './tabsAnalytiques/etudiants';
import Logements from './tabsAnalytiques/Logements';
import Reservations from './tabsAnalytiques/Reservations';
// icons
import { Funnel,Download  } from 'lucide-react';
const options = ['7 derniers jours', '30 derniers jours', '90 derniers jours', '1 an'];
const Analytiques = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('30 derniers jours');
    const [cardsData, setCardsData] = useState([
        {
            title: "Taux d'occupation",
            value: "87.5%",
            desc: "Logements actuellement occupés",
            icon: "fas fa-home",
            bar: true,
            fill: 87.5,
            bg: "blue-bg"
        },
        {
            title: "Utilisateurs",
            value: "8 426",
            desc: "Étudiants · 1254 propriétaires",
            icon: "fas fa-user-friends",
            bg: "green-bg"
        },
        {
            title: "Réservations",
            value: "2 845",
            change: "+12.4%",
            changeType: "positive",
            desc: "vs mois dernier",
            icon: "fas fa-calendar-alt",
            bg: "purple-bg"
        },
        {
            title: "Loyer moyen",
            value: "580€",
            desc: "Par mois, tous logements",
            icon: "fas fa-building",
            bg: "orange-bg"
        }
    ]);
    const [value, setValue] = React.useState('1');
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = (option) => {
        setAnchorEl(null);
        if (option) setSelectedPeriod(option);
    };
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
                <div className="left-side-analytiques">
                    <div className="btn-filtres-analytiques">
                        <Funnel  size={16}/>
                        <div style={{fontSize:"14px"}}>Filtres</div>
                    </div>
                    <div className='period-analytiques'>
                        <Button
                            className="period-button"
                            onClick={handleClick}
                            endIcon={<ArrowDropDownIcon />}
                        >
                            {selectedPeriod}
                        </Button>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose(null)}>
                            {options.map((option) => (
                            <MenuItem
                                key={option}
                                onClick={() => handleClose(option)}
                                className={option === selectedPeriod ? 'selected-item' : ''}
                            >
                                {option}
                            </MenuItem>
                            ))}
                        </Menu>
                    </div>
                    <div className="btn-exporter-analytiques">
                        <Download size={16}/>
                        <div style={{fontSize:"14px"}}>Exporter</div>
                    </div>
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
                                <Tab label="Réservation" value="4"></Tab>
                            </TabList>
                        </Box>
                        <TabPanel value="1" style={{width:"100%"}}>
                            <VueDensembleAnalytiques/>
                        </TabPanel>
                        <TabPanel value="2">
                            <Logements/>
                        </TabPanel>
                        <TabPanel value="3">
                            <Etudiants/>
                        </TabPanel>
                        <TabPanel value="4">
                            <Reservations/>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export default Analytiques
