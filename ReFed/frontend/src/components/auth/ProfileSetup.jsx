import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfileSetup = () => {
  const [profileData, setProfileData] = useState({
    phone: '',
    address: '',
    city: '',
    pincode: '',
    bio: '',
    preferences: {
      notifications: true,
      emailUpdates: true
    }
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile data:', profileData);
    
    if (user?.role) {
      navigate(`/${user.role}-dashboard`);
    } else {
      navigate('/donor-dashboard');
    }
  };

  const skipSetup = () => {
    if (user?.role) {
      navigate(`/${user.role}-dashboard`);
    } else {
      navigate('/donor-dashboard');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Complete Your Profile</h2>
          <p style={styles.subtitle}>
            Help us connect you better with the ReFeed community
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Basic Information</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter your address"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>City</label>
                <input
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter your city"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={profileData.pincode}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter pincode"
                />
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>About You</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Bio (Optional)</label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="Tell us a bit about yourself and why you joined ReFeed..."
                rows="4"
              />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Preferences</h3>
            <div style={styles.preferences}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={profileData.preferences.notifications}
                  onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>
                  Receive push notifications for new matches
                </span>
              </label>
              
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={profileData.preferences.emailUpdates}
                  onChange={(e) => handlePreferenceChange('emailUpdates', e.target.checked)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>
                  Receive email updates about ReFeed
                </span>
              </label>
            </div>
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              onClick={skipSetup}
              style={styles.skipButton}
            >
              Skip for Now
            </button>
            <button
              type="submit"
              style={styles.submitButton}
            >
              Complete Profile
            </button>
          </div>
        </form>
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
    maxWidth: '800px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '12px'
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '1.2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  section: {
    paddingBottom: '30px',
    borderBottom: '1px solid #e5e7eb'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '24px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
  textarea: {
    padding: '16px 20px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1.1rem',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    width: '100%',
    minHeight: '120px'
  },
  preferences: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    cursor: 'pointer'
  },
  checkbox: {
    marginTop: '4px',
    width: '20px',
    height: '20px'
  },
  checkboxText: {
    color: '#374151',
    lineHeight: '1.4',
    fontSize: '1.1rem'
  },
  actions: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  skipButton: {
    padding: '16px 32px',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  submitButton: {
    padding: '16px 40px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};

export default ProfileSetup;