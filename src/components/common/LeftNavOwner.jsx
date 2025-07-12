import { X, House, MessageSquare, Bell, Settings, User, BadgePlus, ChartNoAxesColumnIncreasing } from 'lucide-react';
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/LeftNav.css';
import { ProfilContext } from '../../context/ProfilContext';

export default function LeftNavOwner({ openLogs, handleLogsClick }) {
  const [activeLink, setActiveLink] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { profil, loading } = useContext(ProfilContext);

  const Navigate = useNavigate();

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
  };

  const shouldShowNav = windowWidth >= 1280 || openLogs;
  const shouldShowCloseX = windowWidth < 1280 && openLogs;

  if (loading || !profil) return null; // Affiche rien ou un Skeleton si profil pas encore chargé

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

      <div className="content-nav" style={{ padding: '1rem 16px' }}>
        <div className="user">
          <Avatar sx={{ width: 38, height: 38 }} src={profil.urlAvatar} />
          <div className="user-data">
            <div className='name'>{profil.nom}</div>
            <div className='role'>{profil.role}</div>
          </div>
        </div>

        <div className="nav-links">
          <div className={`link ${activeLink === '' ? 'active' : ''}`} onClick={() => handleLinkClick('')}>
            <House size={20} />
            <span>Tableau de Bord</span>
          </div>
          <div className={`link ${activeLink === 'OwnerProperties' ? 'active' : ''}`} onClick={() => handleLinkClick('OwnerProperties')}>
            <House size={20} />
            <span>Mes Propriétés</span>
          </div>
          <div className={`link ${activeLink === 'OwnerAddProperty' ? 'active' : ''}`} onClick={() => handleLinkClick('OwnerAddProperty')}>
            <BadgePlus />
            <span>Ajouter une Propriété</span>
          </div>
          <div className={`link ${activeLink === 'messages' ? 'active' : ''}`} onClick={() => handleLinkClick('messages')} style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <MessageSquare size={20} />
              <span>Messages</span>
            </div>
            <span className="notification">3</span>
          </div>
          <div className={`link ${activeLink === 'OwnerDemandesRecus' ? 'active' : ''}`} onClick={() => handleLinkClick('OwnerDemandesRecus')} style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Bell size={20} />
              <span>Demandes Reçues</span>
            </div>
            <span className="notification">5</span>
          </div>
          <div className={`link ${activeLink === 'OwnerStatistiques' ? 'active' : ''}`} onClick={() => handleLinkClick('OwnerStatistiques')}>
            <ChartNoAxesColumnIncreasing />
            <span>Statistiques</span>
          </div>
          <div className={`link ${activeLink === 'OwnerProfilComp' ? 'active' : ''}`} onClick={() => handleLinkClick('OwnerProfilComp')}>
            <User size={20} />
            <span>Profil</span>
          </div>
          <div className={`link ${activeLink === 'OwnerParametres' ? 'active' : ''}`} onClick={() => handleLinkClick('OwnerParametres')}>
            <Settings size={20} />
            <span>Paramètres</span>
          </div>
        </div>
      </div>
    </div>
  );
}
