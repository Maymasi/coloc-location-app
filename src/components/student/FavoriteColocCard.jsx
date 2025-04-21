import { Avatar } from '@mui/material';
import { stringAvatar } from '../../utils/avatarUtils';
import { Trash2, MessageSquare } from 'lucide-react';
import '../../assets/styles/userCss/dashbordStudent.css';
import '../../assets/styles/userCss/Favorites.css';

export default function FavoriteColocCard({ favorite }) {
    return (
        <div className="colocataire">
            <div className="header">
                <div className="delete"><Trash2 size={18} className='delete-icon' /></div>
                <div className="name">
                    <Avatar {...stringAvatar(favorite.name, 'hsl(6deg 100% 72% / 10%)')} className='avatar' />
                </div>
            </div>
            <div className="info-coloc">
                <div className="name-person">{favorite.name}</div>
                <div className="school">{favorite.school}</div>
            </div>
            <div className="content">
                <div className="detail">
                    <div className="label">Budget :</div>
                    <div className="value">{favorite.budget} Mad/mois</div>
                </div>
                <div className="detail">
                    <div className="label">Date d'emménagement :</div>
                    <div className="value">{favorite.moveInDate}</div>
                </div>
                <div className="detail">
                    <div className="label">Zone privilégiée :</div>
                    <div className="value">{favorite.preferredZone}</div>
                </div>
            </div>
            <div className="footer">
                <div className="seeProfil">Voir le profil</div>
                <div className="sendMessage"><MessageSquare size={17} strokeWidth={2} style={{ marginRight: '20px' }} />Contact</div>
            </div>
        </div>
    );
}