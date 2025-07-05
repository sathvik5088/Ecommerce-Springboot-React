import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Auth.css';
import { useAuth } from './AuthContext';

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ Renamed to avoid conflict
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/api/signin', loginData);
      alert(res.data);

      // ✅ Use correct variable here
      login({ email: loginData.email });
      navigate('/home');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p>Please sign in to continue shopping with us!</p>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p>New here? <span onClick={() => navigate('/')} className="auth-link">Sign Up</span></p>
      </div>
    </div>
  );
}

export default SignIn;
