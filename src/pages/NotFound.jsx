import React from 'react';
import { useNavigate } from 'react-router-dom';
import imagNotFound from '../assets/images/img-404.png';
import '../assets/styles/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-left">
          <img
            src={imagNotFound}
            alt="404 Illustration"
            className="notfound-image"
          />
        </div>
        <div className="notfound-right">
          <h1 className="notfound-code">404</h1>
          <p className="notfound-message">Oups ! Page non trouvée</p>
          <p className="notfound-description">
            La page que vous recherchez n'existe pas.<br />
            Essayez à nouveau ou revenez à l'accueil.
          </p>
          <button className="notfound-button" onClick={() => navigate("/")}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

