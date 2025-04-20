import React from 'react';
import { MapPin, Dot, Trash2, MessageSquare } from 'lucide-react';
import '../../assets/styles/userCss/Favorites.css';
import '../../assets/styles/userCss/dashbordStudent.css';

export default function FavoritePropCard({ favorite }) {
    return (
        <div className="colocataire">
            <div className="head" style={{ backgroundImage: `url(${favorite.image || '/src/assets/images/home.jpg'})` }}>
                <div className="info">
                    <div className="type">{favorite.type || 'Type inconnu'}</div>
                    <div className="delete"><Trash2 size={18} /></div>
                </div>
            </div>
            <div className="content">
                <div className="title-price">
                    <div className="title">{favorite.title || 'Titre non disponible'}</div>
                    <div className="price">{favorite.price ? `${favorite.price} MAD/mois` : 'Prix non disponible'}</div>
                </div>
                <div className="location">
                    <MapPin className="location-icon" size={15} />
                    <span className="location-text">{favorite.location || 'Localisation inconnue'}</span>
                </div>
                <div className="details">
                    <div className='details-info'>
                        <div className="detail">{favorite.chambres ? `${favorite.chambres} chambres` : 'Chambres non spécifiées'}</div>
                        <Dot />
                        <div className="detail">{favorite.bathrooms ? `${favorite.bathrooms} colocataires` : 'Colocataires non spécifiés'}</div>
                    </div>
                    <div className="state">{favorite.state || 'État non spécifié'}</div>
                </div>
            </div>
            <div className="footer">
                <div className="seeProfil">Voir</div>
                <div className="sendMessage"><MessageSquare size={17} strokeWidth={2} style={{ marginRight: '20px' }} />Contact</div>
            </div>
        </div>
    );
}