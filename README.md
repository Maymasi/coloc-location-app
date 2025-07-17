# 🖥️ ColocationAppFrontend – Frontend React pour plateforme de colocation étudiante

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)
![MUI](https://img.shields.io/badge/UI-Material%20UI-007fff)
![SignalR](https://img.shields.io/badge/Realtime-SignalR-lightblue)
![Axios](https://img.shields.io/badge/API-Axios-success)

---

## 📚 Sommaire

- [🚀 À propos du projet](#-à-propos-du-projet)
- [🧱 Stack technique](#-stack-technique)
- [📐 Architecture Frontend](#-architecture-frontend)
- [🗂️ Structure des dossiers](#️-structure-des-dossiers)
- [🔐 Authentification & sécurité](#-authentification--sécurité)
- [💬 Chat temps réel (SignalR)](#-chat-temps-réel-signalr)
- [📡 Appels API](#-appels-api)
- [🧪 Scripts & Lancement](#-scripts--lancement)
- [🧑‍💻 Auteurs](#-auteurs)

---

## 🚀 À propos du projet

**ColocationAppFrontend** est une SPA (Single Page Application) développée en **React 19** et propulsée par **Vite**. Elle constitue l’interface utilisateur du projet **ColocMeak**, qui facilite la gestion intelligente des colocations étudiantes.

Elle permet aux utilisateurs de :

- 🔐 S'authentifier via JWT
- 📋 Consulter et gérer des annonces de colocation
- 💌 Postuler à des colocations ou inviter d'autres étudiants
- 💬 Discuter en temps réel via SignalR
- ⭐ Gérer favoris, notations, et préférences

---

## 🧱 Stack technique

| Domaine                 | Technologies utilisées                                         |
|-------------------------|----------------------------------------------------------------|
| Framework principal     | [React 19](https://react.dev/)                                |
| Bundler                 | [Vite 6.2](https://vitejs.dev/)                                |
| UI/Design               | Material UI                                     |
| Authentification        | JWT + `jwt-decode`                                             |
| Routing SPA             | React Router DOM v7.5                                          |
| HTTP Client             | Axios                                                          |
| Chat temps réel         | SignalR JS (`@microsoft/signalr`)                              |
| Notifications           | React Toastify                                                 |
| Animation               | AOS, Framer Motion                                             |
| Carousel                | React Slick + slick-carousel                                   |
| Icônes                  | Lucide, React Icons                                            |
| Linting                 | ESLint                                                         |

---

## 📐 Architecture Frontend

Le projet est organisé selon les **bonnes pratiques React**, avec séparation claire des responsabilités :

- `components/` → UI réutilisable
- `pages/` → Routes principales
- `context/` → Auth & profils
- `Services/` → API backend centralisée
- `routes/` → Routing avec protection par rôle
- `utils/` → Fonctions utilitaires
- `App.jsx` → Configuration globale
- `main.jsx` → Entrée React

---

## 🗂️ Structure des dossiers
```plaintext
src/
│
├── Services/ # Appels API (auth, annonces, messages…)
├── assets/ # Images, styles CSS globaux
├── components/ # Composants réutilisables (Navbar, Cards, Modals…)
├── context/ # Contextes globaux (auth, profil, socket)
├── pages/ # Pages React (Login, Annonces, Dashboard, Chat…)
├── routes/ # Routing avec protection par rôle
├── utils/ # Fonctions utilitaires (token, format, etc.)
├── App.jsx # Composant racine
└── main.jsx # Entrée Vite/React
```

---

## 🔐 Authentification & sécurité

- Auth basée sur **JWT**, stocké en `localStorage`
- Décodage via `jwt-decode` pour récupérer rôle et ID
- `AuthContext` maintient l’état global utilisateur
- Routes protégées avec `PrivateRoute`
- Axios intercepte et injecte automatiquement le token

---

## 💬 Chat temps réel (SignalR)

Le frontend intègre **SignalR** pour une expérience de messagerie en direct :

- Connexion via `@microsoft/signalr`
- Utilisation du contexte `ChatContext`
- Interface avec `@chatscope/chat-ui-kit-react`
- Historique des messages, statut "lu", etc.

---

## 📡 Appels API

Tous les appels backend sont centralisés dans le dossier `Services/` :

- Authentification
- Gestion des utilisateurs
- Annonces & logements
- Colocations & candidatures
- Messagerie (GET/POST messages)

L’instance `axios` est préconfigurée avec base URL, interceptors, etc.

---

## 🧪 Scripts & Lancement

### 📦 Installation

```bash
git clone https://github.com/Oussamaroom67/coloc-location-app.git
cd coloc-location-app
npm install
```
### 🚀 Développement
```bash
npm run dev
```
### 🛠 Build production
```bash
npm run build
```
### 🧑‍💻 Auteurs

- 👨‍💻 **Oussama Nouhar** – [oussamanouhar0@gmail.com](mailto:oussamanouhar0@gmail.com)  
- 👩‍💻 **Omaima Siaf** – [siafomaima5@gmail.com](mailto:siafomaima5@gmail.com)
- 👩‍💻 **Souhayla Ghanem** – [souhaghanem5@gmail.com](mailto:souhaghanem5@gmail.com)

---
