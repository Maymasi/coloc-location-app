import './App.css';
import {  Routes, Route } from 'react-router-dom';
import StudentLayout from './pages/StudentLayout';
import StudentDashboard from './components/student/StudentDashboard';
import Favorites from './components/student/Favorites';
import ChatUi from './components/common/ChatUi';
import RoommateComp from './components/student/RoommateComp';
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
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="*" element={<h1>Page not found</h1>} />

        {/* Tu peux garder les autres routes ici aussi, comme admin, etc. */}
      </Routes>
    </>
  )
}

export default App
