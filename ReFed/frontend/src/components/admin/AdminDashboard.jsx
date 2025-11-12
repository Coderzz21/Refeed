import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock admin data
  const adminStats = {
    totalUsers: 1247,
    activeListings: 89,
    completedDonations: 456,
    pendingApprovals: 23,
    totalRevenue: 12500,
    platformGrowth: '+12%'
  };

  const recentActivities = [
    { id: 1, type: 'user', action: 'New user registered', time: '5 min ago', user: 'John Doe' },
    { id: 2, type: 'listing', action: 'New listing posted', time: '15 min ago', user: 'Community Kitchen' },
    { id: 3, type: 'donation', action: 'Donation completed', time: '1 hour ago', user: 'Sarah Wilson' },
    { id: 4, type: 'volunteer', action: 'Mission completed', time: '2 hours ago', user: 'Mike Johnson' }
  ];

  const quickStats = [
    { label: 'Users Online', value: '47', color: '#10b981' },
    { label: 'Pending Moderation', value: '12', color: '#f59e0b' },
    { label: 'Support Tickets', value: '8', color: '#ef4444' },
    { label: 'System Health', value: '100%', color: '#3b82f6' }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>Platform Overview & Management</p>
        </div>
        <div style={styles.adminActions}>
          <button style={styles.primaryButton}>📊 Generate Report</button>
          <button style={styles.secondaryButton}>⚙️ Settings</button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.quickStats}>
        {quickStats.map((stat, index) => (
          <div key={index} style={styles.quickStatCard}>
            <div style={styles.quickStatValue}>{stat.value}</div>
            <div style={styles.quickStatLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <h3 style={styles.statTitle}>Total Users</h3>
            <div style={styles.statTrend}>📈 +5%</div>
          </div>
          <div style={styles.statNumber}>{adminStats.totalUsers}</div>
          <div style={styles.statBreakdown}>
            <span>Donors: 456</span>
            <span>Receivers: 634</span>
            <span>Volunteers: 157</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <h3 style={styles.statTitle}>Active Listings</h3>
            <div style={styles.statTrend}>🔄 89</div>
          </div>
          <div style={styles.statNumber}>{adminStats.activeListings}</div>
          <div style={styles.statBreakdown}>
            <span>Food: 34</span>
            <span>Clothes: 28</span>
            <span>Other: 27</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <h3 style={styles.statTitle}>Completed Donations</h3>
            <div style={styles.statTrend}>✅ 456</div>
          </div>
          <div style={styles.statNumber}>{adminStats.completedDonations}</div>
          <div style={styles.statBreakdown}>
            <span>This Week: 45</span>
            <span>This Month: 189</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <h3 style={styles.statTitle}>Platform Revenue</h3>
            <div style={styles.statTrend}>💰 ₹12.5k</div>
          </div>
          <div style={styles.statNumber}>₹{adminStats.totalRevenue}</div>
          <div style={styles.statBreakdown}>
            <span>Fees: ₹8,200</span>
            <span>Donations: ₹4,300</span>
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
          📊 Overview
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'users' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('users')}
        >
          👥 User Management
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'moderation' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('moderation')}
        >
          ⚡ Quick Actions
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'analytics' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
      </div>

      {/* Tab Content */}
      <div style={styles.tabContent}>
        {activeTab === 'overview' && (
          <div style={styles.overviewContent}>
            {/* Recent Activity */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Recent Activity</h3>
              <div style={styles.activityList}>
                {recentActivities.map(activity => (
                  <div key={activity.id} style={styles.activityItem}>
                    <div style={styles.activityIcon}>
                      {activity.type === 'user' && '👤'}
                      {activity.type === 'listing' && '📦'}
                      {activity.type === 'donation' && '🎁'}
                      {activity.type === 'volunteer' && '🦸'}
                    </div>
                    <div style={styles.activityInfo}>
                      <div style={styles.activityText}>{activity.action}</div>
                      <div style={styles.activityMeta}>by {activity.user} • {activity.time}</div>
                    </div>
                    <button style={styles.viewButton}>View</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Quick Actions</h3>
              <div style={styles.actionsGrid}>
                <Link to="/admin/users" style={styles.actionCard}>
                  <div style={styles.actionIcon}>👥</div>
                  <div style={styles.actionText}>Manage Users</div>
                </Link>
                <div style={styles.actionCard}>
                  <div style={styles.actionIcon}>📋</div>
                  <div style={styles.actionText}>Moderate Content</div>
                </div>
                <div style={styles.actionCard}>
                  <div style={styles.actionIcon}>📊</div>
                  <div style={styles.actionText}>View Reports</div>
                </div>
                <div style={styles.actionCard}>
                  <div style={styles.actionIcon}>⚙️</div>
                  <div style={styles.actionText}>System Settings</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div style={styles.comingSoon}>
            <div style={styles.comingSoonIcon}>👥</div>
            <h3>User Management</h3>
            <p>Detailed user management interface coming soon...</p>
            <Link to="/admin/user-management" style={styles.primaryButton}>
              Go to User Management
            </Link>
          </div>
        )}

        {activeTab === 'moderation' && (
          <div style={styles.comingSoon}>
            <div style={styles.comingSoonIcon}>⚡</div>
            <h3>Quick Actions</h3>
            <p>Quick moderation tools coming soon...</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={styles.comingSoon}>
            <div style={styles.comingSoonIcon}>📈</div>
            <h3>Analytics Dashboard</h3>
            <p>Advanced analytics and reporting coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#64748b'
  },
  adminActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  primaryButton: {
    padding: '12px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px'
  },
  secondaryButton: {
    padding: '12px 20px',
    backgroundColor: '#e2e8f0',
    color: '#475569',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px'
  },
  quickStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  quickStatCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  },
  quickStatValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px'
  },
  quickStatLabel: {
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  statTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#374151',
    margin: 0
  },
  statTrend: {
    fontSize: '14px',
    color: '#059669',
    fontWeight: '600'
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px'
  },
  statBreakdown: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '14px',
    color: '#64748b'
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
    flexWrap: 'wrap'
  },
  tab: {
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#64748b'
  },
  activeTab: {
    backgroundColor: '#3b82f6',
    color: 'white'
  },
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    minHeight: '400px'
  },
  overviewContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column'
  },
  sectionTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '20px'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  activityIcon: {
    fontSize: '1.2rem',
    width: '32px',
    textAlign: 'center'
  },
  activityInfo: {
    flex: '1'
  },
  activityText: {
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px'
  },
  activityMeta: {
    fontSize: '12px',
    color: '#64748b'
  },
  viewButton: {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  actionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '24px 16px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  actionIcon: {
    fontSize: '2rem'
  },
  actionText: {
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center'
  },
  comingSoon: {
    textAlign: 'center',
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  },
  comingSoonIcon: {
    fontSize: '4rem',
    marginBottom: '16px',
    opacity: '0.7'
  }
};

export default AdminDashboard;