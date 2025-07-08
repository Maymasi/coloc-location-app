import { BadgeCheck, Star, BadgeAlert, ShieldCheck } from 'lucide-react';
import Rating from '@mui/material/Rating';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function Logements({data}){
    var totalLogements = data.rejetes + data.logementVerifies + data.logementAttentes;
    const hasSignalements = data.repartitionSignalementsParMotif.$values && data.repartitionSignalementsParMotif.$values.length > 0;
    
    return(
        <div className="Logements-container">
            <div className="card-logements">
                <div className="title-card-logements">
                    <BadgeCheck size={18} color='#009688'/>
                    <h4>Vérification des logements</h4>
                </div>
                <div className="content-card-logements">
                    <div className="stati-logements">
                        <div className="element-stati">
                            <div className="left-element-stati">
                                <FiberManualRecordIcon sx={{fontSize:"17px",color:'#00c853'}}/>
                                <div>Vérifiés</div>
                            </div>
                            <div>{data.logementVerifies}</div>
                        </div>
                        <div className="element-stati">
                            <div className="left-element-stati">
                                <FiberManualRecordIcon sx={{fontSize:"17px",color:'#ff9800'}} />
                                <div>En attente</div>
                            </div>
                            <div>{data.logementAttentes}</div>
                        </div>
                        <div className="element-stati">
                            <div className="left-element-stati">
                                <FiberManualRecordIcon sx={{fontSize:"17px",color:'#ff5722'}} />
                                <div>Rejetés</div>
                            </div>
                            <div>{data.rejetes}</div>
                        </div>                                                
                    </div>
                    <div className="taux-logements">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <span style={{fontSize:"14px"}}>Taux de vérification</span>
                            <span style={{fontSize:"14px"}}>{totalLogements!=0?Math.round((data.logementVerifies/totalLogements)*100):0}%</span> 
                        </div>                           
                        <div className="bar">
                            <div className="remplissage" style={{ width: (totalLogements!=0?(data.logementVerifies/totalLogements)*100:0) + "%" }}></div>
                        </div>
                    </div>                    
                </div>
            </div>
            <div className="card-logements">
                <div className="title-card-logements">
                    <BadgeAlert size={18} color='#e53935'/>
                    <h4>Signalements</h4>
                </div>
                <div className="content-card-logements">
                    {hasSignalements ? (
                        data.repartitionSignalementsParMotif.$values.map((item, i) => (
                            <div className="signalement-item" key={i}>
                                <div className="title-sign">{item.motif}</div>
                                <div className="number-sign">{item.nombre}</div>
                            </div>
                        ))
                    ) : (
                        <div className="no-signalement" style={{
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            flexDirection: 'column',
                            padding: '20px',
                            textAlign: 'center',
                            color: '#666'
                        }}>
                            <ShieldCheck size={32} color='#4caf50' style={{marginBottom: '8px'}} />
                            <span style={{fontSize: '14px', fontWeight: '500'}}>Aucun signalement</span>
                            <span style={{fontSize: '12px', color: '#999', marginTop: '4px'}}>Tout va bien !</span>
                        </div>
                    )}                                                         
                </div>
            </div>
        </div>
    );
}