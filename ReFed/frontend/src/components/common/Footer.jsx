import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.logo}>ReFeed</h3>
            <p style={styles.tagline}>
              Bridging the gap between food surplus and hunger through community sharing.
            </p>
            <div style={styles.socialLinks}>
              <span style={styles.socialLink}>📘</span>
              <span style={styles.socialLink}>🐦</span>
              <span style={styles.socialLink}>📷</span>
              <span style={styles.socialLink}>💼</span>
            </div>
          </div>
          
          <div style={styles.footerSection}>
            <h4 style={styles.sectionTitle}>Quick Links</h4>
            <Link to="/" style={styles.footerLink}>Home</Link>
            <Link to="/browse" style={styles.footerLink}>Browse Items</Link>
            <Link to="/about" style={styles.footerLink}>About Us</Link>
            <Link to="/contact" style={styles.footerLink}>Contact</Link>
          </div>
          
          <div style={styles.footerSection}>
            <h4 style={styles.sectionTitle}>Get Involved</h4>
            <Link to="/signup?role=donor" style={styles.footerLink}>Become a Donor</Link>
            <Link to="/signup?role=volunteer" style={styles.footerLink}>Join as Volunteer</Link>
            <Link to="/signup?role=receiver" style={styles.footerLink}>Receive Help</Link>
            <Link to="/partner" style={styles.footerLink}>Partner With Us</Link>
          </div>
          
          <div style={styles.footerSection}>
            <h4 style={styles.sectionTitle}>Support</h4>
            <Link to="/help" style={styles.footerLink}>Help Center</Link>
            <Link to="/safety" style={styles.footerLink}>Safety Guidelines</Link>
            <Link to="/faq" style={styles.footerLink}>FAQ</Link>
            <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>&copy; 2024 ReFeed. All rights reserved.</p>
          <div style={styles.legalLinks}>
            <Link to="/terms" style={styles.legalLink}>Terms of Service</Link>
            <span style={styles.separator}>|</span>
            <Link to="/privacy" style={styles.legalLink}>Privacy Policy</Link>
            <span style={styles.separator}>|</span>
            <Link to="/cookies" style={styles.legalLink}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '60px 0 20px',
    marginTop: 'auto',
    width: '100vw'
  },
  container: {
    width: '100%',
    maxWidth: '1920px',
    margin: '0 auto',
    padding: '0 40px'
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '60px',
    marginBottom: '50px'
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  logo: {
    color: '#10b981',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '12px'
  },
  tagline: {
    color: '#d1d5db',
    fontSize: '1.1rem',
    lineHeight: '1.6'
  },
  socialLinks: {
    display: 'flex',
    gap: '16px',
    marginTop: '20px'
  },
  socialLink: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease'
  },
  sectionTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: 'white'
  },
  footerLink: {
    color: '#d1d5db',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
    padding: '4px 0'
  },
  footerBottom: {
    borderTop: '1px solid #374151',
    paddingTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px'
  },
  copyright: {
    color: '#9ca3af',
    fontSize: '1rem'
  },
  legalLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  legalLink: {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s ease'
  },
  separator: {
    color: '#6b7280',
    fontSize: '0.9rem'
  }
};

export default Footer;