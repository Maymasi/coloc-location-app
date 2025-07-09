import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, MessageCircle, User, Sparkles } from 'lucide-react';

const ResponseModal = ({
  isOpen,
  onClose,
  demande,
  action,
  onSubmit
}) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessage('');
      setError('');
      setIsSubmitting(false);
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen || !demande) return null;

  const isApprove = action === 'approve';
  const actionText = isApprove ? 'Approuver' : 'Rejeter';
  const actionColor = isApprove ? '#10b981' : '#ef4444';
  const actionGradient = isApprove 
    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
    : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError('Le message est obligatoire');
      return;
    }

    if (message.trim().length < 10) {
      setError('Le message doit contenir au moins 10 caractères');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const nouveauStatus = isApprove ? 'Accepté' : 'Refusée';
      await onSubmit(demande.id, message.trim(), nouveauStatus);
      onClose();
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div
        className="modal-content"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '24px',
          boxShadow: `
            0 32px 64px rgba(0,0,0,0.15),
            0 0 0 1px rgba(255,255,255,0.2),
            inset 0 1px 0 rgba(255,255,255,0.8)
          `,
          maxWidth: '680px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '2rem',
          position: 'relative',
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: actionGradient,
          borderRadius: '24px 24px 0 0'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          width: '60px',
          height: '60px',
          background: `radial-gradient(circle, ${actionColor}20 0%, transparent 70%)`,
          borderRadius: '50%',
          zIndex: 0
        }} />

        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: actionGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: `0 8px 24px ${actionColor}40, 0 0 0 4px ${actionColor}10`,
              position: 'relative'
            }}>
              {isApprove ? <Check size={24} /> : <X size={24} />}
              <div style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '16px',
                height: '16px',
                background: '#fbbf24',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(251, 191, 36, 0.4)'
              }}>
                <Sparkles size={10} color="#fff" />
              </div>
            </div>
            <div>
              <h2 style={{ 
                margin: 0, 
                fontSize: '1.5rem', 
                fontWeight: '700',
                background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {actionText} la demande
              </h2>
              <p style={{ 
                margin: '0.25rem 0 0 0', 
                fontSize: '0.9rem', 
                color: '#6b7280',
                fontWeight: '500'
              }}>
                Envoyez votre réponse à <span style={{ color: actionColor, fontWeight: '600' }}>{demande.nom}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(107, 114, 128, 0.1)',
            border: 'none',
            color: '#6b7280',
            padding: '0.75rem',
            cursor: 'pointer',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(8px)'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(107, 114, 128, 0.2)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(107, 114, 128, 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Infos Demande */}
        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          padding: '1.5rem',
          borderRadius: '16px',
          marginBottom: '2rem',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)',
            animation: 'shimmer 3s infinite'
          }} />
          
          <h3 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            fontSize: '1.1rem', 
            marginBottom: '1.25rem', 
            color: '#1f2937',
            fontWeight: '600'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <User size={14} />
            </div>
            Informations de la demande
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            {[
              { label: 'Étudiant', value: demande.nom },
              { label: 'Email', value: demande.email },
              { label: 'Logement', value: demande.logement },
              { label: 'Budget', value: demande.budget }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.7)',
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.5)',
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.2s ease',
                cursor: 'default'
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: '600', 
                  color: '#6b7280', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.5px',
                  marginBottom: '0.5rem'
                }}>
                  {item.label}
                </div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  wordBreak: 'break-word'
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {demande.message && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ 
                fontSize: '0.75rem', 
                fontWeight: '600', 
                color: '#6b7280', 
                textTransform: 'uppercase', 
                letterSpacing: '0.5px',
                marginBottom: '0.75rem',
              }}>
                Message
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.9)',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.5)',
                backdropFilter: 'blur(8px)',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  width: '4px',
                  height: '4px',
                  background: '#3b82f6',
                  borderRadius: '50%'
                }} />
                <p style={{
                  fontStyle: 'italic',
                  margin: 0,
                  color: '#374151',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  paddingLeft: '1rem'
                }}>
                  "{demande.message}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Formulaire */}
        <div>
          <label htmlFor="message" style={{ 
            fontWeight: '600', 
            fontSize: '1rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            marginBottom: '0.75rem',
            color: '#1f2937',
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <MessageCircle size={14} />
            </div>
            Votre message *
          </label>
          
          <div style={{ position: 'relative' }}>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isApprove
                ? "Bonjour, votre demande est acceptée. Voici la suite..."
                : "Bonjour, malheureusement je ne peux pas accepter votre demande car..."}
              style={{
                width: '95%',
                minHeight: '140px',
                padding: '1rem',
                borderRadius: '12px',
                border: `2px solid ${error ? '#ef4444' : 'rgba(229, 231, 235, 0.5)'}`,
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'none',
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = actionColor;
                e.target.style.boxShadow = `0 0 0 4px ${actionColor}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = error ? '#ef4444' : 'rgba(229, 231, 235, 0.5)';
                e.target.style.boxShadow = 'none';
              }}
            />
            
            <div style={{
              position: 'absolute',
              bottom: '0.75rem',
              right: '0.75rem',
              background: 'rgba(255,255,255,0.9)',
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              color: message.length < 10 ? '#ef4444' : '#6b7280',
              fontWeight: '500',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.5)'
            }}>
              {message.length}/500
            </div>
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              border: '1px solid #fecaca',
              padding: '1rem',
              borderRadius: '12px',
              color: '#dc2626',
              fontSize: '0.875rem',
              marginTop: '1rem',
              fontWeight: '500',
              animation: 'shake 0.5s ease-in-out'
            }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                padding: '0.875rem 1.75rem',
                border: '1px solid rgba(209, 213, 219, 0.5)',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.8)',
                color: '#374151',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !message.trim() || message.length < 10}
              style={{
                padding: '0.875rem 1.75rem',
                border: 'none',
                borderRadius: '12px',
                background: actionGradient,
                color: 'white',
                fontWeight: '600',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: isSubmitting || !message.trim() || message.length < 10 ? 'not-allowed' : 'pointer',
                opacity: isSubmitting || !message.trim() || message.length < 10 ? 0.6 : 1,
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 12px ${actionColor}30`,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && message.trim() && message.length >= 10) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${actionColor}40`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting && message.trim() && message.length >= 10) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${actionColor}30`;
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Envoi en cours...
                </>
              ) : (
                <>
                  {isApprove ? <Check size={18} /> : <X size={18} />}
                  {actionText}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-content::-webkit-scrollbar {
          display: none;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @media (max-width: 640px) {
          .modal-content {
            padding: 1.5rem !important;
            margin: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResponseModal;