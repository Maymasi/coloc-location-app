import { House, UsersRound, Building2 } from 'lucide-react';
export default function WhyChose(){
    return (
        <div className='whyContainer' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"10px",background:"linear-gradient(to bottom,rgb(255, 255, 255),rgb(255, 252, 252))",margin:"70px 0px"}}>
            <div className="bigTitle">Pourquoi choisir ColocMeak</div>
            <div className="shortDescrip">Nous rendons la recherche de logement étudiant et de colocataires simple, sûre et sans stress</div>
            <div className="cards" >
                <div className="cardHome whycard" data-aos="fade-up" data-aos-delay="0">
                    <div className="iconCard">
                        <House/>
                    </div>
                    <div className="titleProcessCard">Annonces vérifiées</div>
                    <div className="descripProcessCard">Toutes les propriétés sont soigneusement vérifiées pour garantir la qualité, la sécurité et l’exactitude des informations.</div>
                </div>
                <div className="cardHome whycard" data-aos="fade-up" data-aos-delay="150">
                    <div className="iconCard">
                        <UsersRound/>
                    </div>
                    <div className="titleProcessCard">Appariement de colocataires</div>
                    <div className="descripProcessCard">Notre système intelligent vous aide à trouver des colocataires compatibles selon votre mode de vie et vos préférences.</div>
                </div>
                <div className="cardHome whycard" data-aos="fade-up" data-aos-delay="300">
                    <div className="iconCard">
                        <Building2 />
                    </div>
                    <div className="titleProcessCard">Proximité du campus</div>
                    <div className="descripProcessCard">Trouvez des logements idéalement situés près des établissements éducatifs et des commodités étudiantes.</div>
                </div>
            </div>
        </div>
    );
}
