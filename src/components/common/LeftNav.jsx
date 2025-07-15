import {
  X, House, Heart, MessageSquare, Users,
  SquareLibrary, Bell, Settings, User,LayoutDashboard,
  BookOpenCheck
} from 'lucide-react';
import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/LeftNav.css';
import { useAuth } from '../../context/AuthContext';
import { getStudentDashboardStates } from '../../Services/studentDashboardService';
import { getUserProfileSummary } from '../../Services/getUserProfileSummary';

export default function LeftNav({ openLogs, handleLogsClick }) {
  const { user } = useAuth();
  const [activeLink, setActiveLink] = useState('/student');
  const [isNavOpen, setIsNavOpen] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const Navigate = useNavigate();

  const [userSummary, setUserSummary] = useState({
    name: '',
    role: '',
    avatarUrl: '/src/assets/images/defaultAvatar.jpg'
  });

  const [navStats, setNavStats] = useState({
    unreadMessages: 0,
    roommateRequests: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  Mémorisation de fetchUserSummary
  const fetchUserSummary = useCallback(async () => {
    const result = await getUserProfileSummary();
    if (result.data) {
      setUserSummary({
        name: result.data.nom,
        role: result.data.role,
        avatarUrl: result.data.avatarUrl || '/src/assets/images/defaultAvatar.jpg'
      });
    } else {
      console.error('User summary error:', result.error);
    }
  }, []);

  //  Fetch dashboard stats
  const fetchNavStats = async () => {
    try {
      const result = await getStudentDashboardStates();
      if (result.data) {
        setNavStats({
          unreadMessages: result.data.messagesNonLus || 0,
          roommateRequests: result.data.demandesDeColocataires || 0
        });
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

  useEffect(() => {
    fetchUserSummary();
    fetchNavStats();
  }, [fetchUserSummary]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUserSummary();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchUserSummary]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNavStats();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchNavStats();
        fetchUserSummary();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchUserSummary]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    Navigate(`${linkName}`);
    setIsNavOpen(false);
    if (linkName === 'messages' || linkName === 'demandesRecus') {
      setTimeout(() => {
        fetchNavStats();
      }, 1000);
    }
  };

  const shouldShowNav = windowWidth >= 1280 || openLogs;
  const shouldShowCloseX = windowWidth < 1280 && openLogs;

  return (
    <div className="left-nav" style={{ display: shouldShowNav ? 'flex' : 'none' }}>
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
          <Avatar
            sx={{ width: 38, height: 38 }}
            style={{ backgroundColor: 'gray' }}
            src={userSummary.avatarUrl}
          />
          <div className="user-data">
            <div className="name">{userSummary.name}</div>
            <div className="role">{userSummary.role}</div>
          </div>
        </div>
        <div className="nav-links">
            <div className={`link ${activeLink === '/' ? 'active' : ''}`} onClick={() => handleLinkClick('/')}>
                <House size={20} />
                <span>Accueil</span>
            </div>
          <div className={`link ${activeLink === '/student' ? 'active' : ''}`} onClick={() => handleLinkClick('/student')}>
            <LayoutDashboard size={19} />
            <span>Tableau de Bord</span>
          </div>
          <div className={`link ${activeLink === 'annonces' ? 'active' : ''}`} onClick={() => handleLinkClick('/annonces')}>
            <BookOpenCheck size={19} />
            <span>Annonces</span>
          </div>
          <div className={`link ${activeLink === 'favoris' ? 'active' : ''}`} onClick={() => handleLinkClick('favoris')}>
            <Heart size={19} />
            <span>Favoris</span>
          </div>
          <div
            className={`link ${activeLink === 'messages' ? 'active' : ''}`}
            onClick={() => handleLinkClick('messages')}
            style={{ justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <MessageSquare size={19} />
              <span>Messages</span>
            </div>
            {navStats.unreadMessages > 0 && (
              <span className="notification">{navStats.unreadMessages}</span>
            )}
          </div>
          <div className={`link ${activeLink === 'colocations' ? 'active' : ''}`} onClick={() => handleLinkClick('colocations')}>
            <Users size={19} />
            <span>Colocations</span>
          </div>
          <div
            className={`link ${activeLink === 'demandesRecus' ? 'active' : ''}`}
            onClick={() => handleLinkClick('demandesRecus')}
            style={{ justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Bell size={19} />
              <span>Demandes reçues</span>
            </div>
          </div>
          <div className={`link ${activeLink === 'mesDemandes' ? 'active' : ''}`} onClick={() => handleLinkClick('mesDemandes')}>
            <SquareLibrary size={19} />
            <span>Mes Candidatures</span>
            {navStats.roommateRequests > 0 && (
              <span className="notification">{navStats.roommateRequests}</span>
            )}
          </div>
          <div className={`link ${activeLink === 'profil' ? 'active' : ''}`} onClick={() => handleLinkClick('profil')}>
            <User size={19} />
            <span>Profil</span>
          </div>
          <div className={`link ${activeLink === 'parametres' ? 'active' : ''}`} onClick={() => handleLinkClick('parametres')}>
            <Settings size={19} />
            <span>Paramètres</span>
          </div>
        </div>
      </div>
    </div>
  );
}