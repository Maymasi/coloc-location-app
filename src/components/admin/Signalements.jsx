import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { AiOutlineSolution } from "react-icons/ai";
import { AiOutlineFlag } from "react-icons/ai";
import '../../assets/styles/Signalements.css';
import ModalRejet from './ModalRejet';
import ModalResolution from './ModalResolution';

const Signalements = () => {
  const [showModal, setShowModal] = useState(false);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');

  const handleRejectClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleConfirmRejet = () => {
    setShowModal(false);
    setActiveTab('rejected');
  };

  const handleResolveClick = () => setShowResolutionModal(true);
  const handleConfirmResolution = (data) => {
    console.log('Résolution confirmée avec :', data);
    setShowResolutionModal(false);
  };

  return (
    <div className="signalements-container">
      <h1 className="signalements-title">Gestion des signalements</h1>
      <p className="signalements-subtitle">Examinez et traitez les signalements des utilisateurs</p>

      {/* Filtres */}
      <div className="signalements-tabs">
        <button
          className={`signalements-tab-button ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <div className="signale-tab-content">
            <span>En attente</span>
            <span className="signalements-badge yellow">3</span>
         </div>
        </button>

        <button
          className={`signalements-tab-button ${activeTab === 'resolved' ? 'active' : ''}`}
          onClick={() => setActiveTab('resolved')}
        >
          <div className="signale-tab-content">
           <span>Résolus</span>
           <span className="signalements-badge green">1</span>
          </div>
        </button>

        <button
          className={`signalements-tab-button ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          <div className="signale-tab-content">
           <span>Rejetés</span>
           <span className="signalements-badge red">1</span>
          </div>
        </button>
      </div>

      {/* Signalements en attente */}
      {activeTab === 'pending' && (
        <>
          {/* Signalement #1 */}
          <div className="signalements-report-card">
            <div className="signalements-report-header">
              <h2 className="signalements-report-title">Signalement #1</h2>
              <div className="signalements-report-tags">
                <span className="signalements-tag yellow">En attente</span>
                <span className="signalements-tag-outline red">Haute priorité</span>
              </div>
            </div>

            <p className="signalements-report-date">Signalé le 15/06/2025 à 12:23:00</p>

            <div className="signalements-report-body">
              <div className="signalements-report-column">
                <div className="signalements-report-section">
                  <h3 className="signalements-section-title">Signalé par</h3>
                  <div className="signalements-report-user">
                    <div className="signalements-user-avatar" />
                    <div>
                      <p className="signalements-user-name">Emma Johnson</p>
                      <p className="signalements-user-email">emma.j@example.com</p>
                    </div>
                  </div>
                </div>

                <div className="signalements-report-section">
                  <h3 className="signalements-section-title">Type de contenu</h3>
                  <p className="signalements-section-value"><AiOutlineSolution /> Propriété</p>
                </div>

                <div className="signalements-report-section">
                  <h3 className="signalements-section-title">Raison</h3>
                  <p className="signalements-section-value">Contenu frauduleux ou trompeur</p>
                </div>
              </div>

              <div className="signalements-report-column">
                <div className="signalements-report-section">
                  <h3 className="signalements-section-title">Description</h3>
                  <div className="signalements-description-box">
                    Cette annonce contient des photos qui ne correspondent pas à la propriété réelle. J'ai visité l'appartement et il est complètement différent des photos.
                  </div>
                </div>

                <div className="signalements-report-section">
                  <h3 className="signalements-section-title">Contenu signalé</h3>
                  <div className="signalements-reported-content-box">
                    <p className="signalements-user-name">John Smith</p>
                    <p className="signalements-original-Signale">Spacious 2-Bedroom Apartment Near Campus - $1200/mo</p>
                    <p className="signalements-original-link">Voir le contenu original</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="signalements-report-actions">
              <button className="signalements-action-btn reject" onClick={handleRejectClick}>
                <XCircle size={16} /> Rejeter
              </button>
              <button className="signalements-action-btn resolve" onClick={handleResolveClick}>
                <CheckCircle2 size={16} /> Résoudre
              </button>
            </div>
          </div>

          {/* Signalement #2 */}
          <div className="signalements-report-card">
            <div className="signalements-report-header">
              <h2 className="signalements-report-title">Signalement #2</h2>
              <div className="signalements-report-tags">
                <span className="signalements-tag yellow">En attente</span>
                <span className="signalements-tag-outline orange">Priorité moyenne</span>
              </div>
            </div>

            <p className="signalements-report-date">Signalé le 14/06/2025 à 17:45:00</p>

            <div className="signalements-report-body">
              <div className="signalements-report-column">
                <div className="signalements-report-section">
                  <h3 className="signalements-section-title">Signalé par</h3>
                  <div className="signalements-report-user">
                    <div className="signalements-user-avatar" />
                    <div>
                      <p className="signalements-user-name">Michael Chen</p>
                      <p className="signalements-user-email">michael.c@example.com</p>
                    </div>
                  </div>
                </div>

                <div className="signalements-report-section">
                  <h3 className="signalements-section-title">Type de contenu</h3>
                  <p className="signalements-section-value"><AiOutlineSolution /> Utilisateur</p>
                </div>

                <div className="signalements-report-section">
                  <h3 className="signalements-section-title">Raison</h3>
                  <p className="signalements-section-value">Harcèlement ou comportement abusif</p>
                </div>
              </div>

              <div className="signalements-report-column">
                <div className="signalements-report-section">
                  <h3 className="signalements-section-title">Description</h3>
                  <div className="signalements-description-box">
                    Ce propriétaire a été très impoli et agressif lors de notre communication. Il a fait des commentaires inappropriés sur mon origine.
                  </div>
                </div>

                <div className="signalements-report-section">
                  <h3 className="signalements-section-title">Contenu signalé</h3>
                  <div className="signalements-reported-content-box">
                    <p className="signalements-user-name">Robert Wilson</p>
                    <p className="signalements-original-Signale">Profil de propriétaire</p>
                    <p className="signalements-original-link">Voir le contenu original</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="signalements-report-actions">
              <button className="signalements-action-btn reject" onClick={handleRejectClick}>
                <XCircle size={16} /> Rejeter
              </button>
              <button className="signalements-action-btn resolve" onClick={handleResolveClick}>
                <CheckCircle2 size={16} /> Résoudre
              </button>
            </div>
          </div>
        </>
      )}

      {/* Signalement résolu */}
      {activeTab === 'resolved' && (
        <div className="signalements-report-card">
          <div className="signalements-report-header">
            <h2 className="signalements-report-title">Signalement #3</h2>
            <div className="signalements-report-tags">
              <span className="signalements-tag green">Résolu</span>
              <span className="signalements-tag-outline red">Haute priorité</span>
            </div>
          </div>

          <p className="signalements-report-date">Signalé le 13/06/2025 à 11:30:00</p>

          <div className="signalements-report-body">
            <div className="signalements-report-column">
              <div className="signalements-report-section">
                <h3 className="signalements-section-title">Signalé par</h3>
                <div className="signalements-report-user">
                  <div className="signalements-user-avatar" />
                  <div>
                    <p className="signalements-user-name">Sarah Williams</p>
                    <p className="signalements-user-email">sarah.w@example.com</p>
                  </div>
                </div>
              </div>

              <div className="signalements-report-section">
                <h3 className="signalements-section-title">Type de contenu</h3>
                <p className="signalements-section-value">📩 Message</p>
              </div>

              <div className="signalements-report-section">
                <h3 className="signalements-section-title">Raison</h3>
                <p className="signalements-section-value">Contenu inapproprié</p>
              </div>
            </div>

            <div className="signalements-report-column">
              <div className="signalements-report-section">
                <h3 className="signalements-section-title">Description</h3>
                <div className="signalements-description-box">
                  J'ai reçu des messages inappropriés de cet utilisateur avec des propositions indécentes et des insultes.
                </div>
              </div>

              <div className="signalements-report-section">
                <h3 className="signalements-section-title">Contenu signalé</h3>
                <div className="signalements-reported-content-box">
                  <p className="signalements-user-name">Anonymous User</p>
                  <p className="signalements-original-Signale">[Contenu masqué pour des raisons de confidentialité]</p>
                </div>
              </div>

              <div className="signalements-report-section">
                <h3 className="signalements-section-title">Note administrative</h3>
                <div className="signalements-description-box">
                  Compte suspendu pour 30 jours après vérification des messages. Avertissement envoyé à l'utilisateur.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Signalement rejeté */}
{activeTab === 'rejected' && (
  <div className="signalements-report-card">
    <div className="signalements-report-header">
      <h2 className="signalements-report-title">Signalement #4</h2>
      <div className="signalements-report-tags">
        <span className="signalements-tag red">Rejeté</span>
        <span className="signalements-tag-outline green">Priorité basse</span>
      </div>
    </div>

    <p className="signalements-report-date">Signalé le 12/06/2025 à 13:15:00</p>

    <div className="signalements-report-body">
      <div className="signalements-report-column">
        <div className="signalements-report-section">
          <h3 className="signalements-section-title">Signalé par</h3>
          <div className="signalements-report-user">
            <div className="signalements-user-avatar" />
            <div>
              <p className="signalements-user-name">David Lee</p>
              <p className="signalements-user-email">david.lee@example.com</p>
            </div>
          </div>
        </div>

        <div className="signalements-report-section">
          <h3 className="signalements-section-title">Type de contenu</h3>
          <p className="signalements-section-value"><AiOutlineFlag /> Annonce de colocation</p>
        </div>

        <div className="signalements-report-section">
          <h3 className="signalements-section-title">Raison</h3>
          <p className="signalements-section-value">Spam ou publicité</p>
        </div>
      </div>

      <div className="signalements-report-column">
        <div className="signalements-report-section">
          <h3 className="signalements-section-title">Description</h3>
          <div className="signalements-description-box">
            Cette annonce de colocation semble être du spam, elle est publiée plusieurs fois par jour.
          </div>
        </div>

        <div className="signalements-report-section">
          <h3 className="signalements-section-title">Contenu signalé</h3>
          <div className="signalements-reported-content-box">
            <p className="signalements-user-name">Alex Johnson</p>
            <p className="signalements-original-Signale">Recherche colocataire pour appartement 2 chambres - $800/mois</p>
            <p className="signalements-original-link">Voir le contenu original</p>
          </div>
        </div>

        <div className="signalements-report-section">
          <h3 className="signalements-section-title">Note administrative</h3>
          <div className="signalements-description-box">
            Après vérification, l'utilisateur a publié l'annonce une seule fois. Il s'agit probablement d'un malentendu.
          </div>
        </div>
      </div>
    </div>
  </div>
  )}

      {/* Modales */}
      {showModal && (
        <ModalRejet onClose={handleCloseModal} onConfirm={handleConfirmRejet} />
      )}
      {showResolutionModal && (
        <ModalResolution onClose={() => setShowResolutionModal(false)} onConfirm={handleConfirmResolution} />
      )}
    </div>
  );
};

export default Signalements;
