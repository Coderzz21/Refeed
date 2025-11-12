import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ActiveMissions = () => {
  const [activeTab, setActiveTab] = useState('active');

  const missions = {
    active: [
      {
        id: 1,
        type: 'food',
        title: 'Hot Meals to Elderly Home',
        status: 'in-progress',
        progress: 'picked-up',
        reward: 120,
        started: '30 minutes ago',
        pickup: 'Community Kitchen, Main Street',
        delivery: 'Sunshine Retirement Home, Park Avenue',
        estimatedCompletion: '15 minutes',
        donorContact: 'community@email.com | 9876543210',
        receiverContact: 'sunshine@email.com | 9876543211',
        items: '25 meals',
        specialInstructions: 'Handle with care - hot food. Ring bell at main entrance.'
      }
    ],
    completed: [
      {
        id: 2,
        type: 'clothes',
        title: 'Winter Clothes to Shelter',
        status: 'completed',
        reward: 80,
        completed: '2 hours ago',
        rating: 5,
        feedback: 'Excellent service! Delivered on time and with care.'
      }
    ],
    pending: [
      {
        id: 3,
        type: 'books',
        title: 'Books to School',
        status: 'assigned',
        reward: 90,
        assigned: '5 minutes ago'
      }
    ]
  };

  const getMissionIcon = (type) => {
    const icons = {
      food: '🍽️',
      clothes: '👕',
      books: '📚',
      essentials: '🏠',
      emergency: '🚨',
      other: '📦'
    };
    return icons[type] || '📦';
  };

  const getStatusColor = (status) => {
    const colors = {
      assigned: '#f59e0b',
      'in-progress': '#3b82f6',
      completed: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const handleUpdateProgress = (missionId, progress) => {
    alert(`Mission ${missionId} progress updated to: ${progress}`);
    // API call to update mission progress
  };

  const handleCompleteMission = (missionId) => {
    if (window.confirm('Mark this mission as completed?')) {
      alert(`Mission ${missionId} completed!`);
      // API call to complete mission
    }
  };

  const handleCancelMission = (missionId) => {
    if (window.confirm('Are you sure you want to cancel this mission?')) {
      alert(`Mission ${missionId} cancelled`);
      // API call to cancel mission
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Active Missions</h1>
        <p style={styles.subtitle}>Manage your ongoing deliveries and track progress</p>
      </div>

      {/* Quick Stats */}
      <div style={styles.stats}>
        <div style={styles.stat}>
          <div style={styles.statNumber}>{missions.active.length}</div>
          <div style={styles.statLabel}>In Progress</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statNumber}>{missions.pending.length}</div>
          <div style={styles.statLabel}>Assigned</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statNumber}>{missions.completed.length}</div>
          <div style={styles.statLabel}>Completed</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statNumber}>
            {missions.active.length + missions.pending.length + missions.completed.length}
          </div>
          <div style={styles.statLabel}>Total</div>
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
          In Progress ({missions.active.length})
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'pending' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('pending')}
        >
          Assigned ({missions.pending.length})
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'completed' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({missions.completed.length})
        </button>
      </div>

      {/* Missions List */}
      <div style={styles.missionsSection}>
        {missions[activeTab].length > 0 ? (
          <div style={styles.missionsList}>
            {missions[activeTab].map(mission => (
              <div key={mission.id} style={styles.missionCard}>
                <div style={styles.missionHeader}>
                  <div style={styles.missionIcon}>
                    {getMissionIcon(mission.type)}
                  </div>
                  <div style={styles.missionInfo}>
                    <h3 style={styles.missionTitle}>{mission.title}</h3>
                    <div style={styles.missionMeta}>
                      <span style={{
                        ...styles.missionStatus,
                        color: getStatusColor(mission.status)
                      }}>
                        {mission.status.replace('-', ' ').toUpperCase()}
                      </span>
                      {mission.started && <span>Started: {mission.started}</span>}
                      {mission.assigned && <span>Assigned: {mission.assigned}</span>}
                      {mission.completed && <span>Completed: {mission.completed}</span>}
                    </div>
                  </div>
                  <div style={styles.missionReward}>
                    <div style={styles.rewardAmount}>₹{mission.reward}</div>
                    <div style={styles.rewardLabel}>Reward</div>
                  </div>
                </div>

                {activeTab === 'active' && (
                  <>
                    <div style={styles.missionProgress}>
                      <h4 style={styles.progressTitle}>Delivery Progress</h4>
                      <div style={styles.progressSteps}>
                        <div style={styles.progressStep}>
                          <div style={{
                            ...styles.stepIndicator,
                            ...(mission.progress === 'assigned' || mission.progress === 'picked-up' || mission.progress === 'delivered' ? styles.stepCompleted : {})
                          }}>1</div>
                          <div style={styles.stepInfo}>
                            <div style={styles.stepTitle}>Assigned</div>
                            <div style={styles.stepDescription}>Mission assigned to you</div>
                          </div>
                        </div>
                        <div style={styles.progressStep}>
                          <div style={{
                            ...styles.stepIndicator,
                            ...(mission.progress === 'picked-up' || mission.progress === 'delivered' ? styles.stepCompleted : {})
                          }}>2</div>
                          <div style={styles.stepInfo}>
                            <div style={styles.stepTitle}>Picked Up</div>
                            <div style={styles.stepDescription}>Items collected from donor</div>
                          </div>
                        </div>
                        <div style={styles.progressStep}>
                          <div style={{
                            ...styles.stepIndicator,
                            ...(mission.progress === 'delivered' ? styles.stepCompleted : {})
                          }}>3</div>
                          <div style={styles.stepInfo}>
                            <div style={styles.stepTitle}>Delivered</div>
                            <div style={styles.stepDescription}>Items delivered to receiver</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={styles.missionDetails}>
                      <div style={styles.detailSection}>
                        <h4 style={styles.detailTitle}>📍 Route Information</h4>
                        <div style={styles.detailItem}>
                          <strong>Pickup Location:</strong> {mission.pickup}
                        </div>
                        <div style={styles.detailItem}>
                          <strong>Delivery Location:</strong> {mission.delivery}
                        </div>
                        <div style={styles.detailItem}>
                          <strong>Estimated Completion:</strong> {mission.estimatedCompletion}
                        </div>
                      </div>

                      <div style={styles.detailSection}>
                        <h4 style={styles.detailTitle}>📞 Contact Information</h4>
                        <div style={styles.detailItem}>
                          <strong>Donor Contact:</strong> {mission.donorContact}
                        </div>
                        <div style={styles.detailItem}>
                          <strong>Receiver Contact:</strong> {mission.receiverContact}
                        </div>
                      </div>

                      <div style={styles.detailSection}>
                        <h4 style={styles.detailTitle}>📋 Mission Details</h4>
                        <div style={styles.detailItem}>
                          <strong>Items:</strong> {mission.items}
                        </div>
                        <div style={styles.detailItem}>
                          <strong>Special Instructions:</strong> {mission.specialInstructions}
                        </div>
                      </div>
                    </div>

                    <div style={styles.missionActions}>
                      {mission.progress === 'assigned' && (
                        <button
                          onClick={() => handleUpdateProgress(mission.id, 'picked-up')}
                          style={styles.primaryButton}
                        >
                          Mark as Picked Up
                        </button>
                      )}
                      {mission.progress === 'picked-up' && (
                        <button
                          onClick={() => handleCompleteMission(mission.id)}
                          style={styles.primaryButton}
                        >
                          Mark as Delivered
                        </button>
                      )}
                      <button
                        onClick={() => handleCancelMission(mission.id)}
                        style={styles.cancelButton}
                      >
                        Cancel Mission
                      </button>
                      <button style={styles.secondaryButton}>
                        Get Directions
                      </button>
                      <button style={styles.secondaryButton}>
                        Contact Support
                      </button>
                    </div>
                  </>
                )}

                {activeTab === 'pending' && (
                  <div style={styles.pendingActions}>
                    <button
                      onClick={() => handleUpdateProgress(mission.id, 'in-progress')}
                      style={styles.primaryButton}
                    >
                      Start Mission
                    </button>
                    <button
                      onClick={() => handleCancelMission(mission.id)}
                      style={styles.cancelButton}
                    >
                      Decline Mission
                    </button>
                  </div>
                )}

                {activeTab === 'completed' && mission.rating && (
                  <div style={styles.completionDetails}>
                    <div style={styles.rating}>
                      <strong>Rating:</strong> {'⭐'.repeat(mission.rating)}
                    </div>
                    <div style={styles.feedback}>
                      <strong>Feedback:</strong> {mission.feedback}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📋</div>
            <h3 style={styles.emptyTitle}>No {activeTab} missions</h3>
            <p style={styles.emptyText}>
              {activeTab === 'active' 
                ? "You don't have any active missions. Check the mission board for available deliveries!"
                : `No ${activeTab} missions found.`}
            </p>
            {activeTab === 'active' && (
              <Link to="/mission-board" style={styles.findMissionsButton}>
                Find Missions
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1200px',
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
    color: '#f59e0b',
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
    backgroundColor: '#f59e0b',
    color: 'white'
  },
  missionsSection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb'
  },
  missionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  missionCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '30px',
    backgroundColor: '#fafafa'
  },
  missionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '20px'
  },
  missionIcon: {
    fontSize: '3rem',
    marginTop: '4px'
  },
  missionInfo: {
    flex: '1'
  },
  missionTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '12px'
  },
  missionMeta: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    fontSize: '14px',
    color: '#6b7280'
  },
  missionStatus: {
    fontWeight: '600',
    fontSize: '12px',
    padding: '4px 8px',
    backgroundColor: '#f3f4f6',
    borderRadius: '12px'
  },
  missionReward: {
    textAlign: 'center',
    padding: '12px 16px',
    backgroundColor: '#f59e0b',
    color: 'white',
    borderRadius: '10px',
    minWidth: '90px'
  },
  rewardAmount: {
    fontWeight: '700',
    fontSize: '1.4rem',
    marginBottom: '4px'
  },
  rewardLabel: {
    fontSize: '12px',
    opacity: '0.9'
  },
  missionProgress: {
    marginBottom: '25px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  progressTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '20px'
  },
  progressSteps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  progressStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  stepIndicator: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '14px'
  },
  stepCompleted: {
    backgroundColor: '#10b981',
    color: 'white'
  },
  stepInfo: {
    flex: '1'
  },
  stepTitle: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: '4px'
  },
  stepDescription: {
    color: '#6b7280',
    fontSize: '14px'
  },
  missionDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '25px'
  },
  detailSection: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  detailTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '16px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '8px'
  },
  detailItem: {
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '12px',
    lineHeight: '1.4'
  },
  missionActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  pendingActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  primaryButton: {
    padding: '12px 24px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: '1px solid #ef4444',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  secondaryButton: {
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  completionDetails: {
    padding: '20px',
    backgroundColor: '#f0fdf4',
    borderRadius: '8px',
    border: '1px solid #bbf7d0'
  },
  rating: {
    fontSize: '16px',
    color: '#374151',
    marginBottom: '8px'
  },
  feedback: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.5'
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
    margin: '0 auto 32px',
    lineHeight: '1.6'
  },
  findMissionsButton: {
    padding: '14px 32px',
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease'
  }
};

export default ActiveMissions;