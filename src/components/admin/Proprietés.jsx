import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Check, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  MoreVertical 
} from 'lucide-react';
import '../../assets/styles/AdminStyles/Proprietes.css';

const Proprietes = () => {
  // État pour les données des propriétés
  const [proprietes, setProprietes] = useState([
    {
      id: 1,
      nom: "Modern Studio Apartment",
      adresse: "123 University Ave, Near Tech Campus",
      proprietaire: "John Smith",
      type: "Studio",
      prix: "$750/mo",
      statut: "Vérifiée",
      dateAjout: "15/05/2024",
      image: null
    },
    {
      id: 2,
      nom: "Spacious 2-Bedroom Apartment",
      adresse: "456 College St, Downtown",
      proprietaire: "Sarah Williams",
      type: "Apartment",
      prix: "$1200/mo",
      statut: "En attente",
      dateAjout: "10/06/2024",
      image: null
    },
    {
      id: 3,
      nom: "Cozy Room in Shared House",
      adresse: "789 Campus Dr, 5 min to University",
      proprietaire: "Michael Chen",
      type: "Room",
      prix: "$550/mo",
      statut: "Vérifiée",
      dateAjout: "20/05/2024",
      image: null
    },
    {
      id: 4,
      nom: "Luxury 3-Bedroom Townhouse",
      adresse: "101 Graduate Lane, Near Campus",
      proprietaire: "Robert Wilson",
      type: "House",
      prix: "$1800/mo",
      statut: "Rejetée",
      dateAjout: "05/06/2024",
      image: null
    }
  ]);

  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tous les types');
  const [statusFilter, setStatusFilter] = useState('Tous les statuts');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);

  // Options pour les filtres
  const typeOptions = ['Tous les types', 'Apartment', 'Maison', 'Studio', 'Chambre'];
  const statusOptions = ['Tous les statuts', 'En attente', 'Vérifiées', 'Rejetées'];

  // Fonction pour filtrer les propriétés
  const filteredProprietes = proprietes.filter(propriete => {
    const matchesSearch = propriete.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         propriete.adresse.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'Tous les types' || propriete.type === typeFilter;
    const matchesStatus = statusFilter === 'Tous les statuts' || propriete.statut === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Fonction pour obtenir la classe CSS du statut
  const getStatusClass = (statut) => {
    switch(statut) {
      case 'Vérifiée': return 'Proprietes-status-verified';
      case 'En attente': return 'Proprietes-status-pending';
      case 'Rejetée': return 'Proprietes-status-rejected';
      default: return '';
    }
  };

  // Fonctions pour les actions
  const handleVoirPropriete = (id) => {
    console.log('Voir propriété:', id);
    setShowActionsMenu(null);
  };

  const handleModifier = (id) => {
    console.log('Modifier propriété:', id);
    setShowActionsMenu(null);
  };

  const handleVerifier = (id) => {
    console.log('Vérifier propriété:', id);
    setShowActionsMenu(null);
  };

  const handleRejeter = (id) => {
    console.log('Rejeter propriété:', id);
    setShowActionsMenu(null);
  };

  const handleSupprimer = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      setProprietes(proprietes.filter(p => p.id !== id));
      setShowActionsMenu(null);
    }
  };

  return (
    <div className="Proprietes-container">
      <div className="Proprietes-header">
        <h1 className="Proprietes-title">Gestion des propriétés</h1>
        <p className="Proprietes-subtitle">Gérez les annonces de propriétés sur la plateforme</p>
      </div>

      <div className="Proprietes-filters">
        <div className="Proprietes-search-container">
          <div className="Proprietes-search-wrapper">
            <Search className="Proprietes-search-icon" size={20} />
            <input
              type="text"
              placeholder="Rechercher par titre ou emplacement..."
              className="Proprietes-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="Proprietes-filter-group">
          <div className="Proprietes-dropdown">
            <button 
              className="Proprietes-dropdown-button"
              onClick={() => {
                setShowTypeDropdown(!showTypeDropdown);
                setShowStatusDropdown(false);
              }}
            >
              {typeFilter}
              <ChevronDown className="Proprietes-dropdown-arrow" size={16} />
            </button>
            {showTypeDropdown && (
              <div className="Proprietes-dropdown-menu">
                {typeOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`Proprietes-dropdown-item ${typeFilter === option ? 'Proprietes-dropdown-item-selected' : ''}`}
                    onClick={() => {
                      setTypeFilter(option);
                      setShowTypeDropdown(false);
                    }}
                  >
                    {typeFilter === option && (
                      <Check className="Proprietes-check-icon" size={16} />
                    )}
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="Proprietes-dropdown">
            <button 
              className="Proprietes-dropdown-button"
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowTypeDropdown(false);
              }}
            >
              {statusFilter}
              <ChevronDown className="Proprietes-dropdown-arrow" size={16} />
            </button>
            {showStatusDropdown && (
              <div className="Proprietes-dropdown-menu">
                {statusOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`Proprietes-dropdown-item ${statusFilter === option ? 'Proprietes-dropdown-item-selected' : ''}`}
                    onClick={() => {
                      setStatusFilter(option);
                      setShowStatusDropdown(false);
                    }}
                  >
                    {statusFilter === option && (
                      <Check className="Proprietes-check-icon" size={16} />
                    )}
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="Proprietes-content">
        <h2 className="Proprietes-section-title">Propriétés ({filteredProprietes.length})</h2>
        
        <div className="Proprietes-table-container">
          <table className="Proprietes-table">
            <thead>
              <tr className="Proprietes-table-header">
                <th>Propriété</th>
                <th>Propriétaire</th>
                <th>Type</th>
                <th>Prix</th>
                <th>Statut</th>
                <th>Date d'ajout</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProprietes.map((propriete) => (
                <tr key={propriete.id} className="Proprietes-table-row">
                  <td className="Proprietes-property-cell">
                    <div className="Proprietes-property-info">
                      <div className="Proprietes-property-image"></div>
                      <div className="Proprietes-property-details">
                        <div className="Proprietes-property-name">{propriete.nom}</div>
                        <div className="Proprietes-property-address">{propriete.adresse}</div>
                      </div>
                    </div>
                  </td>
                  <td className="Proprietes-table-cell">{propriete.proprietaire}</td>
                  <td className="Proprietes-table-cell">{propriete.type}</td>
                  <td className="Proprietes-table-cell">{propriete.prix}</td>
                  <td className="Proprietes-table-cell">
                    <span className={`Proprietes-status ${getStatusClass(propriete.statut)}`}>
                      {propriete.statut}
                    </span>
                  </td>
                  <td className="Proprietes-table-cell">{propriete.dateAjout}</td>
                  <td className="Proprietes-table-cell">
                    <div className="Proprietes-actions-container">
                      <button 
                        className="Proprietes-actions-button"
                        onClick={() => setShowActionsMenu(showActionsMenu === propriete.id ? null : propriete.id)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {showActionsMenu === propriete.id && (
                        <div className="Proprietes-actions-menu">
                          <button 
                            className="Proprietes-action-item"
                            onClick={() => handleVoirPropriete(propriete.id)}
                          >
                            <Eye size={16} />
                            Voir la propriété
                          </button>
                          <button 
                            className="Proprietes-action-item"
                            onClick={() => handleModifier(propriete.id)}
                          >
                            <Edit size={16} />
                            Modifier
                          </button>
                          <button 
                            className="Proprietes-action-item"
                            onClick={() => handleVerifier(propriete.id)}
                          >
                            <CheckCircle size={16} />
                            Vérifier
                          </button>
                          <button 
                            className="Proprietes-action-item Proprietes-action-reject"
                            onClick={() => handleRejeter(propriete.id)}
                          >
                            <XCircle size={16} />
                            Rejeter
                          </button>
                          <button 
                            className="Proprietes-action-item Proprietes-action-delete"
                            onClick={() => handleSupprimer(propriete.id)}
                          >
                            <Trash2 size={16} />
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Proprietes;