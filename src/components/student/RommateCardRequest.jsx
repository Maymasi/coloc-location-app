import React from 'react';
import {stringAvatar} from '../../utils/avatarUtils';
import { Avatar } from '@mui/material';
import { MessageSquare, User } from 'lucide-react';
export default function RoommateCardRequest({data}) {
  return (
    <div className="roommate-card">
      <div className="header">
        <div className="state">
          <div className="state-text" style={{ backgroundColor: data.type.toLowerCase() === 'demande' ? 'hsl(6deg 100% 72%)' : 'rgba(246, 156, 18, 0.984)' }}>
            {data.type} chambre
          </div>
        </div>
        <div className="name">
          <Avatar {...stringAvatar("Aussama", 'hsl(6deg 100% 72% / 10%)')} className='avatar' sx={{ width: 80, height: 80, backgroundColor: 'hsl(6deg 100% 72% / 10%)', color: 'hsl(6deg 100% 72%)', fontSize: '30px' }} />
        </div>
      </div>
      <div className="content">
        <div className="user-info">
          <div className="user-name">{data.name}</div>
          <div className="user-school">{data.school}</div>
        </div>
        <div className="user-details">
          <div className="detail">
            <div className="label">Budget :</div>
            <div className="value">{data.budget} Mad/mois</div>
          </div>
          <div className="detail">
            <div className="label">Date d'emménagement :</div>
            <div className="value">{data.moveInDate}</div>
          </div>
          <div className="detail">
            <div className="label">Zone privilégiée :</div>
            <div className="value">{data.preferredZone}</div>
          </div>
          <div className="preferences">
            <div className="item">
              Fumeur
            </div>
            <div className="item">
              Animaux
           </div>
            <div className="item">
              Propre
            </div>
            <div className="item">
              Calme
              </div>
          </div>
        <div className="btns">
          <div className="seeProfil btn">Voir le profil</div>
          <div className="sendMessage btn"><MessageSquare size={16}  style={{marginRight:'10px'}}/>Contact</div>
        </div>
        </div>
      </div>
    </div>
  );
}