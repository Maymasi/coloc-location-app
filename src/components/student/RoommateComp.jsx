import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
// MUI Components
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

// Icons
import { Users, Search } from 'lucide-react';

// Styles
import '../../assets/styles/roomateCss/rommateComp.css';
//components
import RoommateCardRequest from './rommateCardRequest';
import ListRommatePage from './ListRommatePage';
//import context
import { RommateContext } from '../../context/RommateContext';
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

const names = [
  'Non-fumeur',
  'Pas d\'animaux',
  'Étudiant',
  'Travailleur',
  'Calme',
  'Amical',
  'Propre',
  'Sportif',
  'Végétarien',
  'Musicien',
  'Cuisinier',
  'Voyageur',
  'Joueur',
  'Timide',
  'Sociable',
  'Simple',
  'Créatif',
  'Aime les films',
  'Aime la photo',
  'Aime lire',
  'Reste tard',
  'Se lève tôt',
  'Fêtard',
  'Travaille à distance',
  'Silencieux',
  'Bavard',
  'Organisé',
  'Flexible',
  'Chaleureux',
  'Respectueux',
];

function getStyles(name, preference, theme) {
  return {
    fontWeight: preference.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}
    const data = [
        { id: 1, name: 'Oussama', school: 'ESI', budget: 3000, moveInDate: '01/10/2023', preferredZone: 'Agdal',type:'Offre' },
        { id: 2, name: 'Ahmed', school: 'ENSIAS', budget: 2500 , moveInDate: '15/10/2023', preferredZone: 'Hay Riad', type:'Demande' },
        { id: 3, name: 'Sara', school: 'EMI', budget: 3500 , moveInDate: '01/11/2023', preferredZone: 'Centre Ville' , type:'Offre' },
        { id: 4, name: 'Fatima', school: 'FSI', budget: 2800 , moveInDate: '20/10/2023', preferredZone: 'Agdal' , type:'Demande' },
        { id: 5, name: 'Youssef', school: 'ENSA', budget: 3200 , moveInDate: '01/12/2023', preferredZone: 'Hay Riad' , type:'Offre' },
        { id: 6, name: 'Mouad', school: 'FST', budget: 2700 , moveInDate: '15/11/2023', preferredZone: 'Centre Ville' , type:'Demande' },
        { id: 7, name: 'Laila', school: 'ENCG', budget: 3000 , moveInDate: '01/10/2023', preferredZone: 'Agdal' , type:'Offre' },
        { id: 8, name: 'Khalid', school: 'FSI', budget: 2500 , moveInDate: '15/10/2023', preferredZone: 'Hay Riad' , type:'Demande' },  
        { id: 9, name: 'Nadia', school: 'EMI', budget: 3500 , moveInDate: '01/11/2023', preferredZone: 'Centre Ville' , type:'Offre' },
        { id: 10, name: 'Hassan', school: 'ENSIAS', budget: 2800 , moveInDate: '20/10/2023', preferredZone: 'Agdal' , type:'Demande' },
        { id: 11, name: 'Amina', school: 'ENSA', budget: 3200 , moveInDate: '01/12/2023', preferredZone: 'Hay Riad' , type:'Offre' },
        // Ajoutez plus de données si nécessaire
    ];
export default function RoommateComp(){

    // State for managing the filtered data
    const [filterData, setFilterData] = useState(data);

      const [coloc,setColoc]=useState({
        preferences:[],
        budget:1,
      });
        // Theme for MUI components
        const theme = useTheme();

        // State for managing the active tab
        const [value, setValue] = React.useState(0);

        // State for managing selected preferences
        const [preference, setPreference] = React.useState([]);

        // State for managing the selected budget
        const [budget, setBudget] = React.useState('');

        // State for controlling the open/close state of the budget dropdown
        const [open, setOpen] = React.useState(false);

        // Handle tab change
        const handleChange = (event, newValue) => {
            setValue(newValue);

            // Update tab styles dynamically
            const tabs = document.querySelectorAll('button.MuiTab-root');
            tabs.forEach(tab => {
          tab.style.backgroundColor = ''; // Reset background color for all tabs
          tab.style.color = ''; // Reset text color for all tabs
            });
            tabs[newValue].style.backgroundColor = 'white'; // Highlight the active tab
            tabs[newValue].style.color = 'black'; // Change text color for the active tab
        };

        // Handle budget selection change
        const handleChangeSelect = (event) => {
            setBudget(event.target.value);
            console.log(event.target.value); // Log the selected budget value
            setColoc({...coloc,budget:event.target.value});
            console.log(coloc)
        };

        // Close the budget dropdown
        const handleClose = () => {
            setOpen(false);
        };

        // Open the budget dropdown
        const handleOpen = () => {
            setOpen(true);
        };

        // Handle preference selection change
        const handleChangePreferences = (event) => {
            const {
          target: { value },
            } = event;

            // Update preferences state
            setPreference(
          typeof value === 'string' ? value.split(',') : value, // Handle stringified values
            );
            setColoc({...coloc,preferences:event.target.value});
            console.log(coloc)

        };
        //search filter
        const handleSearch = (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const filteredData = data.filter((item) =>
              item.name.toLowerCase().includes(searchTerm) ||
              item.school.toLowerCase().includes(searchTerm) ||
              item.preferredZone.toLowerCase().includes(searchTerm)
            );
            setFilterData(filteredData);
          };
    return (
      <div className="roommate-page"> 
        <div className="header">
          <div className="title">
          <div className="fonctionnality">Trouver des colocataires</div>
          <div className="description">Connectez-vous avec des colocataires potentiels près de votre campus</div>
          </div>
          <div className="create-request "><Users size={16} style={{marginRight:'10px'}} />Créer une demande</div>
        </div>
        <div className="roommate-filter">
          <TextField
            placeholder='Rechercher par nom, université, ville...'
            id="outlined-start-adornment"
            sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
              borderColor: 'hsl(6 100% 72%)', // Change border color on focus
              },
            },
            }}
            slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
            },
            }}
            onChange={handleSearch} // Call the search function on input change
          />
          <div className="search-field">
            <FormControl
              className='select-budget'
              sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                
                borderColor: 'hsl(6 100% 72%)', // Change border color on focus
                }, 
              },
              }}
            >
              <InputLabel id="demo-controlled-open-select-label" sx={{
              '&.Mui-focused': {
                color: 'hsl(6 100% 78%)', // Change label color on focus
              },
              }}  >Budget</InputLabel>
              <Select
              
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={budget}
              label="Budget"
              onChange={handleChangeSelect}
              >
              <MenuItem value="1">
                Tout les budgets
              </MenuItem>
              <MenuItem value={1000}>Moins de 1000 Mad/mois</MenuItem>
              <MenuItem value={1500}>Moins de 1500 Mad/mois</MenuItem>
              <MenuItem value={2000}>Moins de 2000 Mad/mois</MenuItem>
              <MenuItem value={2500}>Moins de 2500 Mad/mois</MenuItem>
              <MenuItem value={3000}>Moins de 3000 Mad/mois</MenuItem>
              <MenuItem value={3500}>Moins de 3500 Mad/mois</MenuItem>
              <MenuItem value={4000}>Plus de 4000 Mad/mois</MenuItem>
              </Select>
            </FormControl>
            <div className="search-btn"><Search size={17} style={{marginRight:'14px'}}/>Rechercher</div>
          </div>
          <FormControl sx={{ m: 1, width: '60%' ,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                  
                  borderColor: 'hsl(6 100% 72%)', // Change border color on focus
                  },
                  
                },
          }}>
            <InputLabel id="demo-multiple-chip-label" sx={{
            '&.Mui-focused': {
              color: 'hsl(6 100% 78%)', // Change label color on focus
            },

            }} >Préférences</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={preference}
              onChange={handleChangePreferences}
              input={<OutlinedInput id="select-multiple-chip" label="Préférences" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 ,maxLines: 1}}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, preference, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            <Tab label="Toutes les demandes" {...a11yProps(0)} className="tab" style={{ backgroundColor: 'white' }} />
            <Tab label="Recherche chambre" {...a11yProps(1)} className="tab" />
            <Tab label="Offre chambre" {...a11yProps(2)} className="tab" />
          </Tabs>
          </AppBar>
            <TabPanel value={value} index={0} style={{ width: '100%', marginTop: '10px' }}>
            <ListRommatePage data={filterData}/>
            </TabPanel>
            <TabPanel value={value} index={1} style={{ width: '100%', marginTop: '10px' }}>
              <ListRommatePage data={
                filterData.filter((item) => item.type.toLowerCase() === 'demande')
              }/>
            </TabPanel>
            <TabPanel value={value} index={2} style={{ width: '100%', marginTop: '10px' }}>
              <ListRommatePage data={
                filterData.filter((item) => item.type.toLowerCase() === 'offre')
              }/>
            </TabPanel>
        </Box>
      </div>
    );
}