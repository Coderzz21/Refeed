import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const CreateListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'food',
    description: '',
    quantity: '',
    expiryDate: '',
    location: '',
    pickupTime: '',
    images: []
  });

  const categories = [
    { value: 'food', label: 'Food', icon: '🍽️' },
    { value: 'clothes', label: 'Clothes', icon: '👕' },
    { value: 'books', label: 'Books', icon: '📚' },
    { value: 'essentials', label: 'Essentials', icon: '🏠' },
    { value: 'electronics', label: 'Electronics', icon: '📱' },
    { value: 'furniture', label: 'Furniture', icon: '🛋️' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        // For simplicity, send JSON. Image uploads are handled via separate endpoint (/api/listings/:id/images)
        const res = await api.post('/api/listings', formData);
        if (res.data && res.data.success) {
          alert('Listing created successfully!');
          navigate('/donor-dashboard');
        } else {
          alert(res.data?.message || 'Failed to create listing');
        }
      } catch (err) {
        console.error('Create listing error', err);
        alert('Error creating listing');
      }
    })();
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  // Update handleImageUpload to show previews
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file size (5MB max)
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);
    
    if (validFiles.length !== files.length) {
      alert('Some files were too large (max 5MB each)');
    }
    
    setFormData({
      ...formData,
      images: [...formData.images, ...validFiles]
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Create New Listing</h1>
        <p style={styles.subtitle}>Share what you have to donate with the community</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>
          {/* Basic Information */}
          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Basic Information</h3>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Item Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Fresh cooked meals, Winter clothes, Books"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Category *</label>
              <div style={styles.categoryGrid}>
                {categories.map(category => (
                  <label key={category.value} style={styles.categoryOption}>
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={formData.category === category.value}
                      onChange={handleChange}
                      style={styles.radioInput}
                    />
                    <div style={{
                      ...styles.categoryCard,
                      ...(formData.category === category.value ? styles.categoryCardActive : {})
                    }}>
                      <div style={styles.categoryIcon}>{category.icon}</div>
                      <span style={styles.categoryLabel}>{category.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the items, condition, and any important details..."
                style={styles.textarea}
                rows="4"
                required
              />
            </div>

            <div style={styles.inputRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Quantity *</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 5 meals, 10 items, 2 bags"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Expiry Date (if applicable)</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Location & Pickup */}
          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Location & Pickup</h3>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Pickup Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your address or area"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Preferred Pickup Time *</label>
              <input
                type="text"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                placeholder="e.g., Anytime today, 9 AM - 5 PM, Weekend"
                style={styles.input}
                required
              />
            </div>

            {/* Updated Image Upload Section */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Images *</label>
              <div style={styles.uploadArea}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={styles.fileInput}
                  id="image-upload"
                />
                <label htmlFor="image-upload" style={styles.uploadLabel}>
                  <div style={styles.uploadIcon}>📷</div>
                  <div style={styles.uploadText}>
                    <div style={styles.uploadTitle}>Click to upload images</div>
                    <div style={styles.uploadSubtitle}>PNG, JPG, JPEG up to 5MB each</div>
                  </div>
                </label>
              </div>
              
              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div style={styles.imagePreview}>
                  <h4 style={styles.previewTitle}>Selected Images ({formData.images.length})</h4>
                  <div style={styles.previewGrid}>
                    {formData.images.map((image, index) => (
                      <div key={index} style={styles.previewItem}>
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`Preview ${index + 1}`}
                          style={styles.previewImage}
                        />
                        <button 
                          onClick={() => removeImage(index)}
                          style={styles.removeImageBtn}
                        >
                          ×
                        </button>
                        <div style={styles.imageName}>{image.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div style={styles.formActions}>
          <button
            type="button"
            onClick={() => navigate('/donor-dashboard')}
            style={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={styles.submitButton}
          >
            Create Listing
          </button>
        </div>
      </form>

      {/* Tips Section */}
      <div style={styles.tipsSection}>
        <h3 style={styles.tipsTitle}>💡 Donation Tips</h3>
        <div style={styles.tipsGrid}>
          <div style={styles.tipCard}>
            <div style={styles.tipIcon}>📝</div>
            <h4 style={styles.tipTitle}>Be Descriptive</h4>
            <p style={styles.tipText}>Provide clear details about condition, quantity, and any special instructions.</p>
          </div>
          <div style={styles.tipCard}>
            <div style={styles.tipIcon}>🕒</div>
            <h4 style={styles.tipTitle}>Set Realistic Times</h4>
            <p style={styles.tipText}>Choose pickup times that work for your schedule.</p>
          </div>
          <div style={styles.tipCard}>
            <div style={styles.tipIcon}>📸</div>
            <h4 style={styles.tipTitle}>Add Photos</h4>
            <p style={styles.tipText}>Images help receivers make informed decisions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '16px'
  },
  subtitle: {
    fontSize: '1.3rem',
    color: '#6b7280',
    maxWidth: '600px',
    margin: '0 auto'
  },
  form: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    marginBottom: '50px',
    border: '1px solid #e5e7eb'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '50px',
    marginBottom: '40px'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '10px',
    paddingBottom: '10px',
    borderBottom: '2px solid #f3f4f6'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  label: {
    fontWeight: '600',
    color: '#374151',
    fontSize: '14px'
  },
  input: {
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.3s ease'
  },
  textarea: {
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit'
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px'
  },
  categoryOption: {
    cursor: 'pointer'
  },
  radioInput: {
    display: 'none'
  },
  categoryCard: {
    padding: '20px 12px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    backgroundColor: '#f9fafb'
  },
  categoryCardActive: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4'
  },
  categoryIcon: {
    fontSize: '2rem',
    marginBottom: '8px'
  },
  categoryLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  uploadArea: {
    border: '2px dashed #d1d5db',
    borderRadius: '12px',
    padding: '40px 20px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  fileInput: {
    display: 'none'
  },
  uploadLabel: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  uploadIcon: {
    fontSize: '3rem',
    opacity: '0.7'
  },
  uploadText: {
    textAlign: 'center'
  },
  uploadTitle: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: '4px'
  },
  uploadSubtitle: {
    color: '#6b7280',
    fontSize: '14px'
  },
  // Updated Image Preview Styles
  imagePreview: {
    marginTop: '20px'
  },
  previewTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '16px'
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '16px'
  },
  previewItem: {
    position: 'relative',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#f9fafb'
  },
  previewImage: {
    width: '100%',
    height: '120px',
    objectFit: 'cover'
  },
  removeImageBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease'
  },
  imageName: {
    padding: '8px 12px',
    fontSize: '12px',
    color: '#6b7280',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    paddingTop: '30px',
    borderTop: '1px solid #e5e7eb'
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    color: '#374151',
    transition: 'all 0.3s ease'
  },
  submitButton: {
    padding: '12px 32px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  tipsSection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb'
  },
  tipsTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '30px',
    textAlign: 'center'
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px'
  },
  tipCard: {
    textAlign: 'center',
    padding: '24px'
  },
  tipIcon: {
    fontSize: '2.5rem',
    marginBottom: '16px'
  },
  tipTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '8px'
  },
  tipText: {
    color: '#6b7280',
    lineHeight: '1.5'
  }
};

export default CreateListing;