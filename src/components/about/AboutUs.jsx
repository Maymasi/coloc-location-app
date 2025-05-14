import "../../assets/styles/AboutUs.css";
import Nav from "../home/Nav"
import { CheckCircle } from 'lucide-react';
import { Users, Shield, Award } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../common/Footer';
import img1 from '../../assets/images/image1.jpg';
import img2 from '../../assets/images/image2.jpg';
import img3 from '../../assets/images/image3.jpg';
import img4 from '../../assets/images/image4.jpg';
import img6 from '../../assets/images/oussama.png';
import img7 from '../../assets/images/omaima.png';
import img8 from '../../assets/images/souha.jpeg';
const AboutUs = () => {
  const images = [img1,img2,img3,img4];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // l'animation ne se joue qu'une seule fois
    });
  }, []);
  
  const teamMembers = [
    {
      name: "Oussama Nouhar",
      role: "Software Engineering",
      image: img6,
    },
    {
      name: "Omaima Saif",
      role: "Software Engineering",
      image: img7,
    },
    {
      name: "Souhayla Ghanem",
      role: "Software Engineering",
      image: img8,
    },
    
  ];
  return (
    <div>
      <Nav/>
      <section className="aboutUs-section" data-aos="fade-up">
          <div className="aboutUs-container">
            <span className="aboutUs-tag">À propos de nous</span>
            <h1 className="aboutUs-title">
             Notre mission: Simplifier le logement étudiant
           </h1>
           <p className="aboutUs-text">
             CampusHaven a été créé pour résoudre les défis du logement étudiant en connectant les étudiants avec des logements abordables et des colocataires compatibles.
           </p>
         </div>
      </section>
      <div className="Us-our-story" data-aos="fade-right">
        <div className="Us-text">
          <h2 className="Us-section-title">Notre histoire</h2>
          <p className="Us-story-text">
            CampusHaven a été fondé en 2020 par trois anciens étudiants qui ont eux-mêmes connu les difficultés de trouver un logement abordable et des colocataires fiables pendant leurs études.
          </p>
          <p className="Us-story-text">
            Frustrés par les processus compliqués et les plateformes généralistes, ils ont décidé de créer une solution dédiée au logement étudiant.
          </p>
          <p className="Us-story-text">
            Aujourd'hui, CampusHaven est présent dans plus de 50 villes universitaires et a aidé plus de 100 000 étudiants à trouver leur logement idéal.
          </p>
          <div className="Us-features">
            <div><CheckCircle className="aboutUs-icon" /> <span>50+ villes</span></div>
            <div><CheckCircle className="aboutUs-icon" /> <span>100 000+ étudiants</span></div>
            <div><CheckCircle className="aboutUs-icon" /><span>10 000+ propriétaires</span> </div>
          </div>
        </div>

        <div className="Us-image">
          <div className="Us-image-placeholder Us-animated-background" style={{ backgroundImage: `url(${images[currentImage]})` }}></div>
        </div>
      </div>
      <section className="aboutUs-nos-valeurs-section">
        <h2 className="aboutUs-nos-valeurs-title">Nos valeurs</h2>
        <p className="aboutUs-nos-valeurs-subtitle">
          Ces principes guident chaque décision que nous prenons et chaque fonctionnalité que nous développons.
        </p>
        <div className="aboutUs-valeurs-grid">
          <div className="aboutUs-valeur-card" data-aos="zoom-in">
            <div className="aboutUs-valeur-icon-wrapper">
              <Users className="aboutUs-valeur-icon" />
            </div>
            <h3 className="aboutUs-valeur-title">Communauté</h3>
            <p className="aboutUs-valeur-description">
              Nous croyons en la création d'une communauté solidaire où les étudiants peuvent se connecter et s'entraider dans leur parcours académique.
            </p>
          </div>

          <div className="aboutUs-valeur-card" data-aos="zoom-in">
            <div className="aboutUs-valeur-icon-wrapper">
              <Shield className="aboutUs-valeur-icon" />
            </div>
            <h3 className="aboutUs-valeur-title">Sécurité</h3>
            <p className="aboutUs-valeur-description">
              La sécurité de nos utilisateurs est notre priorité absolue. Nous mettons en place des mesures strictes pour vérifier les annonces et les utilisateurs.
            </p>
          </div>

          <div className="aboutUs-valeur-card" data-aos="zoom-in">
            <div className="aboutUs-valeur-icon-wrapper">
              <Award className="aboutUs-valeur-icon" />
            </div>
            <h3 className="aboutUs-valeur-title">Excellence</h3>
            <p className="aboutUs-valeur-description">
              Nous nous efforçons constamment d'améliorer notre plateforme et nos services pour offrir la meilleure expérience possible à nos utilisateurs.
            </p>
          </div>
        </div>
      </section>
      <div className="aboutUs-text-centre">
        <h2 className="aboutUs-centre-title">Notre équipe</h2>
        <p className="aboutUs-centre-texte">CampusHaven est composé d'une équipe passionnée d'anciens étudiants, de développeurs et d'experts en immobilier qui comprennent les défis du logement étudiant.</p>

      </div>
      <div className="aboutUs-team-section">
      {teamMembers.map((member, index) => (
        <div className="aboutUs-team-card"  key={index}  data-aos="zoom-in" data-aos-delay={index * 100}> 
          <img
            src={member.image}
            alt={member.name}
            className="aboutUs-team-image"
          />
          <div className="aboutUs-team-info">
            <h3 className="aboutUs-name">{member.name}</h3>
            <p className="aboutUs-role">{member.role}</p>
          </div>
        </div>
      ))}
      </div>
      <section className="aboutUs-impact">
        <h2 className="aboutUs-impact-title">Notre impact</h2>
        <p className="aboutUs-impact-subtitle">
          Nous sommes fiers de l'impact positif que nous avons sur la vie des étudiants et des propriétaires.
        </p>

        <div className="aboutUs-impact-stats">
          <div className="aboutUs-impact-card">
            <div className="aboutUs-impact-number">100 000+</div>
            <div className="aboutUs-impact-label">Étudiants logés</div>
          </div>
          <div className="aboutUs-impact-card">
            <div className="aboutUs-impact-number">50+</div>
            <div className="aboutUs-impact-label">Villes universitaires</div>
          </div>
          <div className="aboutUs-impact-card">
            <div className="aboutUs-impact-number">30 000+</div>
            <div className="aboutUs-impact-label">Colocations formées</div>
          </div>
        </div>
        <div className="aboutUs-impact-testimonials">
        <h3 className="aboutUs-testimonial-title">Témoignages</h3>
        <div className="aboutUs-testimonial-row">

          <div className="aboutUs-testimonial-card">
          <div className="aboutUs-testimonial-content">
            <div className="aboutUs-testimonial-bar" />
          <div>
            <p className="aboutUs-testimonial-text">
              "Grâce à CampusHaven, j'ai trouvé un appartement abordable à 10 minutes de mon campus et un colocataire avec qui je m'entends parfaitement. Le processus était simple et rapide!"
            </p>
            <p className="aboutUs-testimonial-author">– Marie D., étudiante en droit</p>
          </div>
        </div>
      </div>

      <div className="aboutUs-testimonial-card">
        <div className="aboutUs-testimonial-content">
          <div className="aboutUs-testimonial-bar" />
          <div>
            <p className="aboutUs-testimonial-text">
              "En tant que propriétaire, CampusHaven m'a permis de trouver des locataires fiables rapidement. La plateforme est intuitive et l'équipe de support est toujours disponible."
            </p>
            <p className="aboutUs-testimonial-author">– Pierre M., propriétaire</p>
          </div>
        </div>
      </div>

    </div>
  </div>
      </section>
      <section className="aboutUs-cta-section">
        <h2 className="aboutUs-cta-title">Rejoignez la communauté CampusHaven</h2>
        <p className="aboutUs-cta-subtitle">
          Que vous soyez étudiant à la recherche d'un logement ou propriétaire souhaitant louer à des étudiants, CampusHaven est là pour vous.
        </p>
        <div className="aboutUs-cta-buttons">
          <button className="aboutUs-btn-primary">S'inscrire maintenant</button>
          <button className="aboutUs-btn-secondary">Nous contacter</button>
        </div>
      </section>
      <div>
      < Footer />
</div>

</div>
   
    
  );
};

export default AboutUs;
