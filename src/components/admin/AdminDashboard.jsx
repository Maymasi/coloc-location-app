import * as React from 'react';import  '../../assets/styles/AdminStyles/DashboardAdmin.css';
import VueDensemble from './tabsAdmin/VueDensemble';
import ActiviteUtilisateur from './tabsAdmin/ActiviteUtilisateur';
import SignalementsRecents from './tabsAdmin/SignalementsRecents';
import ActionsRapide from './ActionsRapide';
import { Flag,Users,MessageSquare,Building,  } from 'lucide-react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

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
export default function AdminDashboard () {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
            <div className="tabs-admin-dashboard">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Vue d'ensemble" value="1" />
                                <Tab label="Activité utilisateurs" value="2" />
                                <Tab label="Signalements récents" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1" style={{width:"100%"}}>
                            <VueDensemble/>
                        </TabPanel>
                        <TabPanel value="2">
                            <ActiviteUtilisateur/>
                        </TabPanel>
                        <TabPanel value="3">
                            <SignalementsRecents/>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
            <div className="actionsRapide">
                <div className="big-title-parts-admin">Actions rapides</div>
                <ActionsRapide/>
            </div>
            <div className="resume-analytique">
                <div className="big-title-parts-admin">Résumé analytique</div>
                <div style={{backgroundColor:"white",height:"400px",padding:"20px",borderRadius:"13px",border:"1px solid rgb(179, 179, 179)",marginTop:"20px",gap:"20px",display:"flex",flexDirection:"column"}}>
                    <div>
                        <div className="title-tab-admin-dashboard">Distribution des utilisateurs</div>
                        <div className="description-tab-admin-dashboard">Répartition des types d'utilisateurs sur la plateforme</div>
                    </div>
                    <div className="graphiqueAnalyse">
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

