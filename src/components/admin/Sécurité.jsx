import React, { useState } from 'react';
import '../../assets/styles/Sécurité.css';
import { AlertTriangle, Ban, ShieldCheck, XCircle, ChevronDown,Shield } from 'lucide-react';
import { FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { AiTwotoneUnlock } from "react-icons/ai";
const SecurityStatus = ({ label, status }) => {
  const statusClass = {
    Actif: 'status-badge green',
    Partiel: 'status-badge yellow',
  };

  return (
    <div className="security-row">
      <div className="security-label">
        <span className={`security-status-dot ${status.toLowerCase()}`}></span>
        {label}
      </div>
      <div className={statusClass[status]}>{status.toUpperCase()}</div>
    </div>
  );
};

const RecentActivity = ({ icon, message, timestamp, iconColor }) => (
  <div className="security-activity-row">
    <div className={`security-activity-icon ${iconColor}`}>{icon}</div>
    <div className="security-activity-content">
      <p className="security-activity-message" dangerouslySetInnerHTML={{ __html: message }}></p>
      <p className="security-activity-time">{timestamp}</p>
    </div>
  </div>
);

const CustomSelect = ({ options, defaultValue }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0]);

  return (
    <div className="security-custom-select-wrapper" onClick={() => setOpen(!open)}>
      <div className="security-custom-select-display">
        {selected} <ChevronDown size={14} />
      </div>
      {open && (
        <ul className="security-custom-select-options">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Sécurité = () => {
  const [tab, setTab] = useState('vue');

  const [toggleStates, setToggleStates] = useState({
    twoFA: true,
    lockAccount: false,
    uppercase: true,
    numbers: false,
    specialChars: false,
    alertConnexion: true,
    alertFails: false,
    alertPassword: true,
  });

  const toggle = (key) => {
    setToggleStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="sécurité-container">
      <div className="security-header-section">
        <div className="security-header-text">
          <h1>Sécurité</h1>
          <p>Gérez les paramètres de sécurité de la plateforme</p>
        </div>
        <button className="security-alert-button">
          <ShieldCheck size={17} /> Tester les alertes
        </button>
      </div>

      <div className="security-tabs">
        <button className={`security-tab ${tab === 'vue' ? 'active' : ''}`} onClick={() => setTab('vue')}>Vue d'ensemble</button>
        <button className={`security-tab ${tab === 'paramètres' ? 'active' : ''}`} onClick={() => setTab('paramètres')}>Paramètres</button>
        <button className={`security-tab ${tab === 'journaux' ? 'active' : ''}`} onClick={() => setTab('journaux')}>Journaux</button>
      </div>

      {tab === 'vue' && (
        <>
          <div className="sécurité-content">
            <div className="security-left-panel">
              <h2>État de la sécurité</h2>
              <p>Vue d'ensemble de la sécurité de la plateforme</p>
              <SecurityStatus label="Protection contre les attaques DDoS" status="Actif" />
              <SecurityStatus label="Pare-feu d'application Web" status="Actif" />
              <SecurityStatus label="Authentification à deux facteurs" status="Actif" />
              <SecurityStatus label="Analyse des vulnérabilités" status="Partiel" />
            </div>

            <div className="security-right-panel">
              <h2>Activité récente</h2>
              <p className="security-subtext">Derniers événements de sécurité</p>
              <RecentActivity
                icon={<AlertTriangle size={20} />}
                iconColor="yellow"
                message={"Tentatives de connexion multiples échouées pour l'utilisateur john.smith@example.com"}
                timestamp="Il y a 2 heures"
              />
              <RecentActivity
                icon={<XCircle size={20} />}
                iconColor="red"
                message={"Compte suspendu pour activité suspecte : robert.wilson@example.com"}
                timestamp="Il y a 5 heures"
              />
              <RecentActivity
                icon={<ShieldCheck size={20} />}
                iconColor="green"
                message={"Analyse de sécurité hebdomadaire terminée avec succès"}
                timestamp="Il y a 12 heures"
              />
              <RecentActivity
                icon={<AlertTriangle size={20} />}
                iconColor="yellow"
                message={"Tentative d'accès non autorisé à l'API détectée"}
                timestamp="Il y a 1 jour"
              />
            </div>
          </div>

          <div className="security-stats-card">
            <h3>Statistiques de sécurité</h3>
            <p className="security-subtitle">Aperçu des métriques de sécurité</p>
            <div className="security-stats-list">
              <div className="security-stat-item">
                <div className="security-stat-header">
                  <span >Tentatives de connexion échouées</span>
                  <span>124 (24h)</span>
                </div>
                <div className="security-progress-bar">
                  <div className="security-progress" style={{ width: '30%' }}></div>
                </div>
                <p className="security-stat-description">30% de moins que la semaine dernière</p>
              </div>

              <div className="security-stat-item">
                <div className="security-stat-header">
                  <span className="security-stat-label">Comptes suspendus</span>
                  <span className="security-stat-value">8 (7j)</span>
                </div>
                <div className="security-progress-bar">
                  <div className="security-progress" style={{ width: '15%' }}></div>
                </div>
                <p className="security-stat-description">15% de plus que la semaine dernière</p>
              </div>

              <div className="security-stat-item">
                <div className="security-stat-header">
                  <span className="security-stat-label">Alertes de sécurité</span>
                  <span className="security-stat-value">12 (24h)</span>
                </div>
                <div className="security-progress-bar">
                  <div className="security-progress" style={{ width: '45%' }}></div>
                </div>
                <p className="security-stat-description">45% de moins que la semaine dernière</p>
              </div>
            </div>
          </div>
        </>
      )}

      {tab === 'paramètres' && (
        <div className="security-parametres-wrapper">
          {/* Auth Section */}
          <div className="security-parametre-section">
            <h2>Paramètres d'authentification</h2>
            <p className="security-subtext">Configurez les options d'authentification</p>

            <div className="security-parametre-item">
              <div className="security-parametre-label">
                <strong>Authentification à deux facteurs</strong><br />
                <span>Exiger l'authentification à deux facteurs</span>
              </div>
              <div
                className={`security-parametre-toggle ${toggleStates.twoFA ? 'active' : 'inactive'}`}
                onClick={() => toggle('twoFA')}
              ></div>
            </div>

            <div className="security-parametre-item">
              <div className="security-parametre-label">
                <strong>Verrouillage de compte</strong><br />
                <span>Verrouiller le compte après plusieurs tentatives échouées</span>
              </div>
              <div
                className={`security-parametre-toggle ${toggleStates.lockAccount ? 'active' : 'inactive'}`}
                onClick={() => toggle('lockAccount')}
              ></div>
            </div>

            <div className="security-parametre-item1">
              <div className="security-parametre-label">Nombre de tentatives avant verrouillage</div>
              <CustomSelect options={['5 tentatives', '3 tentatives', '10 tentatives']} />
            </div>
            <div className="security-parametre-item1">
              <div className="security-parametre-label">Durée du verrouillage</div>
              <CustomSelect options={['30 minutes', '1 heure', '24 heures']} />
            </div>
          </div>

          {/* Password Section */}
          <div className="security-parametre-section">
            <h2>Paramètres de mot de passe</h2>
            <p className="security-subtext">Configurez les exigences de mot de passe</p>

            <div className="security-parametre-item1">
              <div className="security-parametre-label">Longueur minimale du mot de passe</div>
              <CustomSelect options={['8 caractères', '10 caractères', '12 caractères']} />
            </div>

            <div className="security-parametre-item">
              <div className="security-parametre-label">
                <strong>Exiger des lettres majuscules</strong><br />
                <span>Au moins une lettre majuscule</span>
              </div>
              <div
                className={`security-parametre-toggle ${toggleStates.uppercase ? 'active' : 'inactive'}`}
                onClick={() => toggle('uppercase')}
              ></div>
            </div>

            <div className="security-parametre-item">
              <div className="security-parametre-label">
                <strong>Exiger des chiffres</strong><br />
                <span>Au moins un chiffre</span>
              </div>
              <div
                className={`security-parametre-toggle ${toggleStates.numbers ? 'active' : 'inactive'}`}
                onClick={() => toggle('numbers')}
              ></div>
            </div>

            <div className="security-parametre-item">
              <div className="security-parametre-label">
                <strong>Exiger des caractères spéciaux</strong><br />
                <span>Au moins un caractère spécial</span>
              </div>
              <div
                className={`security-parametre-toggle ${toggleStates.specialChars ? 'active' : 'inactive'}`}
                onClick={() => toggle('specialChars')}
              ></div>
            </div>

            <div className="security-parametre-item1">
              <div className="security-parametre-label">Expiration du mot de passe</div>
              <CustomSelect options={['90 jours', '180 jours', '365 jours']} />
            </div>
          </div>

          {/* Notifications */}
          <div className="security-parametre-section1">
            <h2>Notifications de sécurité</h2>
            <p className="security-subtext">Configurez les notifications de sécurité</p>

            <div className="security-parametre-item">
              <div className="security-parametre-label">
                <strong>Alertes de connexion suspecte</strong><br />
                <span>Envoyer une alerte en cas de connexion depuis un nouvel appareil ou emplacement</span>
              </div>
              <div
                className={`security-parametre-toggle ${toggleStates.alertConnexion ? 'active' : 'inactive'}`}
                onClick={() => toggle('alertConnexion')}
              ></div>
            </div>

            <div className="security-parametre-item">
              <div className="security-parametre-label">
                <strong>Alertes de tentatives de connexion échouées</strong><br />
                <span>Envoyer une alerte après plusieurs tentatives de connexion échouées</span>
              </div>
              <div
                className={`security-parametre-toggle ${toggleStates.alertFails ? 'active' : 'inactive'}`}
                onClick={() => toggle('alertFails')}
              ></div>
            </div>

            <div className="security-parametre-item">
              <div className="security-parametre-label">
                <strong>Alertes de modification de mot de passe</strong><br />
                <span>Envoyer une alerte lorsqu'un mot de passe est modifié</span>
              </div>
              <div
                className={`security-parametre-toggle ${toggleStates.alertPassword ? 'active' : 'inactive'}`}
                onClick={() => toggle('alertPassword')}
              ></div>
            </div>

            <div className="security-parametre-item horizontal">
              <div className="security-parametre-label">
                <strong>Adresses e-mail pour les alertes de sécurité</strong>
              </div>
              <textarea
                className="security-parametre-textarea"
                rows="2"
                placeholder="exemple@domaine.com"
                defaultValue="admin@ColocMeak.com, security@ColocMeak.com"
              />
              <small>Les alertes de sécurité seront envoyées à ces adresses e-mail</small>
            </div>

            <button className="security-save-button">
              <AiTwotoneUnlock className="security-button-icon" /> 
              Enregistrer les paramètres
            </button>
          </div>
        </div>
      )}
      {tab === 'journaux' && (
  <div className="security-journaux-wrapper">
    <h2>Journaux de sécurité</h2>
    <p>Historique des événements de sécurité</p>

    {/* Entrée 1 */}
    <div className="security-journal-entry">
      <div className="security-journal-left">
        <div className="security-journal-icon error">{<ShieldCheck size={20} />}</div>
        <div className="security-journal-content">
          <div className="security-journal-title">Tentative d'accès non autorisé à l'API</div>
          <div className="security-journal-details">
            IP: 192.168.1.105<br />
            User: Unknown
          </div>
        </div>
      </div>
      <div className="security-journal-right">
        <span className="security-journal-badge error">error</span>
        <span className="security-journal-date">15/06/2025 10:23:45</span>
      </div>
    </div>

    {/* Entrée 2 */}
    <div className="security-journal-entry">
      <div className="security-journal-left">
        <div className="security-journal-icon warning">{<AlertTriangle size={20} />}</div>
        <div className="security-journal-content">
          <div className="security-journal-title">Tentatives de connexion multiples échouées</div>
          <div className="security-journal-details">
            IP: 192.168.1.42<br />
            User: john.smith@example.com
          </div>
        </div>
      </div>
      <div className="security-journal-right">
        <span className="security-journal-badge warning">warning</span>
        <span className="security-journal-date">15/06/2025 09:15:22</span>
      </div>
    </div>

    {/* Entrée 3 */}
    <div className="security-journal-entry">
      <div className="security-journal-left">
        <div className="security-journal-icon info">{<Shield size={20} />}</div>
        <div className="security-journal-content">
          <div className="security-journal-title">Mot de passe modifié avec succès</div>
          <div className="security-journal-details">
            IP: 192.168.1.87<br />
            User: emma.johnson@example.com
          </div>
        </div>
      </div>
      <div className="security-journal-right">
        <span className="security-journal-badge info">info</span>
        <span className="security-journal-date">15/06/2025 08:45:10</span>
      </div>
    </div>

    {/* Entrée 4 */}
    <div className="security-journal-entry">
      <div className="security-journal-left">
        <div className="security-journal-icon error">{<ShieldCheck size={20} />}</div>
        <div className="security-journal-content">
          <div className="security-journal-title">Compte suspendu pour activité suspecte</div>
          <div className="security-journal-details">
            IP: 192.168.1.56<br />
            User: robert.wilson@example.com
          </div>
        </div>
      </div>
      <div className="security-journal-right">
        <span className="security-journal-badge error">error</span>
        <span className="security-journal-date">14/06/2025 23:12:05</span>
      </div>
    </div>

    {/* Entrée 5 */}
    <div className="security-journal-entry">
      <div className="security-journal-left">
        <div className="security-journal-icon info">{<Shield size={20} />}</div>
        <div className="security-journal-content">
          <div className="security-journal-title">Authentification à deux facteurs activée</div>
          <div className="security-journal-details">
            IP: 192.168.1.92<br />
            User: sarah.williams@example.com
          </div>
        </div>
      </div>
      <div className="security-journal-right">
        <span className="security-journal-badge info">info</span>
        <span className="security-journal-date">14/06/2025 18:30:45</span>
      </div>
    </div>

    {/* Entrée 6 */}
    <div className="security-journal-entry">
      <div className="security-journal-left">
        <div className="security-journal-icon warning">{<ShieldCheck size={20} />}</div>
        <div className="security-journal-content">
          <div className="security-journal-title">Tentative d'accès depuis un nouvel appareil</div>
          <div className="security-journal-details">
            IP: 192.168.1.123<br />
            User: michael.chen@example.com
          </div>
        </div>
      </div>
      <div className="security-journal-right">
        <span className="security-journal-badge warning">warning</span>
        <span className="security-journal-date">14/06/2025 15:20:33</span>
      </div>
    </div>

    {/* Entrée 7 */}
    <div className="security-journal-entry">
      <div className="security-journal-left">
        <div className="security-journal-icon info">{<Shield size={20} />}</div>
        <div className="security-journal-content">
          <div className="security-journal-title">Analyse de sécurité hebdomadaire terminée</div>
          <div className="security-journal-details">
            IP: 192.168.1.1<br />
            User: System
          </div>
        </div>
      </div>
      <div className="security-journal-right">
        <span className="security-journal-badge info">info</span>
        <span className="security-journal-date">14/06/2025 12:00:00</span>
      </div>
    </div>
  </div>
)}

</div>
  );
};

export default Sécurité;
