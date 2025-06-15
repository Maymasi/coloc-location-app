import React, { useState } from 'react';
import '../assets/styles/Login.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {login} from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';


function Login() {
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
      localStorage.setItem('token',result.token);
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
        <h2>Welcome back</h2>
        <p>Enter your credentials to access your account</p>

        <div className="login-role-switch">
          <button
            className={role === 'Etudiant' ? 'active' : ''}
            onClick={() => setRole('Etudiant')}
          >
            Student
          </button>
          <button
            className={role === 'Proprietaire' ? 'active' : ''}
            onClick={() => setRole('Proprietaire')}
          >
            Property Owner
          </button>
        </div>

        <form onSubmit={handleLogin} className='Login-form'>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              role === 'student' ? 'student@example.com' : 'owner@example.com'
            }
            required
            className="login-input-field"
          />

          <div className="password-label-row">
             <label>Password</label>
             <a href="#" className="forgot-password">Forgot password?</a>
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
            Sign In as {role === 'Etudiant' ? 'student' : 'Property Owner'}
          </button>
        </form>
        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
