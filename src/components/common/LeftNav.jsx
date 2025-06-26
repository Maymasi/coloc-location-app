import { X, House, Heart, MessageSquare, Users, SquareLibrary, Bell, Settings, User, Menu } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/LeftNav.css';
import { useAuth } from '../../context/AuthContext';
import { getStudentDashboardStates } from '../../Services/studentDashboardService';

export default function LeftNav({ openLogs, handleLogsClick }) {
    const {user} = useAuth();
    const [activeLink, setActiveLink] = React.useState(null);
    const [isNavOpen, setIsNavOpen] = React.useState();
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const Navigate = useNavigate();

    const [navStats, setNavStats] = useState({
        unreadMessages: 0,
        roommateRequests: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les statistiques
    const fetchNavStats = async () => {
        try {
            const result = await getStudentDashboardStates();
            
            if (result.data) {
                setNavStats({
                    unreadMessages: result.data.messagesNonLus || 0,
                    roommateRequests: result.data.demandesDeColocataires || 0
                });
                console.log('Nav Stats:', result.data);
                setError(null);
            } else {
                setError(result.error || 'Erreur lors du chargement des données');
            }
        } catch (err) {
            setError('Erreur lors du chargement des données');
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    };

    // Hook pour charger les données au montage du composant
    useEffect(() => {
        fetchNavStats();
    }, []);

    // Hook pour la mise à jour automatique toutes les 20 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            fetchNavStats();
        }, 20000); // 20 secondes

        return () => clearInterval(interval);
    }, []);

    // Hook pour écouter les changements de focus de l'onglet
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchNavStats();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

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
        
        // Rafraîchir les stats quand on clique sur messages ou demandes
        if (linkName === 'messages' || linkName === 'demandesRecus') {
            setTimeout(() => {
                fetchNavStats();
            }, 1000); // Petit délai pour laisser le temps à la page de se charger
        }
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
                        <div className='name'>{user.nom}</div>
                        <div className='role'>Student</div>
                    </div>
                </div>
                <div className="nav-links">                           
                    <div 
                        className={`link ${activeLink === 'dashboard' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('')}
                    >
                        <House size={19} />
                        <span>Tableau de Bord</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'annonces' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('/annonces')}
                    >
                        <House size={19} />
                        <span>Annonces</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'favoris' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('favoris')}
                    >
                        <Heart size={19} />
                        <span>Favoris</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'messages' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('messages')}
                        style={{ justifyContent: 'space-between' }}
                    >
                        <div className="" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <MessageSquare size={19} />
                            <span>Messages</span>
                        </div>
                        {navStats.unreadMessages > 0 && (
                            <span className="notification">{navStats.unreadMessages}</span>
                        )}
                    </div>
                    <div 
                        className={`link ${activeLink === 'colocations' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('colocations')}
                    >
                        <Users size={19} />
                        <span>Colocations</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'demandesRecus' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('demandesRecus')}
                        style={{ justifyContent: 'space-between' }}
                    >
                        <div className="" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Bell size={19} />
                            <span>Demandes recus</span>
                        </div>
                      
                    </div>
                    <div 
                        className={`link ${activeLink === 'mesDemandes' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('mesDemandes')}
                    >
                        <SquareLibrary size={19} />
                        <span>Mes Candidatures</span>
                          {navStats.roommateRequests > 0 && (
                            <span className="notification">{navStats.roommateRequests}</span>
                        )}
                    </div>
                    <div 
                        className={`link ${activeLink === 'profil' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('profil')}
                    >
                        <User size={19} />
                        <span>Profil</span>
                    </div>
                    <div 
                        className={`link ${activeLink === 'parametres' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('parametres')}
                    >
                        <Settings size={19} />
                        <span>Parametres</span>
                    </div>
                </div>
            </div>
        </div>
    )
}