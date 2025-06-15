import { createContext, useContext, useState } from 'react';
import { login as apiLogin } from '../Services/AuthService';
import {jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode (token);
        console.log("Token décodé :", decoded);
        return { nom: decoded.unique_name, role: decoded.role }; 
      } catch (err) {
        console.error("Token invalide", err);
        return null;
      }
    }
    return null;
  });

  const login = async (email, password, role) => {
    const data = await apiLogin(email, password, role);
    setUser({ nom: data.nom, role: data.role });
    localStorage.setItem('token', data.token);
    return data; 
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
