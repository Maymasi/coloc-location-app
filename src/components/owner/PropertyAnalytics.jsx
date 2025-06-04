import React from 'react';
const PropertyAnalytics = () => {
  // Données des propriétés avec leurs vues
  const properties = [
    { name: "Studio moderne", views: 87 },
    { name: "Spacieux appartement de 2 chambres", views: 124 },
    { name: "Chambre confortable dans une maison partagée", views: 37 }
  ];

  // Calcul du pourcentage pour chaque barre de progression
  const maxViews = Math.max(...properties.map(p => p.views));
  
  return (
    <div className="property-performance-container">
      {/* Section Performance de la propriété */}
      <div className="performance-section">
        <h2 className="section-title">Performance de la propriété</h2>
        <p className="section-subtitle">Vues et demandes de renseignements sur vos propriétés</p>
        
        <div className="properties-list">
          {properties.map((property, index) => (
            <div key={index} className="property-item">
              <div className="property-info">
                <span className="property-name">{property.name}</span>
                <span className="property-views">{property.views} vues</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(property.views / maxViews) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Taux de réponse */}
      <div className="response-section">
        <h2 className="section-title">Taux de réponse aux demandes de renseignements</h2>
        <p className="section-subtitle">Votre temps de réponse aux demandes des étudiants</p>
        
        <div className="response-chart">
          {/* Graphique circulaire */}
          <div className="circular-progress">
            <svg width="150" height="150" viewBox="0 0 200 200">
              {/* Cercle de fond */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="20"
              />
              {/* Cercle de progression */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - 0.85)}`}
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div className="percentage-text">85%</div>
          </div>
          
          <div className="response-time">
            Temps de réponse moyen : 2 heures
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAnalytics;