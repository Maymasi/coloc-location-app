import { X,House,Heart,MessageSquare,Users,SquareLibrary,Bell,Settings,User,ChartColumnIncreasing  } from 'lucide-react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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

    return(
            <div className="left-nav">
                <div className="logo">
                    <div style={{fontSize:"18px",fontWeight:"700",color:"hsl(var(--primary))"}}>Admin Panel</div>
                    <X />
                    {/* onClick={()=>{
                        document.querySelector('.left-bar').style.display = 'none';
                        
                    }} */}
                </div>
                <Divider style={{backgroundColor:'hsl(0 ,0%, 92%)'}}/>
                
                    <div className="content-nav">
                        <div className="nav-links">    
                            <div>
                                <div className='title-left-nav-admin'>Tableau de bord</div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'dashboard' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('dashboard')}
                                >
                                    <House size={17} />
                                    <span>Tableau de Bord</span>
                                </div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'annonces' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('annonces')}
                                >
                                    <ChartColumnIncreasing  size={17} />
                                    <span>Analytiques</span>
                                </div>
                            </div>     
                            <div>

                            </div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'favoris' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('favoris')}
                                >
                                    <Users  size={17} />
                                    <span>Utilisateurs</span>
                                </div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'messages' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('messages')}
                                    style={{justifyContent:'space-between'}}
                                >
                                    <div className="" style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                                        <MessageSquare size={17} />
                                        <span>Messages</span>
                                    </div>
                                    <span className="notification">3</span>
                                </div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'colocations' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('colocations')}
                                >
                                    <Users size={17} />
                                    <span>Colocations</span>
                                </div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'demandesRecus' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('demandesRecus')}
                                    style={{justifyContent:'space-between'}}
                                >
                                    <div className="" style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                                        <Bell size={17} />
                                        <span>Demandes recus</span>
                                    </div>
                                    <span className="notification">5</span>
                                </div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'mesDemandes' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('mesDemandes')}
                                >
                                    <SquareLibrary size={17} />
                                    <span>Mes demandes</span>
                                </div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'profil' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('profil')}
                                >
                                    <User size={17} />
                                    <span>Profil</span>
                                </div>
                                <div 
                                    className={`link-left-nav-admin ${activeLink === 'parametres' ? 'active' : ''}`} 
                                    onClick={() => handleLinkClick('parametres')}
                                >
                                    <Settings size={17} />
                                    <span>Parametres</span>
                                </div>
                        </div>
                    </div>
            </div>
    )
}