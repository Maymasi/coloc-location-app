import React from 'react'
import  '../../assets/styles/AdminStyles/DashboardAdmin.css'
import { Flag,Users,MessageSquare,Building,  } from 'lucide-react';

const cardsInfo = [
    {title:"Utilisateurs totaux",number:1248,icon:"Users",evolutionMsg:"+12% depuis le mois dernier",color:"#00c853"},
    {title:"Propriétés actives",number:356,icon:"Building",evolutionMsg:"+8% depuis le mois dernier",color:"#00c853"},
    {title:"Messages aujourd'hui",number:124,icon:"MessageSquare",evolutionMsg:"+15% par rapport à hier",color:"#00c853"},
    {title:"Signalements en attente",number:8,icon:"Flag",evolutionMsg:"+3 nouveaux aujourd'hui",color:"#ff5722"},
]
const iconMap = {
    Users: Users,
    Building: Building,
    MessageSquare: MessageSquare,
    Flag: Flag
};
const AdminDashboard = () => {

    return (
        <div style={{padding:"0px 10px"}}>
            <div className="top-admin-dashboard">
                <div className="right-side-admin-dashboard">
                    <div className="big-title-admin-dashboard">Tableau de bord administrateur</div>
                    <div className="under-title-admin-dashboard">Vue d'ensemble et gestion de la plateforme</div>
                </div>
                <div className="left-side-admin-dashboard">
                    <div className="btn-signalement-admin-dashboard">
                        <Flag size={20}/>
                        <div style={{fontSize:"14px"}}>Signalements</div>
                    </div>
                    <div className="btn-utilisateurs-admin-dashboard">
                        <Users size={20}/>
                        <div style={{fontSize:"14px"}}>Utilisateurs</div>
                    </div>
                </div>                
            </div>
            <div className="cards-admin-dashboard">
                {cardsInfo.map((cardInfo)=>{
                    const IconComponent = iconMap[cardInfo.icon];
                    return(
                        <div className="card-admin-dashboard">
                            <div className="title-card-admin">{cardInfo.title}</div>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <div style={{fontSize:"24px",fontWeight:"700"}}>{cardInfo.number}</div>
                                <div className="icon-card-admin-dashboard">
                                    <IconComponent size={19}/>
                                </div>
                            </div>
                            <div className="evolution" style={{color:cardInfo.color}}>{cardInfo.evolutionMsg}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminDashboard
