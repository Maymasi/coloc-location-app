import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getProprietaireProfil } from '../Services/ProfilOwnerService';

export const ProfilContext = createContext();

export const ProfilProvider = ({ children }) => {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfil = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProprietaireProfil();
      if (res.status === 200 && res.data) {
        setProfil({
          nom: res.data.nom,
          role: res.data.role || 'Propriétaire',
          urlAvatar: res.data.avatarUrl || '/src/assets/images/defaultAvatar.jpg',
        });
      } else {
        console.error(res.error || 'Erreur inconnue');
      }
    } catch (err) {
      console.error('Erreur réseau :', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfil();
  }, [fetchProfil]);

  return (
    <ProfilContext.Provider value={{ profil, setProfil, fetchProfil, loading }}>
      {children}
    </ProfilContext.Provider>
  );
};
