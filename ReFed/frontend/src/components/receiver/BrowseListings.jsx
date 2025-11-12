import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const BrowseListings = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    distance: '5',
    sortBy: 'newest'
  });

  const categories = [
    { value: 'all', label: 'All Categories', icon: '📦' },
    { value: 'food', label: 'Food', icon: '🍽️' },
    { value: 'clothes', label: 'Clothes', icon: '👕' },
    { value: 'books', label: 'Books', icon: '📚' },
    { value: 'essentials', label: 'Essentials', icon: '🏠' },
    { value: 'electronics', label: 'Electronics', icon: '📱' }
  ];

  // Helper function to get category icon
  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(cat => cat.value === category);
    return categoryObj ? categoryObj.icon : '📦';
  };

  const [listings, setListings] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get('/api/listings');
        if (res.data && res.data.success && mounted) {
          setListings(res.data.listings || []);
        }
      } catch (err) {
        console.error('Error fetching listings', err);
      }
    })();
    return () => { mounted = false };
  }, []);

  const handleRequest = async (listingId) => {
    try {
      const res = await api.post(`/api/listings/${listingId}/claim`);
      if (res.data && res.data.success) {
        alert('Request successful');
        // Update local listing status
        setListings(prev => prev.map(l => l._id === listingId ? res.data.listing : l));
      } else {
        alert(res.data?.message || 'Request failed');
      }
    } catch (err) {
      console.error('Claim error', err);
      alert('Error sending request');
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  const filteredListings = listings.filter(listing => {
    if (filters.category !== 'all' && listing.category !== filters.category) {
      return false;
    }
    // Add distance filtering logic here
    return true;
  });

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Browse Available Items</h1>
          <p style={styles.heroSubtitle}>
            Find food, clothes, and essentials shared by your community
          </p>
        </div>
      </div>

      <div style={styles.content}>
        {/* Filters Section */}
        <div style={styles.filtersSection}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Category</label>
            <div style={styles.categoryFilters}>
              {categories.map(category => (
                <button
                  key={category.value}
                  style={{
                    ...styles.categoryFilter,
                    ...(filters.category === category.value ? styles.categoryFilterActive : {})
                  }}
                  onClick={() => handleFilterChange('category', category.value)}
                >
                  <span style={styles.categoryIcon}>{category.icon}</span>
                  <span style={styles.categoryLabel}>{category.label}</span>
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
              </select>
            </div>

            <div style={styles.filterItem}>
              <label style={styles.filterLabel}>Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                style={styles.select}
              >
                <option value="newest">Newest First</option>
                <option value="nearest">Nearest First</option>
                <option value="quantity">Highest Quantity</option>
              </select>
            </div>

            <div style={styles.filterItem}>
              <label style={styles.filterLabel}>Search</label>
              <input
                type="text"
                placeholder="Search items..."
                style={styles.searchInput}
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={styles.resultsHeader}>
          <h3 style={styles.resultsTitle}>
            {filteredListings.length} Items Available
          </h3>
          <div style={styles.viewToggle}>
            <button style={styles.viewButton}>Grid</button>
            <button style={styles.viewButton}>List</button>
          </div>
        </div>

        {/* Listings Grid */}
        <div style={styles.listingsGrid}>
          {filteredListings.map(listing => (
            <div key={listing.id} style={styles.listingCard}>
              {/* Updated Image Section */}
              <div style={styles.listingImageSection}>
                {listing.images && listing.images.length > 0 ? (
                  <div style={styles.imageCarousel}>
                    <img 
                      src={listing.images[0]} 
                      alt={listing.title}
                      style={styles.listingImage}
                    />
                    {listing.images.length > 1 && (
                      <div style={styles.imageCountBadge}>
                        +{listing.images.length - 1}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={styles.placeholderImage}>
                    {getCategoryIcon(listing.category)}
                  </div>
                )}
              </div>

              <div style={styles.listingInfo}>
                <h3 style={styles.listingTitle}>{listing.title}</h3>
                <p style={styles.listingDonor}>by {listing.donor}</p>
                <div style={styles.listingMeta}>
                  <span style={styles.metaItem}>📍 {listing.distance}</span>
                  <span style={styles.metaItem}>⏰ {listing.posted}</span>
                </div>
              </div>

              <div style={styles.listingDescription}>
                {listing.description}
              </div>

              <div style={styles.listingDetails}>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Quantity:</span>
                  <span style={styles.detailValue}>{listing.quantity} available</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Expires:</span>
                  <span style={styles.detailValue}>{listing.expiry}</span>
                </div>
              </div>

              <div style={styles.listingActions}>
                <button
                  onClick={() => handleRequest(listing.id)}
                  style={styles.requestButton}
                >
                  Request Item
                </button>
                <button style={styles.detailsButton}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredListings.length === 0 && (
          <div style={styles.noResults}>
            <div style={styles.noResultsIcon}>🔍</div>
            <h3 style={styles.noResultsTitle}>No items found</h3>
            <p style={styles.noResultsText}>
              Try adjusting your filters or check back later for new listings.
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div style={styles.quickStats}>
          <div style={styles.statCard}>
            <h4 style={styles.statTitle}>Community Impact</h4>
            <div style={styles.statsGrid}>
              <div style={styles.stat}>
                <div style={styles.statNumber}>1,250+</div>
                <div style={styles.statLabel}>Items Shared</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>500+</div>
                <div style={styles.statLabel}>Families Helped</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>2.5T</div>
                <div style={styles.statLabel}>Waste Reduced</div>
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
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
  categoryFilters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px'
  },
  categoryFilter: {
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
  categoryFilterActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff'
  },
  categoryIcon: {
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
  searchInput: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px'
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  resultsTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937'
  },
  viewToggle: {
    display: 'flex',
    gap: '8px'
  },
  viewButton: {
    padding: '8px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px'
  },
  listingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '30px',
    marginBottom: '60px'
  },
  listingCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '25px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb',
    transition: 'transform 0.2s ease',
    display: 'flex',
    flexDirection: 'column'
  },
  // Updated Image Section Styles
  listingImageSection: {
    marginBottom: '16px'
  },
  imageCarousel: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    height: '200px'
  },
  listingImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '12px'
  },
  imageCountBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  placeholderImage: {
    width: '100%',
    height: '200px',
    backgroundColor: '#f3f4f6',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    color: '#6b7280'
  },
  listingInfo: {
    marginBottom: '16px'
  },
  listingTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px',
    lineHeight: '1.3'
  },
  listingDonor: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '8px'
  },
  listingMeta: {
    display: 'flex',
    gap: '12px',
    fontSize: '12px',
    color: '#6b7280'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  listingDescription: {
    color: '#4b5563',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '20px',
    flex: '1'
  },
  listingDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px'
  },
  detailLabel: {
    color: '#6b7280',
    fontWeight: '500'
  },
  detailValue: {
    color: '#374151',
    fontWeight: '600'
  },
  listingActions: {
    display: 'flex',
    gap: '12px'
  },
  requestButton: {
    flex: '1',
    padding: '12px 20px',
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
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  noResults: {
    textAlign: 'center',
    padding: '80px 40px'
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
    margin: '0 auto',
    lineHeight: '1.6'
  },
  quickStats: {
    maxWidth: '600px',
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
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#3b82f6'
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontWeight: '500'
  }
};

export default BrowseListings;