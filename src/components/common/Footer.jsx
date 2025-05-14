import React from "react";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import "../../assets/styles/Footer.css"; // Ton fichier CSS

const Footer = () => {
  return (
    <footer className="footer">
      {/* Haut du footer */}
      <div className="footer-top">
        {/* Bloc CampusHaven */}
        <div className="footer-brand">
          <h2>CampusHaven</h2>
          <p>
            La solution idéale pour le logement étudiant. Trouvez votre logement parfait près du campus.
          </p>
          <div className="footer-socials">
            <a href="#"><Facebook /></a>
            <a href="#"><Twitter /></a>
            <a href="#"><Instagram /></a>
          </div>
        </div>

        {/* Bloc Newsletter */}
        <div className="newsletter-footer">
          <h3>Subscribe to Our Newsletter</h3>
          <p>
            Get the latest updates on new properties, roommate matching tips, and student housing guides.
          </p>
          <form>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="footer-bottom">
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Pour les étudiants</h4>
            <ul>
              <li><a href="#">Trouver un logement</a></li>
              <li><a href="#">Trouver des colocataires</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Ressources étudiantes</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Pour les propriétaires</h4>
            <ul>
              <li><a href="#">Publier une annonce</a></li>
              <li><a href="#">Ressources propriétaires</a></li>
              <li><a href="#">Tarification</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Entreprise</h4>
            <ul>
              <li><a href="#">À propos de nous</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Conditions d'utilisation</a></li>
              <li><a href="#">Administration</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <div className="contact-info-footer">
              <div >
                  <MapPin size={12} /> 
                  <p>123 Campus Avenue,France</p>
              </div>
              <div >
                  <Phone size={12} />
                  <p>+33 1 23 45 67 89</p>
              </div>
              <div >
                  <Mail size={12} />
                  <p>contact@campushaven.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
