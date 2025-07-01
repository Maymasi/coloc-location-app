import { Building, Flag, Users } from 'lucide-react';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ActiviteUtilisateur({data}) {
const [lastActivites,setLastActivities] = useState([]);    
useEffect(() => {
    setLastActivities(data?.lastActivities.$values)
},[data]);
// const iconActivite = {
//     location: Building,
//     colocation: Users,
//     signal: Flag
// };

// const iconColors = {
//     location: "#2e73f3",
//     colocation: "#1ab248",
//     signal: "#e24949"
// };

return (
    <div className="activite-wrapper">
        <div className="activite-title">Activité récente des utilisateurs</div>
        <div className="activite-description">Dernières actions des utilisateurs de la plateforme</div>
        <div className="activites-list">
            {
            lastActivites.map((activite, index) => {
                // const IconComponent = iconActivite[activite.activiteType];
                // const color = iconColors[activite.activiteType] || "#ccc"; 
                return (
                <div key={index} className="activite-card">
                    <div className="activite-icon" style={{ backgroundColor: "#2e73f3" }}>
                        <Building size={20} color="white" />
                    </div>
                    <div className="activite-content">
                    <div className="activite-header">
                        <span className="activite-name">{activite.fullName}</span>

                    </div>
                    <div className="activite-text">{activite.action}</div>
                    <div className="activite-time">{activite.date}</div>
                    </div>
                </div>
                )
            })
            }
        </div>
    </div>
);
}
