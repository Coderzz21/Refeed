import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ReceiverDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('browse');

  // Mock data - replace with actual API calls
  const receiverStats = {
    itemsReceived: 28,
    moneySaved: 5600,
    activeRequests: 2,
    donorsConnected: 12,
    communityRating: 4.9
  };

  const availableItems = [
    { 
      id: 1, 
      title: 'Fresh cooked meals', 
      category: 'food', 
      donor: 'Community Kitchen', 
      distance: '0.8 km', 
      quantity: 15,
      posted: '2 hours ago'
    },
    { 
      id: 2, 
      title: 'Winter clothes', 
      category: 'clothes', 
      donor: 'Local NGO', 
      distance: '1.2 km', 
      quantity: 8,
      posted: '5 hours ago'
    },
    { 
      id: 3, 
      title: 'Children books', 
      category: 'books', 
      donor: 'School Donation', 
      distance: '2.1 km', 
      quantity: 25,
      posted: '1 day ago'
    }
  ];

  const myRequests = [
    { id: 1, title: 'Rice and pulses', status: 'approved', donor: 'Food Bank' },
    { id: 2, title: 'School supplies', status: 'pending', donor: 'Education Trust' }
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
      approved: '#10b981',
      pending: '#f59e0b',
      rejected: '#ef4444',
      completed: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Receiver Dashboard</h1>
          <p style={styles.welcome}>Welcome, {user?.name || 'Receiver'}! 🙏</p>
        </div>
        <Link to="/browse" style={styles.browseButton}>
          🔍 Browse Items
        </Link>
      </div>

      {/* Stats Overview */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📦</div>
          <div>
            <h3 style={styles.statNumber}>{receiverStats.itemsReceived}</h3>
            <p style={styles.statLabel}>Items Received</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div>
            <h3 style={styles.statNumber}>₹{receiverStats.moneySaved}</h3>
            <p style={styles.statLabel}>Money Saved</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📋</div>
          <div>
            <h3 style={styles.statNumber}>{receiverStats.activeRequests}</h3>
            <p style={styles.statLabel}>Active Requests</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⭐</div>
          <div>
            <h3 style={styles.statNumber}>{receiverStats.communityRating}/5</h3>
            <p style={styles.statLabel}>Community Rating</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'browse' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('browse')}
        >
          Browse Items
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'requests' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('requests')}
        >
          My Requests
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'history' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      {/* Tab Content */}
      <div style={styles.tabContent}>
        {activeTab === 'browse' && (
          <div>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Available Items Near You</h3>
              <div style={styles.filters}>
                <select style={styles.filterSelect}>
                  <option>All Categories</option>
                  <option>Food</option>
                  <option>Clothes</option>
                  <option>Books</option>
                </select>
                <select style={styles.filterSelect}>
                  <option>Nearest First</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            <div style={styles.itemsGrid}>
              {availableItems.map((item) => (
                <div key={item.id} style={styles.itemCard}>
                  <div style={styles.itemHeader}>
                    <div style={styles.itemIcon}>
                      {getCategoryIcon(item.category)}
                    </div>
                    <div style={styles.itemInfo}>
                      <h4 style={styles.itemTitle}>{item.title}</h4>
                      <p style={styles.itemDonor}>{item.donor}</p>
                    </div>
                  </div>
                  
                  <div style={styles.itemDetails}>
                    <div style={styles.detail}>
                      <span style={styles.detailLabel}>Distance:</span>
                      <span>{item.distance}</span>
                    </div>
                    <div style={styles.detail}>
                      <span style={styles.detailLabel}>Quantity:</span>
                      <span>{item.quantity} available</span>
                    </div>
                    <div style={styles.detail}>
                      <span style={styles.detailLabel}>Posted:</span>
                      <span>{item.posted}</span>
                    </div>
                  </div>

                  <div style={styles.itemActions}>
                    <button style={styles.requestButton}>
                      Request Item
                    </button>
                    <button style={styles.detailsButton}>
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div>
            <h3 style={styles.sectionTitle}>My Requests</h3>
            <div style={styles.requestsList}>
              {myRequests.map((request) => (
                <div key={request.id} style={styles.requestItem}>
                  <div style={styles.requestInfo}>
                    <h4 style={styles.requestTitle}>{request.title}</h4>
                    <p style={styles.requestDonor}>From: {request.donor}</p>
                  </div>
                  <div style={styles.requestStatus}>
                    <span style={{
                      color: getStatusColor(request.status),
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h3 style={styles.sectionTitle}>Receiving History</h3>
            <p style={styles.comingSoon}>History tracking coming soon...</p>
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
  browseButton: {
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
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937'
  },
  filters: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  filterSelect: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px'
  },
  itemCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#fafafa',
    transition: 'transform 0.2s ease'
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  itemIcon: {
    fontSize: '2rem'
  },
  itemInfo: {
    flex: '1'
  },
  itemTitle: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: '4px',
    fontSize: '1.1rem'
  },
  itemDonor: {
    color: '#6b7280',
    fontSize: '14px'
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px'
  },
  detail: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px'
  },
  detailLabel: {
    color: '#6b7280',
    fontWeight: '500'
  },
  itemActions: {
    display: 'flex',
    gap: '8px'
  },
  requestButton: {
    flex: '1',
    padding: '10px 16px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  detailsButton: {
    padding: '10px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  requestsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  requestItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  requestInfo: {
    flex: '1'
  },
  requestTitle: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: '4px'
  },
  requestDonor: {
    color: '#6b7280',
    fontSize: '14px'
  },
  comingSoon: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.1rem',
    padding: '40px 0'
  }
};

export default ReceiverDashboard;