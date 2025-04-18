import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MapPin } from 'lucide-react';
const properties = [
  {
    id: 1,
    title: "Appartement à Paris",
    location: "Paris, France",
    price: "500",
    type: "Appartement",
    image: "/src/assets/images/home.jpg",
  },
  {
    id: 2,
    title: "Appartement à Paris",
    location: "Paris, France",
    price: "500",
    type: "Appartement",
    image: "/src/assets/images/home.jpg",
  },
  {
    id: 3,
    title: "Appartement à Paris",
    location: "Paris, France",
    price: "500",
    type: "Appartement",
    image: "/src/assets/images/home.jpg",
  },
];

const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'black', fontSize: 17, fontWeight: '500' }}>
        Vues récentes de propriétés
      </Typography>
      <Typography variant="h6" component="div" sx={{ color: 'hsl(0 0% 45%)', fontWeight: '400', fontSize: 14 }}>
        Propriétés que vous avez récemment consultées
      </Typography>
      <div className="all-prop">
        {properties.map((property) => (
          <div className="content" key={property.id}>
            <div className="image">
              <img src={property.image} alt="home" />
            </div>
            <div className="info">
              <div className="title">{property.title}</div>
              <div className="location">
                <MapPin style={{ width: '15px', marginRight: '5px' }} />
                {property.location}
              </div>
              <div className="price-type">
                <div className="price">
                  {property.price} <span>Mad</span>/<span>mois</span>
                </div>
                <div className="type">{property.type}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
    <CardActions>
      <Button size="small" style={{ width: '100%' }} className="btn">
        Afficher tout les Messages
      </Button>
    </CardActions>
  </React.Fragment>
);

export default function RecentProperties() {
  return (
    <Box sx={{ minWidth: 275 }} className='recent-properties'>
      <Card variant="outlined" sx={{borderRadius:'20px', height:'400px'}}>{card}</Card>
    </Box>
  );
}
