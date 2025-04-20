import { Avatar } from '@mui/material';
import { stringAvatar } from '../../utils/avatarUtils';
import { Trash2, MessageSquare } from 'lucide-react';
import '../../assets/styles/userCss/dashbordStudent.css';
import '../../assets/styles/userCss/Favorites.css';
export default function FavoriteColocCard() {
    return (
        <div className="colocataire">
            <div className="header" >
                <div className="delete"><Trash2 size={18} className='delete-icon' /></div>
                <div className="name">
                    <Avatar {...stringAvatar('Kent Dodds','hsl(6deg 100% 72% / 10%)')} className='avatar' />
                </div>
            </div>
            <div className="info">
                <div className="name-person">Oussama Nouhar</div>
                <div className="school">Ensa safi</div>
            </div>
            <div className="content">
                <div className="detail">
                    <div className="label">Budget :</div>
                    <div className="value">299 Mad/mois</div>
                </div>
                <div className="detail">
                    <div className="label">Date d'emménagement :</div>
                    <div className="value">Prix</div>
                </div>
                <div className="detail">
                    <div className="label">Zone privilégiée :</div>
                    <div className="value">Centre Ville</div>
                </div>
            </div>
            <div className="footer">
                <div className="seeProfil">Voir le profil</div>
                <div className="sendMessage"><MessageSquare size={17} strokeWidth={2} style={{ marginRight: '20px' }} />Contact</div>
            </div>
        </div>
    );
}