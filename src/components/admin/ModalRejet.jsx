import React from 'react';
import '../../assets/styles/ModalRejet.css'; // tu peux styliser selon ta maquette

const ModalRejet = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Rejeter le signalement</h2>
        <p className="modal-subtitle">Indiquez pourquoi vous rejetez ce signalement.</p>
        <label className="modal-label">
          Note (visible uniquement par les administrateurs)
        </label>
        <textarea
          className="modal-textarea"
          placeholder="Ajoutez des détails sur l'action prise ou la raison du rejet..."
        ></textarea>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Annuler</button>
          <button className="btn-confirm" onClick={onConfirm}>Confirmer le rejet</button>
        </div>
      </div>
    </div>
  );
};

export default ModalRejet;
