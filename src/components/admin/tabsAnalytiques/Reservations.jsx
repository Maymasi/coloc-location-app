import React from 'react';
import { FaClock, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const Reservations = () => {
  return (
    <div className="container-reservations">
      <div className="card-reservation">
        <div className="header-card">
          <FaClock className="icon blue" />
          <h4>Durée des séjours</h4>
        </div>
        <div className="bar-item">
          <span>1-3 mois</span>
          <span>12%</span>
        </div>
        <div className="bar">
          <div className="fill" style={{ width: '12%' }}></div>
        </div>

        <div className="bar-item">
          <span>4-6 mois</span>
          <span>38%</span>
        </div>
        <div className="bar">
          <div className="fill" style={{ width: '38%' }}></div>
        </div>

        <div className="bar-item">
          <span>7-9 mois</span>
          <span>35%</span>
        </div>
        <div className="bar">
          <div className="fill" style={{ width: '35%' }}></div>
        </div>

        <div className="bar-item">
          <span>10-12 mois</span>
          <span>15%</span>
        </div>
        <div className="bar">
          <div className="fill" style={{ width: '15%' }}></div>
        </div>
      </div>

      <div className="card-reservation">
        <div className="header-card">
          <FaCalendarAlt className="icon green" />
          <h4>Saisonnalité</h4>
        </div>
        <div className="season-item">
          <span>Rentrée (Sep-Oct)</span>
          <span className="badge green">42%</span>
        </div>
        <div className="season-item">
          <span>Semestre 2 (Jan-Fév)</span>
          <span className="badge blue">28%</span>
        </div>
        <div className="season-item">
          <span>Été (Jun-Août)</span>
          <span className="badge orange">18%</span>
        </div>
        <div className="season-item">
          <span>Autres périodes</span>
          <span className="badge purple">12%</span>
        </div>
      </div>

      <div className="card-reservation">
        <div className="header-card">
          <FaCheckCircle className="icon purple" />
          <h4>Taux de conversion</h4>
        </div>
        <div className="bar-item">
          <span>Visites → Demandes</span>
          <span>24.8%</span>
        </div>
        <div className="bar">
          <div className="fill" style={{ width: '24.8%' }}></div>
        </div>

        <div className="bar-item">
          <span>Demandes → Réservations</span>
          <span>68.3%</span>
        </div>
        <div className="bar">
          <div className="fill" style={{ width: '68.3%' }}></div>
        </div>

        <div className="bar-item">
          <span>Visites → Réservations</span>
          <span>16.9%</span>
        </div>
        <div className="bar">
          <div className="fill" style={{ width: '16.9%' }}></div>
        </div>

        <p className="temps-decision">Temps moyen de décision</p>
        <h3>3.2 jours</h3>
      </div>

    </div>
  );
};

export default Reservations;
