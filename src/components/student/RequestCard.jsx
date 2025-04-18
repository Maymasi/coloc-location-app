import React from 'react';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../utils/avatarUtils';
export default function RequestCard({ request }) { 
    return (
        <div className="request-card">
            <div className="request-card-header common-div">
                <Avatar {...stringAvatar(`${request.name}`)} />
                <div className="info">
                    <div className="name">{request.name}</div>
                    <div className="school">{request.school}</div>
                </div>
            </div>
            <div className="request-card-body ">
                <div className="info">
                    <div className="title">Budget :</div>
                    <span>{request.Budget} Mad/mois</span>
                </div>
                <div className="info">
                    <div className="title">Date d'emménagement :</div>
                    <span>{request.location}</span>
                </div>
                <div className="info">
                    <div className="title">Zone privilégiée :</div>
                    <span>{request.date}</span>
                </div>
            </div>
            <div className="see-profile">
                Voir le profil
            </div>
        </div>
    );
 }
