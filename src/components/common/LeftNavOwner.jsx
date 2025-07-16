import { X, House, MessageSquare, Bell, Settings, User, BadgePlus, ChartNoAxesColumnIncreasing, LayoutDashboard, MapPinHouse } from 'lucide-react';
import * as React from 'react';
import { useState, useEffect, useContext, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/styles/LeftNav.css';
import { ProfilContext } from '../../context/ProfilContext';
import { getOwnerStats } from '../../Services/OwnerStatsService';

export default function LeftNavOwner({ openLogs, handleLogsClick }) {
  const [isNavOpen, setIsNavOpen] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { profil, loading } = useContext(ProfilContext);
  const [stats, setStats] = useState({ unreadMessages: 0, pendingDemandes: 0 });

  const Navigate = useNavigate();
  const location = useLocation();

  const fetchStats = useCallback(async () => {
    const res = await getOwnerStats();
    if (res.success) {
      setStats({
        unreadMessages: res.data.unreadMessages,
        pendingDemandes: res.data.pendingDemandes,
      });
    }
  }, []);

  useEffect(() => {
    fetchStats(); 
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = useCallback((linkName) => {
    Navigate(`${linkName}`);
    setIsNavOpen(false);
  }, [Navigate]);

  const shouldShowNav = windowWidth >= 1280 || openLogs;
  const shouldShowCloseX = windowWidth < 1280 && openLogs;

  if (loading || !profil) return null;

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
          <div className={`link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => handleLinkClick('/')}>
            <House size={20} />
            <span>Accueil</span>
          </div>
          <div className={`link ${location.pathname === '/owner' ? 'active' : ''}`} onClick={() => handleLinkClick('')}>
            <LayoutDashboard size={20}/>
            <span>Tableau de Bord</span>
          </div>
          <div className={`link ${location.pathname === '/owner/OwnerProperties' ? 'active' : ''}`} onClick={() => handleLinkClick('OwnerProperties')}>
            <MapPinHouse size={20} />
            <span>Mes Propriétés</span>
          </div>
          <div className={`link ${location.pathname === '/owner/OwnerAddProperty' ? 'active' : ''}`} onClick={() => handleLinkClick('OwnerAddProperty')}>
            <BadgePlus />
            <span>Ajouter une Propriété</span>
          </div>
          <div className={`link ${location.pathname === '/owner/messages' ? 'active' : ''}`} onClick={() => handleLinkClick('messages')} style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <MessageSquare size={20} />
              <span>Messages</span>
            </div>
            {stats.unreadMessages > 0 && (
              <span className="notification">{stats.unreadMessages}</span>
            )}
          </div>
          <div className={`link ${location.pathname === '/owner/OwnerDemandesRecus' ? 'active' : ''}`} onClick={() => handleLinkClick('OwnerDemandesRecus')} style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Bell size={20} />
              <span>Demandes Reçues</span>
            </div>
            {stats.pendingDemandes > 0 && (
              <span className="notification">{stats.pendingDemandes}</span>
            )}
          </div>
          <div className={`link ${location.pathname === '/owner/OwnerProfilComp' ? 'active' : ''}`} onClick={() => handleLinkClick('OwnerProfilComp')}>
            <User size={20} />
            <span>Profil</span>
          </div>
          <div className={`link ${location.pathname === '/owner/OwnerParametres' ? 'active' : ''}`} onClick={() => handleLinkClick('OwnerParametres')}>
            <Settings size={20} />
            <span>Paramètres</span>
          </div>
        </div>
      </div>
    </div>
  );
}
