import React from 'react';
import { Home, Users, Heart, MessageSquare } from 'lucide-react';
import '../../assets/styles/userCss/dashbordStudent.css';
import '../../assets/styles/userCss/favorites.css';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoritesProperties from './FavoritesProperties';
import FavoritesColocataires from './FavoritesColocataires';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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

export default function Favorites() {
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
        <div className="favorites">
            <div className="title">
                <div className="main-title">Mes favoris</div>
                <div className="sub-title">Gérez vos propriétés enregistrées et vos demandes de colocataires</div>
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
                    <Tab label="Propriétés" {...a11yProps(0)} className="tab" style={{ backgroundColor: 'white' }} />
                    <Tab label="Colocataires" {...a11yProps(1)} className="tab" />
                </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} style={{ width: '100%', marginTop: '10px' }}>
                    <FavoritesProperties/>
                </TabPanel>
                <TabPanel value={value} index={1} style={{ width: '100%', marginTop: '10px' }}>
                    <FavoritesColocataires/>
                </TabPanel>
            </Box>

        </div>
    )
}
