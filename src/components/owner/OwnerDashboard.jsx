import React from 'react';
import { House,Users,Heart,MessageSquare,HousePlus,Eye } from 'lucide-react';
import '../../assets/styles/userCss/dashbordStudent.css';
import '../../assets/styles/ownerCss/dashboardOwnerCss.css';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardProperties from './DashboardProperties';
import RecentInquiries from './RecentInquiries';
import PropertyAnalytics from './PropertyAnalytics';
import RecentActivitydashboard from './RecentActivitydashboard';
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
          <div style={{  marginBottom: '60px', height: '100%' }} className="student-dashboard">
            <header>
              <div className="info-student">
          <h1>Bienvenue, Oussama</h1>
          <p>Gérez vos propriétés et les demandes des étudiants</p>
              </div>
              <div className="links">
          <div className="homes">
            <HousePlus  className="icon" />
            <div>Ajouter une propriété</div>
          </div>
              </div>
            </header>
            <div className="data-student">
              <div className="card">
          <div className="content">
            <div className="title">Annonces actives</div>
            <div className="number">3</div>
          </div>
          <div className="icon">
            <House />
          </div>
              </div>
              <div className="card">
          <div className="content">
            <div className="title">Nouvelles demandes</div>
            <div className="number">5</div>
          </div>
          <div className="icon">
            <MessageSquare />
          </div>
              </div>
              <div className="card">
          <div className="content">
            <div className="title">Nombre total de vues</div>
            <div className="number">8</div>
          </div>
          <div className="icon">
            <Eye />
          </div>
              </div>
              <div className="card">
          <div className="content">
            <div className="title">Locataires potentiels</div>
            <div className="number">12</div>
          </div>
          <div className="icon">
            <Users />
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
                  <Tab label="Mes propriétés" {...a11yProps(0)} className="tab" style={{ backgroundColor: 'white' }} />
                  <Tab label="Demande récentes " {...a11yProps(1)} className="tab" style={{paddingRight:0}}/>
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
          </div>
        );
}