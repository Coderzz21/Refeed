import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Contact Us</h1>
          <p style={styles.heroSubtitle}>Get in touch with the ReFeed team</p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.contactGrid}>
          <div style={styles.contactInfo}>
            <h2 style={styles.contactTitle}>Get In Touch</h2>
            <p style={styles.contactText}>
              Have questions about ReFeed? Want to partner with us? 
              We'd love to hear from you.
            </p>
            
            <div style={styles.contactMethods}>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>📧</div>
                <div>
                  <h3 style={styles.contactMethodTitle}>Email</h3>
                  <p style={styles.contactMethodText}>contact@refeed.org</p>
                </div>
              </div>
              
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>📞</div>
                <div>
                  <h3 style={styles.contactMethodTitle}>Phone</h3>
                  <p style={styles.contactMethodText}>+91 1800-REF-FEED</p>
                </div>
              </div>
              
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>📍</div>
                <div>
                  <h3 style={styles.contactMethodTitle}>Address</h3>
                  <p style={styles.contactMethodText}>
                    ReFeed Headquarters<br />
                    Social Impact District<br />
                    Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.contactForm}>
            <h2 style={styles.formTitle}>Send us a Message</h2>
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
                <label style={styles.label}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter subject"
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Enter your message"
                  rows="6"
                  required
                />
              </div>
              
              <button type="submit" style={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    minHeight: '100vh'
  },
  hero: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '120px 0',
    textAlign: 'center',
    width: '100vw'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 40px'
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: '700',
    marginBottom: '24px'
  },
  heroSubtitle: {
    fontSize: '1.8rem',
    opacity: '0.9',
    lineHeight: '1.6'
  },
  content: {
    padding: '100px 0',
    width: '100vw'
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 40px'
  },
  contactInfo: {
    padding: '40px 0'
  },
  contactTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '24px'
  },
  contactText: {
    fontSize: '1.3rem',
    lineHeight: '1.6',
    color: '#6b7280',
    marginBottom: '60px'
  },
  contactMethods: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px'
  },
  contactIcon: {
    fontSize: '2.5rem',
    marginTop: '8px'
  },
  contactMethodTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  },
  contactMethodText: {
    fontSize: '1.1rem',
    color: '#6b7280',
    lineHeight: '1.5'
  },
  contactForm: {
    backgroundColor: 'white',
    padding: '60px',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
  },
  formTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '40px'
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
    minHeight: '150px'
  },
  submitButton: {
    padding: '18px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px'
  }
};

export default Contact;