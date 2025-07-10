export default function DashboardCardProperty({ property }) {
    const backgroundImage = property?.photoUrl;
    
    return (
        <div className="dashboard-card-property">
            <div className="header-card-property" style={{
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: 'cover',
                width: '100%', 
                height: '150px',
                padding: '18px 10px',
                boxSizing: 'border-box'
            }}>
                <div className="state">
                    {property?.status || 'Actif'}
                </div>
            </div>
            <div className="content-card-property">
                <h3>{property?.titre || 'Titre non disponible'}</h3>
               
                <div className="details">
                    <div className="detail-row">
                        <span>Prix :</span>
                        <span>{property?.prix ? `${property.prix} Dhs/mois` : 'Non défini'}</span>
                    </div>
                    <div className="detail-row">
                        <span>Vues :</span>
                        <span>{property?.nbVues || 0}</span>
                    </div>
                    <div className="detail-row">
                        <span>Demandes de renseignements :</span>
                        <span>{property?.nbDemandes || 0}</span>
                    </div>
                </div>
               
                <div className="actions">
                    <button className="btn-edit">Modifier</button>
                    <button className="btn-view">Voir</button>
                </div>
            </div>
        </div>
    );
}