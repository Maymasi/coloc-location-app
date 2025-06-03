import { BadgeCheck,Star,BadgeAlert   } from 'lucide-react';
import Rating from '@mui/material/Rating';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
export default function Logements(){
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
                            <div>2608</div>
                        </div>
                        <div className="element-stati">
                            <div className="left-element-stati">
                                <FiberManualRecordIcon sx={{fontSize:"17px",color:'#ff9800'}} />
                                <div>En attente</div>
                            </div>
                            <div>612</div>
                        </div>
                        <div className="element-stati">
                            <div className="left-element-stati">
                                <FiberManualRecordIcon sx={{fontSize:"17px",color:'#ff5722'}} />
                                <div>Rejetés</div>
                            </div>
                            <div>201</div>
                        </div>                                                
                    </div>
                    <div className="taux-logements">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <span style={{fontSize:"14px"}}>Taux de vérification</span>
                            <span style={{fontSize:"14px"}}>76.2%</span> 
                        </div>                           
                        <div className="bar">
                            <div className="remplissage" style={{ width: 76.2 + "%" }}></div>
                        </div>
                    </div>                    
                </div>
            </div>
            <div className="card-logements">
                <div className="title-card-logements">
                    <Star size={18} color='#ffc107'/>
                    <h4>Évaluation des logements</h4>
                </div>
                <div className="content-card-logements">
                    <div className="rating-logements">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{display:"flex",alignItems:'center',gap:'10px'}}>
                                <span style={{fontSize:"14px"}}>5 étoiles</span>
                                <Rating name="read-only" value={5} size="small" readOnly />
                            </div>
                            <span style={{fontSize:"14px"}}>42%</span> 
                        </div>                           
                        <div className="bar">
                            <div className="remplissage" style={{ width: 42 + "%" }}></div>
                        </div>
                    </div> 
                    <div className="rating-logements">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{display:"flex",alignItems:'center',gap:'10px'}}>
                                <span style={{fontSize:"14px"}}>4 étoiles</span>
                                <Rating name="read-only" value={4} size="small" readOnly />
                            </div>
                            <span style={{fontSize:"14px"}}>38%</span> 
                        </div>                           
                        <div className="bar">
                            <div className="remplissage" style={{ width: 38 + "%" }}></div>
                        </div>
                    </div>    
                    <div className="rating-logements">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{display:"flex",alignItems:'center',gap:'10px'}}>
                                <span style={{fontSize:"14px"}}>3 étoiles</span>
                                <Rating name="read-only" value={3} size="small" readOnly />
                            </div>
                            <span style={{fontSize:"14px"}}>15%</span> 
                        </div>                           
                        <div className="bar">
                            <div className="remplissage" style={{ width: 76.2 + "%" }}></div>
                        </div>
                    </div> 
                    <div className="rating-logements">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{display:"flex",alignItems:'center',gap:'10px'}}>
                                <span style={{fontSize:"14px"}}>≤ 2 étoiles</span>
                                <Rating name="read-only" value={2} size="small" readOnly />
                            </div>
                            <span style={{fontSize:"14px"}}>5%</span> 
                        </div>                           
                        <div className="bar">
                            <div className="remplissage" style={{ width: 5 + "%" }}></div>
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
                    <div className="signalement-item">
                        <div className="title-sign">Description trompeuse</div>
                        <div className="number-sign">24</div>
                    </div>
                    <div className="signalement-item">
                        <div className="title-sign">Photos non conformes</div>
                        <div className="number-sign">18</div>
                    </div>
                    <div className="signalement-item">
                        <div className="title-sign">Problèmes de propreté</div>
                        <div className="number-sign">15</div>
                    </div>
                    <div className="signalement-item">
                        <div className="title-sign">Autres problèmes</div>
                        <div className="number-sign">9</div>
                    </div>                                                            
                </div>
            </div>
        </div>
    );
}