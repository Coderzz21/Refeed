import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DonateEssentials = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemType: '',
    title: '',
    description: '',
    quantity: '',
    category: '',
    condition: 'good',
    usageInstructions: '',
    safetyInfo: '',
    requiresAssembly: '',
    ageSuitability: '',
    brand: '',
    pickupAddress: '',
    availableUntil: '',
    contactInfo: '',
    images: []
  });

  const itemTypes = [
    'Kitchen Utensils', 'Home Decor', 'Furniture', 'Electronics',
    'Toys & Games', 'Sports Equipment', 'Medical Aids', 'Baby Items',
    'Stationery', 'Tools', 'Beauty Products', 'Other'
  ];

  const categories = [
    'Household Items', 'Personal Care', 'Educational', 'Recreational',
    'Medical', 'Baby & Kids', 'Tools & Equipment', 'Other'
  ];

  const conditions = [
    'Excellent - Like new',
    'Very Good - Minimal use',
    'Good - Normal wear',
    'Fair - Functional but worn',
    'Needs Repair - Requires fixing'
  ];

  const ageSuitability = [
    'All Ages', 'Adults Only', 'Children (3+)', 'Children (8+)',
    'Teens (13+)', 'Seniors', 'Not Specified'
  ];

  const requiresAssemblyOptions = ['No', 'Yes - Simple', 'Yes - Complex', 'Not Sure'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Essentials donation data:', formData);
    alert('Thank you for donating essential items! They will make someone\'s life better.');
    navigate('/browse');
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Donate Essentials</h1>
          <p style={styles.heroSubtitle}>
            Share household items and essentials to improve quality of life
          </p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Essential Items Donation Details</h2>
            <p style={styles.formSubtitle}>
              Please provide accurate information about the items you're donating.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Item Basic Information */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>1. Item Information</h3>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Item Type *</label>
                  <select
                    name="itemType"
                    value={formData.itemType}
                    onChange={handleChange}
                    style={styles.select}
                    required
                  >
                    <option value="">Select type</option>
                    {itemTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={styles.select}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="e.g., Pressure cooker, Study table, Cricket kit"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Number of items"
                    required
                  />
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Condition *</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    style={styles.select}
                    required
                  >
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Requires Assembly</label>
                  <select
                    name="requiresAssembly"
                    value={formData.requiresAssembly}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">Select option</option>
                    {requiresAssemblyOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Age Suitability</label>
                  <select
                    name="ageSuitability"
                    value={formData.ageSuitability}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">Select suitability</option>
                    {ageSuitability.map(age => (
                      <option key={age} value={age}>{age}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Brand name (if known)"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Describe the item in detail. Include features, dimensions, materials, etc."
                  rows="3"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Usage Instructions</label>
                <textarea
                  name="usageInstructions"
                  value={formData.usageInstructions}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="How to use this item? Any special instructions?"
                  rows="2"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Safety Information</label>
                <textarea
                  name="safetyInfo"
                  value={formData.safetyInfo}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Any safety precautions? Age restrictions? Maintenance requirements?"
                  rows="2"
                />
              </div>
            </div>

            {/* Item Images Section */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>2. Item Photos</h3>
              <p style={styles.imageDescription}>
                Add clear photos of the items from different angles to show condition, size, and features.
              </p>
              
              <div style={styles.imageUploadSection}>
                <div style={styles.uploadArea}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={styles.fileInput}
                    id="essentials-images-upload"
                  />
                  <label htmlFor="essentials-images-upload" style={styles.uploadLabel}>
                    <div style={styles.uploadIcon}>📷</div>
                    <div style={styles.uploadText}>
                      <div style={styles.uploadTitle}>Click to upload item photos</div>
                      <div style={styles.uploadSubtitle}>PNG, JPG up to 5MB each</div>
                    </div>
                  </label>
                </div>

                {/* Image Previews */}
                {formData.images.length > 0 && (
                  <div style={styles.imagePreview}>
                    <h4 style={styles.previewTitle}>
                      Selected Photos ({formData.images.length})
                    </h4>
                    <div style={styles.previewGrid}>
                      {formData.images.map((image, index) => (
                        <div key={index} style={styles.previewItem}>
                          <img 
                            src={URL.createObjectURL(image)} 
                            alt={`Item preview ${index + 1}`}
                            style={styles.previewImage}
                          />
                          <button 
                            onClick={() => removeImage(index)}
                            style={styles.removeImageBtn}
                            title="Remove image"
                          >
                            ×
                          </button>
                          <div style={styles.imageName}>{image.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Tips */}
                <div style={styles.imageTips}>
                  <strong>📸 Photo Tips for Essentials:</strong>
                  <ul style={styles.tipsList}>
                    <li>Take photos from multiple angles</li>
                    <li>Show any damage or special features clearly</li>
                    <li>Include photos of labels, tags, or instructions</li>
                    <li>Show size comparison with common objects</li>
                    <li>Good lighting shows true condition and colors</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pickup Information */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>3. Pickup Details</h3>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Pickup Address *</label>
                  <input
                    type="text"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Enter full address for pickup"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Available Until *</label>
                  <input
                    type="datetime-local"
                    name="availableUntil"
                    value={formData.availableUntil}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Contact Information *</label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Phone number or email"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div style={styles.actions}>
              <button
                type="button"
                onClick={() => navigate('/donate')}
                style={styles.cancelBtn}
              >
                Back to Categories
              </button>
              <button
                type="submit"
                style={styles.submitBtn}
              >
                Donate Items
              </button>
            </div>
          </form>
        </div>

        {/* Essentials Donation Tips Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.tipsCard}>
            <h3 style={styles.tipsTitle}>🏠 Essentials Donation Tips</h3>
            <div style={styles.tipsList}>
              <div style={styles.tipItem}>
                <strong>Clean & Functional:</strong> Ensure items are clean and working properly.
              </div>
              <div style={styles.tipItem}>
                <strong>Complete Sets:</strong> Include all parts and accessories.
              </div>
              <div style={styles.tipItem}>
                <strong>Safety First:</strong> Mention any safety requirements clearly.
              </div>
              <div style={styles.tipItem}>
                <strong>Assembly Info:</strong> Specify if assembly is required.
              </div>
              <div style={styles.tipItem}>
                <strong>Packaging:</strong> Use appropriate packaging for fragile items.
              </div>
            </div>
          </div>

          <div style={styles.impactCard}>
            <h3 style={styles.impactTitle}>🌟 Essentials Impact</h3>
            <div style={styles.impactStats}>
              <div style={styles.impactStat}>
                <div style={styles.statNumber}>3-5</div>
                <div style={styles.statLabel}>Families</div>
              </div>
              <div style={styles.impactStat}>
                <div style={styles.statNumber}>₹800+</div>
                <div style={styles.statLabel}>Value Created</div>
              </div>
              <div style={styles.impactStat}>
                <div style={styles.statNumber}>Quality</div>
                <div style={styles.statLabel}>Improved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Complete CSS Styles for Essentials
const styles = {
  container: {
    width: '100vw',
    minHeight: '100vh'
  },
  hero: {
    background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
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
    padding: '60px 0',
    width: '100vw',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '60px',
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '60px 40px'
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '60px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
  },
  formHeader: {
    marginBottom: '50px',
    textAlign: 'center'
  },
  formTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '16px'
  },
  formSubtitle: {
    fontSize: '1.3rem',
    color: '#6b7280',
    lineHeight: '1.6'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '50px'
  },
  section: {
    paddingBottom: '40px',
    borderBottom: '1px solid #e5e7eb'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '30px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '24px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  label: {
    fontWeight: '600',
    color: '#374151',
    fontSize: '1.1rem'
  },
  input: {
    padding: '16px 20px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1.1rem',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    width: '100%'
  },
  select: {
    padding: '16px 20px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1.1rem',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    width: '100%',
    backgroundColor: 'white'
  },
  textarea: {
    padding: '16px 20px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1.1rem',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    width: '100%',
    minHeight: '80px'
  },
  // Image Upload Styles
  imageDescription: {
    color: '#6b7280',
    fontSize: '1rem',
    marginBottom: '20px',
    lineHeight: '1.5'
  },
  imageUploadSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  uploadArea: {
    border: '2px dashed #d1d5db',
    borderRadius: '12px',
    padding: '40px 20px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: '#fafafa'
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
    marginBottom: '4px',
    fontSize: '1.1rem'
  },
  uploadSubtitle: {
    color: '#6b7280',
    fontSize: '14px'
  },
  imagePreview: {
    marginTop: '16px'
  },
  previewTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '16px'
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '16px'
  },
  previewItem: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e5e7eb'
  },
  previewImage: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    display: 'block'
  },
  removeImageBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1'
  },
  imageName: {
    padding: '8px',
    fontSize: '12px',
    color: '#374151',
    backgroundColor: 'white',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  imageTips: {
    padding: '16px',
    backgroundColor: '#f0f9ff',
    borderRadius: '8px',
    border: '1px solid #bae6fd',
    fontSize: '14px',
    color: '#0369a1'
  },
  tipsList: {
    margin: '8px 0 0 0',
    paddingLeft: '20px'
  },
  actions: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-end',
    marginTop: '40px'
  },
  cancelBtn: {
    padding: '16px 32px',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  submitBtn: {
    padding: '16px 40px',
    backgroundColor: '#14b8a6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  tipsCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb'
  },
  tipsTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '24px'
  },
  tipItem: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#6b7280'
  },
  impactCard: {
    backgroundColor: '#14b8a6',
    color: 'white',
    borderRadius: '16px',
    padding: '40px',
    textAlign: 'center'
  },
  impactTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '30px'
  },
  impactStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  impactStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  statNumber: {
    fontSize: '1.8rem',
    fontWeight: '700'
  },
  statLabel: {
    fontSize: '0.9rem',
    opacity: '0.9'
  }
};

export default DonateEssentials;