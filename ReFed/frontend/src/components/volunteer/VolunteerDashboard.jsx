import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('missions');
  const [isAvailable, setIsAvailable] = useState(true);

  // Mock data - replace with actual API calls
  const volunteerStats = {
    missionsCompleted: 24,
    peopleHelped: 89,
    distanceCovered: 156, // km
    totalEarnings: 2480, // rupees
    rating: 4.9,
    activeMissions: 1
  };

  const availableMissions = [
    {
      id: 1,
      type: 'food',
      title: 'Food pickup from Community Kitchen',
      distance: '2.3 km',
      reward: 80,
      urgency: 'high',
      pickup: 'Community Kitchen, Main Street',
      delivery: 'Orphanage, Park Road',
      estimatedTime: '45 min'
    },
    {
      id: 2,
      type: 'clothes',
      title: 'Clothes delivery to Shelter',
      distance: '3.1 km',
      reward: 60,
      urgency: 'medium',
      pickup: 'Donor Residence, Sector 15',
      delivery: 'Homeless Shelter, City Center',
      estimatedTime: '35 min'
    }
  ];

  const myMissions = [
    {
      id: 3,
      type: 'books',
      title: 'Book delivery to School',
      status: 'in-progress',
      progress: 'picked-up',
      reward: 70,
      started: '30 min ago'
    }
  ];

  const getMissionIcon = (type) => {
    const icons = {
      food: '🍽️',
      clothes: '👕',
      books: '📚',
      other: '📦'
    };
    return icons[type] || '📦';
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    };
    return colors[urgency] || '#6b7280';
  };

  const handleAcceptMission = (missionId) => {
    alert(`Mission ${missionId} accepted! This would connect to backend in real app.`);
    // In real app: Update mission status and add to active missions
  };

  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
    alert(`You are now ${!isAvailable ? 'available' : 'unavailable'} for missions`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Volunteer Dashboard</h1>
          <p style={styles.welcome}>Ready to help, {user?.name || 'Volunteer'}? 🦸</p>
        </div>
        <div style={styles.availability}>
          <span style={styles.availabilityText}>
            Status: <strong style={{ color: isAvailable ? '#10b981' : '#ef4444' }}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </strong>
          </span>
          <button
            onClick={handleToggleAvailability}
            style={{
              ...styles.availabilityButton,
              ...(isAvailable ? styles.available : styles.unavailable)
            }}
          >
            {isAvailable ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🎯</div>
          <div>
            <h3 style={styles.statNumber}>{volunteerStats.missionsCompleted}</h3>
            <p style={styles.statLabel}>Missions Completed</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <div>
            <h3 style={styles.statNumber}>{volunteerStats.peopleHelped}</h3>
            <p style={styles.statLabel}>People Helped</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🛣️</div>
          <div>
            <h3 style={styles.statNumber}>{volunteerStats.distanceCovered}km</h3>
            <p style={styles.statLabel}>Distance Covered</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div>
            <h3 style={styles.statNumber}>₹{volunteerStats.totalEarnings}</h3>
            <p style={styles.statLabel}>Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'missions' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('missions')}
        >
          Available Missions
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'active' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('active')}
        >
          My Missions ({volunteerStats.activeMissions})
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'history' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('history')}
        >
          Mission History
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'earnings' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('earnings')}
        >
          Earnings
        </button>
      </div>

      {/* Tab Content */}
      <div style={styles.tabContent}>
        {activeTab === 'missions' && (
          <div>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Available Missions</h3>
              <div style={styles.missionCount}>
                {availableMissions.length} missions near you
              </div>
            </div>

            <div style={styles.missionsList}>
              {availableMissions.map((mission) => (
                <div key={mission.id} style={styles.missionCard}>
                  <div style={styles.missionHeader}>
                    <div style={styles.missionIcon}>
                      {getMissionIcon(mission.type)}
                    </div>
                    <div style={styles.missionInfo}>
                      <h4 style={styles.missionTitle}>{mission.title}</h4>
                      <div style={styles.missionMeta}>
                        <span style={styles.missionDistance}>📍 {mission.distance}</span>
                        <span style={styles.missionTime}>⏱️ {mission.estimatedTime}</span>
                        <span style={{
                          ...styles.missionUrgency,
                          color: getUrgencyColor(mission.urgency)
                        }}>
                          ⚡ {mission.urgency} urgency
                        </span>
                      </div>
                    </div>
                    <div style={styles.missionReward}>
                      <div style={styles.rewardAmount}>₹{mission.reward}</div>
                      <div style={styles.rewardLabel}>Reward</div>
                    </div>
                  </div>

                  <div style={styles.missionDetails}>
                    <div style={styles.detailRow}>
                      <strong>Pickup:</strong> {mission.pickup}
                    </div>
                    <div style={styles.detailRow}>
                      <strong>Delivery:</strong> {mission.delivery}
                    </div>
                  </div>

                  <div style={styles.missionActions}>
                    <button
                      onClick={() => handleAcceptMission(mission.id)}
                      style={styles.acceptButton}
                      disabled={!isAvailable}
                    >
                      Accept Mission
                    </button>
                    <button style={styles.detailsButton}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'active' && (
          <div>
            <h3 style={styles.sectionTitle}>Active Missions</h3>
            {myMissions.length > 0 ? (
              <div style={styles.missionsList}>
                {myMissions.map((mission) => (
                  <div key={mission.id} style={styles.activeMissionCard}>
                    <div style={styles.missionHeader}>
                      <div style={styles.missionIcon}>
                        {getMissionIcon(mission.type)}
                      </div>
                      <div style={styles.missionInfo}>
                        <h4 style={styles.missionTitle}>{mission.title}</h4>
                        <div style={styles.missionMeta}>
                          <span style={styles.missionStatus}>
                            Status: In Progress ({mission.progress})
                          </span>
                          <span style={styles.missionStarted}>
                            Started: {mission.started}
                          </span>
                        </div>
                      </div>
                      <div style={styles.missionReward}>
                        <div style={styles.rewardAmount}>₹{mission.reward}</div>
                        <div style={styles.rewardLabel}>Reward</div>
                      </div>
                    </div>
                    <div style={styles.missionProgress}>
                      <button style={styles.progressButton}>
                        Mark as Picked Up
                      </button>
                      <button style={styles.progressButton}>
                        Mark as Delivered
                      </button>
                      <button style={styles.cancelButton}>
                        Cancel Mission
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.noMissions}>No active missions</p>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h3 style={styles.sectionTitle}>Mission History</h3>
            <p style={styles.comingSoon}>Mission history coming soon...</p>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div>
            <h3 style={styles.sectionTitle}>Earnings & Rewards</h3>
            <p style={styles.comingSoon}>Earnings dashboard coming soon...</p>
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
  availability: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  availabilityText: {
    color: '#374151',
    fontSize: '16px'
  },
  availabilityButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  available: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  unavailable: {
    backgroundColor: '#fecaca',
    color: '#991b1b'
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
    paddingBottom: '8px',
    flexWrap: 'wrap'
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
  missionCount: {
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '500'
  },
  missionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  missionCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '24px',
    backgroundColor: '#fafafa'
  },
  activeMissionCard: {
    border: '2px solid #10b981',
    borderRadius: '12px',
    padding: '24px',
    backgroundColor: '#f0fdf4'
  },
  missionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '16px'
  },
  missionIcon: {
    fontSize: '2rem',
    marginTop: '4px'
  },
  missionInfo: {
    flex: '1'
  },
  missionTitle: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
    fontSize: '1.1rem'
  },
  missionMeta: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    fontSize: '14px',
    color: '#6b7280'
  },
  missionDistance: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  missionTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  missionUrgency: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: '600'
  },
  missionStatus: {
    color: '#f59e0b',
    fontWeight: '600'
  },
  missionStarted: {
    color: '#6b7280'
  },
  missionReward: {
    textAlign: 'center',
    padding: '8px 12px',
    backgroundColor: '#10b981',
    color: 'white',
    borderRadius: '8px',
    minWidth: '80px'
  },
  rewardAmount: {
    fontWeight: '700',
    fontSize: '1.2rem'
  },
  rewardLabel: {
    fontSize: '12px',
    opacity: '0.9'
  },
  missionDetails: {
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  detailRow: {
    marginBottom: '8px',
    fontSize: '14px',
    color: '#374151'
  },
  missionActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  acceptButton: {
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
  detailsButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  missionProgress: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  progressButton: {
    padding: '10px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  cancelButton: {
    padding: '10px 16px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  noMissions: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.1rem',
    padding: '40px 0'
  },
  comingSoon: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.1rem',
    padding: '40px 0'
  }
};

export default VolunteerDashboard;