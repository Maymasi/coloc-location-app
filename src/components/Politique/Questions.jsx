import React from "react";
import "../../assets/styles/PolitiquePage.css";

const Questions = () => {
  return (
    <div>
      <section className="Questions-Politique">
        <div className="Questions-container-Politique">
          <h1 className="Questions-title-Politique">
            Questions fréquentes
          </h1>
          <p className="Questions-text-Politique">
            Vous avez des questions sur notre politique de confidentialité ? Consultez nos réponses aux questions les plus fréquemment posées.
          </p>

          <div className="Questions-list-Politique">
            <div className="Question1-4">
              <div>
                <h2>Comment puis-je accéder à mes données personnelles ?</h2>
                <p>
                  Vous pouvez accéder à la plupart de vos données personnelles directement depuis votre compte dans la section 'Paramètres &gt; Confidentialité'. Pour une demande d'accès complète, contactez-nous à privacy@campushaven.com.
                </p>
              </div>
            </div>

            <div className="Question1-4">
              <div>
                <h2>Comment puis-je supprimer mon compte ?</h2>
                <p>
                  Vous pouvez supprimer votre compte dans la section 'Paramètres &gt; Compte &gt; Supprimer mon compte'. La suppression de votre compte entraînera la suppression de vos données personnelles, à l'exception de celles que nous devons conserver pour des raisons légales.
                </p>
              </div>
            </div>
            <div className="Question1-4">
              <div>
                <h2>Partagez-vous mes données avec des tiers ?</h2>
                <p>
                  Nous partageons certaines de vos données avec d'autres utilisateurs pour faciliter la mise en relation. Nous travaillons également avec des prestataires de services qui nous aident à fournir nos services. Nous ne vendons pas vos données personnelles à des tiers.
                </p>
              </div>
            </div>
            <div className="Question1-4">
              <div>
                <h2>Comment puis-je me désabonner des emails marketing ?</h2>
                <p>
                Vous pouvez vous désabonner des emails marketing en cliquant sur le lien de désabonnement présent dans chaque email ou en modifiant vos préférences de communication dans la section 'Paramètres &gt; Notifications'.
                </p>
              </div>
            </div>
            <div className="Question1-4">
              <div>
                <h2>Combien de temps conservez-vous mes données ?</h2>
                <p>
                   Nous conservons vos données aussi longtemps que nécessaire pour fournir nos services ou pour respecter nos obligations légales. La durée de conservation varie selon le type de données et est détaillée dans notre politique de confidentialité.
                </p>
              </div>
            </div>
          </div>
           <p className="Questions-text1-Politique">
              Vous ne trouvez pas la réponse à votre question ? Contactez-nous directement.
           </p>
           <a href="/contact">
             <button className="Question-Button-Contacte">
                Contactez-nous
             </button>
           </a>
        </div>
      </section>
    </div>
  );
};

export default Questions;
