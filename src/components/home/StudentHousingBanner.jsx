import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function StudentHousingBanner () {
    const navigate = useNavigate();
    return (
        <section className="student-housing-banner">
        <div className="banner-content" data-aos="fade-right">
            <span className="limited-offer">
            <Sparkles size={"16px"}/>
            Offre limitée
            </span>
            <h1>
            Prêt à trouver votre logement <br /> étudiant idéal ?
            </h1>
            <p>
            Rejoignez des milliers d’étudiants qui ont trouvé leur logement et leurs colocataires idéaux avec CampusHaven. 
            Inscrivez-vous dès aujourd'hui et bénéficiez de 50% de réduction sur votre premier mois de loyer !
            </p>
        </div>
        <div className="banner-buttons" data-aos="fade-left">
            <button className="btn-primary" onClick={()=>navigate("/Register")} style={{backgroundColor:"white !important"}}>S’inscrire</button>
            <button className="btn-secondary" onClick={()=>navigate("/annonces")}>Voir les annonces</button>
        </div>
        </section>
    );
}
