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
import LoginAdmin from './pages/LoginAdmin';
import NotFound from './pages/NotFound';
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
//routes
import PublicRoute from './routes/PublicRoute';
import StudentRoute from './routes/StudentRoute';
import OwnerRoute from './routes/OwnerRoute';
import AdminRoute from './routes/AdminRoute ';
//scroll to top
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ROUTES USER */}
        <Route path="/student" element={
          <StudentRoute>
            <StudentLayout />
          </StudentRoute>
          }>
          <Route path="messages" element={<ChatUi/>} />
          <Route path="profil" element={<ProfilComp/>} />
          <Route path="" element={<StudentDashboard/>} />
          <Route path="favoris" element={<Favorites/>} />
          <Route path="colocations" element={<RoommateComp/>}/>
          <Route path='demandesRecus' element={<ListDemandeRommate/>} />
          <Route path='mesDemandes' element={<MyRoomateRequest/>} />
        </Route>
        <Route path="/" element={<PrincipalePageLayout/>}>
          <Route path="Annonces" element={<AnnoncesPage/>} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="politique" element={<PolitiquePage/>} />
          <Route path="aboutUs" element={<AboutUs/>} />
          <Route path="FAQ" element={<FAQ/>} />
          <Route path="" element={<HomePage/>} />
        </Route>
        {/* ROUTES ADMIN */}
        <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
          <Route path="messages" element={<ChatUi/>} />
          <Route path="analytiques" element={<Analytiques/>} />
          <Route path="" element={<AdminDashboard/>} />
          <Route path="utilisateurs" element={<Utilisateurs/>} />
          <Route path="proprietés" element={<Proprietés/>}/>
          <Route path="signalements" element={<Signalements/>}/>
          <Route path="sécurité" element={<Sécurité/>}/>
          <Route path="parametres" element={<RoommateComp/>}/>
        </Route>
        {/* ROUTES OWNER */}
         <Route path="/owner" element={
            <OwnerRoute>
              <OwnerLayout />
            </OwnerRoute>
          }>
            <Route path="" element={<OwnerDashboard />} />
            <Route path="OwnerProperties" element={<OwnerProperties />} />
            <Route path="OwnerAddProperty" element={<OwnerAddProperty />} />
            <Route path="messages" element={<ChatUi />} />
            <Route path="OwnerDemandesRecus" element={<OwnerDemandesRecus />} />
            <Route path="OwnerStatistiques" element={<OwnerStatistiques/>} />
            <Route path="OwnerProfilComp" element={<OwnerProfilComp />} />
            <Route path="OwnerParametres" element={<OwnerParametres />} /> 
          </Route>
        <Route path="/register" element={<RegistrationForm/>} />
         <Route path="Login" element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          } />
        <Route path="/loginAdmin" element={
            <PublicRoute>
              <LoginAdmin/>
            </PublicRoute>
          } />
        <Route path="*" element={<NotFound/>} />

        
      </Routes>
    </>
  )
}
export default App;
