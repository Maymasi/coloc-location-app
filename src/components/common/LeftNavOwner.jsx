import { X, House, Heart, MessageSquare, Users, SquareLibrary, Bell, Settings, User, Menu,BadgePlus,ChartNoAxesColumnIncreasing} from 'lucide-react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/LeftNav.css';
import { useAuth } from '../../context/AuthContext';



export default function LeftNavOwner({ openLogs, handleLogsClick }) {
    const { user } = useAuth();
    const [activeLink, setActiveLink] = React.useState(null);
    const [isNavOpen, setIsNavOpen] = React.useState();
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const Navigate = useNavigate();
    const urlPhoto = localStorage.getItem('urlAvatar') || '/src/assets/images/defaultAvatar.jpg';

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        
        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        Navigate(`${linkName}`);
        setIsNavOpen(false); // Fermer la nav sur mobile après clic
    };

    const shouldShowNav = windowWidth >= 1280 || openLogs;
    const shouldShowCloseX = windowWidth < 1280 && openLogs;

    return (
        <div
            className="left-nav"
            style={{ display: shouldShowNav ? 'flex' : 'none' }}
        >
            <div className="logo">
                <img src="/src/assets/logos/Logo.png" alt="Logo" />
                <X 
                    className="closeX" 
                    onClick={handleLogsClick} 
                    style={{ cursor: 'pointer', display: shouldShowCloseX ? 'block' : 'none' }} 
                />
            </div>
            <Divider style={{ backgroundColor: 'hsl(0 ,0%, 92%)' }} />
            
            <div className="content-nav" style={{padding: '1rem 16px'}}>
                <div className="user">
                    <Avatar sx={{ width: 38, height: 38 }} style={{ backgroundColor: 'gray' }} src={urlPhoto} />
                    <div className="user-data">
                        <div className='name'>{user.nom}</div>
                        <div className='role'>{user.role}</div>
                    </div>
                </div>
                <div className="nav-links">                           
                    <div 
                        className={`link ${activeLink === 'OwnerDashboard' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('OwnerDashboard')}
                    >
                        <House size={20} />
                        <span>Tableau de Bord</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'OwnerProperties' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('OwnerProperties')}
                    >
                        <House size={20} />
                        <span>Mes Propriétés</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'OwnerAddProperty' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('OwnerAddProperty')}
                    >
                        <BadgePlus />
                        <span>Ajouter une Propriété</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'messages' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('messages')}
                        style={{ justifyContent: 'space-between' }}
                    >
                        <div className="" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <MessageSquare size={20} />
                            <span>Messages</span>
                        </div>
                        <span className="notification">3</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'OwnerDemandesRecus' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('OwnerDemandesRecus')}
                        style={{ justifyContent: 'space-between' }}
                    >
                        <div className="" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Bell size={20} />
                            <span>Demandes Reçues</span>
                        </div>
                        <span className="notification">5</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'OwnerStatistiques' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('OwnerStatistiques')}
                    >
                        <ChartNoAxesColumnIncreasing />
                        <span>Statistiques</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'OwnerProfilComp' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('OwnerProfilComp')}
                    >
                        <User size={20} />
                        <span>Profil</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'OwnerParametres' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('OwnerParametres')}
                    >
                        <Settings size={20} />
                        <span>Parametres</span>
                    </div>
                </div>
            </div>
        </div>
    )
}