import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Devider from '@mui/material/Divider';
import { stringAvatar } from '../../utils/avatarUtils';
import { stringToColor } from '../../utils/avatarUtils';
const messages = [
    {
        id: 1,
        name: 'John Doe',
        message: 'Hello, how are you?ghfghfgffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        date: '2023-10-01',
        role: 'etudiant'
    },
    {
        id: 2,
        name: 'Jane Smith',
        message: 'Are we still on for the meefffffffffffffffffffffffffffffffffffff',
        date: '2023-10-02',
        role: 'proprietaire'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        message: 'Did you receive my last email?ffffffffffffffffffffffffffffffffffff',
        date: '2023-10-03',
        role: 'etudiant'
    }
];
function truncateMessage(message) {
  if (message.length > 80) {
    return message.substring(0, 80) + '...';
  }
  return message;
}


const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'black', fontSize: 17, fontWeight: '500' }}>
      Messages récents
      </Typography>
      <Typography variant="h6" component="div" sx={{ color: 'hsl(0 0% 45%)', fontWeight: '400', fontSize: 14 }}>
        Vos dernières conversations
      </Typography>
      <div className="messages" style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
      {messages.map((message) => (
        <div key={message.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center',gap:'20px' }}>
          <Avatar sx={{ fontSize: '12px', marginRight: '10px' }} {...stringAvatar(`${message.name}`)} />
          <div className="info" style={{width:'100%'}}>
            <div className="header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className="name" style={{ fontWeight: '500',textTransform:'capitalize' }}>{message.name} ({message.role})</div>
              <div className="date" style={{ fontSize: '12px', color: 'gray' }}>
                {new Date(message.date).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </div>
            </div>
            <div className="message" style={{ fontSize: '14px', color: 'hsl(0 0% 45%)' ,width:'100%',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
              {truncateMessage(message.message)}
            </div>
          </div>
          
        </div>
        
      ))}
     
      </div>
    </CardContent>
    <CardActions>
      <Button size="small" style={{width:'100%'}} className='btn'>Afficher tout les Messages</Button>
    </CardActions>
  </React.Fragment>
);
export default function RecentMessage() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{borderRadius:'20px', height:'400px'}}>{card}</Card>
    </Box>
  );
}
