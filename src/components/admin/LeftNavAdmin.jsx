import { Home,MessageSquare,Users,House ,ShieldAlert ,Settings,LogOut ,ChartColumnIncreasing,Building,Flag    } from 'lucide-react';
import * as React from 'react';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/LeftNav.css';
import '../../assets/styles/adminStyle.css';
export default  function LeftNav(){
    const [activeLink, setActiveLink] = React.useState(null);
    const Navigate = useNavigate(); // Utilisez useNavigate pour la navigation

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        Navigate(`${linkName}`); // Utilisez navigate pour changer de route
    };
    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprimer le token du localStorage
        Navigate('/'); // Rediriger vers la page d'accueil
    };

    return(
            <div className="left-nav-admin">
                <div className="logo">
                    <div style={{fontSize:"18px",fontWeight:"700",color:"hsl(var(--primary))"}}>Admin Panel</div>
                </div>
                <Divider style={{backgroundColor:'hsl(0 ,0%, 92%)'}}/>
                
                    <div className="content-nav">
                        <div className="nav-links">    
                            <div>
                                <div className='title-left-nav-admin'>Tableau de bord</div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === '' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('')}
                                >
                                    <House size={17} />
                                    <span>Tableau de Bord</span>
                                </div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'Analytiques' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('Analytiques')}
                                >
                                    <ChartColumnIncreasing  size={17} />
                                    <span>Analytiques</span>
                                </div>
                            </div>     
                            <div>
                            </div>
                                <div className='title-left-nav-admin' style={{marginTop:"20px"}}>Gestion</div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'utilisateurs' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('utilisateurs')}
                                >
                                    <Users  size={17} />
                                    <span>Utilisateurs</span>
                                </div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'proprietés' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('proprietés')}
                                >
                                    <Building  size={17} />
                                    <span>propriétés</span>
                                </div>
                                <div className='title-left-nav-admin' style={{marginTop:"20px"}}>Modération</div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'signalements' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('signalements')}
                                >
                                    <Flag  size={17} />
                                    <span>signalements</span>
                                </div>
                                <div style={{marginTop:"20px"}}>
                                    <div 
                                        className={`link-left-nav-admin ${activeLink === '' ? 'active' : ''}`} 
                                        onClick={() => handleLinkClick('/')}
                                    >
                                        <Home size={17} />
                                        <span>Retour au site</span>
                                    </div>
                                    <div 
                                        className={`link-left-nav-admin ${activeLink === 'Déconnexion' ? 'active' : ''}`} 
                                        onClick={handleLogout}
                                    >
                                        <LogOut  size={17} />
                                        <span>Déconnexion</span>
                                    </div>
                                </div>
                        </div>
                    </div>
            </div>
    )
}