import { TrendingUp,House,MapPin } from 'lucide-react';
export default function VueDensembleAnalytiques() {
    return (
        <div className="vue-analytiques">
            <div className="Top-sections">
                <div className="section evolution-mensuelle">
                    <div className='Top-section'>
                        <TrendingUp color='#3949ab'/>
                        <div className='bigTitle'> Évolution mensuelle</div>
                    </div>
                    <p>Réservations et taux d'occupation</p>
                    {[
                        { mois: "Jan", reservations: 210, occupation: 82 },
                        { mois: "Fév", reservations: 245, occupation: 84 },
                        { mois: "Mar", reservations: 265, occupation: 85 },
                        { mois: "Avr", reservations: 290, occupation: 87 },
                        { mois: "Mai", reservations: 310, occupation: 89 },
                        { mois: "Jun", reservations: 325, occupation: 91 },
                    ].map((item, i) => (
                        <div key={i} className="mois-item">
                            <div className='mois-title'>{item.mois}</div>
                            <div style={{width:"100%"}}>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <div>Réservations: {item.reservations}</div>
                                    <div>Occupation: {item.occupation}%</div>
                                </div>
                                <div className="bar">
                                    <div className="remplissage" style={{ width: item.occupation + "%" }}></div>
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
                    <p>Répartition des 3421 logements</p>
                    {[
                        { type: "Studio", count: 1450, percent: 42.4 },
                        { type: "Chambre", count: 980, percent: 28.6 },
                        { type: "Colocation", count: 650, percent: 19 },
                        { type: "Appartement", count: 341, percent: 10 },
                    ].map((item, i) => (
                        <div key={i} className="type-item">
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <span style={{fontSize:"14px"}}>{item.type}</span>
                                <span style={{fontSize:"14px"}}>{item.count} ({item.percent}%)</span> 
                            </div>                           
                            <div className="bar">
                                <div className="remplissage" style={{ width: item.percent + "%" }}></div>
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
                    {[
                        { nom: "Paris", total: 1250, occupation: 94, prix: 750 },
                        { nom: "Lyon", total: 680, occupation: 89, prix: 520 },
                        { nom: "Marseille", total: 520, occupation: 87, prix: 480 },
                        { nom: "Toulouse", total: 450, occupation: 91, prix: 450 },
                        { nom: "Lille", total: 380, occupation: 85, prix: 420 },
                    ].map((ville, i) => (
                        <div key={i} className="ville-card">
                            <div className="ville-nom">
                                <div>{ville.nom}</div>
                                <div className="total">({ville.total})</div>
                            </div>
                            <div style={{fontSize:"14px" , color:"#5f5f5f"}}>Occupation <strong>{ville.occupation}%</strong></div>
                            <div className="bar">
                                <div className="remplissage" style={{ width: ville.occupation + "%" }}></div>
                            </div>
                            <div style={{fontSize:"14px" , color:"#5f5f5f"}}>Prix moyen <strong>{ville.prix}€</strong></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 
