import React, { useState, useEffect,useContext } from 'react';
import { Camera, Star, Upload, X } from 'lucide-react';
import { Avatar, Rating, Box, Snackbar, Alert } from '@mui/material';
import '../../assets/styles/ownerCss/OwnerProfil.css';
import { getProprietaireProfil, updateProprietaireProfil } from '../../Services/ProfilOwnerService';
import { ProfilContext } from '../../context/ProfilContext';

const OwnerProfilComp = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('informations');
  const [profileData, setProfileData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const { fetchProfil } = useContext(ProfilContext);

  // États pour les snackbars
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' 
  });

  // État pour la gestion des images
  const [imageUploading, setImageUploading] = useState(false);

  const reviews = [
    {
      id: 1,
      name: 'Emma Johnson',
      property: 'Studio moderne centre-ville',
      rating: 5,
      comment: 'Excellent propriétaire ! Très réactif et à l\'écoute. L\'appartement était exactement comme décrit et très bien entretenu.',
      date: 'Il y a 2 semaines'
    },
    {
      id: 2,
      name: 'Michael Chen',
      property: 'Appartement 2 chambres spacieux',
      rating: 5,
      comment: 'John est un propriétaire formidable. Il a été très professionnel tout au long du processus de localisation. Je recommande vivement !',
      date: 'Il y a 1 mois'
    },
    {
      id: 3,
      name: 'Sarah Williams',
      property: 'Maison de ville 3 chambres',
      rating: 4,
      comment: 'Très bonne expérience. La maison est spacieuse et bien située. Quelques petits problèmes de plomberie au début mais rapidement résolus.',
      date: 'Il y a 2 mois'
    }
  ];

  const globalRating = 4.8;
  const totalReviews = 24;
  const ratingDistribution = [
    { stars: 5, count: 18 },
    { stars: 4, count: 5 },
    { stars: 3, count: 1 },
    { stars: 2, count: 1 },
    { stars: 1, count: 1 }
  ];

  // Fonction pour afficher les snackbars
  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Fonction pour fermer les snackbars
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Fonction pour convertir un fichier en data URL
  const convertFileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Fonction pour valider et traiter l'image
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validation du type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      showSnackbar('Format de fichier non supporté. Utilisez JPG ou PNG.', 'error');
      return;
    }

    // Validation de la taille (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showSnackbar('La taille du fichier est trop importante. Maximum 5MB.', 'error');
      return;
    }

    try {
      setImageUploading(true);
      showSnackbar('Upload de l\'image en cours...', 'info');
      
      const dataURL = await convertFileToDataURL(file);
      
      handleInputChange('avatarUrl', dataURL);
      showSnackbar('Image uploadée avec succès !', 'success');
      
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      showSnackbar('Erreur lors de l\'upload de l\'image', 'error');
    } finally {
      setImageUploading(false);
    }
  };

  // Fonction pour supprimer l'image
  const handleRemoveImage = () => {
    handleInputChange('avatarUrl', '');
    showSnackbar('Image supprimée', 'info');
  };

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getProprietaireProfil();
        
        if (response.success === false) {
          setError(response.error);
          showSnackbar(`Erreur: ${response.error}`, 'error');
          console.error('Erreur lors de la récupération du profil:', response.error);
        } else {
          const data = response.data;
          const profileInfo = {
            firstName: data.prenom || '',
            lastName: data.nom || '',
            email: data.email || '',
            phone: data.telephone || '',
            address: data.adresse || '',
            city: data.ville || '',
            postalCode: data.codePostal || '',
            country: data.pays || '',
            avatarUrl: data.avatarUrl || ''
          };
          
          setProfileData(profileInfo);
          setTempData({ ...profileInfo });
          showSnackbar('Profil chargé avec succès', 'success');
        }
      } catch (err) {
        const errorMessage = 'Erreur lors du chargement du profil';
        setError(errorMessage);
        showSnackbar(errorMessage, 'error');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfil();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
    showSnackbar('Mode édition activé', 'info');
  };

  const handleSave = async () => {
    try {
      // Validation des données avant envoi
      if (!tempData.firstName || !tempData.lastName || !tempData.email) {
        showSnackbar('Veuillez remplir tous les champs obligatoires', 'warning');
        return;
      }

      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(tempData.email)) {
        showSnackbar('Format d\'email invalide', 'error');
        return;
      }

      showSnackbar('Sauvegarde en cours...', 'info');

      const updated = {
        nom: tempData.lastName,
        prenom: tempData.firstName,
        email: tempData.email,
        telephone: tempData.phone,
        adresse: tempData.address,
        ville: tempData.city,
        codePostal: tempData.postalCode,
        pays: tempData.country,
        avatarUrl: tempData.avatarUrl 
      };

      const response = await updateProprietaireProfil(updated);

      if (response.success === false) {
        showSnackbar(response.error, 'error');
        return;
      }

      // Mise à jour réussie
      setProfileData({ ...tempData });
      setIsEditing(false);
      showSnackbar(response.message || 'Profil mis à jour avec succès !', 'success');
      fetchProfil();

      
    } catch (err) {
      showSnackbar('Erreur lors de la sauvegarde du profil', 'error');
      console.error('Erreur lors de la sauvegarde:', err);
    }
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
    showSnackbar('Modifications annulées', 'info');
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStars = (rating) => (
    <Box className="stars-container">
      <Rating value={rating} readOnly precision={0.5} />
    </Box>
  );

  // Gestion des états de chargement et d'erreur
  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-message">
          <p>Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">
          <p>Erreur: {error}</p>
          <button onClick={() => window.location.reload()}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!profileData || !tempData) {
    return (
      <div className="profile-container">
        <div className="error-message">
          <p>Impossible de charger les données du profil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="head">
          <h1>Mon profil</h1>
          <p>Gérez vos informations personnelles et professionnelles</p>
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <button className="btn-modify" onClick={handleEdit}>
              Modifier le profil
            </button>
          ) : (
            <div className="edit-actions">
              <button className="btn-cancel" onClick={handleCancel}>
                Annuler
              </button>
              <button className="btn-save" onClick={handleSave}>
                Sauvegarder
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'informations' ? 'active' : ''}`}
          onClick={() => setActiveTab('informations')}
        >
          Informations
        </button>
        <button 
          className={`tab ${activeTab === 'professional' ? 'active' : ''}`}
          onClick={() => setActiveTab('professional')}
        >
          Informations professionnelles
        </button>
        <button 
          className={`tab ${activeTab === 'verification' ? 'active' : ''}`}
          onClick={() => setActiveTab('verification')}
        >
          Vérification
        </button>
        <button 
          className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Avis et évaluations
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'informations' && (
          <>
            <div className="profile-section">
              <h2>Photo de profil</h2>
              <p className="section-subtitle">Votre photo sera visible par les étudiants</p>
              <div className="photo-section">
                <div className="photo-placeholder">
                  {tempData.avatarUrl ? (
                    <Avatar 
                      sx={{ width: 80, height: 80 }}
                      src={tempData.avatarUrl}
                      alt="Photo de profil"
                    />
                  ) : (
                    <Avatar sx={{ width: 80, height: 80, bgcolor: '#e0e0e0' }}>
                      <Camera size={24} color="#999" />
                    </Avatar>
                  )}
                </div>
                <div className="photo-info">
                  {isEditing ? (
                    <div className="photo-edit-controls">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="avatar-upload"
                        disabled={imageUploading}
                      />
                      <label htmlFor="avatar-upload" className="btn-upload-photo">
                        <Upload size={16} />
                        {imageUploading ? 'Upload en cours...' : 'Choisir une image'}
                      </label>
                      
                      {tempData.avatarUrl && (
                        <button 
                          type="button" 
                          className="btn-remove-photo"
                          onClick={handleRemoveImage}
                        >
                          <X size={16} />
                          Supprimer la photo
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="photo-view-controls">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="avatar-upload-view"
                        disabled={imageUploading}
                      />
                      <label htmlFor="avatar-upload-view" className="btn-change-photo">
                        <Camera size={16} />
                        {imageUploading ? 'Upload en cours...' : 'Changer la photo'}
                      </label>
                    </div>
                  )}
                  <p className="photo-requirements">
                    Formats acceptés : JPG, PNG. Taille maximale : 5 Mo
                  </p>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Informations de base</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Prénom *</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  ) : (
                    <div className="form-value">{profileData.firstName}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Nom *</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  ) : (
                    <div className="form-value">{profileData.lastName}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>E-mail *</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  ) : (
                    <div className="form-value">{profileData.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <div className="form-value">{profileData.phone}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Adresse</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Adresse</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <div className="form-value">{profileData.address}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Ville</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  ) : (
                    <div className="form-value">{profileData.city}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Code postal</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    />
                  ) : (
                    <div className="form-value">{profileData.postalCode}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Pays</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                  ) : (
                    <div className="form-value">{profileData.country}</div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'verification' && (
          <div className="profile-section">
            <h2>Statut de vérification</h2>
            <p className="section-subtitle">Augmentez votre crédibilité en vérifiant votre identité</p>
            
            <div className="verification-items">
              <div className="verification-item verified">
                <div className="verification-icon">
                  <div className="check-circle"></div>
                </div>
                <div className="verification-content">
                  <h3>Identité vérifiée</h3>
                  <p>Votre identité a été confirmée</p>
                </div>
                <div className="verification-status verified-badge">Vérifié</div>
              </div>

              <div className="verification-item verified">
                <div className="verification-icon">
                  <div className="check-circle email"></div>
                </div>
                <div className="verification-content">
                  <h3>Email vérifié</h3>
                  <p>Votre adresse email est confirmée</p>
                </div>
                <div className="verification-status verified-badge">Vérifié</div>
              </div>

              <div className="verification-item verified">
                <div className="verification-icon">
                  <div className="check-circle phone"></div>
                </div>
                <div className="verification-content">
                  <h3>Téléphone vérifié</h3>
                  <p>Votre numéro de téléphone est confirmé</p>
                </div>
                <div className="verification-status verified-badge">Vérifié</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <>
            <div className="profile-section">
              <h2>Évaluations globales</h2>
              <div className="global-rating">
                <div className="rating-summary">
                  <div className="rating-score">
                    <Star className="star-icon" fill="#FFD700" color="#FFD700" />
                    <span className="score">{globalRating}</span>
                  </div>
                  <p>Note moyenne sur {totalReviews} avis</p>
                </div>
                <div className="rating-breakdown">
                  {ratingDistribution.map((item, index) => (
                    <div key={index} className="rating-bar">
                      <span className="star-count">{item.stars} ★</span>
                      <div className="bar-container">
                        <div 
                          className="bar-fill" 
                          style={{ width: `${(item.count / totalReviews) * 100}%` }}
                        ></div>
                      </div>
                      <span className="count">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Avis récents</h2>
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <Avatar sx={{ width: 40, height: 40, bgcolor: '#e0e0e0' }}>
                        {review.name.charAt(0)}
                      </Avatar>
                      <div className="review-info">
                        <h4>{review.name}</h4>
                        <p className="property-name">{review.property}</p>
                      </div>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <div className="review-content">
                      <p>{review.comment}</p>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OwnerProfilComp;