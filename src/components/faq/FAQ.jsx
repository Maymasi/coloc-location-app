import React, { useState } from 'react';
import '../../index.css'; // pour index.css
import '../../assets/styles/Faq.css'; // pour Faq.css
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const FAQ = () => {
    const [activeTab, setActiveTab] = useState('Général');

    const faqData = {
        'Général': [
            { 
                question: "Qu'est-ce que ColocMeak?", 
                answer: "ColocMeak est une plateforme dédiée au logement étudiant qui met en relation les étudiants à la recherche d'un logement avec des propriétaires proposant des biens à louer.",
                categories: { 'Général': true, 'Colocation': true } 
            },
            { 
                question: "Comment fonctionne ColocMeak?", 
                answer: "Notre plateforme permet aux étudiants de trouver des logements adaptés à leurs besoins et aux propriétaires de gérer facilement leurs annonces.",
                categories: { 'Général': true, 'Colocation': true } 
            },
            { 
                question: "L'inscription est-elle gratuite?", 
                answer: "Oui, l'inscription et l'utilisation de base de ColocMeak sont totalement gratuites pour les étudiants.",
                categories: { 'Général': true, 'Colocation': true } 
            },
            { 
                question: "Comment puis-je contacter le support?", 
                answer: "Vous pouvez contacter notre support via le formulaire de contact ou par email à support@ColocMeak.com.",
                categories: { 'Général': true, 'Colocation': true } 
            },
            { 
                question: "ColocMeak est-il disponible dans ma ville?", 
                answer: "ColocMeak est disponible dans toutes les villes universitaires de France. Consultez notre carte pour voir les disponibilités.",
                categories: { 'Général': true, 'Colocation': true } 
            }
        ],
        'Étudiants': [
            { 
                question: "Comment trouver un logement sur ColocMeak?", 
                answer: "Utilisez nos filtres avancés pour trouver des logements qui correspondent à vos critères de localisation, de budget et de type de logement.",
                categories: { 'Étudiants': true } 
            },
            { 
                question: "Comment contacter un propriétaire?", 
                answer: "Une fois inscrit, vous pouvez envoyer des messages directement aux propriétaires via notre messagerie sécurisée.",
                categories: { 'Étudiants': true } 
            },
            { 
                question: "Comment trouver un colocataire?", 
                answer: "Notre section colocation vous permet de rechercher des profils compatibles selon vos critères de vie.",
                categories: { 'Étudiants': true } 
            },
            { 
                question: "Les logements sont-ils vérifiés?", 
                answer: "Toutes nos annonces passent par un processus de vérification avant publication.",
                categories: { 'Étudiants': true } 
            },
            { 
                question: "Comment signaler un problème avec une annonce?", 
                answer: "Chaque annonce dispose d'un bouton 'Signaler' qui vous permet de nous alerter sur tout contenu inapproprié.",
                categories: { 'Étudiants': true } 
            }
        ],
        'Propriétaires': [
            { 
                question: "Comment publier une annonce?", 
                answer: "Dans votre espace propriétaire, cliquez sur 'Créer une annonce' et remplissez les informations requises.",
                categories: { 'Propriétaires': true } 
            },
            { 
                question: "Quels documents fournir pour une annonce?", 
                answer: "Nous demandons généralement un justificatif de propriété et une pièce d'identité pour vérifier les annonces.",
                categories: { 'Propriétaires': true } 
            },
            { 
                question: "Comment gérer les demandes de visite?", 
                answer: "Notre calendrier intégré vous permet de planifier facilement les visites avec les étudiants intéressés.",
                categories: { 'Propriétaires': true } 
            },
            { 
                question: "Quelles sont les obligations légales?", 
                answer: "Nous fournissons un guide complet des obligations légales pour la location étudiante dans votre espace propriétaire.",
                categories: { 'Propriétaires': true } 
            },
            { 
                question: "Comment fixer le prix de mon logement?", 
                answer: "Notre outil d'analyse de marché vous aide à déterminer un prix compétitif en fonction de votre localisation et des caractéristiques du logement.",
                categories: { 'Propriétaires': true } 
            }
        ],
        'Colocation': [
            { 
                question: "Comment trouver des colocataires compatibles?", 
                answer: "Notre algorithme de matching analyse les profils et suggère les colocataires les plus compatibles avec vos habitudes de vie.",
                categories: { 'Colocation': true } 
            },
            { 
                question: "Comment créer une annonce de colocation?", 
                answer: "Rendez-vous dans la section colocation et remplissez le formulaire en décrivant votre logement et vos attentes.",
                categories: { 'Colocation': true } 
            },
            { 
                question: "Quels sont les avantages fiscaux?", 
                answer: "La colocation peut ouvrir droit à des réductions fiscales comme la loi Coluche ou la loi Pinel sous certaines conditions.",
                categories: { 'Colocation': true } 
            },
            { 
                question: "Comment gérer les charges en colocation?", 
                answer: "Notre espace colocation propose un outil de gestion des charges partagées pour faciliter le suivi des dépenses communes.",
                categories: { 'Colocation': true } 
            },
            { 
                question: "Que faire en cas de conflit entre colocataires?", 
                answer: "Nous proposons un service de médiation pour aider à résoudre les conflits entre colocataires.",
                categories: { 'Colocation': true } 
            }
        ]
    };

    const categories = ['Général', 'Étudiants', 'Propriétaires', 'Colocation'];

    return (
        <>
            <div className="faq-container">
                    <div className="faq-header">
                        <h1 className="faq-title">Foire Aux Questions</h1>
                        <Typography variant="body1" className="faq-description">
                            Trouvez des réponses aux questions les plus fréquemment posées sur ColocMeak
                        </Typography>
                    </div>

                    <div className="faq-tabs-custom" >
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={`faq-tab-custom ${activeTab === category ? 'active' : ''}`}
                            
                            onClick={() => setActiveTab(category)}
                            >
                                {category}
                        </button>
                    ))}
                </div>


                    <div className="faq-accordion-container">
                        {faqData[activeTab].map((item, index) => (
                            <Accordion key={index} className="faq-accordion">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                    <Typography component="span" fontWeight="medium">
                                        {item.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component="div" variant="body2">
                                        {item.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                    <div className="contact-support-faq">
                    <h2 className="contact-title-faq">Vous n'avez pas trouvé de réponse à votre question?</h2>
                    <p className="contact-description-faq">
                        Notre équipe de support est disponible pour vous aider avec toute question supplémentaire que vous pourriez avoir.
                    </p>
                    <div className="contact-actions-faq">
                        <button className="contact-button-faq">Contactez-nous</button>
                        <button className="contact-email-faq">support@ColocMeak.com</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQ;