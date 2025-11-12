import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'donor'
  });
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const urlRole = searchParams.get('role');

  React.useEffect(() => {
    if (urlRole && ['donor', 'receiver', 'volunteer'].includes(urlRole)) {
      setFormData(prev => ({ ...prev, role: urlRole }));
    }
  }, [urlRole]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        userType: formData.role
      });
      navigate('/profile-setup');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  const getRoleDescription = (role) => {
    const descriptions = {
      donor: 'Share surplus food and essentials with your community',
      receiver: 'Receive food and essentials from generous donors',
      volunteer: 'Help with pickup and delivery of donated items'
    };
    return descriptions[role] || '';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Join ReFeed Community</h2>
        <p style={styles.subtitle}>Create your account and make a difference</p>
        
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}
        
        <div style={styles.roleSection}>
          <h3 style={styles.roleTitle}>I want to:</h3>
          <div style={styles.roleOptions}>
            {['donor', 'receiver', 'volunteer'].map((role) => (
              <label key={role} style={styles.roleLabel}>
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={formData.role === role}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                <div style={{
                  ...styles.roleCard,
                  ...(formData.role === role ? styles.roleCardActive : {})
                }}>
                  <span style={styles.roleText}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                  <small style={styles.roleDesc}>
                    {getRoleDescription(role)}
                  </small>
                </div>
              </label>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Create a password (min. 6 characters)"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div style={styles.links}>
          <p style={styles.linkText}>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>
              Sign in here
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
    maxWidth: '600px',
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
  roleSection: {
    marginBottom: '40px',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px'
  },
  roleTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#374151'
  },
  roleOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px'
  },
  roleLabel: {
    cursor: 'pointer'
  },
  radioInput: {
    display: 'none'
  },
  roleCard: {
    padding: '20px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  roleCardActive: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4'
  },
  roleText: {
    display: 'block',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
    fontSize: '1.1rem'
  },
  roleDesc: {
    color: '#6b7280',
    fontSize: '0.9rem',
    lineHeight: '1.3'
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
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed'
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

export default Signup;