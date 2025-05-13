import "../../../assets/styles/styleAnnonces.css"
import * as React from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { MapPin } from 'lucide-react';

export default function SearchHouse(){
    // states
    const [propertyType, setPropertyType] = React.useState('');
    const [priceRange, setPriceRange] = React.useState('');
    const [City,setCity] = React.useState('');
    // handlers
    const handleChangePropertyType = (event) => {
        setPropertyType(event.target.value);
    };
    const handleChangeCity = (event)=>{
        setCity(event.target.value)
    }
    const handleChangePriceRange = (event) => {
        setPriceRange(event.target.value);
    };

    return(
        <div className="SearchContainer">
            <div className="BigTitleSearch">Find Your Perfect Student Housing</div>
            <div className="bar">
                <div className="cityOrCampus">
                    <MapPin size={"22px"}/>
                    <input value={City} onChange={handleChangeCity} type="text" placeholder="City or Campus"/>
                </div>
                <FormControl fullWidth className="selectForm">
                    <InputLabel id="demo-simple-select-label" sx={{
                        '&.Mui-focused': {
                        color: '#ff6b5c', // ta couleur personnalisée
                        },
                    }}
                    >Property Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={propertyType}
                    label="property Type"
                    onChange={handleChangePropertyType}
                    sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ff6b5c',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ff6b5c',
                        },
                        '.MuiSvgIcon-root': {
                            color: '#ff6b5c',
                        },
                        borderRadius: "12px",
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderRadius: '12px',
                        },
                        textAlign:"start"
                    }}
                    >
                    <MenuItem value={10}>All Types</MenuItem>
                    <MenuItem value={20}>Apartment</MenuItem>
                    <MenuItem value={30}>House</MenuItem>
                    <MenuItem value={30}>Room</MenuItem>
                    <MenuItem value={30}>Studio</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth className="selectForm">
                    <InputLabel id="demo-simple-select-label" sx={{
                            '&.Mui-focused': {
                            color: '#ff6b5c', // ta couleur personnalisée
                            },
                    }}>Price Range</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={priceRange}
                    label="Price Range"
                    onChange={handleChangePriceRange}
                    sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ff6b5c',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ff6b5c',
                        },
                        '.MuiSvgIcon-root': {
                            color: '#ff6b5c',
                        },
                        borderRadius: "12px",
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderRadius: '12px',
                        },
                        textAlign:"start"
                    }}
                    >
                    <MenuItem value={10}>Any Price</MenuItem>
                    <MenuItem value={20}>Under $500</MenuItem>
                    <MenuItem value={30}>Under $1,000</MenuItem>
                    <MenuItem value={30}>Under $1,500</MenuItem>
                    <MenuItem value={30}>Under $2,000</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" className="searchButton">Search</Button>
            </div>
        </div>
    );
}