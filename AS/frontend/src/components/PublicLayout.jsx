import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useDisclosure, Badge, Box } from '@chakra-ui/react';
import CartDrawer from './CartDrawer';
import '../assets/mockup.css';

const PublicLayout = ({ children }) => {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <>
      <header>
        <div className="container nav">
          <div className="brand">
            <div className="logo" aria-hidden="true" onClick={() => navigate('/')} style={{cursor:'pointer'}}></div>
            <h1 onClick={() => navigate('/')} style={{cursor:'pointer'}}>Audical Services</h1>
          </div>
          <nav className="navlinks" aria-label="Primary">
            <a href="/#shop">Products</a>
            <a href="/#tutorials">Tutorials</a>
            <a href="/#about">About</a>
            <a href="/#contact">Contact</a>
          </nav>
          <div className="cta">
            <button className="btn ghost icon-btn" id="themeToggle" aria-label="Switch theme">
               <svg className="icon icon-sun" viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="4"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </button>

            {/* Cart Button */}
            <button className="btn ghost" onClick={onOpen} style={{position:'relative', padding:'8px 12px'}}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
               {cartCount > 0 && (
                 <Badge 
                    position="absolute" 
                    top="-2px" 
                    right="-2px" 
                    colorScheme="teal" 
                    borderRadius="full" 
                    fontSize="10px" 
                    px={1}
                 >
                   {cartCount}
                 </Badge>
               )}
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

      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PublicLayout;
