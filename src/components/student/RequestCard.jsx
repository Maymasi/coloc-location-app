import React from 'react';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../utils/avatarUtils';
export default function RequestCard({ request }) { 
    return (
        <div className="request-card">
            <div className="request-card-header common-div">
                <Avatar {...stringAvatar(`${request.prenomDemandeur}`)} />
                <div className="info">
                    <div className="name">{request.prenomDemandeur} {request.nomDemandeur}</div>
                    <div className="school">{request.universiteDemandeur}</div>
                </div>
            </div>
            <div className="request-card-body ">
                <div className="info">
                    <div className="title">Budget :</div>
                    <span>{request.budgetDemandeur} Mad/mois</span>
                </div>
                <div className="info">
                    <div className="title">Date d'emménagement :</div>
                    <span>{request.dateEmmenagement.split('T')[0]}</span>
                </div>
                <div className="info">
                    <div className="title">Zone privilégiée :</div>
                    <span>{request.adresse}</span>
                </div>
            </div>
            <div className="see-profile">
                Voir le profil
            </div>
        </div>
    );
 }
