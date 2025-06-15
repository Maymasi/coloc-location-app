import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';


const OwnerRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  const decoded = jwtDecode(token);
  const role = decoded.role;
  if (role !== 'Proprietaire') return <Navigate to="/" />;
  return children;
};

export default OwnerRoute;
