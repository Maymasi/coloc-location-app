import React, { useState }  from 'react';
import '../../assets/styles/PrivacyPolicy.css';
import { GrCircleInformation } from "react-icons/gr";
import { BsPerson } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import { BsShield } from "react-icons/bs";
import { BsCheck2Circle } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import PrivacyTOC from './PrivacyTOC';

export default function PrivacyPolicy() {
  const [activeTab, setActiveTab] = useState('complète');

  const tabs = ['complète', 'simplifiée', 'technique'];

  return (
     <div className="privacy-wrapper">
    
        <PrivacyTOC currentTab={activeTab} />
     
     <div className="privacy-container">
      {/* Onglets */}
      <div className="privacy-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`privacy-tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            Version {tab}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="privacy-content">
         {activeTab === 'complète' && (
          <>
            <section className="privacy-section1" id="aperçu">
              <h2 className="privacy-section-title">
              <GrCircleInformation className='icon' />
                Aperçu de notre politique
              </h2>
              <p>
                 Bienvenue sur la page de politique de confidentialité de CampusHaven. Cette politique s'applique à tous les utilisateurs de notre plateforme, qu'ils soient étudiants, propriétaires ou visiteurs. Nous nous engageons à protéger vos informations personnelles et à être transparents sur la façon dont nous les utilisons.
              </p>
              <p>
                 CampusHaven est une plateforme qui met en relation des étudiants à la recherche de logements et de colocataires avec des propriétaires proposant des logements adaptés aux besoins des étudiants. Pour fournir ces services, nous avons besoin de collecter et de traiter certaines informations vous concernant.
              </p>
            </section>

            <section className="privacy-section1" id="collecte">
              <h2 className="privacy-section-title">
                <BsPerson  className='icon' />
                Collecte des données
              </h2>
              <p>Nous collectons les types d'informations suivants :</p>
              <ul>
                <li><strong>Informations d'identification :</strong> nom, prénom, adresse e-mail, numéro de téléphone, photo de profil.</li>
                <li><strong>Informations académiques :</strong> établissement d'enseignement, niveau d'études, domaine d'études.</li>
                <li><strong>Préférences de logement :</strong>type de logement recherché, budget, durée de séjour, préférences de colocation.</li>
                <li><strong>Informations de paiement :</strong>coordonnées bancaires (uniquement pour les transactions).</li>
                <li><strong>Données d'utilisation :</strong>comment vous interagissez avec notre plateforme, les pages que vous visitez, les fonctionnalités que vous utilisez.</li>
              </ul>
              <p>Nous collectons ces informations lorsque vous créez un compte, complétez votre profil, publiez une annonce, effectuez une recherche, interagissez avec d'autres utilisateurs ou utilisez nos services de paiement.</p>
            </section>

            <section className="privacy-section1" id="utilisation">
              <h2 className="privacy-section-title">
                <BsFileEarmarkText className='icon'/>
                Utilisation des données
              </h2>
              <p>Nous utilisons vos données personnelles pour :</p>
              <ul>
                <li>Fournir et améliorer nos services</li>
                <li>Personnaliser votre expérience sur notre plateforme</li>
                <li>Faciliter la mise en relation entre étudiants et propriétaires</li>
                <li>Traiter les paiements et gérer les transaction </li>
                <li>Assurer la sécurité de notre plateforme </li>
                <li>Communiquer avec vous concernant votre compte et nos services</li>
                <li>Vous envoyer des informations marketing (avec votre consentement)</li>
                <li>Respecter nos obligations légales </li>
              </ul>
              <p>Nous ne conservons vos données que pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, sauf obligation légale de conservation plus longue.</p>
            </section>
            <section className="privacy-section1" id="partage">
              <h2 className="privacy-section-title">
                 <BsPerson  className='icon' />
                   Partage des données
              </h2>
              <p>Nous pouvons partager vos informations avec :</p>
              <ul>
                <li><strong>Autres utilisateurs :</strong> certaines informations de votre profil sont visibles par d'autres utilisateurs pour faciliter la mise en relation.</li>
                <li><strong>Prestataires de services : </strong> nous travaillons avec des entreprises qui nous aident à fournir nos services (paiement, hébergement, analyse, etc.).</li>
                <li><strong>Partenaires :</strong> nous pouvons partager des données agrégées et anonymisées avec nos partenaires commerciaux.</li>
                <li><strong>Autorités :</strong> nous pouvons divulguer vos informations si la loi l'exige ou pour protéger nos droits ou ceux d'autrui.</li>
              </ul>
              <p>Nous ne vendons pas vos données personnelles à des tiers. Lorsque nous partageons vos données avec des prestataires de services, nous nous assurons qu'ils respectent des normes strictes de confidentialité et de sécurité.</p>
            </section>
            <section className="privacy-section1" id="sécurité">
              <h2 className="privacy-section-title">
               <BsShield className='icon' />
                 Sécurité des données
              </h2>
              <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'accès non autorisé, la divulgation, l'altération ou la destruction. Ces mesures comprennent :</p>
              <ul>
                <li>Le chiffrement des données sensibles</li>
                <li>Des contrôles d'accès stricts</li>
                <li>Des audits de sécurité réguliers</li>
                <li>La formation de notre personnel aux bonnes pratiques de sécurité </li>
                <li>Des plans de réponse aux incidents</li>
              </ul>
              <p>Bien que nous prenions toutes les précautions raisonnables, aucun système n'est totalement sécurisé. Si vous avez des raisons de croire que votre interaction avec nous n'est plus sécurisée, veuillez nous contacter immédiatement.</p>
            </section>
            <section className="privacy-section1" id="cookies">
              <h2 className="privacy-section-title">
                <BsFileEarmarkText className='icon'/>
                 Cookies et technologies similaires
              </h2>
              <p>Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre plateforme, comprendre comment vous l'utilisez et personnaliser nos services.</p>
              <p>Nous utilisons différents types de cookies :</p>
              <ul>
                <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement de notre site.</li>
                <li><strong>Cookies de performance :</strong>nous aident à comprendre comment les utilisateurs interagissent avec notre site.</li>
                <li><strong>Cookies de fonctionnalité :</strong> permettent de mémoriser vos préférences.</li>
                <li><strong>Cookies de ciblage :</strong>utilisés pour vous montrer des publicités pertinentes.</li>
              </ul>
              <p>Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur ou notre outil de gestion des cookies.</p>
            </section>
            <section className="privacy-section1" id="droits">
              <h2 className="privacy-section-title">
                <BsCheck2Circle className='icon' />
                Vos droits
              </h2>
              <p>En tant qu'utilisateur de CampusHaven, vous disposez de certains droits concernant vos données personnelles :</p>
              <ul>
                <li><strong>Droit d'accès :</strong>vous pouvez demander une copie des données personnelles que nous détenons à votre sujet.</li>
                <li><strong>Droit de rectification :</strong>vous pouvez demander la correction de données inexactes ou incomplètes.</li>
                <li><strong>Droit à l'effacement :</strong>vous pouvez demander la suppression de vos données dans certaines circonstances.</li>
                <li><strong>Droit à la limitation du traitement : </strong> vous pouvez demander que nous limitions le traitement de vos données.</li>
                <li><strong>Droit à la portabilité des données :</strong> vous pouvez demander le transfert de vos données à un autre service.</li>
                <li><strong>Droit d'opposition :</strong> vous pouvez vous opposer au traitement de vos données à des fins de marketing direct.</li>
              </ul>
              <p>Pour exercer ces droits, veuillez nous contacter via notre formulaire de contact ou à l'adresse privacy@campushaven.com. Nous répondrons à votre demande dans un délai d'un mois.</p>
            </section>
            <section className="privacy-section1" id="modifications">
              <h2 className="privacy-section-title">
               <BsClock className='icon' />
                Modifications de la politique
              </h2>
              <p>
                 Nous pouvons mettre à jour cette politique de confidentialité de temps à autre pour refléter les changements dans nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires.
              </p>
              <p>
                 En cas de modifications importantes, nous vous en informerons par e-mail ou par une notification sur notre site avant que les changements ne prennent effet. Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des dernières informations sur nos pratiques de confidentialité.
              </p>
              <p>
                 L'utilisation continue de nos services après la publication des modifications constitue votre acceptation de ces modifications.
              </p>
            </section>
            <section className="privacy-section1" id="contact">
              <h2 className="privacy-section-title">
                <BsPerson  className='icon' />
                Contact
              </h2>
              <p>Si vous avez des questions, des préoccupations ou des demandes concernant cette politique de confidentialité ou le traitement de vos données personnelles, veuillez nous contacter :</p>
              <ul>
                <li><strong>Par e-mail :</strong>privacy@campushaven.com</li>
                <li><strong>Par courrier :</strong>CampusHaven, 123 Campus Avenue, University District, 75001 Paris, France</li>
                <li><strong>Via notre formulaire de contact :</strong><a href="/contact" class="text-primary hover:underline">Formulaire de contact</a></li>
              </ul>
              <p>Notre Délégué à la Protection des Données (DPO) peut être contacté à l'adresse dpo@campushaven.com.</p>
              <p>
                 Si vous n'êtes pas satisfait de notre réponse, vous avez le droit de déposer une plainte auprès de l'autorité de protection des données de votre pays de résidence.
              </p>
            </section>
          </>
        )}

        {activeTab === 'simplifiée' && (
          <div className="privacy-container1">
            <div className="privacy-info-banner">
               <p>Cette version simplifiée résume les points clés de notre politique de confidentialité. Pour plus de détails, veuillez consulter la version complète.</p>
            </div>
      
            <div className="privacy-info-card">
              <div>
                <h2 className="privacy-card-title"><BsPerson  className='privacy-icon-card' />Ce que nous collectons</h2>
                <p className="privacy-card-text">
                  Vos informations personnelles (nom, email), vos préférences de logement,
                  et comment vous utilisez notre site.
                </p>
              </div>
            </div>
      
            <div className="privacy-info-card">
              <div>
                <h2 className="privacy-card-title"> <BsFileEarmarkText className='privacy-icon-card'/>Comment nous l'utilisons</h2>
                <p className="privacy-card-text">
                  Pour vous aider à trouver un logement ou des colocataires,
                  améliorer nos services et vous contacter.
                </p>
              </div>
            </div>
            <div className="privacy-info-card">
              <div>
                <h2 className="privacy-card-title"><BsShield className='privacy-icon-card' />Comment nous protégeons vos données</h2>
                <p className="privacy-card-text">
                   Nous utilisons des mesures de sécurité avancées pour protéger vos informations contre tout accès non autorisé.
                </p>
              </div>
            </div>
            <div className="privacy-info-card">
              <div>
                <h2 className="privacy-card-title"><BsCheck2Circle className='privacy-icon-card' />Vos droits</h2>
                <p className="privacy-card-text">
                   Vous pouvez accéder à vos données, les modifier ou les supprimer. Contactez-nous pour exercer ces droits.
                </p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'technique' && (
          <div className="privacy-container2">
             <div className="privacy-info-banner">
                 <p>Cette version technique détaille les aspects plus techniques de notre traitement des données. Elle est destinée aux utilisateurs qui souhaitent comprendre en profondeur nos pratiques.</p>
              </div>
            <section className="privacy-section-container2">
              <h2 className="privacy-section-title-container2">
              1. Base juridique du traitement
              </h2>
              <p>Nous traitons vos données personnelles sur les bases juridiques suivantes, conformément au RGPD :</p>
              <ul>
                <li>Exécution d'un contrat (Article 6(1)(b) du RGPD)</li>
                <li>Consentement (Article 6(1)(a) du RGPD)</li>
                <li>Intérêts légitimes (Article 6(1)(f) du RGPD)</li>
                <li>Obligation légale (Article 6(1)(c) du RGPD)</li>
              </ul>
            </section>
            <section className="privacy-section-container2">
              <h2 className="privacy-section-title-container2">
               2. Transferts internationaux de données
              </h2>
              <p>Nos serveurs sont principalement situés dans l'Union européenne. Toutefois, certains de nos prestataires de services peuvent être situés en dehors de l'EEE. Dans ce cas, nous nous assurons que des garanties appropriées sont en place, telles que des clauses contractuelles types approuvées par la Commission européenne.</p>
            </section>
            <section className="privacy-section-container2">
              <h2 className="privacy-section-title-container2">
              3. Période de conservation des données
              </h2>
              <p>Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités pour lesquelles elles ont été collectées, sauf si une période de conservation plus longue est requise ou permise par la loi</p>
              <ul>
                <li>Données de compte : conservées tant que votre compte est actif</li>
                <li>Données de transaction : conservées pendant 10 ans conformément aux obligations légales</li>
                <li>Données de navigation : conservées pendant 13 mois maximum</li>
              </ul>
            </section>
            <section className="privacy-section-container2">
              <h2 className="privacy-section-title-container2">
              4. Mesures de sécurité techniques
              </h2>
              <p>Nos mesures de sécurité techniques comprennent :</p>
              <ul>
                <li>Chiffrement TLS pour toutes les communications</li>
                <li>Hachage des mots de passe avec des algorithmes robustes</li>
                <li>Authentification à deux facteurs</li>
                <li>Surveillance continue des systèmes</li>
                <li>Tests de pénétration réguliers</li>
              </ul>
            </section>
            <section className="privacy-section-container2">
              <h2 className="privacy-section-title-container2">
                5. Sous-traitants
              </h2>
              <p>Nous travaillons avec plusieurs sous-traitants qui nous aident à fournir nos services. Voici les principales catégories :</p>
              <ul>
                <li>Hébergement et infrastructure cloud</li>
                <li>Services de paiement</li>
                <li>Outils d'analyse et de statistiques</li>
                <li>Services de messagerie électronique</li>
                <li>Services de support client</li>
              </ul>
            </section>
            <section className="privacy-section-container2">
              <h2 className="privacy-section-title-container2">
               6. Cookies techniques
              </h2>
              <p>Voici les détails techniques des cookies que nous utilisons :</p>
              <ul>
                <li>Cookies de session : _ch_session (durée : session)</li>
                <li>Cookies d'authentification : _ch_auth (durée : 30 jours)</li>
                <li>Cookies de préférences : _ch_prefs (durée : 1 an)</li>
                <li>Cookies d'analyse : _ga, _gid (durée : 13 mois)</li>
              </ul>
            </section>
           </div>
           
        )}
      </div>
    </div>
     </div>
  );
}
