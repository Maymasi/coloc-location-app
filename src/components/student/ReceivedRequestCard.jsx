import React from 'react'
import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import { stringAvatar } from '../../utils/avatarUtils'
import { MessageSquare, Check, X } from 'lucide-react'

export default function ReceivedRequestCard({ demande }) {
    return (
        <div className="receivedRequestCard" sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <div className="header-card" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <div variant="h6" className='title'>Demandes de colocation</div>
                <div variant="body2" className="state" sx={{ color: 'gray'}}   style={{
                        backgroundColor:
                        demande.statut === 'Acceptée' ? 'rgb(34 197 94)' :
                        demande.statut === 'Refusée' ? 'rgb(239 68 68)' :
                        'rgb(245 158 11)' // par défaut "En attente"
                    }}
                >{demande.statut || 'En attente'}</div>
            </div>
            <div className="content">
                <div className="user-info">
                    <Avatar {...stringAvatar(demande.nomEtudiant)} sx={{ width: 50, height: 50 }} />
                    <div className="user-details">
                        <div className='name'>{demande.nomEtudiant}</div>
                        <div className='school'>{demande.ecoleEtudiant}</div>
                    </div>
                </div>
                <div className="message">
                    <span>Message:</span> {demande.message}
                </div>
                <div className="home-details">
                    <div className="detail">
                        <div className='label'>Budget:</div>
                        <div className='value'>{demande.budget}</div>
                    </div>
                    <div className="detail">
                        <div className='label'>Date d'emménagement:</div>
                        <div className='value'>{demande.dateEmmenagement}</div>
                    </div>
                    <div className="detail">
                        <div className='label'>Quartier préféré:</div>
                        <div className='value'>{demande.colocationAdresse}</div>
                    </div>
                    <div className="preferences">
                        {demande.preferences.$values.map((pref, index) => (
                            <div className="preference" key={index}>{pref}</div>
                        ))}
                    </div>
                </div>
                <div className="buttons">
                    <div className="first">
                        <div className="profil bt">Voir profil</div>
                        <div className="message bt"><MessageSquare style={{ marginRight: '8px' }} size={15} /> Message</div>
                    </div>
                    <div className="second">
                        <div className="accept bt"><Check style={{ marginRight: '8px' }} size={15} />Accepter</div>
                        <div className="refuse bt"><X style={{ marginRight: '8px' }} size={15} />Refuser</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
