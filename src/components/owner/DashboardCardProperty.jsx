export default function DashboardCardProperty() {
    const backgroundImage = "/src/assets/images/home.jpg";
    return (
        <div className="dashboard-card-property">
            <div className="header-card-property" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',width:'100%', height: '150px',padding: '18px 10px',boxSizing: 'border-box'}}>
                <div className="state">Actif</div>
            </div>
            <div className="content-card-property">
                <h3>Studio moderne</h3>
                
                <div className="details">
                    <div className="detail-row">
                        <span>Prix :</span>
                        <span>750 $ /mois</span>
                    </div>
                    <div className="detail-row">
                        <span>Vues :</span>
                        <span>87</span>
                    </div>
                    <div className="detail-row">
                        <span>Demandes de renseignements :</span>
                        <span>5</span>
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