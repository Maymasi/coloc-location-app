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

// Composant pour l'état vide avec un design amélioré
const EmptyPropertiesState = () => {
  const emptyStateStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      minHeight: '200px',
      position: 'relative',
    },
    iconContainer: {
      width: '80px',
      height: '80px',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, hsl(6 100% 72%) 0%, hsl(6 100% 85%) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 32px hsla(6 100% 72% / 0.3)',
    },
    houseIcon: {
      fontSize: '36px',
      color: 'white',
      zIndex: 1,
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '14px',
      color: '#718096',
      marginBottom: '24px',
      lineHeight: '1.4',
    },
    decorativeElements: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden',
    },
    floatingIcon1: {
      position: 'absolute',
      top: '10px',
      right: '15px',
      fontSize: '20px',
      opacity: '0.3',
      animation: 'float 4s ease-in-out infinite',
    },
    floatingIcon2: {
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      fontSize: '16px',
      opacity: '0.2',
      animation: 'float 3s ease-in-out infinite 1s',
    },
    backgroundPattern: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: `
        radial-gradient(circle at 20% 20%, rgba(79, 172, 254, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0, 242, 254, 0.1) 0%, transparent 50%)
      `,
      zIndex: -1,
    },
    searchSuggestion: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    }
  };

  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={emptyStateStyles.container}>
        <div style={emptyStateStyles.backgroundPattern}></div>
        
        <div style={emptyStateStyles.decorativeElements}>
          <div style={emptyStateStyles.floatingIcon1}>🏠</div>
          <div style={emptyStateStyles.floatingIcon2}>🔍</div>
        </div>
        
        <div style={{
          ...emptyStateStyles.iconContainer,
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <span style={emptyStateStyles.houseIcon}>🏡</span>
        </div>

        <div style={emptyStateStyles.title}>
          Aucune publication récente
        </div>
        
        <div style={emptyStateStyles.subtitle}>
          Aucune nouvelle propriété n'a été publiée récemment.<br/>
          Revenez plus tard pour voir les nouvelles publications.
        </div>

        <div style={{
          ...emptyStateStyles.searchSuggestion,
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0px)';
          e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
        }}>
          ✨ Découvrir des propriétés
        </div>
      </div>
    </>
  );
};

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
              Publications récentes
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: 'hsl(0 0% 45%)', fontWeight: '400', fontSize: 14 }}>
              Propriétés récemment publiées
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
          <EmptyPropertiesState />
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
      
      {/* Afficher le bouton seulement s'il y a des propriétés */}
      {!loading && !error && properties.length > 0 && (
        <CardActions>
          <Button 
            size="small" 
            style={{ width: '100%' }} 
            className="btn"
            onClick={()=>navigate('/annonces')}
          >
            Afficher toutes les propriétés
          </Button>
        </CardActions>
      )}
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