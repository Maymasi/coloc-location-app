import React from 'react';
import { Home,Users,Heart,MessageSquare } from 'lucide-react';
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
        const [value, setValue] = React.useState(0);
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
          <div style={{ padding: '0 60px', marginBottom: '60px', height: '100%' }} className="student-dashboard">
            <header>
              <div className="info-student">
          <h1>Bienvenue, Oussama</h1>
          <p>Gérez vos recherches de logement et vos demandes de colocation</p>
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
            <div className="number">3</div>
          </div>
          <div className="icon">
            <Heart />
          </div>
              </div>
              <div className="card">
          <div className="content">
            <div className="title">Messages non lus</div>
            <div className="number">5</div>
          </div>
          <div className="icon">
            <MessageSquare />
          </div>
              </div>
              <div className="card">
          <div className="content">
            <div className="title">Demandes de colocataires</div>
            <div className="number">8</div>
          </div>
          <div className="icon">
            <Users />
          </div>
              </div>
              <div className="card">
          <div className="content">
            <div className="title">Vues de la propriété</div>
            <div className="number">12</div>
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