import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>About ReFeed</h1>
          <p style={styles.heroSubtitle}>Connecting Communities, Fighting Hunger, Reducing Waste</p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.sectionText}>
            ReFeed is a community-driven platform that bridges the gap between food surplus and hunger. 
            We connect donors with surplus food to those in need, creating a sustainable ecosystem that 
            reduces waste while fighting hunger in our communities.
          </p>
        </div>

        <div style={styles.statsSection}>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>68M</h3>
              <p style={styles.statLabel}>Tons of food wasted annually in India</p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>194M</h3>
              <p style={styles.statLabel}>People go hungry daily in India</p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>40%</h3>
              <p style={styles.statLabel}>Food wasted at weddings and events</p>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>How We Work</h2>
          <div style={styles.workGrid}>
            <div style={styles.workItem}>
              <div style={styles.workIcon}>🔄</div>
              <h3 style={styles.workTitle}>Smart Matching</h3>
              <p style={styles.workText}>
                AI-powered algorithm matches donors with nearest recipients based on location, 
                food type, and urgency.
              </p>
            </div>
            <div style={styles.workItem}>
              <div style={styles.workIcon}>🛡️</div>
              <h3 style={styles.workTitle}>Food Safety</h3>
              <p style={styles.workText}>
                Strict food safety protocols, verification checks, and quality assurance 
                for every donation.
              </p>
            </div>
            <div style={styles.workItem}>
              <div style={styles.workIcon}>🤝</div>
              <h3 style={styles.workTitle}>Community Driven</h3>
              <p style={styles.workText}>
                Powered by volunteers and community partnerships to ensure efficient 
                and reliable service.
              </p>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Impact</h2>
          <div style={styles.impactGrid}>
            <div style={styles.impactItem}>
              <h3 style={styles.impactNumber}>10,000+</h3>
              <p style={styles.impactLabel}>Meals Shared</p>
            </div>
            <div style={styles.impactItem}>
              <h3 style={styles.impactNumber}>2,500+</h3>
              <p style={styles.impactLabel}>Families Helped</p>
            </div>
            <div style={styles.impactItem}>
              <h3 style={styles.impactNumber}>5,000+</h3>
              <p style={styles.impactLabel}>Kg Waste Reduced</p>
            </div>
            <div style={styles.impactItem}>
              <h3 style={styles.impactNumber}>500+</h3>
              <p style={styles.impactLabel}>Active Volunteers</p>
            </div>
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
  section: {
    maxWidth: '1200px',
    margin: '0 auto 80px',
    padding: '0 40px'
  },
  sectionTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '32px',
    textAlign: 'center'
  },
  sectionText: {
    fontSize: '1.3rem',
    lineHeight: '1.8',
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: '900px',
    margin: '0 auto'
  },
  statsSection: {
    backgroundColor: '#f8f9fa',
    padding: '80px 0',
    marginBottom: '80px',
    width: '100vw'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '60px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 40px'
  },
  statItem: {
    textAlign: 'center',
    padding: '40px 20px'
  },
  statNumber: {
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#10b981',
    marginBottom: '16px'
  },
  statLabel: {
    fontSize: '1.2rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  workGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
    marginTop: '60px'
  },
  workItem: {
    textAlign: 'center',
    padding: '50px 30px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
  },
  workIcon: {
    fontSize: '4rem',
    marginBottom: '24px'
  },
  workTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '16px'
  },
  workText: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#6b7280'
  },
  impactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '40px',
    marginTop: '60px'
  },
  impactItem: {
    textAlign: 'center',
    padding: '40px 20px'
  },
  impactNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#10b981',
    marginBottom: '12px'
  },
  impactLabel: {
    fontSize: '1.2rem',
    color: '#6b7280',
    fontWeight: '500'
  }
};

export default About;