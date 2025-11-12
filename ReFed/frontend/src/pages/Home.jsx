import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ width: '100vw', minHeight: '100vh' }}>
      {/* Hero Section - Full HD */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Bridging the Gap Between <span style={styles.highlight}>Food Surplus</span> and <span style={styles.highlight}>Hunger</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Join ReFeed - Connect with your community to share food and essentials, reduce waste, and help those in need.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/signup?role=donor" style={styles.heroBtnPrimary}>
              I Have Food to Share
            </Link>
            <Link to="/signup?role=receiver" style={styles.heroBtnSecondary}>
              I Need Food
            </Link>
            <Link to="/signup?role=volunteer" style={styles.heroBtnTertiary}>
              Become Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.stats}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>10,000+</h3>
              <p style={styles.statLabel}>Meals Shared</p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>2,500+</h3>
              <p style={styles.statLabel}>Families Helped</p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>5,000+</h3>
              <p style={styles.statLabel}>Kg Waste Reduced</p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statNumber}>500+</h3>
              <p style={styles.statLabel}>Active Volunteers</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>How ReFeed Works</h2>
          <div style={styles.steps}>
            <div style={styles.step}>
              <div style={styles.stepNumber}>1</div>
              <h3 style={styles.stepTitle}>List Your Items</h3>
              <p style={styles.stepDesc}>Share surplus food or essentials with photos and details</p>
              <Link to="/signup?role=donor" style={styles.stepLink}>
                Start Donating →
              </Link>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNumber}>2</div>
              <h3 style={styles.stepTitle}>Connect Instantly</h3>
              <p style={styles.stepDesc}>Our system matches you with people in need nearby</p>
              <Link to="/signup?role=receiver" style={styles.stepLink}>
                Find Food →
              </Link>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNumber}>3</div>
              <h3 style={styles.stepTitle}>Share & Help</h3>
              <p style={styles.stepDesc}>Arrange pickup or volunteer delivery to complete the share</p>
              <Link to="/signup?role=volunteer" style={styles.stepLink}>
                Join as Volunteer →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={styles.categories}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>What You Can Share</h2>
          <div style={styles.categoriesGrid}>
            <div style={styles.categoryCard}>
              <div style={styles.categoryIcon}>🍽️</div>
              <h3 style={styles.categoryTitle}>Food Items</h3>
              <p style={styles.categoryDesc}>Cooked meals, packaged food, fresh produce, groceries</p>
              <Link to="/signup?role=donor" style={styles.categoryLink}>
                Donate Food
              </Link>
            </div>
            <div style={styles.categoryCard}>
              <div style={styles.categoryIcon}>👕</div>
              <h3 style={styles.categoryTitle}>Clothes</h3>
              <p style={styles.categoryDesc}>Gently used clothing for men, women, and children</p>
              <Link to="/signup?role=donor" style={styles.categoryLink}>
                Donate Clothes
              </Link>
            </div>
            <div style={styles.categoryCard}>
              <div style={styles.categoryIcon}>📚</div>
              <h3 style={styles.categoryTitle}>Books & Supplies</h3>
              <p style={styles.categoryDesc}>Educational materials, stationery, school supplies</p>
              <Link to="/signup?role=donor" style={styles.categoryLink}>
                Donate Books
              </Link>
            </div>
            <div style={styles.categoryCard}>
              <div style={styles.categoryIcon}>🏠</div>
              <h3 style={styles.categoryTitle}>Essentials</h3>
              <p style={styles.categoryDesc}>Household items, utensils, toys, medical aids</p>
              <Link to="/signup?role=donor" style={styles.categoryLink}>
                Donate Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div style={styles.container}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready to Make a Difference?</h2>
            <p style={styles.ctaText}>
              Join thousands of community members fighting hunger and reducing waste. 
              Together, we can create a sustainable future.
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/signup" style={styles.ctaBtnPrimary}>
                Join ReFeed Today
              </Link>
              <Link to="/about" style={styles.ctaBtnSecondary}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '120px 0',
    textAlign: 'center',
    width: '100vw',
    height: '700px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '0 40px'
  },
  heroTitle: {
    fontSize: '4.5rem',
    fontWeight: '700',
    marginBottom: '32px',
    lineHeight: '1.2'
  },
  highlight: {
    color: '#f0fdf4'
  },
  heroSubtitle: {
    fontSize: '1.8rem',
    marginBottom: '60px',
    opacity: '0.9',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto 60px'
  },
  heroButtons: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  heroBtnPrimary: {
    backgroundColor: 'white',
    color: '#10b981',
    padding: '20px 40px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.3rem',
    minWidth: '260px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '2px solid white'
  },
  heroBtnSecondary: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    padding: '20px 40px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.3rem',
    minWidth: '260px',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  },
  heroBtnTertiary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    padding: '20px 40px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.3rem',
    minWidth: '260px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  container: {
    width: '100%',
    maxWidth: '1920px',
    margin: '0 auto',
    padding: '0 40px'
  },
  stats: {
    padding: '100px 0',
    backgroundColor: 'white',
    width: '100vw'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '60px',
    textAlign: 'center',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  statItem: {
    padding: '40px 20px'
  },
  statNumber: {
    fontSize: '4rem',
    fontWeight: '700',
    color: '#10b981',
    marginBottom: '16px'
  },
  statLabel: {
    fontSize: '1.5rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  section: {
    padding: '100px 0',
    backgroundColor: '#f8f9fa',
    width: '100vw'
  },
  sectionTitle: {
    fontSize: '3.5rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '80px',
    color: '#1f2937'
  },
  steps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '60px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  step: {
    textAlign: 'center',
    padding: '60px 40px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepNumber: {
    width: '80px',
    height: '80px',
    backgroundColor: '#10b981',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: '700',
    margin: '0 auto 30px'
  },
  stepTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#1f2937'
  },
  stepDesc: {
    color: '#6b7280',
    lineHeight: '1.6',
    fontSize: '1.2rem',
    marginBottom: '30px',
    flex: '1'
  },
  stepLink: {
    color: '#10b981',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'color 0.3s ease'
  },
  categories: {
    padding: '100px 0',
    backgroundColor: 'white',
    width: '100vw'
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '40px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  categoryCard: {
    textAlign: 'center',
    padding: '50px 30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '16px',
    border: '1px solid #e5e7eb',
    transition: 'transform 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  categoryIcon: {
    fontSize: '4rem',
    marginBottom: '24px'
  },
  categoryTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '16px'
  },
  categoryDesc: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#6b7280',
    marginBottom: '30px',
    flex: '1'
  },
  categoryLink: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s ease'
  },
  cta: {
    padding: '120px 0',
    backgroundColor: '#1f2937',
    color: 'white',
    textAlign: 'center',
    width: '100vw'
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  ctaTitle: {
    fontSize: '3.5rem',
    fontWeight: '700',
    marginBottom: '24px'
  },
  ctaText: {
    fontSize: '1.4rem',
    marginBottom: '50px',
    opacity: '0.9',
    lineHeight: '1.6'
  },
  ctaButtons: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  ctaBtnPrimary: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '20px 40px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.3rem',
    minWidth: '240px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease'
  },
  ctaBtnSecondary: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    padding: '20px 40px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.3rem',
    minWidth: '240px',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  }
};

export default Home;