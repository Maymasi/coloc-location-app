import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { Upload, Calendar, Wifi, Car, Tv, WashingMachine, AirVent, Shield } from 'lucide-react';
import '../../assets/styles/ownerCss/AddProperty.css';

const OwnerAddProperty = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    monthlyRent: '750',
    deposit: '750',
    fees: '50',
    description: '',
    surface: '25',
    rooms: '2',
    bedrooms: '1',
    bathrooms: '1',
    floor: '2',
    availableFrom: '',
    address: '123 rue de la Paix',
    city: 'Paris',
    postalCode: '75001',
    furnished: false,
    petsAllowed: false,
    smokingAllowed: false,
    amenities: [],
    desiredDuration: '',
    houseRules: '',
    photos: []
  });

  const steps = [
    'Informations de base',
    'Détails',
    'Photos',
    'Finalisation'
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="step-content">
            <h2>Informations de base</h2>
            
            <div className="form-group">
              <label>Titre de l'annonce *</label>
              <input
                type="text"
                placeholder="Ex : Studio moderne centre-ville"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type de logement *</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <option value="">Sélectionnez le type</option>
                  <option value="studio">Studio</option>
                  <option value="appartement">Appartement</option>
                  <option value="maison">Maison</option>
                  <option value="chambre">Chambre</option>
                </select>
              </div>
              <div className="form-group">
                <label>Loyer mensuel (€) *</label>
                <input
                  type="number"
                  value={formData.monthlyRent}
                  onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Dépôt de garantie (€)</label>
                <input
                  type="number"
                  value={formData.deposit}
                  onChange={(e) => handleInputChange('deposit', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Frais (€)</label>
                <input
                  type="number"
                  value={formData.fees}
                  onChange={(e) => handleInputChange('fees', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                placeholder="Décrivez votre propriété..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={5}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="step-content">
            <h2>Détails de la propriété</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Surface (m²)</label>
                <input
                  type="number"
                  value={formData.surface}
                  onChange={(e) => handleInputChange('surface', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Nombre de pièces</label>
                <input
                  type="number"
                  value={formData.rooms}
                  onChange={(e) => handleInputChange('rooms', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Chambres</label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Salles de bain</label>
                <input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Étage</label>
                <input
                  type="number"
                  value={formData.floor}
                  onChange={(e) => handleInputChange('floor', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Disponible à partir du</label>
                <input
                  type="date"
                  value={formData.availableFrom}
                  onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Adresse *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Ville *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Code postal *</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                />
              </div>
            </div>

            <div className="options-section">
              <h3>Options</h3>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.furnished}
                    onChange={(e) => handleInputChange('furnished', e.target.checked)}
                  />
                  Meublé
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.petsAllowed}
                    onChange={(e) => handleInputChange('petsAllowed', e.target.checked)}
                  />
                  Animaux autorisés
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.smokingAllowed}
                    onChange={(e) => handleInputChange('smokingAllowed', e.target.checked)}
                  />
                  Fumeurs autorisés
                </label>
              </div>
            </div>

            <div className="amenities-section">
              <h3>Équipements</h3>
              <div className="amenities-grid">
                <div 
                  className={`amenity-item ${formData.amenities.includes('wifi') ? 'selected' : ''}`}
                  onClick={() => toggleAmenity('wifi')}
                >
                  <Wifi size={20} />
                  <span>Wi-Fi</span>
                </div>
                <div 
                  className={`amenity-item ${formData.amenities.includes('parking') ? 'selected' : ''}`}
                  onClick={() => toggleAmenity('parking')}
                >
                  <Car size={20} />
                  <span>Parking</span>
                </div>
                <div 
                  className={`amenity-item ${formData.amenities.includes('tv') ? 'selected' : ''}`}
                  onClick={() => toggleAmenity('tv')}
                >
                  <Tv size={20} />
                  <span>Télévision</span>
                </div>
                <div 
                  className={`amenity-item ${formData.amenities.includes('washing') ? 'selected' : ''}`}
                  onClick={() => toggleAmenity('washing')}
                >
                  <WashingMachine size={20} />
                  <span>Lave-linge</span>
                </div>
                <div 
                  className={`amenity-item ${formData.amenities.includes('ac') ? 'selected' : ''}`}
                  onClick={() => toggleAmenity('ac')}
                >
                  <AirVent size={20} />
                  <span>Climatisation</span>
                </div>
                <div 
                  className={`amenity-item ${formData.amenities.includes('security') ? 'selected' : ''}`}
                  onClick={() => toggleAmenity('security')}
                >
                  <Shield size={20} />
                  <span>Sécurité</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2 style={{
              fontSize: 'clamp(20px, 4vw, 28px)',
              marginBottom: '8px'
            }}>
              Photos de la propriété
            </h2>
            <p className="step-subtitle" style={{
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              marginBottom: 'clamp(20px, 4vw, 24px)'
            }}>
              Ajoutez des photos attrayantes de votre propriété (maximum 6 photos)
            </p>
            
            <div className="upload-area" style={{
              padding: 'clamp(20px, 4vw, 40px)',
              marginBottom: 'clamp(20px, 4vw, 30px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Upload size={window.innerWidth < 768 ? 32 : 48} />
              <h3 style={{
                fontSize: 'clamp(16px, 3vw, 20px)',
                margin: 'clamp(12px, 2vw, 16px) 0 clamp(8px, 1.5vw, 12px) 0'
              }}>
                Télécharger des photos
              </h3>
              <p style={{
                fontSize: 'clamp(13px, 2vw, 15px)',
                marginBottom: '8px'
              }}>
                Glissez-déposez vos photos ou cliquez pour parcourir
              </p>
              <p className="upload-info" style={{
                fontSize: 'clamp(12px, 1.8vw, 14px)',
                marginBottom: 'clamp(16px, 3vw, 20px)'
              }}>
                Formats acceptés: JPG, PNG, WEBP
              </p>
              <input 
                type="file" 
                id="photo-upload" 
                multiple 
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const currentPhotos = formData.photos || [];
                  
                  // Vérifier la limite de 6 photos
                  if (currentPhotos.length >= 6) {
                    alert('Maximum 6 photos autorisées');
                    return;
                  }
                  
                  files.forEach((file, index) => {
                    if (currentPhotos.length + index >= 6) return;
                    
                    if (file.type.startsWith('image/')) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const photoData = {
                          id: Date.now() + Math.random() + index,
                          file: file,
                          url: event.target.result,
                          name: file.name
                        };
                        
                        handleInputChange('photos', [...currentPhotos, photoData]);
                      };
                      reader.readAsDataURL(file);
                    }
                  });
                }}
              />
              <button 
                className="upload-btn"
                onClick={() => document.getElementById('photo-upload').click()}
                disabled={(formData.photos || []).length >= 6}
                style={{
                  opacity: (formData.photos || []).length >= 6 ? 0.5 : 1,
                  cursor: (formData.photos || []).length >= 6 ? 'not-allowed' : 'pointer',
                  padding: 'clamp(10px, 2vw, 12px) clamp(16px, 3vw, 20px)',
                  fontSize: 'clamp(13px, 2vw, 15px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(6px, 1vw, 8px)',
                }}
              >
                <Upload size={window.innerWidth < 768 ? 14 : 16} />
                Choisir des fichiers
              </button>
            </div>

            <div className="photos-preview" style={{ 
              marginTop: 'clamp(20px, 4vw, 30px)',
              marginBottom: 'clamp(20px, 4vw, 30px)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 'clamp(16px, 3vw, 20px)',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <h4 style={{ 
                  margin: 0, 
                  color: '#333', 
                  fontSize: 'clamp(16px, 3vw, 18px)', 
                  fontWeight: '600' 
                }}>
                  Photos ajoutées
                </h4>
                <span style={{
                  background: '#ea580c',
                  color: 'white',
                  padding: 'clamp(4px, 1vw, 6px) clamp(10px, 2vw, 12px)',
                  borderRadius: '20px',
                  fontSize: 'clamp(12px, 2vw, 14px)',
                  fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}>
                  {(formData.photos || []).length}/6
                </span>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(150px, 25vw, 200px), 1fr))',
                gap: 'clamp(12px, 2.5vw, 16px)',
                marginBottom: 'clamp(16px, 3vw, 20px)'
              }}>
                {formData.photos && formData.photos.length > 0 ? (
                  formData.photos.map((photo, index) => (
                    <div 
                      key={photo.id} 
                      style={{
                        position: 'relative',
                        borderRadius: 'clamp(8px, 1.5vw, 12px)',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'pointer',
                        aspectRatio: '4/3'
                      }}
                      onMouseEnter={(e) => {
                        if (window.innerWidth > 768) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.innerWidth > 768) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }
                      }}
                    >
                      <img 
                        src={photo.url} 
                        alt={`Photo ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      <button 
                        onClick={() => {
                          const updatedPhotos = formData.photos.filter(p => p.id !== photo.id);
                          handleInputChange('photos', updatedPhotos);
                        }}
                        style={{
                          position: 'absolute',
                          top: 'clamp(6px, 1vw, 8px)',
                          right: 'clamp(6px, 1vw, 8px)',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: 'clamp(24px, 4vw, 28px)',
                          height: 'clamp(24px, 4vw, 28px)',
                          cursor: 'pointer',
                          fontSize: 'clamp(14px, 2.5vw, 16px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background 0.2s ease',
                          touchAction: 'manipulation'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(239, 68, 68, 0.9)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(0, 0, 0, 0.7)';
                        }}
                      >
                        ×
                      </button>
                      <div style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                        padding: 'clamp(16px, 3vw, 20px) clamp(8px, 1.5vw, 12px) clamp(8px, 1.5vw, 12px)',
                        color: 'white'
                      }}>
                        <p style={{ 
                          margin: 0,
                          fontSize: 'clamp(11px, 1.8vw, 12px)', 
                          fontWeight: '500',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {photo.name}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: 'clamp(30px, 6vw, 40px) clamp(16px, 3vw, 20px)',
                    color: '#666',
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    background: '#f8fafc',
                    borderRadius: 'clamp(8px, 1.5vw, 12px)',
                    border: '2px dashed #e2e8f0'
                  }}>
                    📸 Aucune photo ajoutée pour le moment
                  </div>
                )}
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #fef3e8 0%, #fff7ed 100%)',
              borderRadius: 'clamp(12px, 2vw, 16px)',
              padding: 'clamp(16px, 3vw, 24px)',
              border: '1px solid #fed7aa',
              marginTop: 'clamp(20px, 4vw, 30px)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 'clamp(12px, 2.5vw, 16px)',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{
                  background: '#ea580c',
                  borderRadius: '50%',
                  width: 'clamp(32px, 5vw, 40px)',
                  height: 'clamp(32px, 5vw, 40px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>💡</span>
                </div>
                <h4 style={{
                  margin: 0,
                  color: '#ea580c',
                  fontSize: 'clamp(16px, 3vw, 18px)',
                  fontWeight: '600',
                  lineHeight: 1.2
                }}>
                  Conseils pour de meilleures photos
                </h4>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 40vw, 280px), 1fr))',
                gap: 'clamp(10px, 2vw, 12px)'
              }}>
                {[
                  { icon: '☀️', text: 'Prenez des photos bien éclairées (lumière naturelle de préférence)' },
                  { icon: '🏠', text: 'Montrez les pièces principales (salon, cuisine, chambres, salle de bain)' },
                  { icon: '🏢', text: 'Incluez une photo de l\'extérieur du bâtiment' },
                  { icon: '📷', text: 'Évitez les photos floues ou sombres' },
                  { icon: '✨', text: 'Mettez en avant les points forts de votre propriété' },
                  { icon: '🧹', text: 'Assurez-vous que les pièces sont bien rangées' }
                ].map((tip, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: 'clamp(10px, 2vw, 12px)',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: 'clamp(8px, 1.5vw, 10px)',
                    border: '1px solid rgba(234, 88, 12, 0.1)',
                    gap: 'clamp(8px, 1.5vw, 10px)'
                  }}>
                    <span style={{
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {tip.icon}
                    </span>
                    <span style={{
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      color: '#7c2d12',
                      lineHeight: '1.4'
                    }}>
                      {tip.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>Finalisation</h2>
            <p className="step-subtitle">Vérifiez vos informations et publiez votre annonce</p>
            
            <div className="form-group">
              <label>Durée de la caution souhaitée</label>
              <select
                value={formData.desiredDuration}
                onChange={(e) => handleInputChange('desiredDuration', e.target.value)}
              >
                <option value="">Sélectionner la durée</option>
                <option value="3-months">3 mois</option>
                <option value="6-months">6 mois</option>
                <option value="1-year">1 an</option>
                <option value="2-years">2 ans</option>
              </select>
            </div>

            <div className="form-group">
              <label>Règles de la maison</label>
              <textarea
                placeholder="Ex : Pas de fêtes, respect du voisinage, etc."
                value={formData.houseRules}
                onChange={(e) => handleInputChange('houseRules', e.target.value)}
                rows={4}
              />
            </div>

            <div className="summary-section">
              <h3>Récapitulatif</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Titre :</span>
                  <span className="summary-value">{formData.title || 'Non renseigné'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Type :</span>
                  <span className="summary-value">{formData.type || 'Non renseigné'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Prix :</span>
                  <span className="summary-value">{formData.monthlyRent || 'Non renseigné'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Localisation :</span>
                  <span className="summary-value">{formData.city || 'Non renseigné'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Surface :</span>
                  <span className="summary-value">{formData.surface || 'Non renseigné'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Photos :</span>
                  <span className="summary-value">{formData.photos?.length || 0} photo(s)</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="property-form-container">
      <div className="form-header">
        <h1>Ajouter une propriété</h1>
        <p>Créer une nouvelle annonce pour votre propriété</p>
      </div>

      <Box sx={{ width: '100%', mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    color: index <= activeStep ? '#ea580c' : '#999',
                    fontWeight: index <= activeStep ? 500 : 400,
                    '&.Mui-completed': {
                      color: '#ea580c',   
                    }
                  },
                  '& .MuiStepIcon-root': {
                    color: index <= activeStep ? '#ea580c' : '#e0e0e0',
                    '&.Mui-completed': {
                      color: '#ea580c',
                    },
                    '&.Mui-active': {
                      color: '#ea580c',
                    },
                  },
                  '& .MuiStepIcon-text': {
                    fill: '#fff',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  },
                  '& .MuiStepConnector-line': {
                    borderColor: index < activeStep ? '#ea580c' : '#e0e0e0',
                  }
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div className="form-content">
        {renderStepContent(activeStep)}
      </div>

      <div className="form-actions">
        <button
          className="btn-secondary"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Précédent
        </button>
        
        <div className="right-actions">
          {activeStep === steps.length - 1 && (
            <button className="btn-outline" onClick={() => console.log(formData)}>
              Sauvegarder en brouillon
            </button>
          )}
          <button
            className="btn-primary"
            onClick={activeStep === steps.length - 1 ? () => alert('Annonce publiée !') : handleNext}
          >
            {activeStep === steps.length - 1 ? "Publier l'annonce" : 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerAddProperty;