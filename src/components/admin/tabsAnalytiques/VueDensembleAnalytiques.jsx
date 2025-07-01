import { TrendingUp,House,MapPin } from 'lucide-react';
export default function VueDensembleAnalytiques({data}) {
    if (!data || !data.evolutionReservations || !data.evolutionReservations.$values) {
        return <div>Chargement...</div>;
    }
    var totalLogements = data.rejetes + data.logementVerifies + data.logementAttentes;
    return (
        <div className="vue-analytiques">
            <div className="Top-sections">
                <div className="section evolution-mensuelle">
                    <div className='Top-section'>
                        <TrendingUp color='#3949ab'/>
                        <div className='bigTitle'> Évolution mensuelle</div>
                    </div>
                    <p>Réservations et taux d'occupation</p>
                    {data.evolutionReservations.$values.map((item, i) => (
                        <div key={i} className="mois-item">
                            <div className='mois-title'>{item.mois.substring(0,3)}</div>
                            <div style={{width:"100%"}}>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <div>Réservations: {item.nombreReservations}</div>
                                    <div>Occupation: {item.tauxOccupation}%</div>
                                </div>
                                <div className="bar">
                                    <div className="remplissage" style={{ width: item.tauxOccupation + "%" }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="section types-logements">
                    <div className='Top-section'>
                        <House color='#009688'/>
                        <div className='bigTitle'> Types de logements</div>
                    </div>
                    <p>Répartition des {totalLogements} logements</p>
                    {data.repartitionParType.$values.map((item, i) => (
                        <div key={i} className="type-item">
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <span style={{fontSize:"14px"}}>{item.type}</span>
                                <span style={{fontSize:"14px"}}>{item.count} ({totalLogements!=0?item.count/(totalLogements)*100:0}%)</span> 
                            </div>                           
                            <div className="bar">
                                <div className="remplissage" style={{ width: (totalLogements!=0?item.count/(totalLogements)*100:0) + "%" }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="section statistiques-villes">
                <div className='Top-section'>
                    <MapPin color='#673ab7'/>
                    <div className='bigTitle'> Statistiques par ville</div>
                </div>
                <p>Répartition géographique des logements</p>
                <div className="villes">
                    {data.repartitionParVille.$values.map((ville, i) => (
                        <div key={i} className="ville-card">
                            <div className="ville-nom">
                                <div>{ville.ville}</div>
                                <div className="total">({ville.nombreLogements})</div>
                            </div>
                            <div style={{fontSize:"14px" , color:"#5f5f5f"}}>Occupation <strong>{ville.tauxOccupation}%</strong></div>
                            <div className="bar">
                                <div className="remplissage" style={{ width: ville.tauxOccupation + "%" }}></div>
                            </div>
                            <div style={{fontSize:"14px" , color:"#5f5f5f"}}>Prix moyen <strong>{ville.prixMoyen}DH</strong></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 
