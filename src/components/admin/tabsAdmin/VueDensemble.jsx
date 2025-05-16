import { Box, LinearProgress, Typography } from '@mui/material';
import { useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
export default function VueDensemble(){
    const [studentNumber,setStudentNumber] = useState(68);
    const [propriétairesNumber,setPropriétairesNumber] = useState(28);
    const [administrateursNumber,setAdministrateursNumber] = useState(28);
    return (
        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
            <div className='card-vue-densemble'>
                <div className="title-tab-admin-dashboard">Distribution des utilisateurs</div>
                <div className="description-tab-admin-dashboard">Répartition des types d'utilisateurs sur la plateforme</div>
                <div className="progressBars">
                    <Box sx={{ width: '100%' }}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">Étudiants</Typography>
                            <Typography variant="body2" color="text.secondary">{studentNumber}% (845)</Typography>
                        </Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={studentNumber} 
                            sx={{
                            height: 8,
                            borderRadius: 5,
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#ff8a80' 
                            }
                            }}
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">Propriétaires</Typography>
                            <Typography variant="body2" color="text.secondary">{propriétairesNumber}% (352)</Typography>
                        </Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={propriétairesNumber} 
                            sx={{
                            height: 8,
                            borderRadius: 5,
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#ff8a80' 
                            }
                            }}
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">Administrateurs</Typography>
                            <Typography variant="body2" color="text.secondary">{administrateursNumber}% (51)</Typography>
                        </Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={administrateursNumber} 
                            sx={{
                            height: 8,
                            borderRadius: 5,
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#ff8a80' 
                            }
                            }}
                        />
                    </Box>
                </div>
            </div>
            <div className='card-vue-densemble'>
                <div className="title-tab-admin-dashboard">Santé de la plateforme</div>
                <div className="description-tab-admin-dashboard">Performance du système et statut de sécurité</div>
                <div>
                    <div style={{marginTop:"20px",display:"flex",flexDirection:"column",gap:"16px"}}>
                        <div className="ligneSante">
                            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                                <CircleIcon style={{fontSize:"12px",color:"#00e676"}}/>
                                <Typography fontSize={"14px"}>Disponibilité des serveurs</Typography>
                            </div>
                            <div>99.8%</div>
                        </div>
                        <div className="ligneSante">
                            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                                <CircleIcon style={{fontSize:"12px",color:"#00e676"}}/>
                                <Typography fontSize={"14px"}>Performance de la base de données</Typography>
                            </div>
                            <div>Optimale</div>
                        </div>
                        <div className="ligneSante">
                            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                                <CircleIcon style={{fontSize:"12px",color:"#ffc400"}}/>
                                <Typography fontSize={"14px"}>Alertes de sécurité</Typography>
                            </div>
                            <div>3 Mineurs</div>
                        </div>
                        <div className="ligneSante">
                            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                                <CircleIcon style={{fontSize:"12px",color:"#00e676"}}/>
                                <Typography fontSize={"14px"}>Temps de réponse API</Typography>
                            </div>
                            <div>245ms</div>
                        </div>                                                
                    </div>
                </div>
            </div>
        </div>
    )
}