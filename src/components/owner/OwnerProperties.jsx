import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Image, MapPin, Calendar } from 'lucide-react';
import '../../assets/styles/ownerCss/PropertiesPage.css';

const OwnerProperties = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showMenu, setShowMenu] = useState(null);
  const [page, setPage] = useState(1);
  const propertiesPerPage = 3;

  const properties = [
    {
      id: 1,
      title: "Studio moderne centre-ville",
      location: "Paris 5ème",
      publishDate: "Publié le15 mars 2024",
      price: "750 €/mois",
      views: 87,
      requests: 5,
      status: "active",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Appartement 2 chambres spacieux",
      location: "Lyon 3ème",
      publishDate: "Publié le10 mars 2024",
      price: "1200 €/mois",
      views: 124,
      requests: 8,
      status: "active",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Chambre dans maison partagée",
      location: "Toulouse Centre",
      publishDate: "Publié le5 mars 2024",
      price: "550 €/mois",
      views: 37,
      requests: 2,
      status: "rented",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Appartement familial avec jardin",
      location: "Marseille 8ème",
      publishDate: "Publié le1 mars 2024",
      price: "980 €/mois",
      views: 62,
      requests: 3,
      status: "active",
      imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Loft industriel rénové",
      location: "Bordeaux Centre",
      publishDate: "Brouillon créé le28 février 2024",
      price: "1500 €/mois",
      views: 0,
      requests: 0,
      status: "draft",
      imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop"
    }
  ];

  const handleMenuClick = (propertyId) => {
    setShowMenu(showMenu === propertyId ? null : propertyId);
  };

  const getStatusBadge = (status) => {
    if (status === 'active') return 'Actif';
    if (status === 'rented') return 'Loué';
    if (status === 'draft') return 'Brouillon';
    return 'Actif';
  };

  const getStatusClass = (status) => {
    if (status === 'active') return 'status-active';
    if (status === 'rented') return 'status-rented';
    if (status === 'draft') return 'status-draft';
    return 'status-active';
  };

  const filteredProperties = () => {
    if (activeTab === 'all') return properties;
    return properties.filter(property => property.status === activeTab);
  };

  const paginatedProperties = () => {
    const filtered = filteredProperties();
    const startIndex = (page - 1) * propertiesPerPage;
    return filtered.slice(startIndex, startIndex + propertiesPerPage);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // pour remonter en haut de la page
  };

  const totalPages = Math.ceil(filteredProperties().length / propertiesPerPage);

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
          <input type="text" placeholder="Rechercher par titre ou localisation..." />
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Total</span>
            <span className="stat-number">5</span>
          </div>
          <div className="stat-icon total-icon">📋</div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Actifs</span>
            <span className="stat-number">3</span>
          </div>
          <div className="stat-icon active-icon">👁</div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Louées</span>
            <span className="stat-number">1</span>
          </div>
          <div className="stat-icon rented-icon">🏠</div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Brouillons</span>
            <span className="stat-number">1</span>
          </div>
          <div className="stat-icon draft-icon">✏️</div>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('all');
            setPage(1);
          }}
        >
          Toutes (5)
        </button>
        <button 
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('active');
            setPage(1);
          }}
        >
          Actifs (3)
        </button>
        <button 
          className={`tab ${activeTab === 'rented' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('rented');
            setPage(1);
          }}
        >
          Louées (1)
        </button>
        <button 
          className={`tab ${activeTab === 'draft' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('draft');
            setPage(1);
          }}
        >
          Brouillons (1)
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
                    Modificateur
                  </button>
                  <button className="menu-item delete">
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              )}
            </div>

            <div 
              className="property-image"
              style={{
                backgroundImage: `url(${property.imageUrl})`,
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
                <span className="stat-value">{property.views}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Demandes:</span>
                <span className="stat-value">{property.requests}</span>
              </div>
            </div>

            <div className="property-actions">
              <button className="action-btn edit">
                <Edit size={16} />
                Modificateur
              </button>
              <button className="action-btn view">
                <Eye size={16} />
                Voir
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Pagination 
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="#ea580c"
          />
        </div>
      )}
    </div>
  );
};

export default OwnerProperties;
