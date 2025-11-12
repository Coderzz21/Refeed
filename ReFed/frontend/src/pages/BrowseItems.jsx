import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BrowseItems = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  // Mock data for items
  const items = [
    {
      id: 1,
      title: 'Fresh cooked meals',
      category: 'food',
      donor: 'Community Kitchen',
      distance: '0.8 km',
      quantity: 15,
      posted: '2 hours ago',
      image: '🍽️',
      urgency: 'high'
    },
    {
      id: 2,
      title: 'Winter clothes collection',
      category: 'clothes',
      donor: 'Local NGO',
      distance: '1.2 km',
      quantity: 8,
      posted: '5 hours ago',
      image: '👕',
      urgency: 'medium'
    },
    {
      id: 3,
      title: 'Children books and toys',
      category: 'books',
      donor: 'School Donation',
      distance: '2.1 km',
      quantity: 25,
      posted: '1 day ago',
      image: '📚',
      urgency: 'low'
    },
    {
      id: 4,
      title: 'Rice and pulses',
      category: 'food',
      donor: 'Food Bank',
      distance: '0.5 km',
      quantity: 10,
      posted: '30 min ago',
      image: '🍚',
      urgency: 'high'
    },
    {
      id: 5,
      title: 'Kitchen utensils',
      category: 'essentials',
      donor: 'Community Center',
      distance: '1.8 km',
      quantity: 12,
      posted: '3 hours ago',
      image: '🏠',
      urgency: 'medium'
    },
    {
      id: 6,
      title: 'School supplies',
      category: 'books',
      donor: 'Education Trust',
      distance: '2.5 km',
      quantity: 30,
      posted: '6 hours ago',
      image: '✏️',
      urgency: 'low'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: '📦' },
    { id: 'food', name: 'Food', icon: '🍽️' },
    { id: 'clothes', name: 'Clothes', icon: '👕' },
    { id: 'books', name: 'Books & Supplies', icon: '📚' },
    { id: 'essentials', name: 'Essentials', icon: '🏠' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy === 'recent') {
      return new Date(b.posted) - new Date(a.posted);
    }
    return 0;
  });

  const getUrgencyColor = (urgency) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    };
    return colors[urgency] || '#6b7280';
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Browse Available Items</h1>
          <p style={styles.heroSubtitle}>
            Find food, clothes, books, and essentials shared by your community
          </p>
        </div>
      </div>

      <div style={styles.content}>
        {/* Filters and Categories */}
        <div style={styles.filtersSection}>
          <div style={styles.container}>
            <div style={styles.filtersHeader}>
              <h2 style={styles.filtersTitle}>Find What You Need</h2>
              
              <div style={styles.sortFilter}>
                <label style={styles.sortLabel}>Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  style={styles.sortSelect}
                >
                  <option value="distance">Nearest First</option>
                  <option value="recent">Most Recent</option>
                </select>
              </div>
            </div>

            <div style={styles.categories}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    ...styles.categoryBtn,
                    ...(selectedCategory === category.id ? styles.categoryBtnActive : {})
                  }}
                >
                  <span style={styles.categoryIcon}>{category.icon}</span>
                  <span style={styles.categoryName}>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div style={styles.itemsSection}>
          <div style={styles.container}>
            <div style={styles.itemsHeader}>
              <h3 style={styles.itemsCount}>
                {sortedItems.length} items available
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
              </h3>
            </div>

            {sortedItems.length > 0 ? (
              <div style={styles.itemsGrid}>
                {sortedItems.map(item => (
                  <div key={item.id} style={styles.itemCard}>
                    <div style={styles.itemHeader}>
                      <div style={styles.itemImage}>
                        {item.image}
                      </div>
                      <div style={styles.itemInfo}>
                        <h4 style={styles.itemTitle}>{item.title}</h4>
                        <p style={styles.itemDonor}>by {item.donor}</p>
                      </div>
                      <div style={styles.urgencyBadge}>
                        <span style={{
                          color: getUrgencyColor(item.urgency),
                          fontWeight: '600',
                          fontSize: '12px'
                        }}>
                          {item.urgency.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div style={styles.itemDetails}>
                      <div style={styles.detail}>
                        <span style={styles.detailLabel}>📍 Distance:</span>
                        <span>{item.distance}</span>
                      </div>
                      <div style={styles.detail}>
                        <span style={styles.detailLabel}>📦 Quantity:</span>
                        <span>{item.quantity} available</span>
                      </div>
                      <div style={styles.detail}>
                        <span style={styles.detailLabel}>🕐 Posted:</span>
                        <span>{item.posted}</span>
                      </div>
                    </div>

                    <div style={styles.itemActions}>
                      <button style={styles.requestBtn}>
                        Request Item
                      </button>
                      <button style={styles.detailsBtn}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.noItems}>
                <div style={styles.noItemsIcon}>📭</div>
                <h3 style={styles.noItemsTitle}>No items found</h3>
                <p style={styles.noItemsText}>
                  No items available in this category. Check back later or try another category.
                </p>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  style={styles.browseAllBtn}
                >
                  Browse All Items
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <div style={styles.container}>
            <div style={styles.ctaContent}>
              <h2 style={styles.ctaTitle}>Can't find what you need?</h2>
              <p style={styles.ctaText}>
                Join our community to get notified when new items become available near you.
              </p>
              <div style={styles.ctaButtons}>
                <Link to="/signup?role=receiver" style={styles.ctaBtnPrimary}>
                  Join as Receiver
                </Link>
                <Link to="/contact" style={styles.ctaBtnSecondary}>
                  Contact Support
                </Link>
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
    width: '100%',
    maxWidth: '1920px',
    margin: '0 auto',
    padding: '0 40px'
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
    width: '100vw'
  },
  filtersSection: {
    backgroundColor: 'white',
    padding: '60px 0',
    borderBottom: '1px solid #e5e7eb'
  },
  filtersHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  filtersTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937'
  },
  sortFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  sortLabel: {
    fontWeight: '500',
    color: '#374151',
    fontSize: '1.1rem'
  },
  sortSelect: {
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white'
  },
  categories: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  },
  categoryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 24px',
    backgroundColor: '#f8f9fa',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1.1rem',
    fontWeight: '500'
  },
  categoryBtnActive: {
    backgroundColor: '#f0fdf4',
    borderColor: '#10b981',
    color: '#10b981'
  },
  categoryIcon: {
    fontSize: '1.5rem'
  },
  categoryName: {
    fontSize: '1.1rem'
  },
  itemsSection: {
    padding: '80px 0',
    backgroundColor: '#f8f9fa',
    minHeight: '60vh'
  },
  itemsHeader: {
    marginBottom: '40px'
  },
  itemsCount: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#374151'
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '30px'
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb',
    transition: 'transform 0.3s ease'
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '20px'
  },
  itemImage: {
    fontSize: '3rem',
    width: '60px',
    textAlign: 'center'
  },
  itemInfo: {
    flex: '1'
  },
  itemTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '8px'
  },
  itemDonor: {
    color: '#6b7280',
    fontSize: '1rem'
  },
  urgencyBadge: {
    padding: '6px 12px',
    backgroundColor: '#fef2f2',
    borderRadius: '20px',
    border: '1px solid #fecaca'
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px'
  },
  detail: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1rem',
    color: '#374151'
  },
  detailLabel: {
    fontWeight: '500',
    color: '#6b7280'
  },
  itemActions: {
    display: 'flex',
    gap: '12px'
  },
  requestBtn: {
    flex: '1',
    padding: '14px 20px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  detailsBtn: {
    padding: '14px 20px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  noItems: {
    textAlign: 'center',
    padding: '80px 40px'
  },
  noItemsIcon: {
    fontSize: '4rem',
    marginBottom: '24px'
  },
  noItemsTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '16px'
  },
  noItemsText: {
    fontSize: '1.2rem',
    color: '#6b7280',
    marginBottom: '32px',
    maxWidth: '500px',
    margin: '0 auto 32px',
    lineHeight: '1.6'
  },
  browseAllBtn: {
    padding: '14px 32px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  ctaSection: {
    padding: '80px 0',
    backgroundColor: 'white',
    borderTop: '1px solid #e5e7eb'
  },
  ctaContent: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto'
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '20px'
  },
  ctaText: {
    fontSize: '1.3rem',
    color: '#6b7280',
    marginBottom: '40px',
    lineHeight: '1.6'
  },
  ctaButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  ctaBtnPrimary: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.2rem',
    transition: 'background-color 0.3s ease'
  },
  ctaBtnSecondary: {
    backgroundColor: 'transparent',
    color: '#10b981',
    border: '2px solid #10b981',
    padding: '16px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease'
  }
};

export default BrowseItems;