import { Box, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
export default function VueDensemble({data}){
    const [studentNumber,setStudentNumber] = useState();
    const [propriétairesNumber,setPropriétairesNumber] = useState();
    const [administrateursNumber,setAdministrateursNumber] = useState();
    useEffect(() => {
        setStudentNumber(data?.userDistribution.etudiants);
        setPropriétairesNumber(data?.userDistribution.proprietaires);
        setAdministrateursNumber(data?.userDistribution.admins);
    }, [data]);
    return (
        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
            <div className='card-vue-densemble'>
                <div className="title-tab-admin-dashboard">Distribution des utilisateurs</div>
                <div className="description-tab-admin-dashboard">Répartition des types d'utilisateurs sur la plateforme</div>
                <div className="progressBars">
                    <Box sx={{ width: '100%' }}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">Étudiants</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {data?.totalUsers > 0 ? ((studentNumber / data?.totalUsers) * 100).toFixed(2) : "0.00"}% ({studentNumber || 0})
                            </Typography>
                        </Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={data?.totalUsers > 0 ? ((studentNumber / data?.totalUsers) * 100) : 0} 
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
                            <Typography variant="body2" color="text.secondary">
                                {data?.totalUsers > 0 ? ((propriétairesNumber / data?.totalUsers) * 100).toFixed(2) : "0.00"}% ({propriétairesNumber || 0})
                            </Typography>
                        </Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={data?.totalUsers > 0 ? ((propriétairesNumber / data?.totalUsers) * 100) : 0} 
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
                            <Typography variant="body2" color="text.secondary">
                                {data?.totalUsers > 0 ? ((administrateursNumber / data?.totalUsers) * 100).toFixed(2) : "0.00"}% ({administrateursNumber || 0})
                            </Typography>
                        </Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={data?.totalUsers > 0 ? ((administrateursNumber / data?.totalUsers) * 100) : 0} 
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
        </div>
    )
}