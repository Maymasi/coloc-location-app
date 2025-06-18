import React, { useState, useRef } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../assets/styles/common/RegistrationForm.css';
import {register} from '../../Services/AuthService';
import { CodeSquare } from 'lucide-react';

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState('');
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Snackbar states
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });
  
  // Form data state
  const [formData, setFormData] = useState({
    // Utilisateur base fields
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    
    // Etudiant specific fields
    niveauEtudes: '',
    adresse: '',
    universite: '',
    domaineEtudes: '',
    budget: '',
    bio: '',
    habitudes: [],
    centresInteret: [],
    styleDeVie: [],
    
    // Proprietaire specific fields
    adresseProprietaire: '',
    ville: '',
    codePostal: '',
    pays: ''
  });

  const steps = userType === 'student' 
    ? ['Type de compte', 'Informations personnelles', 'Informations académiques', 'Préférences']
    : ['Type de compte', 'Informations personnelles', 'Adresse'];

  // Snackbar functions
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    // Formats acceptés:
    // +2126xxxxxxxx ou +2127xxxxxxxx (12 chiffres au total)
    // 06xxxxxxxx ou 07xxxxxxxx (10 chiffres au total)
    const phoneRegex = /^(?:(?:\+212|0)([67]\d{8}))$/;
    return phoneRegex.test(phone);
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 0 && !userType) {
      newErrors.userType = 'Veuillez sélectionner un type de compte';
    }
    
    if (currentStep === 1) {
      if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
      if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
      if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
      else if (!validateEmail(formData.email)) newErrors.email = 'Format d\'email invalide';
      if (!formData.motDePasse.trim()) newErrors.motDePasse = 'Le mot de passe est requis';
      else if (formData.motDePasse.length < 6) newErrors.motDePasse = 'Minimum 6 caractères';
      if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis';
      else if (!validatePhoneNumber(formData.telephone)) {
        newErrors.telephone = 'Format de téléphone invalide. Utilisez +2126/7xxxxxxxx ou 06/7xxxxxxxx';
      }
    }
    
    if (currentStep === 2 && userType === 'student') {
      if (!formData.niveauEtudes.trim()) newErrors.niveauEtudes = 'Niveau d\'études requis';
      if (!formData.universite.trim()) newErrors.universite = 'Université requise';
      if (!formData.domaineEtudes.trim()) newErrors.domaineEtudes = 'Domaine d\'études requis';
      if (!formData.budget) newErrors.budget = 'Budget requis';
      if (!formData.adresse.trim()) newErrors.adresse = 'Adresse requise';
    }
    
    if (currentStep === 2 && userType === 'owner') {
      if (!formData.adresseProprietaire.trim()) newErrors.adresseProprietaire = 'Adresse requise';
      if (!formData.ville.trim()) newErrors.ville = 'Ville requise';
      if (!formData.codePostal.trim()) newErrors.codePostal = 'Code postal requis';
      if (!formData.pays.trim()) newErrors.pays = 'Pays requis';
    }

    if (currentStep === 3 && userType === 'student') {
      if (!formData.bio.trim()) newErrors.bio = 'La bio est requise';
      if (formData.habitudes.length === 0) newErrors.habitudes = 'Au moins une habitude est requise';
      if (formData.centresInteret.length === 0) newErrors.centresInteret = 'Au moins un centre d\'intérêt est requis';
      if (formData.styleDeVie.length === 0) newErrors.styleDeVie = 'Au moins un style de vie est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsLoading(true);
        try {
          const result = await register(userType, formData, previewImage);
          console.log(result);
          
              showSnackbar(
                `🎉 Inscription réussie ! Bienvenue ${formData.prenom} ! Votre compte ${userType === 'student' ? 'étudiant' : 'propriétaire'} a été créé avec succès.`,
                'success'
              );
              setTimeout(() => {
                window.location.href = '/login';
              }, 2000);
          
        } catch (error) {
          console.error('Erreur:', error.response.data);
          
          // Messages d'erreur spécifiques selon le type d'erreur
          let errorMessage = 'Une erreur inattendue s\'est produite lors de l\'inscription.';
          
          if (error.message && error.response.data.includes('Email')) {
            errorMessage = ' Cette adresse email est déjà utilisée. Veuillez en choisir une autre.';
          } else if (error.message && error.response.data.includes('network')) {
            errorMessage = ' Problème de connexion. Vérifiez votre connexion internet et réessayez.';
          } else if (error.message && error.response.data.includes('validation')) {
            errorMessage = ' Certaines informations saisies ne sont pas valides. Veuillez vérifier vos données.';
          } else if (error.message) {
            errorMessage = ` Erreur: ${error.response.data}`;
          }
          
          showSnackbar(errorMessage, 'error');
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      // Message d'erreur pour validation échouée
      showSnackbar('⚠️ Veuillez corriger les erreurs dans le formulaire avant de continuer.', 'warning');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSelectChange = (field, e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      [field]: selectedValues
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar('📁 La taille du fichier ne doit pas dépasser 5MB', 'warning');
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        showSnackbar('✅ Photo de profil ajoutée avec succès !', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <h2>Choisissez votre type de compte</h2>
            <div className="user-type-selection">
              <div 
                className={`user-type-card ${userType === 'student' ? 'selected' : ''}`}
                onClick={() => setUserType('student')}
              >
                <div className="user-type-icon">🎓</div>
                <h3>Étudiant</h3>
                <p>Je cherche une colocation</p>
              </div>
              <div 
                className={`user-type-card ${userType === 'owner' ? 'selected' : ''}`}
                onClick={() => setUserType('owner')}
              >
                <div className="user-type-icon">🏠</div>
                <h3>Propriétaire</h3>
                <p>Je propose un logement</p>
              </div>
            </div>
            {errors.userType && <span className="error-message">{errors.userType}</span>}
          </div>
        );

      case 1:
        return (
          <div className="step-content">
            <h2>Informations personnelles</h2>
            
            {/* Photo de profil */}
            <div className="form-group profile-picture-upload">
              <label>Photo de profil *</label>
              <div className="profile-picture-container">
                <div className="profile-picture-preview" onClick={triggerFileInput}>
                  {previewImage ? (
                    <img src={previewImage} alt="Profile preview" />
                  ) : (
                    <div className="profile-picture-placeholder">
                      <i className="fas fa-user-plus"></i>
                      <span>Ajouter une photo</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              <p className="upload-hint">Format JPG, PNG ou GIF. Taille max: 5MB</p>
              {errors.profileImage && <span className="error-message">{errors.profileImage}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Prénom *</label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => handleInputChange('prenom', e.target.value)}
                  className={errors.prenom ? 'error' : ''}
                  placeholder="Entrez votre prénom"
                />
                {errors.prenom && <span className="error-message">{errors.prenom}</span>}
              </div>
              <div className="form-group">
                <label>Nom *</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                  className={errors.nom ? 'error' : ''}
                  placeholder="Entrez votre nom"
                />
                {errors.nom && <span className="error-message">{errors.nom}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'error' : ''}
                placeholder="exemple@email.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Mot de passe *</label>
              <input
                type="password"
                value={formData.motDePasse}
                onChange={(e) => handleInputChange('motDePasse', e.target.value)}
                className={errors.motDePasse ? 'error' : ''}
                placeholder="Minimum 6 caractères"
              />
              {errors.motDePasse && <span className="error-message">{errors.motDePasse}</span>}
            </div>
            <div className="form-group">
              <label>Téléphone *</label>
              <input
                type="tel"
                value={formData.telephone}
                onChange={(e) => handleInputChange('telephone', e.target.value)}
                className={errors.telephone ? 'error' : ''}
                placeholder="+212612345678 ou 0612345678"
              />
              {errors.telephone && <span className="error-message">{errors.telephone}</span>}
            </div>
          </div>
        );

      case 2:
        if (userType === 'student') {
          return (
            <div className="step-content">
              <h2>Informations académiques</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Niveau d'études *</label>
                  <select
                    value={formData.niveauEtudes}
                    onChange={(e) => handleInputChange('niveauEtudes', e.target.value)}
                    className={errors.niveauEtudes ? 'error' : ''}
                  >
                    <option value="">Sélectionnez votre niveau...</option>
                    <option value="Licence">Licence</option>
                    <option value="Master">Master</option>
                    <option value="Doctorat">Doctorat</option>
                    <option value="Autre">Autre</option>
                  </select>
                  {errors.niveauEtudes && <span className="error-message">{errors.niveauEtudes}</span>}
                </div>
                <div className="form-group">
                  <label>Budget mensuel (€) *</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className={errors.budget ? 'error' : ''}
                    placeholder="500"
                  />
                  {errors.budget && <span className="error-message">{errors.budget}</span>}
                </div>
              </div>
              <div className="form-group">
                <label>Université *</label>
                <input
                  type="text"
                  value={formData.universite}
                  onChange={(e) => handleInputChange('universite', e.target.value)}
                  className={errors.universite ? 'error' : ''}
                  placeholder="Nom de votre université"
                />
                {errors.universite && <span className="error-message">{errors.universite}</span>}
              </div>
              <div className="form-group">
                <label>Domaine d'études *</label>
                <input
                  type="text"
                  value={formData.domaineEtudes}
                  onChange={(e) => handleInputChange('domaineEtudes', e.target.value)}
                  className={errors.domaineEtudes ? 'error' : ''}
                  placeholder="Votre domaine d'études"
                />
                {errors.domaineEtudes && <span className="error-message">{errors.domaineEtudes}</span>}
              </div>
              <div className="form-group">
                <label>Adresse actuelle *</label>
                <input
                  type="text"
                  value={formData.adresse}
                  onChange={(e) => handleInputChange('adresse', e.target.value)}
                  className={errors.adresse ? 'error' : ''}
                  placeholder="Votre adresse actuelle"
                />
                {errors.adresse && <span className="error-message">{errors.adresse}</span>}
              </div>
            </div>
          );
        } else {
          return (
            <div className="step-content">
              <h2>Adresse du propriétaire</h2>
              <div className="form-group">
                <label>Adresse *</label>
                <input
                  type="text"
                  value={formData.adresseProprietaire}
                  onChange={(e) => handleInputChange('adresseProprietaire', e.target.value)}
                  className={errors.adresseProprietaire ? 'error' : ''}
                  placeholder="Numéro et nom de rue"
                />
                {errors.adresseProprietaire && <span className="error-message">{errors.adresseProprietaire}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ville *</label>
                  <input
                    type="text"
                    value={formData.ville}
                    onChange={(e) => handleInputChange('ville', e.target.value)}
                    className={errors.ville ? 'error' : ''}
                    placeholder="Nom de la ville"
                  />
                  {errors.ville && <span className="error-message">{errors.ville}</span>}
                </div>
                <div className="form-group">
                  <label>Code postal *</label>
                  <input
                    type="text"
                    value={formData.codePostal}
                    onChange={(e) => handleInputChange('codePostal', e.target.value)}
                    className={errors.codePostal ? 'error' : ''}
                    placeholder="75000"
                  />
                  {errors.codePostal && <span className="error-message">{errors.codePostal}</span>}
                </div>
              </div>
              <div className="form-group">
                <label>Pays *</label>
                <input
                  type="text"
                  value={formData.pays}
                  onChange={(e) => handleInputChange('pays', e.target.value)}
                  className={errors.pays ? 'error' : ''}
                  placeholder="France"
                />
                {errors.pays && <span className="error-message">{errors.pays}</span>}
              </div>
            </div>
          );
        }

      case 3:
        return (
          <div className="step-content">
            <h2>Préférences et style de vie</h2>
            <div className="form-group">
              <label>Bio *</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className={errors.bio ? 'error' : ''}
                placeholder="Parlez-nous de vous, vos passions, vos attentes en colocation..."
                rows={4}
              />
              {errors.bio && <span className="error-message">{errors.bio}</span>}
            </div>
            <div className="form-group">
              <label>Habitudes * (maintenez Ctrl/Cmd pour sélectionner plusieurs)</label>
              <select
                multiple
                value={formData.habitudes}
                onChange={(e) => handleSelectChange('habitudes', e)}
                className={errors.habitudes ? 'error multiple-select' : 'multiple-select'}
              >
                <option value="Non-fumeur">Non-fumeur</option>
                <option value="Fumeur">Fumeur</option>
                <option value="Calme">Calme</option>
                <option value="Social">Social</option>
                <option value="Organisé">Organisé</option>
                <option value="Nuit tôt">Nuit tôt</option>
                <option value="Nuit tard">Nuit tard</option>
                <option value="Propre">Propre</option>
                <option value="Animaux acceptés">Animaux acceptés</option>
                <option value="Pas d'animaux">Pas d'animaux</option>
              </select>
              {errors.habitudes && <span className="error-message">{errors.habitudes}</span>}
            </div>
            <div className="form-group">
              <label>Centres d'intérêt * (maintenez Ctrl/Cmd pour sélectionner plusieurs)</label>
              <select
                multiple
                value={formData.centresInteret}
                onChange={(e) => handleSelectChange('centresInteret', e)}
                className={errors.centresInteret ? 'error multiple-select' : 'multiple-select'}
              >
                <option value="Sport">Sport</option>
                <option value="Lecture">Lecture</option>
                <option value="Cinéma">Cinéma</option>
                <option value="Musique">Musique</option>
                <option value="Cuisine">Cuisine</option>
                <option value="Voyage">Voyage</option>
                <option value="Gaming">Gaming</option>
                <option value="Art">Art</option>
                <option value="Nature">Nature</option>
                <option value="Technologie">Technologie</option>
              </select>
              {errors.centresInteret && <span className="error-message">{errors.centresInteret}</span>}
            </div>
            <div className="form-group">
              <label>Style de vie * (maintenez Ctrl/Cmd pour sélectionner plusieurs)</label>
              <select
                multiple
                value={formData.styleDeVie}
                onChange={(e) => handleSelectChange('styleDeVie', e)}
                className={errors.styleDeVie ? 'error multiple-select' : 'multiple-select'}
              >
                <option value="Étudiant">Étudiant</option>
                <option value="Actif">Actif</option>
                <option value="Réservé">Réservé</option>
                <option value="Fêtard">Fêtard</option>
                <option value="Studieux">Studieux</option>
                <option value="Sportif">Sportif</option>
                <option value="Créatif">Créatif</option>
                <option value="Intellectuel">Intellectuel</option>
                <option value="Aventurier">Aventurier</option>
                <option value="Casanier">Casanier</option>
              </select>
              {errors.styleDeVie && <span className="error-message">{errors.styleDeVie}</span>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="signup-container">
      <style>{`
        .profile-picture-upload {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .profile-picture-container {
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        
        .profile-picture-preview {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 3px dashed #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        
        .profile-picture-preview:hover {
          border-color: hsl(6 100% 72%);
        }
        
        .profile-picture-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .profile-picture-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #666;
        }
        
        .profile-picture-placeholder i {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        
        .upload-hint {
          font-size: 0.875rem;
          color: #666;
          margin: 0;
        }
        
        .multiple-select {
          min-height: 120px;
          padding: 0.5rem;
        }
        
        .multiple-select option {
          padding: 0.25rem 0.5rem;
          margin-bottom: 0.25rem;
        }
        
        .multiple-select option:checked {
          background-color: hsl(6 100% 72%);
          color: white;
          border-radius: 12px;
        }
        
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
      
      <div className="signup-card">
        <div className="signup-header">
          <h1>Créer un compte</h1>
          <p>Rejoignez notre communauté de colocation</p>
        </div>

        {/* Stepper */}
        <div className="stepper">
          {steps.map((step, index) => (
            <div key={index} className={`step ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
              <div className="step-circle">
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className="step-label">{step}</span>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="form-content">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Précédent
          </button>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={handleNext}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span style={{marginRight: '8px'}}>⏳</span>
                Création en cours...
              </>
            ) : (
              currentStep === steps.length - 1 ? 'Créer le compte' : 'Suivant'
            )}
          </button>
        </div>

        <div className="signup-footer">
          <p>Vous avez déjà un compte ? <a href="/login">Se connecter</a></p>
        </div>
      </div>

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
    </div>
  );
};

export default RegistrationForm;