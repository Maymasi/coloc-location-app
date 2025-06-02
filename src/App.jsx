import './App.css';
import {  Routes, Route } from 'react-router-dom';
import StudentLayout from './pages/StudentLayout';
import StudentDashboard from './components/student/StudentDashboard';
import Favorites from './components/student/Favorites';
import ChatUi from './components/common/ChatUi';
import RoommateComp from './components/student/RoommateComp';
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

        
      </Routes>
    </>
  )
}

export default App
