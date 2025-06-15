import { X, House, Heart, MessageSquare, Users, SquareLibrary, Bell, Settings, User, Menu } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/LeftNav.css';

export default function LeftNav({ openLogs, handleLogsClick }) {
    const [activeLink, setActiveLink] = React.useState(null);
    const [isNavOpen, setIsNavOpen] = React.useState();
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const Navigate = useNavigate();

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
            
            <div className="content-nav">
                <div className="user">
                    <Avatar sx={{ width: 38, height: 38 }} style={{ backgroundColor: 'black' }} alt="user" src="/src/assets/logos/logoColokMeak.png" />
                    <div className="user-data">
                        <div className='name'>User Name</div>
                        <div className='role'>Student</div>
                    </div>
                </div>
                <div className="nav-links">                           
                    <div 
                        className={`link ${activeLink === 'dashboard' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('')}
                    >
                        <House size={20} />
                        <span>Tableau de Bord</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'annonces' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('annonces')}
                    >
                        <House size={20} />
                        <span>Annonces</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'favoris' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('favoris')}
                    >
                        <Heart size={20} />
                        <span>Favoris</span>
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
                        className={`link ${activeLink === 'colocations' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('colocations')}
                    >
                        <Users size={20} />
                        <span>Colocations</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'demandesRecus' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('demandesRecus')}
                        style={{ justifyContent: 'space-between' }}
                    >
                        <div className="" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Bell size={20} />
                            <span>Demandes recus</span>
                        </div>
                        <span className="notification">5</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'mesDemandes' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('mesDemandes')}
                    >
                        <SquareLibrary size={20} />
                        <span>Mes demandes</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'profil' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('profil')}
                    >
                        <User size={20} />
                        <span>Profil</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'parametres' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('parametres')}
                    >
                        <Settings size={20} />
                        <span>Parametres</span>
                    </div>
                </div>
            </div>
        </div>
    )
}