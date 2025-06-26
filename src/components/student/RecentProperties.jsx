import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { MapPin, RefreshCw } from 'lucide-react';
import { getRecentProperties } from '../../Services/studentDashboardService'; 

export default function RecentProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate= useNavigate();

  // Fonction pour récupérer les propriétés récentes
  const fetchRecentProperties = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const result = await getRecentProperties();
      
      if (result.data) {
        setProperties(result.data.$values || []);
        setError(null);
      } else {
        setError(result.error || 'Erreur lors du chargement des propriétés');
      }
    } catch (err) {
      setError('Erreur lors du chargement des propriétés');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    fetchRecentProperties();
  }, []);

  // Auto-refresh toutes les 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRecentProperties(true);
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  // Rafraîchir au retour sur l'onglet
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchRecentProperties(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Fonction pour rafraîchir manuellement
  const handleRefresh = () => {
    fetchRecentProperties(true);
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography gutterBottom sx={{ color: 'black', fontSize: 17, fontWeight: '500' }}>
              Vues récentes de propriétés
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: 'hsl(0 0% 45%)', fontWeight: '400', fontSize: 14 }}>
              Propriétés que vous avez récemment consultées
            </Typography>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            size="small"
            sx={{ minWidth: 'auto', padding: '4px' }}
          >
            <RefreshCw 
              size={16} 
              style={{ 
                animation: refreshing ? 'spin 1s linear infinite' : 'none',
              }} 
            />
          </Button>
        </div>

        {/* Affichage conditionnel selon l'état */}
        {loading && !refreshing ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px' 
          }}>
            <CircularProgress size={30} />
          </div>
        ) : error ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: '#666'
          }}>
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
            <Button 
              onClick={handleRefresh}
              size="small"
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Réessayer
            </Button>
          </div>
        ) : properties.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: '#666'
          }}>
            <Typography variant="body2">
              Aucune propriété récente trouvée
            </Typography>
          </div>
        ) : (
          <div className="all-prop">
            {properties.map((property) => (
              <div className="content" key={property.id}>
                <div className="image">
                  <img 
                    src={property.image || "/src/assets/images/home.jpg"} 
                    alt={property.title || "propriété"}
                    onError={(e) => {
                      e.target.src = "/src/assets/images/home.jpg";
                    }}
                  />
                </div>
                <div className="info">
                  <div className="title">{property.title}</div>
                  <div className="location">
                    <MapPin style={{ width: '15px', marginRight: '5px' }} />
                    {property.location}
                  </div>
                  <div className="price-type">
                    <div className="price">
                      {property.price} <span>Mad</span>/<span>mois</span>
                    </div>
                    <div className="type">{property.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardActions>
        <Button 
          size="small" 
          style={{ width: '100%' }} 
          className="btn"
          disabled={loading}
          onClick={()=>navigate('/annonces')}
        >
          Afficher toutes les propriétés
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }} className='recent-properties'>
      <Card variant="outlined" sx={{ borderRadius: '20px', height: '400px' }}>
        {card}
      </Card>
      
      {/* CSS pour l'animation de rotation */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}