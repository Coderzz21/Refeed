import React, { useState } from 'react';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock user data
  const users = {
    all: [
      { id: 1, name: 'John Doe', email: 'john@email.com', role: 'donor', status: 'active', joined: '2024-01-15', listings: 5 },
      { id: 2, name: 'Sarah Wilson', email: 'sarah@email.com', role: 'receiver', status: 'active', joined: '2024-01-10', requests: 8 },
      { id: 3, name: 'Mike Johnson', email: 'mike@email.com', role: 'volunteer', status: 'active', joined: '2024-01-08', missions: 12 },
      { id: 4, name: 'Community Kitchen', email: 'kitchen@email.com', role: 'donor', status: 'pending', joined: '2024-01-20', listings: 2 },
      { id: 5, name: 'Emma Davis', email: 'emma@email.com', role: 'receiver', status: 'suspended', joined: '2024-01-05', requests: 3 }
    ],
    pending: [
      { id: 4, name: 'Community Kitchen', email: 'kitchen@email.com', role: 'donor', status: 'pending', joined: '2024-01-20', listings: 2 }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      active: '#10b981',
      pending: '#f59e0b',
      suspended: '#ef4444',
      inactive: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const getRoleIcon = (role) => {
    const icons = {
      donor: '🎁',
      receiver: '🙏',
      volunteer: '🦸',
      admin: '👑'
    };
    return icons[role] || '👤';
  };

  const handleStatusChange = (userId, newStatus) => {
    alert(`User ${userId} status changed to ${newStatus}`);
    // API call to update user status
  };

  const filteredUsers = users[activeTab].filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>User Management</h1>
          <p style={styles.subtitle}>Manage platform users and permissions</p>
        </div>
        <div style={styles.headerActions}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.exportButton}>📊 Export Data</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'all' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('all')}
        >
          All Users ({users.all.length})
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'donors' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('donors')}
        >
          Donors
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'receivers' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('receivers')}
        >
          Receivers
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'volunteers' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('volunteers')}
        >
          Volunteers
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'pending' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('pending')}
        >
          Pending ({users.pending.length})
        </button>
      </div>

      {/* Users Table */}
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <div style={styles.tableRow}>
            <div style={styles.colUser}>User</div>
            <div style={styles.colRole}>Role</div>
            <div style={styles.colStatus}>Status</div>
            <div style={styles.colJoined}>Joined</div>
            <div style={styles.colActions}>Actions</div>
          </div>
        </div>

        <div style={styles.tableBody}>
          {filteredUsers.map(user => (
            <div key={user.id} style={styles.tableRow}>
              <div style={styles.colUser}>
                <div style={styles.userInfo}>
                  <div style={styles.userAvatar}>
                    {getRoleIcon(user.role)}
                  </div>
                  <div>
                    <div style={styles.userName}>{user.name}</div>
                    <div style={styles.userEmail}>{user.email}</div>
                  </div>
                </div>
              </div>
              
              <div style={styles.colRole}>
                <span style={{
                  ...styles.roleBadge,
                  backgroundColor: user.role === 'donor' ? '#dbeafe' : 
                                 user.role === 'receiver' ? '#f0fdf4' : 
                                 user.role === 'volunteer' ? '#fef3c7' : '#f3f4f6',
                  color: user.role === 'donor' ? '#1e40af' : 
                         user.role === 'receiver' ? '#065f46' : 
                         user.role === 'volunteer' ? '#92400e' : '#374151'
                }}>
                  {user.role}
                </span>
              </div>
              
              <div style={styles.colStatus}>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(user.status) + '20',
                  color: getStatusColor(user.status)
                }}>
                  {user.status}
                </span>
              </div>
              
              <div style={styles.colJoined}>
                {new Date(user.joined).toLocaleDateString()}
              </div>
              
              <div style={styles.colActions}>
                <select
                  value={user.status}
                  onChange={(e) => handleStatusChange(user.id, e.target.value)}
                  style={styles.statusSelect}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspend</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button style={styles.viewButton}>View</button>
                <button style={styles.messageButton}>Message</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.quickStats}>
        <div style={styles.quickStat}>
          <div style={styles.quickStatNumber}>1,247</div>
          <div style={styles.quickStatLabel}>Total Users</div>
        </div>
        <div style={styles.quickStat}>
          <div style={styles.quickStatNumber}>856</div>
          <div style={styles.quickStatLabel}>Active Today</div>
        </div>
        <div style={styles.quickStat}>
          <div style={styles.quickStatNumber}>23</div>
          <div style={styles.quickStatLabel}>Pending Approval</div>
        </div>
        <div style={styles.quickStat}>
          <div style={styles.quickStatNumber}>12</div>
          <div style={styles.quickStatLabel}>Suspended</div>
        </div>
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
  headerActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  searchInput: {
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    minWidth: '250px'
  },
  exportButton: {
    padding: '10px 16px',
    backgroundColor: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer'
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
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    marginBottom: '30px'
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0'
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr',
    gap: '16px',
    padding: '16px 20px',
    alignItems: 'center',
    borderBottom: '1px solid #f1f5f9'
  },
  colUser: {
    fontWeight: '500'
  },
  colRole: {
    textAlign: 'center'
  },
  colStatus: {
    textAlign: 'center'
  },
  colJoined: {
    textAlign: 'center',
    color: '#64748b'
  },
  colActions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  userAvatar: {
    fontSize: '1.5rem',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px'
  },
  userName: {
    fontWeight: '600',
    color: '#1e293b'
  },
  userEmail: {
    fontSize: '14px',
    color: '#64748b'
  },
  roleBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  statusSelect: {
    padding: '6px 8px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '12px',
    backgroundColor: 'white'
  },
  viewButton: {
    padding: '6px 12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  messageButton: {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  tableBody: {
    maxHeight: '600px',
    overflowY: 'auto'
  },
  quickStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px'
  },
  quickStat: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  },
  quickStatNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px'
  },
  quickStatLabel: {
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500'
  }
};

export default UserManagement;