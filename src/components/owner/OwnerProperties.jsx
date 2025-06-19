import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Image, MapPin, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';
import { getAllProperties, deleteProperty, changePropertyStatus } from '../../Services/PropertyService';
import '../../assets/styles/ownerCss/PropertiesPage.css';

const OwnerProperties = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showMenu, setShowMenu] = useState(null);
  const [page, setPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const propertiesPerPage = 3;

  // Charger les propriétés au montage du composant
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await getAllProperties();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des propriétés:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (propertyId) => {
    setShowMenu(showMenu === propertyId ? null : propertyId);
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      try {
        await deleteProperty(propertyId);
        await fetchProperties(); // Recharger la liste
        setShowMenu(null);
        alert('Propriété supprimée avec succès !');
      } catch (err) {
        alert('Erreur lors de la suppression : ' + err.message);
      }
    }
  };

  const handleStatusChange = async (propertyId, currentStatus) => {
    const newStatus = currentStatus === 'brouillon' ? 'actif' : 'brouillon';
    try {
      await changePropertyStatus(propertyId, newStatus);
      await fetchProperties(); // Recharger la liste
      setShowMenu(null);
      alert(`Statut changé vers ${newStatus} avec succès !`);
    } catch (err) {
      alert('Erreur lors du changement de statut : ' + err.message);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'actif') return 'Actif';
    if (status === 'loue') return 'Loué';
    if (status === 'brouillon') return 'Brouillon';
    return 'Actif';
  };

  const getStatusClass = (status) => {
    if (status === 'actif') return 'status-active';
    if (status === 'loue') return 'status-rented';
    if (status === 'brouillon') return 'status-draft';
    return 'status-active';
  };

  // Calculer les statistiques automatiquement
  const calculateStats = () => {
    const total = properties.length;
    const actifs = properties.filter(p => p.status === 'actif').length;
    const loues = properties.filter(p => p.status === 'loue').length;
    const brouillons = properties.filter(p => p.status === 'brouillon').length;
    
    return { total, actifs, loues, brouillons };
  };

  const stats = calculateStats();

  const filteredProperties = () => {
    let filtered = properties;
    
    // Filtrer par onglet
    if (activeTab !== 'all') {
      filtered = filtered.filter(property => property.status === activeTab);
    }
    
    // Filtrer par recherche
    if (searchTerm) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const paginatedProperties = () => {
    const filtered = filteredProperties();
    const startIndex = (page - 1) * propertiesPerPage;
    return filtered.slice(startIndex, startIndex + propertiesPerPage);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setPage(1);
    setShowMenu(null);
  };

  const totalPages = Math.ceil(filteredProperties().length / propertiesPerPage);

  if (loading) {
    return (
      <div className="property-management">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Chargement des propriétés...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="property-management">
        <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          <p>Erreur : {error}</p>
          <button onClick={fetchProperties} style={{ marginTop: '10px', padding: '8px 16px' }}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="property-management">
      <div className="header">
        <div className="header-content">
          <h1>Mes propriétés</h1>
          <p>Gérez toutes vos propriétés en location</p>
        </div>
        <button className="add-property-btn">
          <Plus size={20} />
          Ajouter une propriété
        </button>
      </div>

      <div className="search-bar">
        <div className="search-input">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher par titre ou localisation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Total</span>
            <span className="stat-number">{stats.total}</span>
          </div>
          <div className="stat-icon total-icon">📋</div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Actifs</span>
            <span className="stat-number">{stats.actifs}</span>
          </div>
          <div className="stat-icon active-icon">👁</div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Louées</span>
            <span className="stat-number">{stats.loues}</span>
          </div>
          <div className="stat-icon rented-icon">🏠</div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Brouillons</span>
            <span className="stat-number">{stats.brouillons}</span>
          </div>
          <div className="stat-icon draft-icon">✏️</div>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabChange('all')}
        >
          Toutes ({stats.total})
        </button>
        <button 
          className={`tab ${activeTab === 'actif' ? 'active' : ''}`}
          onClick={() => handleTabChange('actif')}
        >
          Actifs ({stats.actifs})
        </button>
        <button 
          className={`tab ${activeTab === 'loue' ? 'active' : ''}`}
          onClick={() => handleTabChange('loue')}
        >
          Louées ({stats.loues})
        </button>
        <button 
          className={`tab ${activeTab === 'brouillon' ? 'active' : ''}`}
          onClick={() => handleTabChange('brouillon')}
        >
          Brouillons ({stats.brouillons})
        </button>
      </div>

      <div className="properties-grid">
        {paginatedProperties().map((property) => (
          <div key={property.id} className="property-card">
            <div className="property-header">
              <span className={`status-badge ${getStatusClass(property.status)}`}>
                {getStatusBadge(property.status)}
              </span>
              <button 
                className="menu-btn"
                onClick={() => handleMenuClick(property.id)}
              >
                <MoreHorizontal size={20} />
              </button>
              {showMenu === property.id && (
                <div className="dropdown-menu">
                  <button className="menu-item">
                    <Eye size={16} />
                    Voir l'annonce
                  </button>
                  <button className="menu-item">
                    <Edit size={16} />
                    Modifier
                  </button>
                  {(property.status === 'brouillon' || property.status === 'actif') && (
                    <button 
                      className="menu-item"
                      onClick={() => handleStatusChange(property.id, property.status)}
                    >
                      {property.status === 'brouillon' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      {property.status === 'brouillon' ? 'Activer' : 'Désactiver'}
                    </button>
                  )}
                  <button 
                    className="menu-item delete"
                    onClick={() => handleDeleteProperty(property.id)}
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              )}
            </div>

            <div 
              className="property-image"
              style={{
                backgroundImage: property.imageUrl ? `url(${property.imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {!property.imageUrl && <Image size={48} className="placeholder-icon" />}
            </div>

            <div className="property-info">
              <h3>{property.title}</h3>
              <div className="property-location">
                <MapPin size={16} />
                <span>{property.location}</span>
              </div>
              <div className="property-date">
                <Calendar size={16} />
                <span>{property.publishDate}</span>
              </div>
            </div>

            <div className="property-stats">
              <div className="stat-row">
                <span className="stat-label">Prix:</span>
                <span className="stat-value">{property.price}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Vues:</span>
                <span className="stat-value">{property.views || 0}</span>
              </div>
            </div>

            <div className="property-actions">
              <button className="action-btn edit">
                <Edit size={16} />
                Modifier
              </button>
              <button className="action-btn view">
                <Eye size={16} />
                Voir
              </button>
              {(property.status === 'brouillon' || property.status === 'actif') && (
                <button 
                  className="action-btn status"
                  onClick={() => handleStatusChange(property.id, property.status)}
                >
                  {property.status === 'brouillon' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                  {property.status === 'brouillon' ? 'Activer' : 'Désactiver'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {paginatedProperties().length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Aucune propriété trouvée.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Pagination 
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default OwnerProperties;