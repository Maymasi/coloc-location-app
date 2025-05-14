import React from 'react'
import { Avatar } from '@mui/material'
import { stringAvatar } from '../../utils/avatarUtils'
import { MessageSquare, Check, X } from 'lucide-react'

export default function MyRequestCard({ demande }) {
    const isPending = demande.statut === 'En attente';
    const isAcceptedOrRefused = demande.statut === 'Acceptée' || demande.statut === 'Refusée';

    return (
        <div className="receivedRequestCard" sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <div className="header-card" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <div className="title">Demandes de colocation</div>
                <div
                    className="state"
                    style={{
                        color: 'white',
                        backgroundColor:
                            demande.statut === 'Acceptée' ? 'rgb(34 197 94)' :
                            demande.statut === 'Refusée' ? 'rgb(239 68 68)' :
                            'rgb(245 158 11)' // "En attente"
                    }}
                >
                    {demande.statut || 'En attente'}
                </div>
            </div>

            <div className="content">
                <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar {...stringAvatar(demande.nom)} sx={{ width: 50, height: 50 }} />
                    <div className="user-details">
                        <div className='name'>{demande.nom}</div>
                        <div className='school'>{demande.ecole}</div>
                    </div>
                </div>

                <div className="message" style={{ marginTop: 12 }}>
                    <span>Message:</span> {demande.message}
                </div>

                <div className="home-details" style={{ marginTop: 12 }}>
                    <div className="detail">
                        <div className='label'>Envoyée le:</div>
                        <div className='value'>{demande.date}</div>
                    </div>
                    {isAcceptedOrRefused && (
                        <div className="response" >
                            <h6>Réponse:</h6>
                            <div>{demande.reponse}</div>
                        </div>
                    )}
                </div>

                <div className="buttons" style={{ marginTop: 16 }}>
                    <div className="first" style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <div className="profil bt">Voir profil</div>
                        <div className="message bt"><MessageSquare size={15} style={{ marginRight: 8 }} /> Message</div>
                    </div>

                    {/* {isAcceptedOrRefused && (
                        <div className="second" style={{ display: 'flex', gap: 8 }}>
                            <div className="accept bt"><Check size={15} style={{ marginRight: 8 }} /> Accepter</div>
                            <div className="refuse bt"><X size={15} style={{ marginRight: 8 }} /> Refuser</div>
                        </div>
                    )} */}

                    { isPending&& (
                        <div className="cancel" style={{ marginTop: 8 }}>
                            <div className="cancel bt" style={{ color: 'red' }}>Annuler la demande</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
