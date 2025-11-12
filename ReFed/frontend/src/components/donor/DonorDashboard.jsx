import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MyListings from './MyListings'; // Add this import

const DonorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual API calls
  const donorStats = {
    totalDonations: 15,
    peopleHelped: 42,
    wasteReduced: 28, // kg
    activeListings: 3,
    totalImpact: '1.2k', // meals
    communityRating: 4.8
  };

  const recentListings = [
    { id: 1, title: 'Fresh cooked meals', category: 'food', status: 'active', requests: 3 },
    { id: 2, title: 'Winter clothes', category: 'clothes', status: 'completed', requests: 5 },
    { id: 3, title: 'Children books', category: 'books', status: 'active', requests: 2 }
  ];

  const getCategoryIcon = (category) => {
    const icons = {
      food: '🍽️',
      clothes: '👕',
      books: '📚',
      other: '📦'
    };
    return icons[category] || '📦';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: '#10b981',
      pending: '#f59e0b',
      completed: '#6b7280',
      expired: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Donor Dashboard</h1>
          <p style={styles.welcome}>Welcome back, {user?.name || 'Donor'}! 👋</p>
        </div>
        <Link to="/donate" style={styles.donateButton}>
          + Donate Items
        </Link>
      </div>

      {/* Stats Overview */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <div>
            <h3 style={styles.statNumber}>{donorStats.totalDonations}</h3>
            <p style={styles.statLabel}>Total Donations</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <div>
            <h3 style={styles.statNumber}>{donorStats.peopleHelped}</h3>
            <p style={styles.statLabel}>People Helped</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🌱</div>
          <div>
            <h3 style={styles.statNumber}>{donorStats.wasteReduced}kg</h3>
            <p style={styles.statLabel}>Waste Reduced</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⭐</div>
          <div>
            <h3 style={styles.statNumber}>{donorStats.communityRating}/5</h3>
            <p style={styles.statLabel}>Community Rating</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'overview' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'listings' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('listings')}
        >
          My Listings
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'impact' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('impact')}
        >
          Impact
        </button>
      </div>

      {/* Tab Content */}
      <div style={styles.tabContent}>
        {activeTab === 'overview' && (
          <div>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Recent Activity</h3>
              <div style={styles.activityList}>
                {recentListings.map((listing) => (
                  <div key={listing.id} style={styles.activityItem}>
                    <div style={styles.activityIcon}>
                      {getCategoryIcon(listing.category)}
                    </div>
                    <div style={styles.activityInfo}>
                      <h4 style={styles.activityTitle}>{listing.title}</h4>
                      <p style={styles.activityMeta}>
                        <span style={{ 
                          color: getStatusColor(listing.status),
                          fontWeight: '500'
                        }}>
                          {listing.status.toUpperCase()}
                        </span>
                        • {listing.requests} requests
                      </p>
                    </div>
                    <div style={styles.activityActions}>
                      <button style={styles.actionButton}>
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.quickActions}>
              <h3 style={styles.sectionTitle}>Quick Actions</h3>
              <div style={styles.actionGrid}>
                <Link to="/donate" style={styles.quickAction}>
                  <div style={styles.actionIcon}>➕</div>
                  <span>Donate Items</span>
                </Link>
                <button 
                  style={styles.quickAction}
                  onClick={() => setActiveTab('listings')}
                >
                  <div style={styles.actionIcon}>📋</div>
                  <span>Manage Listings</span>
                </button>
                <button style={styles.quickAction}>
                  <div style={styles.actionIcon}>📊</div>
                  <span>View Analytics</span>
                </button>
                <button style={styles.quickAction}>
                  <div style={styles.actionIcon}>👥</div>
                  <span>Community</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div>
            {/* Replace the coming soon message with MyListings component */}
            <MyListings />
          </div>
        )}

        {activeTab === 'impact' && (
          <div>
            <h3 style={styles.sectionTitle}>Your Impact</h3>
            <p style={styles.comingSoon}>Impact analytics coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: '#f8f9fa',
    minHeight: '80vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '8px'
  },
  welcome: {
    color: '#6b7280',
    fontSize: '1.1rem'
  },
  donateButton: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'background-color 0.3s ease'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '40px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    border: '1px solid #e5e7eb'
  },
  statIcon: {
    fontSize: '2rem'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '4px'
  },
  statLabel: {
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '500'
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '32px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '8px'
  },
  tab: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#6b7280'
  },
  activeTab: {
    backgroundColor: '#10b981',
    color: 'white'
  },
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  section: {
    marginBottom: '40px'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '20px'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  activityIcon: {
    fontSize: '1.5rem',
    width: '40px',
    textAlign: 'center'
  },
  activityInfo: {
    flex: '1'
  },
  activityTitle: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: '4px'
  },
  activityMeta: {
    color: '#6b7280',
    fontSize: '14px'
  },
  activityActions: {
    display: 'flex',
    gap: '8px'
  },
  actionButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  quickActions: {
    marginTop: '40px'
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  quickAction: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '24px 16px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#374151',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  actionIcon: {
    fontSize: '2rem'
  },
  comingSoon: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.1rem',
    padding: '40px 0'
  }
};

export default DonorDashboard;