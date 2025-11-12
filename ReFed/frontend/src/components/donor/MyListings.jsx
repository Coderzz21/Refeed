import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyListings = () => {
  const [activeTab, setActiveTab] = useState('active');

  // Mock data for user's listings
  const userListings = {
    active: [
      {
        id: 1,
        title: 'Fresh cooked meals',
        category: 'food',
        status: 'active',
        requests: 3,
        posted: '2 hours ago',
        views: 24,
        image: '🍽️'
      },
      {
        id: 2,
        title: 'Winter clothes collection',
        category: 'clothes',
        status: 'active',
        requests: 1,
        posted: '1 day ago',
        views: 15,
        image: '👕'
      }
    ],
    pending: [
      {
        id: 3,
        title: 'Children books',
        category: 'books',
        status: 'pending',
        requests: 0,
        posted: '30 min ago',
        views: 5,
        image: '📚'
      }
    ],
    completed: [
      {
        id: 4,
        title: 'Kitchen utensils',
        category: 'essentials',
        status: 'completed',
        requests: 2,
        posted: '3 days ago',
        views: 42,
        image: '🏠'
      }
    ]
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

  const handleEdit = (listingId) => {
    alert(`Edit listing ${listingId}`);
  };

  const handleDelete = (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      alert(`Deleted listing ${listingId}`);
    }
  };

  const handleMarkComplete = (listingId) => {
    alert(`Marked listing ${listingId} as completed`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>My Listings</h1>
          <p style={styles.heroSubtitle}>
            Manage your donations and track their impact
          </p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <div style={styles.statNumber}>{userListings.active.length}</div>
              <div style={styles.statLabel}>Active</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>{userListings.pending.length}</div>
              <div style={styles.statLabel}>Pending</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>{userListings.completed.length}</div>
              <div style={styles.statLabel}>Completed</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>
                {userListings.active.length + userListings.pending.length + userListings.completed.length}
              </div>
              <div style={styles.statLabel}>Total</div>
            </div>
          </div>

          <Link to="/donate" style={styles.newListingBtn}>
            + New Listing
          </Link>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'active' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('active')}
          >
            Active ({userListings.active.length})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'pending' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({userListings.pending.length})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'completed' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({userListings.completed.length})
          </button>
        </div>

        {/* Listings Grid */}
        <div style={styles.listingsSection}>
          {userListings[activeTab].length > 0 ? (
            <div style={styles.listingsGrid}>
              {userListings[activeTab].map(listing => (
                <div key={listing.id} style={styles.listingCard}>
                  <div style={styles.listingHeader}>
                    <div style={styles.listingImage}>
                      {listing.image}
                    </div>
                    <div style={styles.listingInfo}>
                      <h3 style={styles.listingTitle}>{listing.title}</h3>
                      <div style={styles.listingMeta}>
                        <span style={styles.listingCategory}>{listing.category}</span>
                        <span style={styles.listingPosted}>{listing.posted}</span>
                      </div>
                    </div>
                    <div style={styles.statusBadge}>
                      <span style={{
                        color: getStatusColor(listing.status),
                        fontWeight: '600',
                        fontSize: '12px'
                      }}>
                        {listing.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div style={styles.listingStats}>
                    <div style={styles.statItem}>
                      <span style={styles.statLabel}>Requests:</span>
                      <span style={styles.statValue}>{listing.requests}</span>
                    </div>
                    <div style={styles.statItem}>
                      <span style={styles.statLabel}>Views:</span>
                      <span style={styles.statValue}>{listing.views}</span>
                    </div>
                  </div>

                  <div style={styles.listingActions}>
                    {listing.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleEdit(listing.id)}
                          style={styles.editBtn}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleMarkComplete(listing.id)}
                          style={styles.completeBtn}
                        >
                          Mark Complete
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(listing.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📭</div>
              <h3 style={styles.emptyTitle}>No {activeTab} listings</h3>
              <p style={styles.emptyText}>
                {activeTab === 'active' 
                  ? "You don't have any active listings. Start by creating a new donation!"
                  : `No ${activeTab} listings found.`}
              </p>
              {activeTab === 'active' && (
                <Link to="/donate" style={styles.createBtn}>
                  Create Your First Listing
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div style={styles.quickStats}>
          <div style={styles.quickStatCard}>
            <h3 style={styles.quickStatTitle}>📈 Your Impact</h3>
            <div style={styles.impactStats}>
              <div style={styles.impactStat}>
                <div style={styles.impactNumber}>15</div>
                <div style={styles.impactLabel}>People Helped</div>
              </div>
              <div style={styles.impactStat}>
                <div style={styles.impactNumber}>28kg</div>
                <div style={styles.impactLabel}>Waste Reduced</div>
              </div>
              <div style={styles.impactStat}>
                <div style={styles.impactNumber}>₹3,500</div>
                <div style={styles.impactLabel}>Value Created</div>
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
    padding: '80px 0',
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
    marginBottom: '20px'
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    opacity: '0.9',
    lineHeight: '1.6'
  },
  content: {
    width: '100vw',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '60px 40px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '50px',
    flexWrap: 'wrap',
    gap: '30px'
  },
  stats: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap'
  },
  stat: {
    textAlign: 'center',
    padding: '20px 30px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    minWidth: '120px'
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#10b981',
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: '1rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  newListingBtn: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s ease'
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '40px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '8px'
  },
  tab: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#6b7280'
  },
  activeTab: {
    backgroundColor: '#10b981',
    color: 'white'
  },
  listingsSection: {
    marginBottom: '60px'
  },
  listingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '30px'
  },
  listingCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb'
  },
  listingHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '20px'
  },
  listingImage: {
    fontSize: '3rem',
    width: '60px',
    textAlign: 'center'
  },
  listingInfo: {
    flex: '1'
  },
  listingTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '8px'
  },
  listingMeta: {
    display: 'flex',
    gap: '16px',
    fontSize: '0.9rem',
    color: '#6b7280'
  },
  listingCategory: {
    textTransform: 'capitalize',
    fontWeight: '500'
  },
  statusBadge: {
    padding: '6px 12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    border: '1px solid #e5e7eb'
  },
  listingStats: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#6b7280'
  },
  statValue: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#374151'
  },
  listingActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  editBtn: {
    padding: '10px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  completeBtn: {
    padding: '10px 16px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  deleteBtn: {
    padding: '10px 16px',
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 40px'
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '24px'
  },
  emptyTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '16px'
  },
  emptyText: {
    fontSize: '1.2rem',
    color: '#6b7280',
    marginBottom: '32px',
    maxWidth: '400px',
    margin: '0 auto 32px',
    lineHeight: '1.6'
  },
  createBtn: {
    padding: '14px 32px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease'
  },
  quickStats: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  quickStatCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb',
    textAlign: 'center'
  },
  quickStatTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '30px'
  },
  impactStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px'
  },
  impactStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  impactNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#10b981'
  },
  impactLabel: {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontWeight: '500'
  }
};

export default MyListings;