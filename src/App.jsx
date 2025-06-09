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
// Admin part components
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import Analytiques from './components/admin/Analytiques';
import Proprietés from './components/admin/Proprietés';
import Sécurité from './components/admin/Sécurité';
import Signalements from './components/admin/Signalements';
import Utilisateurs from './components/admin/Utilisateurs';
import ListDemandeRommate from './components/student/ListDemandeRommate';
import MyRoomateRequest from './components/student/MyRoomateRequest'
import ProfilComp from './components/common/ProfilComp';
import OwnerLayout from './pages/OwnerLayout';
import OwnerDashboard from './components/owner/OwnerDashboard';
import OwnerProperties from './components/owner/OwnerProperties';
import OwnerAddProperty from './components/owner/OwnerAddProperty';
import OwnerDemandesRecus from './components/owner/OwnerDemandesRecus';
import OwnerStatistiques from './components/owner/OwnerStatistiques';
import OwnerProfilComp from './components/owner/OwnerProfilComp';
import OwnerParametres from './components/owner/OwnerParametres';
//register form
import RegistrationForm  from './components/common/RegistrationForm';
function App() {
  return (
    <>
      <Routes>
        {/* ROUTES USER */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="messages" element={<ChatUi/>} />
          <Route path="profil" element={<ProfilComp/>} />
          <Route path="dashboard" element={<StudentDashboard/>} />
          <Route path="favoris" element={<Favorites/>} />
          <Route path="colocations" element={<RoommateComp/>}/>
          <Route path='demandesRecus' element={<ListDemandeRommate/>} />
          <Route path='mesDemandes' element={<MyRoomateRequest/>} />
        </Route>
        <Route path="/" element={<PrincipalePageLayout/>}>
          <Route path="Annonces" element={<AnnoncesPage/>} />
          <Route path="details" element={<DetailsPage/>} />
          <Route path="politique" element={<PolitiquePage/>} />
          <Route path="aboutUs" element={<AboutUs/>} />
          <Route path="FAQ" element={<FAQ/>} />
          <Route path="" element={<HomePage/>} />
        </Route>
        {/* ROUTES ADMIN */}
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
        {/* ROUTES OWNER */}
         <Route path="/owner" element={<OwnerLayout />}>
            <Route path="OwnerDashboard" element={<OwnerDashboard />} />
            <Route path="OwnerProperties" element={<OwnerProperties />} />
            <Route path="OwnerAddProperty" element={<OwnerAddProperty />} />
            <Route path="messages" element={<ChatUi />} />
            <Route path="OwnerDemandesRecus" element={<OwnerDemandesRecus />} />
            <Route path="OwnerStatistiques" element={<OwnerStatistiques/>} />
            <Route path="OwnerProfilComp" element={<OwnerProfilComp />} />
            <Route path="OwnerParametres" element={<OwnerParametres />} /> 
          </Route>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="*" element={<h1>Page not found</h1>} />
        <Route path="/register" element={<RegistrationForm/>} />

        
      </Routes>
    </>
  )
}
export default App;
