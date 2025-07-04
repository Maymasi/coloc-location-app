import React, { useEffect, useState } from 'react';
import { MessageSquare, Home, Clock, CheckCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../assets/styles/Signalements.css'; // Assurez-vous d'avoir ce fichier CSS pour le style
import {  getSignalements,resolveSignalement,rejectSignalement } from '../../Services/AdminServices/gestionSignalements'
const Signalements = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const Navigate = useNavigate();
  // Données d'exemple pour les signalements

  const [pendingSignalements, setPendingSignalements] = useState([]);
  const [resolvedSignalements, setResolvedSignalements] = useState([]);
  const [rejectedSignalements, setRejectedSignalements] = useState([]);

  useEffect(() => {
  const fetchSignalements = async () => {
    try {
      const response = await getSignalements();
      const pending = [];
      const resolved = [];
      const rejected = [];

      for (const signalement of response.$values) {
        switch (signalement.status) {
          case 'EnAttente':
            pending.push(signalement);
            break;
          case 'Resolu':
            resolved.push(signalement);
            break;
          case 'Rejete':
            rejected.push(signalement);
            break;
        }
      }

      // Mise à jour des états une seule fois
      setPendingSignalements(pending);
      setResolvedSignalements(resolved);
      setRejectedSignalements(rejected);

    } catch (error) {
      console.error("Error fetching signalements:", error);
    }
  };

  fetchSignalements();
}, []);

  const signalements = {
    pending: pendingSignalements,
    resolved: resolvedSignalements,
    rejected: rejectedSignalements
  };
  const getTabCount = (tab) => {
    if(tab === 'pending') {
      return pendingSignalements.length;
    }
    if(tab === 'resolved') { 
      return resolvedSignalements.length;
    }
    if(tab === 'rejected') {
      return rejectedSignalements.length;
    }
  };

  const handleResolve = (signalementId) => {
    console.log(`Résoudre le signalement ${signalementId}`);
    resolveSignalement(signalementId)
      .then(() => {
        // Rafraîchir la liste des signalements après résolution
        setPendingSignalements(prev => prev.filter(s => s.id !== signalementId));
        setResolvedSignalements(prev => {
          const resolvedSignalement = pendingSignalements.find(s => s.id === signalementId);
          if (resolvedSignalement) {
            return [...prev, { ...resolvedSignalement, status: 'Resolu' }];
          }
          return prev;
        });
      })
      .catch(error => {
        console.error("Error resolving signalement:", error);
      });
  };

  const handleReject = (signalementId) => {
    console.log(`Rejeter le signalement ${signalementId}`);
    rejectSignalement(signalementId)
      .then(() => {
        // Rafraîchir la liste des signalements après rejet
        setPendingSignalements(prev => prev.filter(s => s.id !== signalementId));
        setRejectedSignalements(prev => {
          const rejectedSignalement = pendingSignalements.find(s => s.id === signalementId);
          if (rejectedSignalement) {
            return [...prev, { ...rejectedSignalement, status: 'Rejete' }];
          }
          return prev;
        });
      })
      .catch(error => {
        console.error("Error rejecting signalement:", error);
      });
  };

  const SignalementCard = ({ signalement, showActions = true }) => (
    <div className="signalements_card">
      <div className="signalements_card_header">
        <div className="signalements_card_title">
          <h3>Signalement #{signalement.$id}</h3>
          <div className="signalements_badges">
            <span className={`signalements_status_badge signalements_status_${signalement.status === 'EnAttente' ? 'pending' : signalement.status === 'Resolu' ? 'resolved' : 'rejected'}`}>
              {signalement.status}
            </span>
            {/* <span className={`signalements_priority_badge signalements_priority_${signalement.priority}`}>
              {signalement.priority === 'high' ? 'Haute priorité' : signalement.priority === 'medium' ? 'Priorité moyenne' : 'Priorité faible'}
            </span> */}
          </div>
        </div>
        <div className="signalements_timestamp">
          {signalement.status === 'Résolu' ? `Résolu le ${signalement.dateResolution}` : `Signalé le ${signalement.dateSignalement}`}
        </div>
      </div>

      <div className="signalements_card_content">
        <div className="signalements_reporter_section">
          <div className="signalements_section_title">Signalé par</div>
          <div className="signalements_reporter_info">
            {/* <div className="signalements_avatar">
              {signalement.reportedBy.avatar}
            </div> */}
            <div className="signalements_reporter_details">
              <div className="signalements_reporter_name">{signalement.signaleurName}</div>
              <div className="signalements_reporter_email">{signalement.signaleurEmail}</div>
            </div>
          </div>
        </div>

        <div className="signalements_description_section">
          <div className="signalements_section_title">Description</div>
          <div className="signalements_description">
            {signalement.description}
          </div>
        </div>

        <div className="signalements_content_info">
          <div className="signalements_content_type">
            <div className="signalements_section_title">Type de contenu</div>
            <div className="signalements_content_type_value">
               <Home size={16} />
              {signalement.contentType}
            </div>
          </div>

          <div className="signalements_reported_content">
            <div className="signalements_section_title">Contenu signalé</div>
            <div className="signalements_reported_content_card">
              <div className="signalements_reported_author">
                {/* {signalement.reportedContent.author} */}
              </div>
              <div className="signalements_reported_title">
                {signalement.contentName}
              </div>
              {signalement.status === 'EnAttente' && (
                <Link to={`/details/${signalement.contentId}`} className="signalements_view_original">
                  Voir le contenu original
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="signalements_reason_section">
          <div className="signalements_section_title">Raison</div>
          <div className="signalements_reason">
            {signalement.motif}
          </div>
        </div>

        {signalement.adminNote && (
          <div className="signalements_admin_note_section">
            <div className="signalements_section_title">Note administrative</div>
            {/* <div className="signalements_admin_note">
              {signalement.adminNote}
            </div> */}
          </div>
        )}

        {showActions && signalement.status === 'EnAttente' && (
          <div className="signalements_actions">
            <button 
              className="signalements_reject_btn"
              onClick={() => handleReject(signalement.id)}
            >
              <X size={16} />
              Rejeter
            </button>
            <button 
              className="signalements_resolve_btn"
              onClick={() => handleResolve(signalement.id)}
            >
              <CheckCircle size={16} />
              Résoudre
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="signalements_container">
      <div className="signalements_header">
        <h1 className="signalements_title">Gestion des signalements</h1>
        <p className="signalements_subtitle">Examinez et traitez les signalements des utilisateurs</p>
      </div>

      <div className="signalements_tabs">
        <button
          className={`signalements_tab ${activeTab === 'pending' ? 'signalements_tab_active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <Clock size={16} />
          En attente
          <span className="signalements_tab_count">{getTabCount('pending')}</span>
        </button>
        <button
          className={`signalements_tab ${activeTab === 'resolved' ? 'signalements_tab_active' : ''}`}
          onClick={() => setActiveTab('resolved')}
        >
          <CheckCircle size={16} />
          Résolus
          <span className="signalements_tab_count">{getTabCount('resolved')}</span>
        </button>
        <button
          className={`signalements_tab ${activeTab === 'rejected' ? 'signalements_tab_active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          <X size={16} />
          Rejetés
          <span className="signalements_tab_count">{getTabCount('rejected')}</span>
        </button>
      </div>

      <div className="signalements_content">
        {signalements[activeTab].length > 0 ? (
          signalements[activeTab].map((signalement) => (
            <SignalementCard 
              key={signalement.id} 
              signalement={signalement} 
              showActions={activeTab === 'pending'}
            />
          ))
        ) : (
          <div className="signalements_empty">
            <p>Aucun signalement dans cette catégorie</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signalements;