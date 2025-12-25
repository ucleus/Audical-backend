import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/mockup.css';

const PublicLayout = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Theme toggle logic or initialization if needed
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <>
      <header>
        <div className="container nav">
          <div className="brand">
            <div className="logo" aria-hidden="true"></div>
            <h1>Audical Services</h1>
          </div>
          <nav className="navlinks" aria-label="Primary">
            <a href="#shop">Products</a>
            <a href="#tutorials">Tutorials</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="cta">
            {/* Theme Toggle Placeholder - simplified for React */}
            <button className="btn ghost icon-btn" id="themeToggle" aria-label="Switch theme">
               <svg className="icon icon-sun" viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="4"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </button>

            {user ? (
              <button className="btn primary" onClick={() => navigate('/dashboard')}>Dashboard</button>
            ) : (
              <button className="btn primary" onClick={() => navigate('/login')}>Sign In</button>
            )}
            <button className="btn hamburger" aria-label="Open menu">☰</button>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} Audical Services. Professional hearing equipment supplier.</p>
        </div>
      </footer>
    </>
  );
};

export default PublicLayout;