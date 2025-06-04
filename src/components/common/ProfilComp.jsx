import { BookHeart,BedDouble,Users,Mail,Phone} from 'lucide-react';
import "../../assets/styles/common/profilComp.css"
export default function ProfilComp() {
    return (
        <div className="profil-data">
            <div className="header-profil">
                <h2>Mon Profil</h2>
            </div>
            <div className="content-profil">
                <div className="about-me cardProfil">
                    <div className="title">À propos de moi</div>
                    <div className="content">
                        Étudiant calme, passionné par le développement web et les jeux vidéo occasionnels.
                    </div>
                </div>
                <div className="lifeStyle cardProfil">
                    <div className="title">Style de vie</div>

                    <div className="Sommeil">
                        <div className="icon"><BedDouble /></div>
                        <div className="texts">
                            <div className="label">Sommeil </div>
                            <div className="desc">Nocture</div>
                        </div>
                    </div>

                    <div className="Proprete">
                        <div className="icon"><BookHeart /></div>
                        <div className="texts">
                            <div className="label">Propreté</div>
                            <div className="desc">Ordonné</div>
                        </div>
                    </div>

                    <div className="Sociabilite">
                        <div className="icon"><Users /></div>
                        <div className="texts">
                            <div className="label">Sociabilité</div>
                            <div className="desc">Réservé</div>
                        </div>
                    </div>

                </div>
                <div className="data cardProfil">
                       <div className="title">
                            Coordonnées
                        </div>
                        <div className="Coordonnees">
                            <div className="email">
                                <div className="icon"><Mail /></div>
                                <div className="texts">
                                    <div className="label">E-mail</div>
                                    <div className="desc">0616944201</div>
                                </div>
                            </div>
                            <div className="phone">
                                <div className="icon"><Phone /></div>
                                <div className="texts">
                                    <div className="label">Téléphone</div>
                                    <div className="desc">0616944201</div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}
