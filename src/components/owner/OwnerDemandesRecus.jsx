import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, MapPin, Calendar, Euro, MoreHorizontal, Check, X, User } from 'lucide-react';
import '../../assets/styles/ownerCss/DemandesRecues.css';

const OwnerDemandesRecus = () => {
  const [activeTab, setActiveTab] = useState('toutes');
  const [openDropdown, setOpenDropdown] = useState(null);

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

  const demandes = [
    {
      id: 1,
      nom: 'Sarah Williams',
      email: 'sarah.williams@university.edu',
      photo: null,
      logement: 'Maison de ville 3 chambres',
      datedemande: '10 mars 2024',
      budget: '1800 €/m',
      message: 'Bonjour, nous sommes trois étudiantes en médecine à la recherche d\'un logement spacieux et calme. Nous sommes très sérieuses dans nos études et recherchons un environnement propice au travail. Nous avons tous d\'excellents dossiers académiques et financiers.',
      universite: 'Faculté de Médecine',
      annee: '4ème année',
      duree: '3 ans',
      emmenagement: '1er septembre 2024',
      status: 'en-attente',
      priority: 'haute'
    },
    {
      id: 2,
      nom: 'David Lee',
      email: 'david.lee@university.edu',
      photo: null,
      logement: 'Chambre dans maison partagée',
      datedemande: '8 mars 2024',
      budget: '550 €/mois',
      message: '',
      universite: '',
      annee: '',
      duree: '2 ans',
      emmenagement: '15 août 2024',
      status: 'rejetee',
      priority: 'basse'
    },
    {
      id: 3,
      nom: 'Emma Johnson',
      email: 'emma.johnson@university.edu',
      photo: null,
      logement: 'Studio moderne centre-ville',
      datedemande: '15 mars 2024',
      budget: '800 €/mois',
      message: 'Bonjour, je suis très intéressée par votre studio. Je suis étudiante en master de littérature et je recherche un logement calme pour mes études. Je suis sérieux et respectueux. Pourriez-vous me donner plus d\'informations sur les charges incluses ?',
      universite: 'Université Paris Sorbonne',
      annee: 'Master 1',
      duree: '1 an',
      emmenagement: '1er septembre 2024',
      status: 'en-attente',
      priority: 'haute'
    },
    {
      id: 4,
      nom: 'Michael Chen',
      email: 'michael.chen@university.edu',
      photo: null,
      logement: 'Appartement 2 chambres spacieux',
      datedemande: '12 mars 2024',
      budget: '1200 €/mois',
      message: 'Bonjour, mon colocataire et moi sommes intéressés par votre appartement. Nous sommes tous les deux étudiants ingénieurs, non-fumeurs et très respectueux...',
      universite: '',
      annee: '',
      duree: '',
      emmenagement: '',
      status: 'approuvee',
      priority: 'moyenne'
    }
  ];

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
  };

  const handleReject = (demandeId) => {
    console.log('Rejeter la demande:', demandeId);
    setOpenDropdown(null);
  };

  const handleRespond = (demandeId) => {
    console.log('Répondre à la demande:', demandeId);
    setOpenDropdown(null);
  };

  const handleViewProfile = (demandeId) => {
    console.log('Voir le profil:', demandeId);
    setOpenDropdown(null);
  };

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
        {getFilteredDemandes().map((demande) => (
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
                        className="dropdown-item respond"
                        onClick={() => handleRespond(demande.id)}
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
              <button className="btn-approve">
                <Check size={16} />
                Approbateur
              </button>
              <button className="btn-reject">
                <X size={16} />
                Rejeter
              </button>
              <button className="btn-respond">
                <MessageCircle size={16} />
                Répondre
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerDemandesRecus;