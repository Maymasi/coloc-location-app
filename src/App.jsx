import './App.css';
import {  Routes, Route } from 'react-router-dom';
// student part components
import StudentLayout from './pages/StudentLayout';
import StudentDashboard from './components/student/StudentDashboard';
import Favorites from './components/student/Favorites';
import ChatUi from './components/common/ChatUi';
import RoommateComp from './components/student/RoommateComp';
// Home Components
import AnnoncesPage from './pages/AnnoncesPage';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import AboutUs from './components/about/AboutUs'
import PolitiquePage from './components/Politique/PolitiquePage';
import FAQ from './components/faq/FAQ'
import PrincipalePageLayout from './pages/PrincipalePageLayout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
// Admin part components
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import Analytiques from './components/admin/Analytiques';
import Proprietés from './components/admin/Proprietés';
import Sécurité from './components/admin/Sécurité';
import Signalements from './components/admin/Signalements';
import Utilisateurs from './components/admin/Utilisateurs';
function App() {
  return (
    <>
      <Routes>
        {/* ROUTES USER */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="messages" element={<ChatUi/>} />
          <Route path="profil" element={<h1>orifil</h1>} />
          <Route path="dashboard" element={<StudentDashboard/>} />
          <Route path="favoris" element={<Favorites/>} />
          <Route path="colocations" element={<RoommateComp/>}/>
        </Route>
        <Route path="/" element={<PrincipalePageLayout/>}>
          <Route path="Annonces" element={<AnnoncesPage/>} />
          <Route path="details" element={<DetailsPage/>} />
          <Route path="politique" element={<PolitiquePage/>} />
          <Route path="aboutUs" element={<AboutUs/>} />
          <Route path="FAQ" element={<FAQ/>} />
          <Route path="" element={<HomePage/>} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="messages" element={<ChatUi/>} />
          <Route path="analytiques" element={<Analytiques/>} />
          <Route path="dashboard" element={<AdminDashboard/>} />
          <Route path="utilisateurs" element={<Utilisateurs/>} />
          <Route path="proprietés" element={<Proprietés/>}/>
          <Route path="signalements" element={<Signalements/>}/>
          <Route path="sécurité" element={<Sécurité/>}/>
          <Route path="parametres" element={<RoommateComp/>}/>
        </Route>
         <Route path="Login" element={<Login/>} />
        <Route path="*" element={<NotFound/>} />

        {/* Tu peux garder les autres routes ici aussi, comme admin, etc. */}
      </Routes>
    </>
  )
}
export default App;
