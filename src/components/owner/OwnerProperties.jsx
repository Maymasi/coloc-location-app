import React, { useState, useEffect } from 'react';
import { Pagination, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Image, MapPin, Calendar, ToggleLeft, ToggleRight, CheckCircle, Home } from 'lucide-react';
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
  
  // États pour les snackbars
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });

  // États pour les confirmations
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null,
    type: '' // 'delete', 'status', 'rent'
  });

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
      showSnackbar('Erreur lors du chargement des propriétés', 'error');
      console.error('Erreur lors du chargement des propriétés:', err);
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const showConfirmDialog = (title, message, onConfirm, type = '') => {
    setConfirmDialog({
      open: true,
      title,
      message,
      onConfirm,
      type
    });
  };

  const handleConfirmClose = () => {
    setConfirmDialog({
      open: false,
      title: '',
      message: '',
      onConfirm: null,
      type: ''
    });
  };

  const handleConfirmAction = () => {
    if (confirmDialog.onConfirm) {
      confirmDialog.onConfirm();
    }
    handleConfirmClose();
  };

  const handleMenuClick = (propertyId) => {
    setShowMenu(showMenu === propertyId ? null : propertyId);
  };

  const handleDeleteProperty = (propertyId) => {
    showConfirmDialog(
      'Supprimer la propriété',
      'Êtes-vous sûr de vouloir supprimer cette propriété ? Cette action est irréversible.',
      async () => {
        try {
          await deleteProperty(propertyId);
          await fetchProperties();
          setShowMenu(null);
          showSnackbar('Propriété supprimée avec succès !', 'success');
        } catch (err) {
          showSnackbar('Erreur lors de la suppression : ' + err.message, 'error');
        }
      },
      'delete'
    );
  };

  const handleStatusChange = (propertyId, currentStatus, targetStatus) => {
    let title, message;
    
    if (currentStatus === 'brouillon' && targetStatus === 'active') {
      title = 'Publier la propriété';
      message = 'Voulez-vous publier cette propriété ? Elle sera visible par les locataires.';
    } else if (currentStatus === 'active' && targetStatus === 'brouillon') {
      title = 'Désactiver la propriété';
      message = 'Voulez-vous désactiver cette propriété ? Elle ne sera plus visible par les locataires.';
    } else if (currentStatus === 'active' && targetStatus === 'louee') {
      title = 'Marquer comme louée';
      message = 'Voulez-vous marquer cette propriété comme louée ? Elle ne sera plus disponible à la location.';
    }

    showConfirmDialog(
      title,
      message,
      async () => {
        try {
          await changePropertyStatus(propertyId, targetStatus);
          await fetchProperties();
          setShowMenu(null);
          
          let successMessage;
          if (targetStatus === 'active') {
            successMessage = 'Propriété publiée avec succès !';
          } else if (targetStatus === 'louee') {
            successMessage = 'Propriété marquée comme louée !';
          } else {
            successMessage = 'Propriété désactivée avec succès !';
          }
          
          showSnackbar(successMessage, 'success');
        } catch (err) {
          showSnackbar('Erreur lors du changement de statut : ' + err.message, 'error');
        }
      },
      'status'
    );
  };

  const getStatusBadge = (status) => {
    if (status === 'active') return 'Actif';
    if (status === 'louee') return 'Louée';
    if (status === 'brouillon') return 'Brouillon';
    return 'Actif';
  };

  const getStatusClass = (status) => {
    if (status === 'active') return 'status-active';
    if (status === 'louee') return 'status-rented';
    if (status === 'brouillon') return 'status-draft';
    return 'status-active';
  };

  // Calculer les statistiques automatiquement
  const calculateStats = () => {
    const total = properties.length;
    const actifs = properties.filter(p => p.status === 'active').length;
    const loues = properties.filter(p => p.status === 'louee').length;
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
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => handleTabChange('active')}
        >
          Actifs ({stats.actifs})
        </button>
        <button 
          className={`tab ${activeTab === 'louee' ? 'active' : ''}`}
          onClick={() => handleTabChange('louee')}
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
                  
                  {/* Actions selon le statut */}
                  {property.status === 'brouillon' && (
                    <button 
                      className="menu-item"
                      onClick={() => handleStatusChange(property.id, property.status, 'active')}
                    >
                      <CheckCircle size={16} />
                      Publier
                    </button>
                  )}
                  
                  {property.status === 'active' && (
                    <>
                      <button 
                        className="menu-item"
                        onClick={() => handleStatusChange(property.id, property.status, 'louee')}
                      >
                        <Home size={16} />
                        Marquer comme louée
                      </button>
                      <button 
                        className="menu-item"
                        onClick={() => handleStatusChange(property.id, property.status, 'brouillon')}
                      >
                        <ToggleLeft size={16} />
                        Désactiver
                      </button>
                    </>
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
              
              {/* Actions selon le statut dans les boutons principaux */}
              {property.status === 'brouillon' && (
                <button 
                  className="action-btn status publish"
                  onClick={() => handleStatusChange(property.id, property.status, 'active')}
                >
                  <CheckCircle size={16} />
                  Publier
                </button>
              )}
              
              {property.status === 'active' && (
                <button 
                  className="action-btn status rent"
                  onClick={() => handleStatusChange(property.id, property.status, 'louee')}
                >
                  <Home size={16} />
                  Louer
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

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Dialog de confirmation amélioré */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleConfirmClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: '8px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            paddingBottom: '8px',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: confirmDialog.type === 'delete' ? 'hsl(6 100% 50%)' : 'hsl(6 100% 72%)'
          }}
        >
          {/* Icône selon le type d'action */}
          {confirmDialog.type === 'delete' && (
            <div style={{
              backgroundColor: '#fee',
              borderRadius: '50%',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Trash2 size={24} color="hsl(6 100% 50%)" />
            </div>
          )}
          {confirmDialog.type === 'status' && (
            <div style={{
              backgroundColor: '#fef2f2',
              borderRadius: '50%',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {confirmDialog.title.includes('Publier') && <CheckCircle size={24} color="hsl(6 100% 72%)" />}
              {confirmDialog.title.includes('Marquer') && <Home size={24} color="hsl(6 100% 72%)" />}
              {confirmDialog.title.includes('Désactiver') && <ToggleLeft size={24} color="hsl(6 100% 72%)" />}
            </div>
          )}
          {confirmDialog.title}
        </DialogTitle>
        
        <DialogContent sx={{ paddingTop: '16px', paddingBottom: '24px' }}>
          <p style={{ 
            margin: 0, 
            color: '#666', 
            lineHeight: '1.5',
            fontSize: '0.95rem'
          }}>
            {confirmDialog.message}
          </p>
          
          {/* Message d'avertissement pour la suppression */}
          {confirmDialog.type === 'delete' && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: 'hsl(6 100% 97%)',
              border: '1px solid hsl(6 100% 88%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '4px',
                height: '4px',
                backgroundColor: 'hsl(6 100% 60%)',
                borderRadius: '50%'
              }}></div>
              <span style={{ fontSize: '0.85rem', color: 'hsl(6 100% 50%)', fontWeight: 500 }}>
                Cette action ne peut pas être annulée
              </span>
            </div>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          padding: '0 24px 24px 24px', 
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <Button 
            onClick={handleConfirmClose} 
            variant="outlined"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
              padding: '8px 20px',
              borderColor: 'hsl(6 50% 85%)',
              color: 'hsl(6 50% 60%)',
              '&:hover': {
                borderColor: 'hsl(6 50% 75%)',
                backgroundColor: 'hsl(6 50% 95%)'
              }
            }}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleConfirmAction} 
            variant="contained"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              padding: '8px 20px',
              backgroundColor: confirmDialog.type === 'delete' ? 'hsl(6 100% 55%)' : 'hsl(6 100% 72%)',
              boxShadow: confirmDialog.type === 'delete' 
                ? '0 2px 8px hsla(6 100% 55% / 0.3)' 
                : '0 2px 8px hsla(6 100% 72% / 0.3)',
              '&:hover': {
                backgroundColor: confirmDialog.type === 'delete' ? 'hsl(6 100% 48%)' : 'hsl(6 100% 68%)',
                boxShadow: confirmDialog.type === 'delete' 
                  ? '0 4px 12px hsla(6 100% 55% / 0.4)' 
                  : '0 4px 12px hsla(6 100% 72% / 0.4)',
              }
            }}
          >
            {confirmDialog.type === 'delete' && <Trash2 size={16} style={{ marginRight: '6px' }} />}
            {confirmDialog.type === 'status' && confirmDialog.title.includes('Publier') && 
              <CheckCircle size={16} style={{ marginRight: '6px' }} />}
            {confirmDialog.type === 'status' && confirmDialog.title.includes('Marquer') && 
              <Home size={16} style={{ marginRight: '6px' }} />}
            {confirmDialog.type === 'status' && confirmDialog.title.includes('Désactiver') && 
              <ToggleLeft size={16} style={{ marginRight: '6px' }} />}
            
            {confirmDialog.type === 'delete' ? 'Supprimer' : 
             confirmDialog.title.includes('Publier') ? 'Publier' :
             confirmDialog.title.includes('Marquer') ? 'Marquer comme louée' :
             confirmDialog.title.includes('Désactiver') ? 'Désactiver' : 'Confirmer'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OwnerProperties;