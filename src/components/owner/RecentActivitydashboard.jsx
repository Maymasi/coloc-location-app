import { MessageCircle, Eye, Calendar } from 'lucide-react';

const RecentActivitydashboard = ({ activities = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'message':
        return MessageCircle;
      case 'view':
        return Eye;
      case 'update':
        return Calendar;
      default:
        return MessageCircle;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'message':
        return '#3b82f6';
      case 'view':
        return '#10b981';
      case 'update':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  // Données d'exemple - à remplacer par les props de la base de données
  const defaultActivities = [
    {
      id: 1,
      type: 'message',
      title: 'Nouvelle demande reçue',
      description: 'Emma Johnson a envoyé une demande de renseignements sur Modern Studio Apartment',
      time: "Aujourd'hui, 10h23"
    },
    {
      id: 2,
      type: 'view',
      title: 'Propriété visitée',
      description: 'Votre annonce « Spacieux appartement de 2 chambres » a reçu 12 nouvelles vues',
      time: 'Hier, 15h45'
    },
    {
      id: 3,
      type: 'update',
      title: 'Statut de la propriété mis à jour',
      description: 'Vous avez marqué « Chambre confortable dans une maison partagée » comme loué',
      time: 'il y a 3 jours'
    }
  ];

  const activityData = activities.length > 0 ? activities : defaultActivities;

  return (
    <div className="recent-activity-dashboard">
      <h2 className="activity-header">Activité récente</h2>
      
      <div className="activity-list">
        {activityData.map((activity) => {
          const IconComponent = getIcon(activity.type);
          const iconBg = getIconBg(activity.type);
          
          return (
            <div key={activity.id} className="activity-item">
              <div 
                className="activity-icon" 
                style={{ backgroundColor: iconBg }}
              >
                <IconComponent />
              </div>
              <div className="activity-content">
                <h3 className="activity-title">{activity.title}</h3>
                <p className="activity-description">{activity.description}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivitydashboard;