import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, MapPin, Calendar, Euro, MoreHorizontal, Check, X, User, FileText, Users, Clock } from 'lucide-react';
import { GetAllReceivedRequestsLocationOwner } from '../../Services/DemandeDeLocationService'; 
import '../../assets/styles/ownerCss/DemandesRecues.css';

const OwnerDemandesRecus = () => {
  const [activeTab, setActiveTab] = useState('toutes');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les demandes depuis l'API
  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        setLoading(true);
        const response = await GetAllReceivedRequestsLocationOwner();
        
        if (response.success) {
          // Transformer les données de l'API pour correspondre au format attendu
          const transformedDemandes = response.data.$values.map(demande => ({
            id: demande.id,
            nom: demande.nom,
            email: demande.email,
            photo: demande.photo,
            logement: demande.logement,
            datedemande: demande.dateDemande,
            budget: demande.budget,
            message: demande.message,
            universite: demande.universite,
            annee: demande.annee,
            duree: demande.duree,
            emmenagement: demande.emmenagement,
            status: demande.status,
            priority: demande.priority,
            annonceId: demande.annonceId,
            etudiantId: demande.etudiantId,
            messageReponse: demande.messageReponse,
            dateReponse: demande.dateReponse,
            dateCreation: demande.dateCreation,
            dateEmmenagementOriginal: demande.dateEmmenagementOriginal,
            dureeSejour: demande.dureeSejour,
            nbOccupants: demande.nbOccupants,
            statusOriginal: demande.statusOriginal
          }));
          
          setDemandes(transformedDemandes);
        } else {
          setError(response.error || 'Erreur lors du chargement des demandes');
        }
      } catch (err) {
        console.error('Erreur lors du chargement des demandes:', err);
        setError('Erreur lors du chargement des demandes');
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, []);

  // Fermer le menu quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getFilteredDemandes = () => {
    switch (activeTab) {
      case 'en-attente':
        return demandes.filter(d => d.status === 'en-attente');
      case 'approuvees':
        return demandes.filter(d => d.status === 'approuvee');
      case 'rejetees':
        return demandes.filter(d => d.status === 'rejetee');
      default:
        return demandes;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'en-attente': return 'orange';
      case 'approuvee': return 'green';
      case 'rejetee': return 'red';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'haute': return 'red';
      case 'moyenne': return 'orange';
      case 'basse': return 'green';
      default: return 'gray';
    }
  };

  const counts = {
    total: demandes.length,
    enAttente: demandes.filter(d => d.status === 'en-attente').length,
    approuvees: demandes.filter(d => d.status === 'approuvee').length,
    rejetees: demandes.filter(d => d.status === 'rejetee').length
  };

  const handleApprove = (demandeId) => {
    console.log('Approuver la demande:', demandeId);
    setOpenDropdown(null);
    // TODO: Implémenter l'approbation via API
  };

  const handleReject = (demandeId) => {
    console.log('Rejeter la demande:', demandeId);
    setOpenDropdown(null);
    // TODO: Implémenter le rejet via API
  };

  const handleRespond = (demandeId) => {
    console.log('Répondre à la demande:', demandeId);
    setOpenDropdown(null);
    // TODO: Implémenter la réponse via API
  };

  const handleViewProfile = (demandeId) => {
    console.log('Voir le profil:', demandeId);
    setOpenDropdown(null);
    // TODO: Implémenter la vue du profil
  };

  // Fonction pour obtenir l'état vide selon l'onglet actif
  const getEmptyStateContent = () => {
    switch (activeTab) {
      case 'en-attente':
        return {
          icon: <Clock size={64} style={{ color: '#f59e0b' }} />,
          title: 'Aucune demande en attente',
          description: 'Toutes vos demandes ont été traitées ou vous n\'avez pas encore reçu de nouvelles demandes.',
          suggestion: 'Les nouvelles demandes apparaîtront ici dès qu\'elles seront soumises.'
        };
      case 'approuvees':
        return {
          icon: <Check size={64} style={{ color: '#10b981' }} />,
          title: 'Aucune demande approuvée',
          description: 'Vous n\'avez encore approuvé aucune demande de location.',
          suggestion: 'Consultez l\'onglet "En attente" pour traiter les demandes en cours.'
        };
      case 'rejetees':
        return {
          icon: <X size={64} style={{ color: '#ef4444' }} />,
          title: 'Aucune demande rejetée',
          description: 'Vous n\'avez encore rejeté aucune demande de location.',
          suggestion: 'C\'est plutôt une bonne nouvelle ! Cela signifie que vous trouvez des locataires adaptés.'
        };
      default:
        return {
          icon: <FileText size={64} style={{ color: '#6b7280' }} />,
          title: 'Aucune demande reçue',
          description: 'Vous n\'avez pas encore reçu de demandes de location pour vos propriétés.',
          suggestion: 'Assurez-vous que vos annonces sont bien publiées et visibles aux étudiants.'
        };
    }
  };

  // Fonction pour vérifier si le bouton répondre doit être désactivé
  const isRespondDisabled = (status) => {
    return status !== 'approuvee';
  };

  // Affichage de chargement
  if (loading) {
    return (
      <div className="demandes-container">
        <div className="demandes-header">
          <h1>Demandes reçues</h1>
          <p>Chargement des demandes...</p>
        </div>
      </div>
    );
  }

  // Affichage d'erreur
  if (error) {
    return (
      <div className="demandes-container">
        <div className="demandes-header">
          <h1>Demandes reçues</h1>
          <p style={{ color: 'red' }}>Erreur : {error}</p>
        </div>
      </div>
    );
  }

  const emptyStateContent = getEmptyStateContent();

  return (
    <div className="demandes-container">
      <div className="demandes-header">
        <h1>Demandes reçues</h1>
        <p>Gérez les demandes de localisation de vos propriétés</p>
      </div>

      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Rechercher par nom d'étudiant ou de propriété..."
          className="search-input"
        />
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-content">
            <div className="stat-label">Total</div>
            <div className="stat-number">{counts.total}</div>
          </div>
           <div className="stat-icon">
            <MessageCircle size={18} />
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-content">
            <div className="stat-label">En attente</div>
            <div className="stat-number">{counts.enAttente}</div>
          </div>
           <div className="stat-icon">
            <Calendar size={18} />
          </div>
        </div>

        <div className="stat-card approved">
          <div className="stat-content">
            <div className="stat-label">Approuvées</div>
            <div className="stat-number">{counts.approuvees}</div>
          </div>
           <div className="stat-icon">
            <Check size={18} />
          </div>
        </div>

        <div className="stat-card rejected">
          <div className="stat-content">
            <div className="stat-label">Rejetées</div>
            <div className="stat-number">{counts.rejetees}</div>
          </div>
           <div className="stat-icon">
            <X size={18} />
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'toutes' ? 'active' : ''}`}
          onClick={() => setActiveTab('toutes')}
        >
          Toutes ({counts.total})
        </button>
        <button 
          className={`tab-button ${activeTab === 'en-attente' ? 'active' : ''}`}
          onClick={() => setActiveTab('en-attente')}
        >
          En attente ({counts.enAttente})
        </button>
        <button 
          className={`tab-button ${activeTab === 'approuvees' ? 'active' : ''}`}
          onClick={() => setActiveTab('approuvees')}
        >
          Approuvés ({counts.approuvees})
        </button>
        <button 
          className={`tab-button ${activeTab === 'rejetees' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejetees')}
        >
          Rejetées ({counts.rejetees})
        </button>
      </div>

      <div className="demandes-list">
        {getFilteredDemandes().length === 0 ? (
          <div 
            className="empty-state"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '2px dashed #e2e8f0',
              margin: '2rem 0',
              minHeight: '300px'
            }}
          >
            <div 
              style={{
                marginBottom: '1.5rem',
                opacity: '0.7'
              }}
            >
              {emptyStateContent.icon}
            </div>
            <h3 
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.75rem'
              }}
            >
              {emptyStateContent.title}
            </h3>
            <p 
              style={{
                fontSize: '1rem',
                color: '#6b7280',
                marginBottom: '1rem',
                maxWidth: '400px',
                lineHeight: '1.5'
              }}
            >
              {emptyStateContent.description}
            </p>
            <p 
              style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                fontStyle: 'italic',
                maxWidth: '450px',
                lineHeight: '1.4'
              }}
            >
              {emptyStateContent.suggestion}
            </p>
            {activeTab === 'toutes' && demandes.length === 0 && (
              <div 
                style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: '#eff6ff',
                  borderRadius: '8px',
                  border: '1px solid #dbeafe'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Users size={16} style={{ color: '#3b82f6' }} />
                  <span style={{ color: '#1e40af', fontWeight: '500', fontSize: '0.875rem' }}>
                    Conseils pour recevoir plus de demandes :
                  </span>
                </div>
                <ul style={{ color: '#374151', fontSize: '0.825rem', listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.25rem' }}>• Vérifiez que vos annonces sont bien publiées</li>
                  <li style={{ marginBottom: '0.25rem' }}>• Ajoutez des photos attrayantes de vos propriétés</li>
                  <li style={{ marginBottom: '0.25rem' }}>• Optimisez vos descriptions et prix</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          getFilteredDemandes().map((demande) => (
            <div key={demande.id} className="demande-card">
              <div className="demande-header">
                <div className="user-info">
                  <div className="avatar">
                    {demande.nom.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="user-details">
                    <h3>{demande.nom}</h3>
                    <p>{demande.email}</p>
                  </div>
                </div>
                <div className="status-badges">
                  <span className={`status-badge ${demande.status}`}>
                    {demande.status === 'en-attente' && 'En attente'}
                    {demande.status === 'approuvee' && 'Approuvée'}
                    {demande.status === 'rejetee' && 'Rejetée'}
                  </span>
                  <span className={`priority-badge ${demande.priority}`}>
                    {demande.priority === 'haute' && 'Haute'}
                    {demande.priority === 'moyenne' && 'Moyenne'}
                    {demande.priority === 'basse' && 'Basse'}
                  </span>
                  
                  <div className="dropdown-container">
                    <button 
                      className="more-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === demande.id ? null : demande.id);
                      }}
                    >
                      <MoreHorizontal size={20} />
                    </button>
                    
                    {openDropdown === demande.id && (
                      <div className="dropdown-menu">
                        <button 
                          className="dropdown-item approve"
                          onClick={() => handleApprove(demande.id)}
                        >
                          <Check size={16} />
                          Approbateur
                        </button>
                        <button 
                          className="dropdown-item reject"
                          onClick={() => handleReject(demande.id)}
                        >
                          <X size={16} />
                          Rejeter
                        </button>
                        <button 
                          className={`dropdown-item respond ${isRespondDisabled(demande.status) ? 'disabled' : ''}`}
                          onClick={() => !isRespondDisabled(demande.status) && handleRespond(demande.id)}
                          disabled={isRespondDisabled(demande.status)}
                        >
                          <MessageCircle size={16} />
                          Envoyer un message
                        </button>
                        <button 
                          className="dropdown-item profile"
                          onClick={() => handleViewProfile(demande.id)}
                        >
                          <User size={16} />
                          Voir le profil
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="property-info">
                <div className="property-item">
                  <MapPin size={16} />
                  <span>{demande.logement}</span>
                </div>
                <div className="property-item">
                  <Calendar size={16} />
                  <span>Demandé le {demande.datedemande}</span>
                </div>
                <div className="property-item">
                  <Euro size={16} />
                  <span>Budget : {demande.budget}</span>
                </div>
              </div>

              {demande.message && (
                <div className="message-section">
                  <h4>Message de l'étudiant :</h4>
                  <p>{demande.message}</p>
                </div>
              )}

              {(demande.universite || demande.duree) && (
                <div className="student-details">
                  {demande.universite && (
                    <div className="detail-item">
                      <span className="label">Université :</span>
                      <span>{demande.universite}</span>
                    </div>
                  )}
                  {demande.annee && (
                    <div className="detail-item">
                      <span className="label">Année d'étude :</span>
                      <span>{demande.annee}</span>
                    </div>
                  )}
                  {demande.duree && (
                    <div className="detail-item">
                      <span className="label">Durée souhaitée :</span>
                      <span>{demande.duree}</span>
                    </div>
                  )}
                  {demande.emmenagement && (
                    <div className="detail-item">
                      <span className="label">Date d'emménagement :</span>
                      <span>{demande.emmenagement}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="actions">
                <button className="btn-approve" onClick={() => handleApprove(demande.id)}>
                  <Check size={16} />
                  Approbateur
                </button>
                <button className="btn-reject" onClick={() => handleReject(demande.id)}>
                  <X size={16} />
                  Rejeter
                </button>
                <button 
                  className={`btn-respond ${isRespondDisabled(demande.status) ? 'disabled' : ''}`}
                  onClick={() => !isRespondDisabled(demande.status) && handleRespond(demande.id)}
                  disabled={isRespondDisabled(demande.status)}
                  title={isRespondDisabled(demande.status) ? 'Vous pouvez seulement répondre aux demandes approuvées' : 'Envoyer un message'}
                >
                  <MessageCircle size={16} />
                  Répondre
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerDemandesRecus;