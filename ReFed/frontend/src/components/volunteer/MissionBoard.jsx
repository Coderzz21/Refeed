import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MissionBoard = () => {
  const [filters, setFilters] = useState({
    type: 'all',
    distance: '5',
    reward: 'all',
    urgency: 'all'
  });

  const missionTypes = [
    { value: 'all', label: 'All Missions', icon: '🎯' },
    { value: 'food', label: 'Food Delivery', icon: '🍽️' },
    { value: 'clothes', label: 'Clothes Delivery', icon: '👕' },
    { value: 'books', label: 'Books Delivery', icon: '📚' },
    { value: 'essentials', label: 'Essentials', icon: '🏠' },
    { value: 'emergency', label: 'Emergency', icon: '🚨' }
  ];

  // Mock data - replace with actual API calls
  const missions = [
    {
      id: 1,
      type: 'food',
      title: 'Hot Meals Delivery to Elderly Home',
      description: 'Deliver 25 freshly cooked meals to elderly citizens at Sunshine Retirement Home',
      distance: '2.3 km',
      reward: 120,
      urgency: 'high',
      pickup: 'Community Kitchen, Main Street',
      delivery: 'Sunshine Retirement Home, Park Avenue',
      estimatedTime: '45 min',
      items: '25 meals',
      deadline: 'Today, 6:00 PM',
      donor: 'Community Kitchen',
      receiver: 'Sunshine Retirement Home'
    },
    {
      id: 2,
      type: 'clothes',
      title: 'Winter Clothes to Homeless Shelter',
      description: 'Pick up winter clothes collection and deliver to City Homeless Shelter',
      distance: '3.1 km',
      reward: 80,
      urgency: 'medium',
      pickup: 'Donor Residence, Sector 15',
      delivery: 'City Homeless Shelter, Downtown',
      estimatedTime: '35 min',
      items: 'Winter clothes (sweaters, jackets)',
      deadline: 'Tomorrow, 12:00 PM',
      donor: 'Local Residents',
      receiver: 'City Homeless Shelter'
    },
    {
      id: 3,
      type: 'books',
      title: 'Educational Books to School',
      description: 'Deliver educational books and supplies to underprivileged school children',
      distance: '4.2 km',
      reward: 90,
      urgency: 'low',
      pickup: 'Book Donation Center, Library Road',
      delivery: 'Hope Public School, Education Nagar',
      estimatedTime: '50 min',
      items: 'Books, notebooks, pens',
      deadline: '2 days',
      donor: 'Book Donation Center',
      receiver: 'Hope Public School'
    },
    {
      id: 4,
      type: 'emergency',
      title: 'Emergency Medical Supplies',
      description: 'Urgent delivery of medical supplies to community health center',
      distance: '1.5 km',
      reward: 150,
      urgency: 'high',
      pickup: 'Medical Supply Store, Health Street',
      delivery: 'Community Health Center, Main Road',
      estimatedTime: '20 min',
      items: 'Medical supplies, masks, sanitizers',
      deadline: 'ASAP',
      donor: 'Medical Supply Store',
      receiver: 'Community Health Center'
    }
  ];

  const handleAcceptMission = (missionId) => {
    alert(`Mission ${missionId} accepted! You will be redirected to mission details.`);
    // In real app: Update mission status and redirect
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    };
    return colors[urgency] || '#6b7280';
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

  const filteredMissions = missions.filter(mission => {
    if (filters.type !== 'all' && mission.type !== filters.type) {
      return false;
    }
    if (filters.urgency !== 'all' && mission.urgency !== filters.urgency) {
      return false;
    }
    // Add distance and reward filtering logic here
    return true;
  });

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Mission Board</h1>
          <p style={styles.heroSubtitle}>
            Find missions that match your schedule and make an impact in your community
          </p>
        </div>
      </div>

      <div style={styles.content}>
        {/* Filters Section */}
        <div style={styles.filtersSection}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Mission Type</label>
            <div style={styles.typeFilters}>
              {missionTypes.map(type => (
                <button
                  key={type.value}
                  style={{
                    ...styles.typeFilter,
                    ...(filters.type === type.value ? styles.typeFilterActive : {})
                  }}
                  onClick={() => handleFilterChange('type', type.value)}
                >
                  <span style={styles.typeIcon}>{type.icon}</span>
                  <span style={styles.typeLabel}>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={styles.filterRow}>
            <div style={styles.filterItem}>
              <label style={styles.filterLabel}>Distance</label>
              <select
                value={filters.distance}
                onChange={(e) => handleFilterChange('distance', e.target.value)}
                style={styles.select}
              >
                <option value="1">Within 1 km</option>
                <option value="3">Within 3 km</option>
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
                <option value="20">Within 20 km</option>
              </select>
            </div>

            <div style={styles.filterItem}>
              <label style={styles.filterLabel}>Reward</label>
              <select
                value={filters.reward}
                onChange={(e) => handleFilterChange('reward', e.target.value)}
                style={styles.select}
              >
                <option value="all">Any Reward</option>
                <option value="50">₹50+</option>
                <option value="100">₹100+</option>
                <option value="150">₹150+</option>
              </select>
            </div>

            <div style={styles.filterItem}>
              <label style={styles.filterLabel}>Urgency</label>
              <select
                value={filters.urgency}
                onChange={(e) => handleFilterChange('urgency', e.target.value)}
                style={styles.select}
              >
                <option value="all">Any Urgency</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div style={styles.resultsHeader}>
          <h3 style={styles.resultsTitle}>
            {filteredMissions.length} Missions Available
          </h3>
          <div style={styles.sortOptions}>
            <select style={styles.sortSelect}>
              <option>Sort by: Newest</option>
              <option>Sort by: Nearest</option>
              <option>Sort by: Highest Reward</option>
              <option>Sort by: Urgency</option>
            </select>
          </div>
        </div>

        {/* Missions Grid */}
        <div style={styles.missionsGrid}>
          {filteredMissions.map(mission => (
            <div key={mission.id} style={styles.missionCard}>
              <div style={styles.missionHeader}>
                <div style={styles.missionIcon}>
                  {getMissionIcon(mission.type)}
                </div>
                <div style={styles.missionInfo}>
                  <h3 style={styles.missionTitle}>{mission.title}</h3>
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

              <div style={styles.missionDescription}>
                {mission.description}
              </div>

              <div style={styles.missionDetails}>
                <div style={styles.detailSection}>
                  <h4 style={styles.detailTitle}>📍 Route Details</h4>
                  <div style={styles.detailItem}>
                    <strong>Pickup:</strong> {mission.pickup}
                  </div>
                  <div style={styles.detailItem}>
                    <strong>Delivery:</strong> {mission.delivery}
                  </div>
                </div>

                <div style={styles.detailSection}>
                  <h4 style={styles.detailTitle}>📦 Item Details</h4>
                  <div style={styles.detailItem}>
                    <strong>Items:</strong> {mission.items}
                  </div>
                  <div style={styles.detailItem}>
                    <strong>Deadline:</strong> {mission.deadline}
                  </div>
                </div>

                <div style={styles.detailSection}>
                  <h4 style={styles.detailTitle}>👥 People Involved</h4>
                  <div style={styles.detailItem}>
                    <strong>Donor:</strong> {mission.donor}
                  </div>
                  <div style={styles.detailItem}>
                    <strong>Receiver:</strong> {mission.receiver}
                  </div>
                </div>
              </div>

              <div style={styles.missionActions}>
                <button
                  onClick={() => handleAcceptMission(mission.id)}
                  style={styles.acceptButton}
                >
                  Accept Mission
                </button>
                <button style={styles.saveButton}>
                  Save for Later
                </button>
                <button style={styles.shareButton}>
                  Share Mission
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredMissions.length === 0 && (
          <div style={styles.noResults}>
            <div style={styles.noResultsIcon}>🔍</div>
            <h3 style={styles.noResultsTitle}>No missions found</h3>
            <p style={styles.noResultsText}>
              Try adjusting your filters or check back later for new missions.
            </p>
            <button 
              style={styles.resetFiltersButton}
              onClick={() => setFilters({ type: 'all', distance: '5', reward: 'all', urgency: 'all' })}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Volunteer Stats */}
        <div style={styles.volunteerStats}>
          <div style={styles.statCard}>
            <h4 style={styles.statTitle}>Community Impact This Week</h4>
            <div style={styles.statsGrid}>
              <div style={styles.stat}>
                <div style={styles.statNumber}>127</div>
                <div style={styles.statLabel}>Missions Completed</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>₹15,240</div>
                <div style={styles.statLabel}>Volunteer Earnings</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>480+</div>
                <div style={styles.statLabel}>People Helped</div>
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
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
  filtersSection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    marginBottom: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb'
  },
  filterGroup: {
    marginBottom: '30px'
  },
  filterLabel: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: '12px',
    display: 'block',
    fontSize: '14px'
  },
  typeFilters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px'
  },
  typeFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    backgroundColor: '#f9fafb',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    fontWeight: '500'
  },
  typeFilterActive: {
    borderColor: '#f59e0b',
    backgroundColor: '#fef3c7'
  },
  typeIcon: {
    fontSize: '1.2rem'
  },
  filterRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px'
  },
  filterItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  select: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  resultsTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937'
  },
  sortOptions: {
    display: 'flex',
    gap: '12px'
  },
  sortSelect: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  missionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
    gap: '30px',
    marginBottom: '60px'
  },
  missionCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb',
    transition: 'transform 0.2s ease'
  },
  missionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '20px'
  },
  missionIcon: {
    fontSize: '3rem',
    width: '60px',
    textAlign: 'center'
  },
  missionInfo: {
    flex: '1'
  },
  missionTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '12px',
    lineHeight: '1.3'
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
  missionDescription: {
    color: '#4b5563',
    fontSize: '15px',
    lineHeight: '1.5',
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  missionDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '25px'
  },
  detailSection: {
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  detailTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '12px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '8px'
  },
  detailItem: {
    fontSize: '13px',
    color: '#4b5563',
    marginBottom: '8px',
    lineHeight: '1.4'
  },
  missionActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  acceptButton: {
    flex: '1',
    padding: '14px 24px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  saveButton: {
    padding: '14px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  shareButton: {
    padding: '14px 20px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  noResults: {
    textAlign: 'center',
    padding: '80px 40px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb'
  },
  noResultsIcon: {
    fontSize: '4rem',
    marginBottom: '24px',
    opacity: '0.5'
  },
  noResultsTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '16px'
  },
  noResultsText: {
    fontSize: '1.2rem',
    color: '#6b7280',
    maxWidth: '400px',
    margin: '0 auto 32px',
    lineHeight: '1.6'
  },
  resetFiltersButton: {
    padding: '12px 24px',
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  volunteerStats: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb',
    textAlign: 'center'
  },
  statTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '30px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#f59e0b'
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontWeight: '500'
  }
};

export default MissionBoard;