import React,{ useRef } from "react";
import "../../assets/styles/PolitiquePage.css";
import PrivacyPolicy from "./PrivacyPolicy";
import Nav from "../home/Nav";
import Questions from "./Questions";
import Footer from "../common/Footer";
import ScrollToTopButton from "./ScrollToTopButton";
const PolitiquePage = () => {
    const privacyRef = useRef(null);

    const scrollToPrivacy = () => {
        privacyRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    return(
        <div>
            <Nav/>
            <section className="about-section-Politique" >
                <div className="about-container-Politique">
                    <h1 className="about-title-Politique">
                        Politique de Confidentialité
                    </h1>
                    <p className="about-text-Politique">
                        Chez CampusHaven, nous prenons la protection de vos données personnelles très au sérieux. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
                    </p>
                    <div className="update-info-Politique">
                        <div className="info-item-Politique">
                            <i className="fas fa-clock"></i>
                            <span>Dernière mise à jour : 27 avril 2024</span>
                        </div>
                        <div className="info-item-Politique">
                            <i className="fas fa-file-alt"></i>
                            <span>Version : 2.1</span>
                        </div>
                    </div>
                    <span className="about-tag-Politique" onClick={scrollToPrivacy} style={{ cursor: "pointer" }}>Commencer la lecture</span>
                </div>
            </section>
            <div ref={privacyRef}>
                <PrivacyPolicy />
            </div>
            <div>
                <Questions/>
            </div>
            <div>
                <Footer />
            </div>
            <ScrollToTopButton />
        </div>
    );
};
export default PolitiquePage;