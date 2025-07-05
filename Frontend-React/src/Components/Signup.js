import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Auth.css'; // Your custom styling

function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/api/signup', user);

      alert(res.data);

      // Store user in localStorage (optional, mostly done after login)
      // localStorage.setItem("user", JSON.stringify({ email: user.email }));

      // Redirect to sign in page
      navigate('/signin');
    } catch (error) {
      alert(error.response?.data || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome to E-Commerce Hub</h2>
        <p>Create your account to explore amazing products and offers!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={user.name}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={user.email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={user.password}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/signin')}
            className="auth-link"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
