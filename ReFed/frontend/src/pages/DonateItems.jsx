import React from 'react';
import { Link } from 'react-router-dom';

const DonateItems = () => {
  const categories = [
    {
      id: 'food',
      title: 'Food Items',
      icon: '🍽️',
      description: 'Cooked meals, packaged food, fresh produce, groceries',
      color: '#f59e0b',
      examples: ['Fresh cooked meals', 'Packaged snacks', 'Fruits & vegetables', 'Grains & pulses']
    },
    {
      id: 'clothes',
      title: 'Clothes',
      icon: '👕',
      description: 'Gently used clothing for men, women, and children',
      color: '#3b82f6',
      examples: ['Winter wear', 'Summer clothes', 'Formal wear', 'Children clothing']
    },
    {
      id: 'books',
      title: 'Books & Supplies',
      icon: '📚',
      description: 'Educational materials, stationery, school supplies',
      color: '#8b5cf6',
      examples: ['Textbooks', 'Story books', 'Notebooks', 'Pens & pencils']
    },
    {
      id: 'essentials',
      title: 'Essentials',
      icon: '🏠',
      description: 'Household items, utensils, toys, medical aids',
      color: '#10b981',
      examples: ['Kitchen utensils', 'Toys', 'Medical equipment', 'Home decor']
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>What would you like to donate?</h1>
          <p style={styles.heroSubtitle}>
            Choose a category to start your donation process
          </p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.categoriesGrid}>
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/donate/${category.id}`}
              style={{
                ...styles.categoryCard,
                borderLeft: `6px solid ${category.color}`
              }}
            >
              <div style={styles.categoryHeader}>
                <div style={styles.categoryIcon}>{category.icon}</div>
                <h3 style={styles.categoryTitle}>{category.title}</h3>
              </div>
              
              <p style={styles.categoryDescription}>{category.description}</p>
              
              <div style={styles.examples}>
                <strong>Examples:</strong>
                <ul style={styles.examplesList}>
                  {category.examples.map((example, index) => (
                    <li key={index} style={styles.exampleItem}>{example}</li>
                  ))}
                </ul>
              </div>

              <div style={styles.ctaSection}>
                <span style={styles.ctaText}>Start Donation</span>
                <span style={styles.arrow}>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Help Section */}
        <div style={styles.helpSection}>
          <div style={styles.helpCard}>
            <h3 style={styles.helpTitle}>💡 Donation Guidelines</h3>
            <div style={styles.guidelines}>
              <div style={styles.guideline}>
                <strong>Quality Matters:</strong> Only donate items you would use yourself
              </div>
              <div style={styles.guideline}>
                <strong>Clean & Safe:</strong> Ensure items are clean and in good condition
              </div>
              <div style={styles.guideline}>
                <strong>Proper Packaging:</strong> Use appropriate containers for different items
              </div>
              <div style={styles.guideline}>
                <strong>Be Available:</strong> Set realistic pickup availability times
              </div>
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
    padding: '100px 0',
    textAlign: 'center',
    width: '100vw'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 40px'
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '700',
    marginBottom: '24px'
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    opacity: '0.9',
    lineHeight: '1.6'
  },
  content: {
    padding: '80px 0',
    width: '100vw',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '80px 40px'
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '40px',
    marginBottom: '80px'
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '50px 40px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px'
  },
  categoryIcon: {
    fontSize: '4rem',
    width: '80px',
    textAlign: 'center'
  },
  categoryTitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0
  },
  categoryDescription: {
    fontSize: '1.3rem',
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '30px',
    flex: 1
  },
  examples: {
    marginBottom: '30px'
  },
  examplesList: {
    margin: '12px 0 0 0',
    paddingLeft: '20px',
    color: '#6b7280'
  },
  exampleItem: {
    fontSize: '1.1rem',
    lineHeight: '1.5',
    marginBottom: '8px'
  },
  ctaSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '20px',
    borderTop: '1px solid #e5e7eb'
  },
  ctaText: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#10b981'
  },
  arrow: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#10b981'
  },
  helpSection: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  helpCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '16px',
    padding: '50px 40px',
    textAlign: 'center',
    border: '1px solid #e5e7eb'
  },
  helpTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '30px'
  },
  guidelines: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    textAlign: 'left'
  },
  guideline: {
    fontSize: '1.1rem',
    lineHeight: '1.5',
    color: '#6b7280',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  }
};

export default DonateItems;