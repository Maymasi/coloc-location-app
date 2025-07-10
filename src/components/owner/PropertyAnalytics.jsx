import React, { useEffect, useState } from 'react';
import { getPropertyAnalytics } from '../../Services/DashboardOwnerService';

const PropertyAnalytics = () => {
  const [properties, setProperties] = useState([]);
  const [responseRate, setResponseRate] = useState(0);
  const [averageResponseTime, setAverageResponseTime] = useState('0 heure');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getPropertyAnalytics();
      if (result.success) {
        const data = result.data;
        const performances = data.propertyPerformances?.$values || [];
        setProperties(performances);
        setResponseRate((data.responseRate || 0) / 100); // convertir en ratio (0.5 pour 50%)
        const hours = data.averageResponseTimeHours || 0;
        setAverageResponseTime(
          hours < 1 ? `${Math.round(hours * 60)} min` : `${hours.toFixed(1)} heures`
        );
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const maxViews = Math.max(...properties.map(p => p.views || 0), 1);

  if (loading) return <div>Chargement des analyses...</div>;

  return (
    <div className="property-performance-container">
      {/* Performance des propriétés */}
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

      {/* Taux de réponse */}
      <div className="response-section">
        <h2 className="section-title">Taux de réponse aux demandes de renseignements</h2>
        <p className="section-subtitle">Votre temps de réponse aux demandes des étudiants</p>

        <div className="response-chart">
          <div className="circular-progress">
            <svg width="150" height="150" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="20"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - responseRate)}`}
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div className="percentage-text">{Math.round(responseRate * 100)}%</div>
          </div>

          <div className="response-time">
            Temps de réponse moyen : {averageResponseTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAnalytics;
