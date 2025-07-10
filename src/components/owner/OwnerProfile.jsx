import React, { useState } from 'react';
import { MapPin, Globe, Home, MessageCircle, ThumbsUp, Star, X } from 'lucide-react';
import '../../assets/styles/ownerCss/profileOwnerStyle.css';

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
  reviews = [
    {
      id: 1,
      reviewer: "Marie L.",
      rating: 5,
      comment: "Propriétaire très réactif et logement parfait pour mes études. Je recommande vivement !",
      date: "Il y a 2 semaines",
      helpful: 8
    },
    {
      id: 2,
      reviewer: "Thomas K.",
      rating: 4,
      comment: "Bon propriétaire, appartement bien situé près du campus. Quelques petits détails à améliorer mais globalement satisfait.",
      date: "Il y a 1 mois",
      helpful: 5
    },
    {
      id: 3,
      reviewer: "Emma D.",
      rating: 5,
      comment: "Excellente expérience ! Sophie est très compréhensive avec les étudiants et l'appartement était exactement comme décrit.",
      date: "Il y a 2 mois",
      helpful: 12
    }
  ]
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

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
    if (owner.profileImage) {
      return (
        <img 
          src={owner.profileImage} 
          alt={owner.name}
          className="profile-owner-avatar-image"
        />
      );
    }
    return (
      <div className="profile-owner-avatar-placeholder">
        <span className="profile-owner-avatar-initials">
          {owner.name.split(' ').map(n => n[0]).join('')}
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

  const handleSubmitReview = () => {
    if (selectedRating === 0) {
      alert('Veuillez sélectionner une note');
      return;
    }
    
    // Ici vous pouvez ajouter la logique pour soumettre l'avis
    console.log('Avis soumis:', {
      rating: selectedRating,
      comment: comment,
      ownerName: owner.name
    });
    
    handleModalClose();
    alert('Votre avis a été publié avec succès !');
  };

  const getRatingText = (rating) => {
    const ratingTexts = {
      1: '1 étoile',
      2: '2 étoiles', 
      3: '3 étoiles',
      4: '4 étoiles',
      5: '5 étoiles'
    };
    return ratingTexts[rating] || '';
  };

  return (
    <div className="profile-owner-container">
      <div className="profile-owner-layout">
        {/* Profile Section */}
        <div className="profile-owner-left-section">
          <div className="profile-owner-header">
            <div className="profile-owner-profile-info">
              <div className="profile-owner-avatar">
                {renderProfileImage()}
              </div>
              
              <h1 className="profile-owner-name">{owner.name}</h1>
              
              <div className="profile-owner-rating">
                <div className="profile-owner-stars">
                  {renderStars(Math.floor(owner.rating))}
                </div>
                <span className="profile-owner-rating-score">{owner.rating}</span>
                <span className="profile-owner-rating-count">({owner.reviewCount} avis)</span>
              </div>
            </div>
          </div>

          <div className="profile-owner-property-card">
            <div className="profile-owner-property-icon">
              <Home className="profile-owner-icon" />
            </div>
            <div className="profile-owner-property-count">{owner.propertyCount}</div>
            <div className="profile-owner-property-label">Propriétés</div>
          </div>

          <div className="profile-owner-details">
            <div className="profile-owner-detail-item">
              <MapPin className="profile-owner-detail-icon" />
              <div className="profile-owner-detail-content">
                <div className="profile-owner-detail-primary">{owner.address}</div>
                <div className="profile-owner-detail-secondary">{owner.city}</div>
              </div>
            </div>
            
            <div className="profile-owner-detail-item">
              <Globe className="profile-owner-detail-icon" />
              <div className="profile-owner-detail-content">
                <div className="profile-owner-detail-primary">{owner.country}</div>
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
              {reviews.length} avis
            </span>
          </div>

          <div className="profile-owner-reviews-list">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="profile-owner-review-item">
                  <div className="profile-owner-review-content">
                    <div className="profile-owner-reviewer-avatar">
                      <span className="profile-owner-reviewer-initials">
                        {review.reviewer.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <div className="profile-owner-review-details">
                      <div className="profile-owner-review-header">
                        <span className="profile-owner-reviewer-name">{review.reviewer}</span>
                        <div className="profile-owner-review-stars">
                          {renderStars(review.rating)}
                        </div>
                        <span className="profile-owner-review-date">{review.date}</span>
                      </div>
                      
                      <p className="profile-owner-review-comment">{review.comment}</p>
                      
                      <div className="profile-owner-review-helpful">
                        <ThumbsUp className="profile-owner-helpful-icon" />
                        <span>Utile ({review.helpful})</span>
                      </div>
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
              <h2 className="evaluation-modal-title">Évaluer {owner.name}</h2>
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
                {selectedRating > 0 && (
                  <p className="evaluation-rating-text">{getRatingText(selectedRating)}</p>
                )}
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