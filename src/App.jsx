// import LeftNav from './components/common/LeftNav'
// import TopNav from './components/common/TopNav'
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import StudentLayout from './components/student/StudentLayout';
import StudentDashboard from './components/student/StudentDashboard';

function App() {
  return (
    <>
      <Routes>
        {/* ROUTES USER */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="messages" element={<h1>hhg</h1>} />
          <Route path="profil" element={<h1>orifil</h1>} />
          <Route path="dashboard" element={<StudentDashboard/>} />
        </Route>

        {/* Tu peux garder les autres routes ici aussi, comme admin, etc. */}
      </Routes>
    </>
  )
}

export default App
