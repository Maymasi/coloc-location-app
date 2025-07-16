import React, { useEffect, useState } from 'react';
import { MapPin, Globe, Home, MessageCircle, ThumbsUp, Star, X } from 'lucide-react';
import '../../assets/styles/ownerCss/profileOwnerStyle.css';
import {getOwnerProfile, addAvis} from '../../Services/OwnerProfileService'
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OwnerProfile = ({ 
  owner = {
    name: "Sophie Martinez",
    rating: 4.8,
    reviewCount: 6,
    propertyCount: 12,
    address: "15 Avenue des Champs-Élysées",
    city: "Paris, 75008",
    country: "France",
    isSuperHost: true,
    profileImage: null
  },

}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ownerData, setOwnerData] = useState();
  var {id} = useParams();
  // Fonction pour récupérer le profil du propriétaire
  useEffect(() => {
    const fetchOwnerProfile = async (ownerId) => {
      try {
        const profileData = await getOwnerProfile(ownerId);
        console.log("Profil du propriétaire récupéré:", profileData);
        setOwnerData(profileData);
      } catch (error) { 
        console.error("Erreur lors de la récupération du profil du propriétaire:", error);
      }
    };
    if(id)
      fetchOwnerProfile(id);
  },[id]);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`profile-owner-star ${i <= rating ? 'profile-owner-star-filled' : 'profile-owner-star-empty'}`}
        />
      );
    }
    return stars;
  };

  const renderInteractiveStars = (rating, hoverRating, onHover, onClick) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isActive = i <= (hoverRating || rating);
      stars.push(
        <Star 
          key={i} 
          className={`evaluation-star ${isActive ? 'evaluation-star-active' : 'evaluation-star-inactive'}`}
          onMouseEnter={() => onHover(i)}
          onMouseLeave={() => onHover(0)}
          onClick={() => onClick(i)}
        />
      );
    }
    return stars;
  };

  const renderProfileImage = () => {
    if (ownerData.avatarProp) {
      return (
        <img 
          src={ownerData.avatarProp} 
          alt={ownerData.nom}
          className="profile-owner-avatar-image"
        />
      );
    }
    return (
      <div className="profile-owner-avatar-placeholder">
        <span className="profile-owner-avatar-initials">
          {ownerData.nom.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
    );
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRating(0);
    setHoverRating(0);
    setComment('');
  };

  const handleSubmitReview = async () => {
    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      if (!token) return <Navigate to="/login" />;
      const Iid = decoded.nameid;

      // Envoie au backend
      const newReview = await addAvis({
        rating: selectedRating,
        comment: comment,
        StudentId: Number(Iid),
        ProprietaireId: id
      });

      // Ajoute le nouvel avis localement
      const updatedAvis = [...ownerData.avis.$values, {
        $id: Date.now(), // pour la clé unique, remplace par l'id réel si ton API le renvoie
        nomEtudiant: decoded.unique_name, // ou autre info
        rating: selectedRating,
        comment: comment,
        avatarProfile: null, // adapte si dispo
      }];

      setOwnerData({
        ...ownerData,
        avis: {
          $values: updatedAvis
        },
        // Mets à jour la note globale aussi si ton API ne le fait pas :
        note: ((ownerData.note * ownerData.avis.$values.length + selectedRating) / (ownerData.avis.$values.length + 1)).toFixed(1)
      });

      toast.success("Votre avis a été publié avec succès !");
      handleModalClose();

    } catch (error) {
      // reste inchangé
    }
  };

  if (!ownerData) return <div>Chargement du profil...</div>;
  return (
    <div className="profile-owner-container">
       <ToastContainer position="top-right" autoClose={3000} />
      <div className="profile-owner-layout">
        {/* Profile Section */}
        <div className="profile-owner-left-section">
          <div className="profile-owner-header">
            <div className="profile-owner-profile-info">
              <div className="profile-owner-avatar">
                {renderProfileImage()}
              </div>
              
              <h1 className="profile-owner-name">{ownerData.nom}</h1>
              
              <div className="profile-owner-rating">
                <div className="profile-owner-stars">
                  {renderStars(Math.floor(ownerData.note))}
                </div>
                <span className="profile-owner-rating-score">{ownerData.note}</span>
              </div>
            </div>
          </div>

          <div className="profile-owner-property-card">
            <div className="profile-owner-property-icon">
              <Home className="profile-owner-icon" />
            </div>
            <div className="profile-owner-property-count">{ownerData.nmbProprietes}</div>
            <div className="profile-owner-property-label">Propriétés</div>
          </div>

          <div className="profile-owner-details">
            <div className="profile-owner-detail-item">
              <MapPin className="profile-owner-detail-icon" />
              <div className="profile-owner-detail-content">
                <div className="profile-owner-detail-primary">{ownerData.adresse}</div>
                <div className="profile-owner-detail-secondary">{owner.pays}</div>
              </div>
            </div>
            
            <div className="profile-owner-detail-item">
              <Globe className="profile-owner-detail-icon" />
              <div className="profile-owner-detail-content">
                <div className="profile-owner-detail-primary">{ownerData.ville}</div>
              </div>
            </div>
          </div>

          <button className="profile-owner-evaluate-btn" onClick={handleModalOpen}>
            <Star className="profile-owner-btn-icon" />
            Évaluer ce propriétaire
          </button>
        </div>

        {/* Reviews Section */}
        <div className="profile-owner-right-section">
          <div className="profile-owner-reviews-header">
            <MessageCircle className="profile-owner-reviews-icon" />
            <h2 className="profile-owner-reviews-title">Avis des étudiants</h2>
            <span className="profile-owner-reviews-count">
              {ownerData.avis.$values.length} avis
            </span>
          </div>

          <div className="profile-owner-reviews-list">
            {ownerData.avis.$values.length > 0 ? (
              ownerData.avis.$values.map((review) => (
                <div key={review.$id} className="profile-owner-review-item">
                  <div className="profile-owner-review-content">
                    <div className="profile-owner-reviewer-avatar">
                      {review.avatarProfile ? (
                        <img
                          src={review.avatarProfile}
                          className="profile-owner-avatar-image"
                        />
                      ) : (
                        <span className="profile-owner-reviewer-initials">
                          {review.nomEtudiant.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    
                    <div className="profile-owner-review-details">
                      <div className="profile-owner-review-header">
                        <span className="profile-owner-reviewer-name">{review.nomEtudiant}</span>
                        <div className="profile-owner-review-stars">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      
                      <p className="profile-owner-review-comment">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="profile-owner-no-reviews">
                <MessageCircle className="profile-owner-no-reviews-icon" />
                <h3 className="profile-owner-no-reviews-title">Aucun avis pour le moment</h3>
                <p className="profile-owner-no-reviews-text">Soyez le premier à laisser un avis sur ce propriétaire</p>
                <button className="profile-owner-first-review-btn">
                  Laisser un avis
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal d'évaluation */}
      {isModalOpen && (
        <div className="evaluation-modal-overlay" onClick={handleModalClose}>
          <div className="evaluation-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="evaluation-modal-header">
              <h2 className="evaluation-modal-title">Évaluer {ownerData.nom}</h2>
              <button className="evaluation-modal-close" onClick={handleModalClose}>
                <X className="evaluation-modal-close-icon" />
              </button>
            </div>

            <div className="evaluation-modal-body">
              <div className="evaluation-rating-section">
                <h3 className="evaluation-rating-title">Donnez votre note</h3>
                <div className="evaluation-stars-container">
                  {renderInteractiveStars(
                    selectedRating,
                    hoverRating,
                    setHoverRating,
                    setSelectedRating
                  )}
                </div>
              </div>

              <div className="evaluation-comment-section">
                <h3 className="evaluation-comment-title">Votre commentaire (optionnel)</h3>
                <textarea
                  className="evaluation-comment-textarea"
                  placeholder="Partagez votre expérience avec ce propriétaire..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={500}
                />
                <div className="evaluation-comment-counter">
                  {comment.length}/500 caractères
                </div>
              </div>
            </div>

            <div className="evaluation-modal-footer">
              <button className="evaluation-cancel-btn" onClick={handleModalClose}>
                Annuler
              </button>
              <button className="evaluation-submit-btn" onClick={handleSubmitReview}>
                <Star className="evaluation-submit-icon" />
                Publier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerProfile;