import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.nav}>
          <Link to="/" style={styles.logo}>
            <h2 style={styles.logoText}>ReFeed</h2>
          </Link>
          
          <nav style={styles.navLinks}>
            {/* Navigation for all users */}
            <Link 
              to="/" 
              style={{
                ...styles.navLink,
                ...(location.pathname === '/' ? styles.activeNavLink : {})
              }}
            >
              Home
            </Link>
            
            <Link 
              to="/browse" 
              style={{
                ...styles.navLink,
                ...(location.pathname === '/browse' ? styles.activeNavLink : {})
              }}
            >
              Browse Items
            </Link>
            
            <Link 
              to="/about" 
              style={{
                ...styles.navLink,
                ...(location.pathname === '/about' ? styles.activeNavLink : {})
              }}
            >
              About
            </Link>
            
            <Link 
              to="/contact" 
              style={{
                ...styles.navLink,
                ...(location.pathname === '/contact' ? styles.activeNavLink : {})
              }}
            >
              Contact
            </Link>
            
            {/* Admin Link - Only show for admin users */}
            {user && user.role === 'admin' && (
              <Link 
                to="/admin-dashboard" 
                style={{
                  ...styles.navLink,
                  ...(location.pathname === '/admin-dashboard' ? styles.activeNavLink : {})
                }}
              >
                Admin
              </Link>
            )}
            
            {/* Conditional navigation based on login status */}
            {user ? (
              <>
                <Link 
                  to={`/${user.role}-dashboard`}
                  style={{
                    ...styles.navLink,
                    ...(location.pathname.includes('dashboard') ? styles.activeNavLink : {})
                  }}
                >
                  Dashboard
                </Link>
                <span style={styles.userName}>Hello, {user.name}</span>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.navLink}>
                  Login
                </Link>
                <Link to="/signup" style={styles.signupBtn}>
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: 'white',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    padding: '20px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100vw'
  },
  container: {
    width: '100%',
    maxWidth: '1920px',
    margin: '0 auto',
    padding: '0 40px'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    textDecoration: 'none'
  },
  logoText: {
    color: '#10b981',
    fontSize: '2.5rem',
    fontWeight: 'bold'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px'
  },
  navLink: {
    textDecoration: 'none',
    color: '#6b7280',
    fontWeight: '500',
    padding: '12px 20px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    fontSize: '1.1rem'
  },
  activeNavLink: {
    color: '#10b981',
    backgroundColor: '#f0fdf4'
  },
  signupBtn: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '14px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s ease'
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontWeight: '500',
    padding: '12px 20px',
    fontSize: '1.1rem',
    transition: 'color 0.3s ease'
  },
  userName: {
    color: '#374151',
    fontWeight: '500',
    fontSize: '1.1rem',
    padding: '12px 20px'
  }
};

export default Header;