import React, { useState } from 'react';
import { Camera, Star } from 'lucide-react';
import { Avatar, Rating, Box, Typography } from '@mui/material';
import '../../assets/styles/ownerCss/OwnerProfil.css';

const OwnerProfilComp = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('informations');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+33 6 12 34 56 78',
    biography: 'Propriétaire expérimenté avec plus de 10 ans dans l\'immobilier étudiant. Je m\'engage à offrir des logements de qualité dans un environnement sûr et convivial.',
    address: '123 rue de la Paix',
    city: 'Paris',
    postalCode: '75001'
  });

  const [tempData, setTempData] = useState(profileData);

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

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStars = (rating) => {
    return (
      <Box className="stars-container">
        <Rating value={rating} readOnly precision={0.5} />
      </Box>
    );
  };

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
                  <Avatar sx={{ width: 80, height: 80, bgcolor: '#e0e0e0' }}>
                    <Camera size={24} color="#999" />
                  </Avatar>
                </div>
                <div className="photo-info">
                  <button className="btn-change-photo">
                    <Camera size={16} />
                    Changer la photo
                  </button>
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
                  <label>Prénom</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  ) : (
                    <div className="form-value">{profileData.firstName}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  ) : (
                    <div className="form-value">{profileData.lastName}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>E-mail</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
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
              <div className="form-group full-width">
                <label>Biographie</label>
                {isEditing ? (
                  <textarea
                    value={tempData.biography}
                    onChange={(e) => handleInputChange('biography', e.target.value)}
                    rows={4}
                  />
                ) : (
                  <div className="form-value">{profileData.biography}</div>
                )}
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
    </div>
  );
};

export default OwnerProfilComp;