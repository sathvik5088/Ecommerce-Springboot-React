import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  // Theme toggle logic
  const getInitialTheme = () => localStorage.getItem("theme") || "light-theme";
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark-theme" ? "light-theme" : "dark-theme");
  };

  // User state from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">🛍 MyStore</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/add_product">Add Product</Link></li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to="/">Electronics</Link></li>
                      <li><Link className="dropdown-item" to="/">Clothing</Link></li>
                      <li><Link className="dropdown-item" to="/">Home</Link></li>
                    </ul>
                  </li>
                </>
              )}
            </ul>

            <div className="d-flex align-items-center gap-2">
              {/* 🛒 Cart Button */}
              <Link to="/cart" className="btn btn-outline-light">
                🛒 Cart
              </Link>
              <button onClick={toggleTheme} className="btn btn-outline-light">
                {theme === "dark-theme" ? "☀️ Light" : "🌙 Dark"}
              </button>

              {user ? (
                
                <div className="dropdown">
                  <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    👤 {user.email.split("@")[0]}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><button className="dropdown-item" disabled>Profile</button></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link className="btn btn-outline-light" to="/">Sign Up</Link>
                  <Link className="btn btn-outline-light" to="/signin">Sign In</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
