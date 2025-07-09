import React, { useState } from 'react';
import '../assets/styles/Login.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import {login} from '../Services/AuthService';
import {useAuth} from '../context/AuthContext';

function LoginAdmin() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [Erreur, setErreur] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e)=>{
    e.preventDefault();
    try{
      await login(email,password,'Admin');  
       navigate('/admin');
        
    }catch(error){
      setErreur('Email ou mot de passe incorrect.');
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome back</h2>

        <form onSubmit={handleLogin} className='Login-form'>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder= 'admin@gmail.com'
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
            Sign In as Admin
          </button>
        </form>
        <p className="signup-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginAdmin;
