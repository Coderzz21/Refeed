import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/donor-dashboard');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back to ReFeed</h2>
        <p style={styles.subtitle}>Sign in to your account</p>
        
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div style={styles.links}>
          <p style={styles.linkText}>
            Don't have an account?{' '}
            <Link to="/signup" style={styles.link}>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    backgroundColor: '#f8f9fa',
    width: '100vw'
  },
  card: {
    background: 'white',
    padding: '60px',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '12px',
    textAlign: 'center'
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '1.2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  label: {
    fontWeight: '500',
    color: '#374151',
    fontSize: '1.1rem'
  },
  input: {
    padding: '16px 20px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1.1rem',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    width: '100%'
  },
  button: {
    padding: '18px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    width: '100%'
  },
  error: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #fecaca',
    marginBottom: '24px',
    textAlign: 'center',
    fontSize: '1.1rem'
  },
  links: {
    marginTop: '32px',
    textAlign: 'center'
  },
  linkText: {
    color: '#6b7280',
    fontSize: '1.1rem'
  },
  link: {
    color: '#10b981',
    fontWeight: '500',
    textDecoration: 'none',
    fontSize: '1.1rem'
  }
};

export default Login;