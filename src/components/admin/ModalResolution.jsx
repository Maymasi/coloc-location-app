import React, { useState } from 'react';
import '../../assets/styles/Modal.css';

const ModalResolution = ({ onClose, onConfirm }) => {
  const [action, setAction] = useState('');
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    if (!action) return;
    onConfirm({ action, note });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Résoudre le signalement</h2>
        <p className="modal-subtitle">
          Confirmez que vous avez pris les mesures nécessaires pour résoudre ce signalement.
        </p>

        <label className="modal-label">Action prise</label>
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className={`modal-select ${!action ? 'error' : ''}`}
        >
          <option value="">Sélectionnez une action</option>
          <option value="supprimer">Contenu supprime</option>
          <option value="avertir">Compte suspendu</option>
          <option value="banni">Compte banni</option>
          <option value="aucune">Autre action </option>
        </select>

        <label className="modal-label" style={{ marginTop: '16px' }}>
          Note (visible uniquement par les administrateurs)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="modal-textarea"
          placeholder="Ajoutez des détails sur l'action prise ou la raison du rejet..."
        />

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Annuler
          </button>
          <button
            className="modal-btn confirm"
            onClick={handleConfirm}
            disabled={!action}
          >
            Confirmer la résolution
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalResolution;
