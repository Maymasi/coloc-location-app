import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const messages = [
    {
        id: 1,
        name: 'John Doe',
        message: 'Hello, how are you?',
        date: '2023-10-01',
        role: 'etudiant'
    },
    {
        id: 2,
        name: 'Jane Smith',
        message: 'Are we still on for the meeting tomorrow?',
        date: '2023-10-02',
        role: 'proprietaire'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        message: 'Did you receive my last email?',
        date: '2023-10-03',
        role: 'etudiant'
    }
];
const card = (
  <React.Fragment >
    <CardContent>
      <Typography gutterBottom sx={{ color: 'black', fontSize: 17,fontWeight: '500' }}>
        Message Recent 
      </Typography>
      <Typography variant="h6" component="div" sx={{ color: 'hsl(0 0% 45%)', fontWeight: '400' ,fontSize: 14}}>
      Vos dernières conversations
      </Typography>
     
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function RecentMessage() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{borderRadius:'20px'}}>{card}</Card>
    </Box>
  );
}
