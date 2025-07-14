import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { stringAvatar } from '../../utils/avatarUtils';
import { stringToColor } from '../../utils/avatarUtils';
import { getRecentMessages } from '../../Services/studentDashboardService'; // Ajustez le chemin selon votre structure

// Messages par défaut en cas d'erreur de chargement
const defaultMessages = [
  {
    id: 1,
    name: 'John Doe',
    message: 'Hello, how are you?',
    date: '2023-10-01',
    role: 'etudiant'
  },
  {
    id: 2,
    name: 'Jane Smith',
    message: 'Are we still on for the meeting?',
    date: '2023-10-02',
    role: 'proprietaire'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    message: 'Did you receive my last email?',
    date: '2023-10-03',
    role: 'etudiant'
  }
];

function truncateMessage(message) {
  if (message.length > 40) {
    return message.substring(0, 40) + '...';
  }
  return message;
}

// Composant pour l'état vide avec un design amélioré
const EmptyMessageState = () => {
  const emptyStateStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px 20px',
      textAlign: 'center',
      minHeight: '100%',
    },
    iconContainer: {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
      position: 'relative',
      overflow: 'hidden',
    },
    iconContainerBefore: {
      content: '""',
      position: 'absolute',
      top: '-2px',
      left: '-2px',
      right: '-2px',
      bottom: '-2px',
      background: 'linear-gradient(45deg, #667eea, #764ba2, #667eea)',
      borderRadius: '50%',
      zIndex: '-1',
      animation: 'rotate 3s linear infinite',
    },
    messageIcon: {
      fontSize: '40px',
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
    },
    circle1: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea20, #764ba220)',
      opacity: '0.6',
    },
    circle2: {
      position: 'absolute',
      bottom: '30px',
      left: '30px',
      width: '25px',
      height: '25px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #764ba220, #667eea20)',
      opacity: '0.4',
    },
    wave: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '60px',
      background: 'linear-gradient(90deg, #667eea10, #764ba210, #667eea10)',
      borderRadius: '50px 50px 0 0',
      opacity: '0.3',
    }
  };

  const keyframes = `
    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={emptyStateStyles.container}>
        <div style={emptyStateStyles.decorativeElements}>
          <div style={emptyStateStyles.circle1}></div>
          <div style={emptyStateStyles.circle2}></div>
          <div style={emptyStateStyles.wave}></div>
        </div>
        
        <div style={{
          ...emptyStateStyles.iconContainer,
          animation: 'float 3s ease-in-out infinite'
        }}>
          <div style={{
            ...emptyStateStyles.iconContainerBefore,
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
             background: 'linear-gradient(135deg, hsl(6 100% 72%) 0%, hsl(6 100% 85%) 100%)',
            borderRadius: '50%',
            zIndex: '-1',
            animation: 'rotate 3s linear infinite',
          }}></div>
          <span style={emptyStateStyles.messageIcon}>💬</span>
        </div>

        <div style={emptyStateStyles.title}>
          Aucun message récent
        </div>
        
        <div style={emptyStateStyles.subtitle}>
          Vos conversations récentes apparaîtront ici.<br/>
          Commencez une nouvelle conversation pour voir vos messages.
        </div>
      </div>
    </>
  );
};

export default function RecentMessage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les messages récents
  const fetchRecentMessages = async () => {
    try {
      const result = await getRecentMessages();
      
      if (result.data) {
        setMessages(result.data.$values);
        setError(null);
      } else {
        setError(result.error || 'Erreur lors du chargement des messages');
        // Utiliser les messages par défaut en cas d'erreur
        setMessages(defaultMessages);
      }
    } catch (err) {
      setError('Erreur lors du chargement des messages');
      setMessages(defaultMessages);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les messages au montage du composant
  useEffect(() => {
    fetchRecentMessages();
  }, []);

  // Auto-refresh toutes les 45 secondes (moins fréquent que le dashboard)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRecentMessages();
    }, 45000); // 45 secondes

    return () => clearInterval(interval);
  }, []);

  // Rafraîchir quand l'utilisateur revient sur l'onglet
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchRecentMessages();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Fonction pour rafraîchir manuellement
  const handleRefresh = () => {
    setLoading(true);
    fetchRecentMessages();
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography gutterBottom sx={{ color: 'black', fontSize: 17, fontWeight: '500' }}>
              Messages récents
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: 'hsl(0 0% 45%)', fontWeight: '400', fontSize: 14 }}>
              Vos dernières conversations
            </Typography>
          </div>
          {loading && (
            <CircularProgress size={20} />
          )}
        </div>

        {error && (
          <Alert 
            severity="warning" 
            sx={{ mt: 1, mb: 1 }}
            action={
              <Button color="inherit" size="small" onClick={handleRefresh}>
                Réessayer
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        <div className="messages" style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          {messages.length === 0 && !loading ? (
            <EmptyMessageState />
          ) : (
            messages.map((message, index) => (
              <div key={message.id || index}>
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <Avatar 
                    sx={{ fontSize: '12px', marginRight: '10px' }} 
                    {...stringAvatar(`${message.name}`)} 
                  />
                  <div className="info" style={{ width: '100%' }}>
                    <div className="header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <div className="name" style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                        {message.name} ({message.role})
                      </div>
                      <div className="date" style={{ fontSize: '12px', color: 'gray' }}>
                        {new Date(message.date).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className="message" style={{ 
                      fontSize: '14px', 
                      color: 'hsl(0 0% 45%)', 
                      width: '100%', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {truncateMessage(message.message)}
                    </div>
                  </div>
                </div>
                {index < messages.length - 1 && (
                  <Divider sx={{ my: 1 }} />
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
      
      {/* Afficher le bouton seulement s'il y a des messages */}
      {messages.length > 0 && (
        <CardActions>
          <Button 
            size="small" 
            style={{ width: '100%' }} 
            className='btn'
            disabled={loading}
          >
            Afficher tous les Messages
          </Button>
        </CardActions>
      )}
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ borderRadius: '20px', height: '400px' }}>
        {card}
      </Card>
    </Box>
  );
}
