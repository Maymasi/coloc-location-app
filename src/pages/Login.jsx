import React, { useState } from 'react';
import '../assets/styles/Login.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import {login} from '../Services/AuthService';
import {useAuth} from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const [role, setRole] = useState('Etudiant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [Erreur, setErreur] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e)=>{
    e.preventDefault();
    try{
      const result = await login(email,password,role);
      if(result.role == 'Etudiant') navigate('/student');
      if(result.role == 'Proprietaire') navigate('/owner');
      if(result.role == 'Admin') navigate('/admin');
        
    }catch(error){
      setErreur('Email ou mot de passe incorrect.');
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenue</h2>
        <p>Entrez vos identifiants pour accéder à votre compte</p>

        <div className="login-role-switch">
          <button
            className={role === 'Etudiant' ? 'active' : ''}
            onClick={() => setRole('Etudiant')}
          >
            Étudiant
          </button>
          <button
            className={role === 'Proprietaire' ? 'active' : ''}
            onClick={() => setRole('Proprietaire')}
          >
            Propriétaire
          </button>
        </div>

        <form onSubmit={handleLogin} className='Login-form'>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              role === 'Etudiant' ? 'etudiant@exemple.com' : 'proprietaire@exemple.com'
            }
            required
            className="login-input-field"
          />

          <div className="password-label-row">
             <label>Mot de passe</label>
             <a href="#" className="forgot-password">Mot de passe oublié ?</a>
          </div>
          <div className="password-input-wrapper">
             <input
                 type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                   required
                   className="login-input-field"
               />
              <span
                  className="login-eye-icon"
                   onClick={() => setShowPassword(!showPassword)}
                >
                   {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {Erreur && <div style={{ color: 'red', textAlign : "center" , marginTop : '5px'}}>{Erreur}</div>}

          <button className="login-button" type="submit">
            Se connecter en tant que {role === 'Etudiant' ? 'étudiant' : 'propriétaire'}
          </button>
        </form>
        <p className="signup-text">
          Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
