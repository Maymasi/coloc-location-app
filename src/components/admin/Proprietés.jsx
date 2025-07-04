import React, { useEffect, useState } from 'react';
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
import { getProprietes,verifierPropriete,rejeterPropriete } from '../../Services/AdminServices/gestionProprietesService'

const Proprietes = () => {
  // État pour les données des propriétés
  const [proprietes, setProprietes] = useState([]);
  useEffect(() => {
    const fetchProprietes = async () => {
      try {
        const response = await getProprietes();
        setProprietes(response.$values);
      } catch (error) {
        console.error("Erreur lors de la récupération des propriétés:", error);
      }
    };
    fetchProprietes();
  }, []);

  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tous les types');
  const [statusFilter, setStatusFilter] = useState('Tous les statuts');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);

  // Options pour les filtres
  const typeOptions = ['Tous les types', 'Apartment', 'Maison', 'Studio', 'Chambre'];
  const statusOptions = ['Tous les statuts', 'EnAttente', 'Verifié', 'Rejeté'];

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
      case 'Verifié': return 'Proprietes-status-verified';
      case 'EnAttente': return 'Proprietes-status-pending';
      case 'Rejeté': return 'Proprietes-status-rejected';
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
    setShowActionsMenu(null);
    verifierPropriete(id)
      .then(() => {
        setProprietes(proprietes.map(p => 
          p.id === id ? { ...p, statut: 'Verifié' } : p
        ));
      })
      .catch(error => {
        console.error("Erreur lors de la vérification de la propriété:", error);
      });
  };

  const handleRejeter = (id) => {
    setShowActionsMenu(null);
    rejeterPropriete(id)
      .then(() => {
        setProprietes(proprietes.map(p => 
          p.id === id ? { ...p, statut: 'Rejeté' } : p
        ));
      })
      .catch(error => {
        console.error("Erreur lors du rejet de la propriété:", error);
      });
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