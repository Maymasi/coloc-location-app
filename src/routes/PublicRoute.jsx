import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    const role = decoded.role;
    if (role === 'Etudiant') return <Navigate to="/student" />;
    if (role === 'Proprietaire') return <Navigate to="/owner" />;
    if (role === 'Administrateur') return <Navigate to="/admin" />;
    return <Navigate to="/" />; 
  }

  return children;
};

export default PublicRoute;
