import React, { useState } from 'react';

const MyRequests = () => {
  const [activeTab, setActiveTab] = useState('active');

  const requests = {
    active: [
      {
        id: 1,
        title: 'Fresh cooked meals',
        donor: 'Community Kitchen',
        status: 'approved',
        requested: '2 hours ago',
        pickupTime: 'Today, 6-8 PM',
        donorContact: 'community@email.com'
      },
      {
        id: 2,
        title: 'Winter clothes',
        donor: 'Local NGO',
        status: 'pending',
        requested: '1 day ago',
        pickupTime: 'Waiting approval',
        donorContact: 'ngo@email.com'
      }
    ],
    completed: [
      {
        id: 3,
        title: 'Children books',
        donor: 'School Donation',
        status: 'completed',
        requested: '3 days ago',
        pickupTime: 'Completed',
        donorContact: 'school@email.com'
      }
    ],
    declined: [
      {
        id: 4,
        title: 'Kitchen utensils',
        donor: 'Local Restaurant',
        status: 'declined',
        requested: '5 days ago',
        pickupTime: 'Not available',
        donorContact: 'restaurant@email.com'
      }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: '#10b981',
      pending: '#f59e0b',
      completed: '#3b82f6',
      declined: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusIcon = (status) => {
    const icons = {
      approved: '✅',
      pending: '⏳',
      completed: '🎉',
      declined: '❌'
    };
    return icons[status] || '📋';
  };

  const handleCancelRequest = (requestId) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      alert(`Cancelled request ${requestId}`);
    }
  };

  const handleContactDonor = (donorContact) => {
    alert(`Contacting donor at: ${donorContact}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Requests</h1>
        <p style={styles.subtitle}>Track and manage your item requests</p>
      </div>

      {/* Stats */}
      <div style={styles.stats}>
        <div style={styles.stat}>
          <div style={styles.statNumber}>{requests.active.length}</div>
          <div style={styles.statLabel}>Active</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statNumber}>{requests.completed.length}</div>
          <div style={styles.statLabel}>Completed</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statNumber}>{requests.declined.length}</div>
          <div style={styles.statLabel}>Declined</div>
        </div>
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
          Active ({requests.active.length})
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'completed' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({requests.completed.length})
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'declined' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('declined')}
        >
          Declined ({requests.declined.length})
        </button>
      </div>

      {/* Requests List */}
      <div style={styles.requestsSection}>
        {requests[activeTab].length > 0 ? (
          <div style={styles.requestsList}>
            {requests[activeTab].map(request => (
              <div key={request.id} style={styles.requestCard}>
                <div style={styles.requestHeader}>
                  <div style={styles.requestInfo}>
                    <h3 style={styles.requestTitle}>{request.title}</h3>
                    <p style={styles.requestDonor}>From: {request.donor}</p>
                  </div>
                  <div style={styles.statusSection}>
                    <div style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(request.status) + '20',
                      color: getStatusColor(request.status)
                    }}>
                      <span style={styles.statusIcon}>
                        {getStatusIcon(request.status)}
                      </span>
                      {request.status.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div style={styles.requestDetails}>
                  <div style={styles.detail}>
                    <span style={styles.detailLabel}>Requested:</span>
                    <span>{request.requested}</span>
                  </div>
                  <div style={styles.detail}>
                    <span style={styles.detailLabel}>Pickup Time:</span>
                    <span>{request.pickupTime}</span>
                  </div>
                  <div style={styles.detail}>
                    <span style={styles.detailLabel}>Donor Contact:</span>
                    <span>{request.donorContact}</span>
                  </div>
                </div>

                <div style={styles.requestActions}>
                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleCancelRequest(request.id)}
                      style={styles.cancelButton}
                    >
                      Cancel Request
                    </button>
                  )}
                  <button
                    onClick={() => handleContactDonor(request.donorContact)}
                    style={styles.contactButton}
                  >
                    Contact Donor
                  </button>
                  <button style={styles.detailsButton}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📭</div>
            <h3 style={styles.emptyTitle}>No {activeTab} requests</h3>
            <p style={styles.emptyText}>
              {activeTab === 'active' 
                ? "You don't have any active requests. Browse available items to make a request!"
                : `No ${activeTab} requests found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
    minHeight: '80vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '16px'
  },
  subtitle: {
    fontSize: '1.3rem',
    color: '#6b7280'
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '40px',
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
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '40px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '8px',
    justifyContent: 'center'
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
  requestsSection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb'
  },
  requestsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  requestCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '25px',
    backgroundColor: '#fafafa'
  },
  requestHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  requestInfo: {
    flex: '1'
  },
  requestTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '8px'
  },
  requestDonor: {
    color: '#6b7280',
    fontSize: '1rem'
  },
  statusSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  statusBadge: {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  statusIcon: {
    fontSize: '14px'
  },
  requestDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  detailLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500'
  },
  requestActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  cancelButton: {
    padding: '10px 16px',
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  contactButton: {
    padding: '10px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  detailsButton: {
    padding: '10px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 40px'
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '24px',
    opacity: '0.5'
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
    maxWidth: '400px',
    margin: '0 auto',
    lineHeight: '1.6'
  }
};

export default MyRequests;