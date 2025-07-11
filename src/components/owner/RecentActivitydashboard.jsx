import React, { useEffect, useState } from 'react';
import { MessageCircle, Eye, Calendar,Activity } from 'lucide-react';
import { getRecentActivities } from '../../Services/DashboardOwnerService'; 

const RecentActivitydashboard = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await getRecentActivities(10); 
      if (response.success) {
        // setActivities(response.data);
      }
      setLoading(false);
    };

    fetchActivities();
  }, []);

 if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Chargement des activités...</p>
        </div>
      </div>
    );
  }

  if (!activities.length) {
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Activité récente</h2>
        
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            <Activity size={48} color="#9ca3af" />
          </div>
          <h3 style={styles.emptyTitle}>Aucune activité récente</h3>
          <p style={styles.emptyDescription}>
            Il n'y a pas encore d'activités à afficher. Les nouvelles activités apparaîtront ici une fois qu'elles seront disponibles.
          </p>
          <div style={styles.emptyIllustration}>
            <div style={styles.illustrationDot}></div>
            <div style={styles.illustrationLine}></div>
            <div style={styles.illustrationDot}></div>
            <div style={styles.illustrationLine}></div>
            <div style={styles.illustrationDot}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-activity-dashboard">
      <h2 className="activity-header">Activité récente</h2>
      
      <div className="activity-list">
        {activities.map((activity) => {
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
const styles={
  container: {
    borderRadius: '16px',
    padding: '24px',
    border: '2px dashed #d1d5db',
    width: '60%',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f3f4f6'
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  badge: {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '16px',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
    border: '1px solid #f3f4f6',
    transition: 'all 0.3s ease',
    position: 'relative',
    animation: 'fadeInUp 0.5s ease-out forwards',
    opacity: 0,
    transform: 'translateY(20px)',
    cursor: 'pointer'
  },
  activityIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.3s ease'
  },
  activityContent: {
    flex: 1,
    minWidth: 0
  },
  activityTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 8px 0',
    lineHeight: '1.4'
  },
  activityDescription: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 8px 0',
    lineHeight: '1.5'
  },
  activityTime: {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: '500'
  },
  activityDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#d1d5db',
    marginTop: '6px'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #f3f4f6',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px'
  },
  loadingText: {
    color: '#6b7280',
    fontSize: '14px',
    margin: 0
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    textAlign: 'center'
  },
  emptyIcon: {
    color: '#d1d5db',
    marginBottom: '16px'
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 8px 0'
  },
  emptyDescription: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    maxWidth: '300px'
  }
};

export default RecentActivitydashboard;
