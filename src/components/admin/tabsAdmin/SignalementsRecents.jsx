import { Flag } from 'lucide-react';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function SignalementsRecents({data}) {
    const [signalements, setSignalements] = useState([]);
    useEffect(() => {
        setSignalements(data.recentReports.$values);
    },[data]);
    const getStatutColor = (statut) => {
        switch (statut) {
            case 'EnAttente':
                return '#fb8c00'; // jaune 
            case 'Resolu':
                return '#4caf50'; // vert
            case 'Rejete':
                return '#d84315'; // rouge
            default:
                return '#9E9E9E'; // gris par défaut
        }
    };
    return (
        <div className="activite-wrapper">
            <div className="activite-title">Signalements récents</div>
            <div className="activite-description">Signalements nécessitant une modération</div>
            <div className="activites-list">
                {signalements.map((signalement, index) => (
                <div key={index} className="activite-card">
                    <div className="activite-icon" style={{ backgroundColor:getStatutColor(signalement.statut)}}>
                    <Flag size={20} color="white" />
                    </div>
                    <div className="activite-content">
                    <div className="activite-header">
                        <span className="activite-name">{signalement.statut}</span>
                    </div>
                    <div className="activite-text">Signalé par: {signalement.signalePar}</div>
                    <div className="activite-text">Déscription : {signalement.description}</div>
                    <div className="activite-buttons">
                        <button className="btn-examiner">Examiner</button>
                        <button className="btn-ignorer">Ignorer</button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button 
                    style={{fontSize:"12px",backgroundColor:"white", textTransform:"none",color:"black"}} 
                    variant="contained"
                    href="/admin/signalements"
                >
                    Voir Tous les signalements
                </Button>
            </div>
        </div>
    );
}
