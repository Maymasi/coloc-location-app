import React, { useState, useEffect  } from 'react';
import '../../assets/styles/PrivacyPolicy.css';
import { GrCircleInformation } from "react-icons/gr";
import { BsPerson } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import { BsShield } from "react-icons/bs";
import { BsCheck2Circle } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { PiLockKeyOpenDuotone } from "react-icons/pi";

export default function PrivacyTOC({ currentTab }) {
  const [activeId, setActiveId] = useState('');
  const items = [
    { id: 'aperçu', label: 'Aperçu de notre politique',icon:<GrCircleInformation/> },
    { id: 'collecte', label: 'Collecte des données',icon:<BsPerson /> },
    { id: 'utilisation', label: 'Utilisation des données',icon:<BsFileEarmarkText/>},
    { id: 'partage', label: 'Partage des données',icon:<BsPerson/> },
    { id: 'sécurité', label: 'Sécurité des données',icon:<BsShield/> },
    { id: 'cookies', label: 'Cookies ',icon:<BsFileEarmarkText/> },
    { id: 'droits', label: 'Vos droits',icon:<BsCheck2Circle/> },
    { id: 'modifications', label: 'Modifications de la politique',icon:<BsClock/> },
    { id: 'contact', label: 'Contact',icon:<BsPerson/> },
  ];

  const handleClick = (id) => {
    setActiveId(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      items.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          if (sectionTop <= 100) {
            current = item.id;
          }
        }
      });
      setActiveId((prev) => (prev !== current ? current : prev));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="privacy-sidebar-toc">
      <h3 className="section-title1-toc"><GrCircleInformation className='icon-toc' />Table des matières</h3>
      <nav className="privacy-toc">
          <ul>
            {items.map((item) => (
            <li key={item.id}>
               <button
                  className={`toc-link ${activeId === item.id ? 'active' : ''}`}
                  onClick={() => currentTab === 'complète' && handleClick(item.id)}
                  disabled={currentTab !== 'complète'}
                >
                   <span className="icon-toc">{item.icon}</span> {item.label}
               </button>
          </li>
           ))}
         </ul>
         <div className="privacy-help-box-toc">
             <strong><PiLockKeyOpenDuotone className="icon-box-toc" />Besoin d'aide?</strong>
              <p>Si vous avez des questions concernant notre politique de confidentialité, n'hésitez pas à nous contacter.</p>
              <button className="contact-button-toc">Contactez-nous</button>
          </div>
       </nav>
    </div>
    
  );
}
