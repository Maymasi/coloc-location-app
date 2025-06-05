import React, { useState } from 'react';
import '../assets/styles/Login.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Login() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password, role });
    // Tu ajouteras ici la requête vers ton API .NET
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome back</h2>
        <p>Enter your credentials to access your account</p>

        <div className="login-role-switch">
          <button
            className={role === 'student' ? 'active' : ''}
            onClick={() => setRole('student')}
          >
            Student
          </button>
          <button
            className={role === 'owner' ? 'active' : ''}
            onClick={() => setRole('owner')}
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


          <button className="login-button" type="submit">
            Sign In as {role === 'student' ? 'Student' : 'Property Owner'}
          </button>
        </form>

        <div className="divider-Login">OR CONTINUE WITH</div>

        <div className="social-login">
           <button className="login-social-btn login-google-btn">
              <FcGoogle className="login-social-icon" />
               Google
          </button>
           <button className="login-social-btn login-facebook-btn">
               <FaFacebookF className="login-social-icon" />
               Facebook
           </button>
       </div>


        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
