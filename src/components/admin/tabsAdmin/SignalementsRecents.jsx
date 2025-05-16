import { Flag } from 'lucide-react';
import { Button } from '@mui/material';

export default function SignalementsRecents() {
    const signalements = [
        {
            type: 'Annonce frauduleuse',
            user: 'Emma Johnson',
            description: "Cette annonce contient des photos qui ne correspondent pas à la propriété réelle.",
            priorite: 'Haute',
            couleur: '#f44336' 
        },
        {
            type: 'Comportement abusif',
            user: 'Michael Chen',
            description: "Ce propriétaire a été très impoli et agressif lors de notre communication.",
            priorite: 'Moyenne',
            couleur: '#fbc02d' 
        },
        {
            type: 'Contenu inapproprié',
            user: 'Sarah Williams',
            description: "J'ai reçu des messages inappropriés de cet utilisateur.",
            priorite: 'Haute',
            couleur: '#f44336'
        },
        {
            type: 'Annonce spam',
            user: 'David Lee',
            description: "Cette annonce de colocation semble être du spam, elle est publiée plusieurs fois par jour.",
            priorite: 'Basse',
            couleur: '#3f51b5' 
        }
    ];

    const getPriorityClass = (priorite) => {
        if (priorite === 'Haute') return 'priorite haute';
        if (priorite === 'Moyenne') return 'priorite moyenne';
        if (priorite === 'Basse') return 'priorite basse';
        return 'priorite';
    };

    return (
        <div className="activite-wrapper">
            <div className="activite-title">Signalements récents</div>
            <div className="activite-description">Signalements nécessitant une modération</div>
            <div className="activites-list">
                {signalements.map((signalement, index) => (
                <div key={index} className="activite-card">
                    <div className="activite-icon" style={{ backgroundColor: signalement.couleur }}>
                    <Flag size={20} color="white" />
                    </div>
                    <div className="activite-content">
                    <div className="activite-header">
                        <span className="activite-name">{signalement.type}</span>
                        <span className={getPriorityClass(signalement.priorite)}>
                        {signalement.priorite}
                        </span>
                    </div>
                    <div className="activite-text">Signalé par: {signalement.user}</div>
                    <div className="activite-text">{signalement.description}</div>
                    <div className="activite-buttons">
                        <button className="btn-examiner">Examiner</button>
                        <button className="btn-ignorer">Ignorer</button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button style={{fontSize:"12px",backgroundColor:"white", textTransform:"none",color:"black"}} variant="contained">Voir Tous les signalements</Button>
            </div>
        </div>
    );
}
