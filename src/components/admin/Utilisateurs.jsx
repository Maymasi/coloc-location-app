import React, { useEffect, useState } from 'react';
import { Search, Eye, Mail, UserX, UserMinus, MoreHorizontal } from 'lucide-react';
import "../../assets/styles/AdminStyles/Utilisateurs.css"
import { getAllUsers,bannirUser,suspendreUser } from '../../Services/AdminServices/gestionUtilisateurService';
import Alert from '@mui/material/Alert';
const Utilisateurs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous les types');
  const [selectedStatus, setSelectedStatus] = useState('Tous les statuts');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(null);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  
  useEffect(() => {
    const fetchUsers = async()=>{
      try {
        const response = await getAllUsers();
        setUtilisateurs(response.$values);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  },[]);

  const types = ['Tous les types', 'Etudiants', 'Proprietaires', 'Administrateurs'];
  const statuts = ['Tous les statuts', 'actifs', 'suspendus'];

  // Filtrage des utilisateurs
  const filteredUsers = utilisateurs.filter(user => {
    const matchesSearch =  user.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Tous les types' || user.type === selectedType.slice(0, -1);
    const matchesStatus = selectedStatus === 'Tous les statuts' || user.statut === selectedStatus.slice(0, -1);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAction = (action, userId) => {
    console.log(`Action ${action} pour l'utilisateur ${userId}`);
    if (action === 'bannir') {
      bannirUser(userId)
        .then(() => {
          setUtilisateurs(prevUsers => prevUsers.filter(user => user.id !== userId));
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 3000); 
        })
        .catch(error => {
          console.error('Erreur lors du bannissement de l\'utilisateur:', error);
          alert('Erreur lors du bannissement de l\'utilisateur');
        });
    }
    if( action === 'suspendre') {
      suspendreUser(userId)
        .then(() => {
          setUtilisateurs(prevUsers => prevUsers.map(user => 
            user.id === userId ? { ...user, statut: 'Suspendu' } : user
          ));
        })
        .catch(error => {
          console.error('Erreur lors de la suspension de l\'utilisateur:', error);
          alert('Erreur lors de la suspension de l\'utilisateur');
        });
    }
    setShowActionDropdown(null);
  };

  const getStatusBadgeClass = (statut) => {
    switch (statut) {
      case 'Actif': return 'utilisateurs-badge-actif';
      case 'Suspendu': return 'utilisateurs-badge-suspendu';
      case 'Banni': return 'utilisateurs-badge-banni';
      default: return 'utilisateurs-badge-actif';
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Etudiant': return 'utilisateurs-badge-etudiant';
      case 'Proprietaire': return 'utilisateurs-badge-proprietaire';
      case 'Administrateur': return 'utilisateurs-badge-admin';
      default: return 'utilisateurs-badge-etudiant';
    }
  };
  return (
    <div className="utilisateurs-container">
      <div className="utilisateurs-header">
        <h1 className="utilisateurs-title">Gestion des utilisateurs</h1>
        <p className="utilisateurs-subtitle">Gérez les comptes utilisateurs de la plateforme</p>
      </div>

      <div className="utilisateurs-filters">
        <div className="utilisateurs-search">
          <Search className="utilisateurs-search-icon" size={20} />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="utilisateurs-search-input"
          />
        </div>

        <div className="utilisateurs-dropdown-container">
          <button 
            className="utilisateurs-dropdown-button"
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
          >
            {selectedType}
            <span className="utilisateurs-dropdown-arrow">▼</span>
          </button>
          {showTypeDropdown && (
            <div className="utilisateurs-dropdown-menu">
              {types.map(type => (
                <div
                  key={type}
                  className={`utilisateurs-dropdown-item ${selectedType === type ? 'utilisateurs-dropdown-item-selected' : ''}`}
                  onClick={() => {
                    setSelectedType(type);
                    setShowTypeDropdown(false);
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="utilisateurs-dropdown-container">
          <button 
            className="utilisateurs-dropdown-button"
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          >
            {selectedStatus}
            <span className="utilisateurs-dropdown-arrow">▼</span>
          </button>
          {showStatusDropdown && (
            <div className="utilisateurs-dropdown-menu">
              {statuts.map(statut => (
                <div
                  key={statut}
                  className={`utilisateurs-dropdown-item ${selectedStatus === statut ? 'utilisateurs-dropdown-item-selected' : ''}`}
                  onClick={() => {
                    setSelectedStatus(statut);
                    setShowStatusDropdown(false);
                  }}
                >
                  {statut}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="utilisateurs-table-container">
        <h2 className="utilisateurs-table-title">Utilisateurs ({filteredUsers.length})</h2>
        
        <table className="utilisateurs-table">
          <thead>
            <tr className="utilisateurs-table-header">
              <th className="utilisateurs-th">Utilisateur</th>
              <th className="utilisateurs-th">Type</th>
              <th className="utilisateurs-th">Statut</th>
              <th className="utilisateurs-th">Vérifié</th>
              <th className="utilisateurs-th">Date d'inscription</th>
              <th className="utilisateurs-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="utilisateurs-table-row">
                <td className="utilisateurs-td">
                  <div className="utilisateurs-user-info">
                    <div className="utilisateurs-avatar"></div>
                    <div>
                      <div className="utilisateurs-user-name">{user.nom}</div>
                      <div className="utilisateurs-user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="utilisateurs-td">
                  <span className={`utilisateurs-badge ${getTypeBadgeClass(user.type)}`}>
                    {user.type}
                  </span>
                </td>
                <td className="utilisateurs-td">
                  <span className={`utilisateurs-badge ${getStatusBadgeClass(user.statut)}`}>
                    {user.statut}
                  </span>
                </td>
                <td className="utilisateurs-td">
                  <span className={`utilisateurs-badge ${user.verifie ? 'utilisateurs-badge-verifie' : 'utilisateurs-badge-non-verifie'}`}>
                    {user.verifie ? 'Vérifié' : 'Non vérifié'}
                  </span>
                </td>
                <td className="utilisateurs-td">{user.dateInscription}</td>
                <td className="utilisateurs-td">
                  <div className="utilisateurs-actions-container">
                    <button
                      className="utilisateurs-action-button"
                      onClick={() => setShowActionDropdown(showActionDropdown === user.id ? null : user.id)}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {showActionDropdown === user.id && (
                      <div className="utilisateurs-action-dropdown">
                        <button 
                          className="utilisateurs-action-item"
                          onClick={() => handleAction('voir', user.id)}
                        >
                          <Eye size={16} />
                          Voir le profil
                        </button>
                        <button 
                          className="utilisateurs-action-item"
                          onClick={() => handleAction('contacter', user.id)}
                        >
                          <Mail size={16} />
                          Contacter
                        </button>
                        <button 
                          className="utilisateurs-action-item"
                          onClick={() => handleAction('suspendre', user.id)}
                        >
                          <UserMinus size={16} />
                          Suspendre
                        </button>
                        <button 
                          className="utilisateurs-action-item utilisateurs-action-danger"
                          onClick={() => handleAction('bannir', user.id)}
                        >
                          <UserX size={16} />
                          Bannir
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
      {showSuccessAlert && (
        <div style={{
          position: 'fixed',
          bottom: 20,
          left: '60%',
          transform: 'translateX(-60%)',
          zIndex: 9999
        }}>
          <Alert severity="success" variant="filled">
            Utilisateur banni avec succès.
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Utilisateurs;