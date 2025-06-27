import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';


const StudentRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;
  const decoded = jwtDecode(token);
  const role = decoded.role;
  if (role !== 'Administrateur') return <Navigate to="/" />;
  return children;
};

export default StudentRoute;
