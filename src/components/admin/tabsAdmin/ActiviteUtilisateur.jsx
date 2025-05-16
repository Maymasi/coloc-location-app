import { Building, Flag, Users } from 'lucide-react';
import { Button } from '@mui/material';

export default function ActiviteUtilisateur() {
    const activiteStudent = [
        {
            activiteType: "location",
            Name: "John Smith",
            type: "Propriétaire",
            activiteDescrip: "A ajouté une nouvelle annonce: 'Appartement Studio Moderne'",
            time: "Aujourd'hui, 10:23"
        },
        {
            activiteType: "colocation",
            Name: "Emma Johnson",
            type: "Étudiant",
            activiteDescrip: "A créé une nouvelle demande de colocation dans le centre-ville",
            time: "Aujourd'hui, 9:45"
        },
        {
            activiteType: "signal",
            Name: "Michael Chen",
            type: "Étudiant",
            activiteDescrip: "A signalé une annonce comme frauduleuse",
            time: "Hier, 16:12"
        },
        {
            activiteType: "location",
            Name: "Sarah Williams",
            type: "Propriétaire",
            activiteDescrip: "A mis à jour le statut d'une propriété à 'Loué'",
            time: "Hier, 14:30"
        }
    ];

const iconActivite = {
    location: Building,
    colocation: Users,
    signal: Flag
};

const iconColors = {
    location: "#2e73f3",
    colocation: "#1ab248",
    signal: "#e24949"
};

return (
    <div className="activite-wrapper">
        <div className="activite-title">Activité récente des utilisateurs</div>
        <div className="activite-description">Dernières actions des utilisateurs de la plateforme</div>
        <div className="activites-list">
            {
            activiteStudent.map((activite, index) => {
                const IconComponent = iconActivite[activite.activiteType];
                const color = iconColors[activite.activiteType];
                return (
                <div key={index} className="activite-card">
                    <div className="activite-icon" style={{ backgroundColor: color }}>
                    <IconComponent size={20} color="white" />
                    </div>
                    <div className="activite-content">
                    <div className="activite-header">
                        <span className="activite-name">{activite.Name}</span>
                        <span className={`activite-role ${activite.type === "Propriétaire" ? 'proprietaire' : 'etudiant'}`}>
                        {activite.type}
                        </span>
                    </div>
                    <div className="activite-text">{activite.activiteDescrip}</div>
                    <div className="activite-time">{activite.time}</div>
                    </div>
                </div>
                )
            })
            }
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Button style={{fontSize:"12px",backgroundColor:"hsl(var(--primary)) ", textTransform:"none"}} variant="contained">Voir Toute l'activité utilisateur</Button>
        </div>
        
    </div>
);
}
