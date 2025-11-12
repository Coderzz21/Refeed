import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DonateFood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodType: '',
    title: '',
    description: '',
    quantity: '',
    servings: '',
    expiryDate: '',
    storageInstructions: '',
    ingredients: '',
    dietaryInfo: [],
    allergens: [],
    preparationTime: '',
    pickupAddress: '',
    availableUntil: '',
    contactInfo: '',
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const foodTypes = [
    'Cooked Meals', 'Packaged Food', 'Fresh Produce', 'Bakery Items', 
    'Dairy Products', 'Beverages', 'Groceries', 'Other'
  ];

  const dietaryInfoOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
    'Nut-Free', 'Halal', 'Kosher', 'Organic'
  ];

  const commonAllergens = [
    'Nuts', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish', 'None'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newImagePreviews]);
    
    // In a real app, you would upload files to cloud storage and get URLs
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files] // Store file objects or URLs
    }));
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const getCategoryIcon = (foodType) => {
    const icons = {
      'Cooked Meals': '🍽️',
      'Packaged Food': '📦',
      'Fresh Produce': '🍎',
      'Bakery Items': '🥐',
      'Dairy Products': '🥛',
      'Beverages': '🧃',
      'Groceries': '🛒',
      'Other': '📦'
    };
    return icons[foodType] || '🍽️';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Food donation data:', formData);
    alert('Thank you for donating food! Your listing will help feed people in need.');
    navigate('/browse');
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Donate Food</h1>
          <p style={styles.heroSubtitle}>
            Share nutritious food and help fight hunger in your community
          </p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Food Donation Details</h2>
            <p style={styles.formSubtitle}>
              Please provide accurate information to ensure food safety and proper matching.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Food Basic Information */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>1. Food Information</h3>
              
              {/* Image Upload Section */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Food Images</label>
                <div style={styles.imageUploadSection}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={styles.fileInput}
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" style={styles.imageUploadLabel}>
                    <div style={styles.uploadPlaceholder}>
                      <span style={styles.uploadIcon}>📸</span>
                      <span style={styles.uploadText}>Click to upload food images</span>
                      <span style={styles.uploadSubtext}>Multiple images allowed</span>
                    </div>
                  </label>
                  
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div style={styles.imagePreviews}>
                      {imagePreviews.map((preview, index) => (
                        <div key={index} style={styles.imagePreviewItem}>
                          <div style={styles.imageCarousel}>
                            <img 
                              src={preview} 
                              alt={`Food preview ${index + 1}`}
                              style={styles.listingImage}
                            />
                            {imagePreviews.length > 1 && (
                              <div style={styles.imageCountBadge}>
                                +{imagePreviews.length - 1}
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              style={styles.removeImageButton}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Placeholder when no images */}
                  {imagePreviews.length === 0 && (
                    <div style={styles.placeholderImageSection}>
                      <div style={styles.placeholderImage}>
                        {getCategoryIcon(formData.foodType)}
                      </div>
                      <p style={styles.placeholderText}>
                        Add photos to help recipients see your food donation
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Food Type *</label>
                  <select
                    name="foodType"
                    value={formData.foodType}
                    onChange={handleChange}
                    style={styles.select}
                    required
                  >
                    <option value="">Select food type</option>
                    {foodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
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
                    placeholder="e.g., Fresh vegetable curry, Packaged rice, Fruits"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Quantity *</label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="e.g., 2 kg, 10 plates, 5 packages"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Servings</label>
                  <input
                    type="number"
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Approximate number of servings"
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
                  placeholder="Describe the food in detail. Include cooking method, taste, etc."
                  rows="3"
                  required
                />
              </div>
            </div>

            {/* Food Safety & Dietary Info */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>2. Food Safety & Dietary Information</h3>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Expiry Date *</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Preparation Time</label>
                  <input
                    type="text"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="e.g., 2 hours ago, This morning"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Storage Instructions *</label>
                <textarea
                  name="storageInstructions"
                  value={formData.storageInstructions}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="How should this food be stored? (Refrigerated, Frozen, Room temperature)"
                  rows="2"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Ingredients</label>
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="List main ingredients used"
                  rows="2"
                />
              </div>

              {/* Dietary Information */}
              <div style={styles.checkboxSection}>
                <label style={styles.checkboxLabel}>Dietary Information</label>
                <div style={styles.checkboxGrid}>
                  {dietaryInfoOptions.map(option => (
                    <label key={option} style={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={formData.dietaryInfo.includes(option)}
                        onChange={() => handleCheckboxChange('dietaryInfo', option)}
                        style={styles.checkbox}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Allergens */}
              <div style={styles.checkboxSection}>
                <label style={styles.checkboxLabel}>Contains Allergens</label>
                <div style={styles.checkboxGrid}>
                  {commonAllergens.map(allergen => (
                    <label key={allergen} style={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={formData.allergens.includes(allergen)}
                        onChange={() => handleCheckboxChange('allergens', allergen)}
                        style={styles.checkbox}
                      />
                      {allergen}
                    </label>
                  ))}
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
                Donate Food
              </button>
            </div>
          </form>
        </div>

        {/* Food Safety Tips Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.tipsCard}>
            <h3 style={styles.tipsTitle}>🍽️ Food Safety Tips</h3>
            <div style={styles.tipsList}>
              <div style={styles.tipItem}>
                <strong>Freshness:</strong> Only donate food that you would consume yourself.
              </div>
              <div style={styles.tipItem}>
                <strong>Temperature:</strong> Keep hot food hot and cold food cold during storage.
              </div>
              <div style={styles.tipItem}>
                <strong>Packaging:</strong> Use airtight containers to maintain freshness.
              </div>
              <div style={styles.tipItem}>
                <strong>Allergens:</strong> Clearly mention all potential allergens.
              </div>
              <div style={styles.tipItem}>
                <strong>Preparation:</strong> Mention when the food was prepared.
              </div>
            </div>
          </div>

          <div style={styles.impactCard}>
            <h3 style={styles.impactTitle}>🌟 Food Impact</h3>
            <div style={styles.impactStats}>
              <div style={styles.impactStat}>
                <div style={styles.statNumber}>3-5</div>
                <div style={styles.statLabel}>People Fed</div>
              </div>
              <div style={styles.impactStat}>
                <div style={styles.statNumber}>2kg</div>
                <div style={styles.statLabel}>Waste Prevented</div>
              </div>
              <div style={styles.impactStat}>
                <div style={styles.statNumber}>₹300+</div>
                <div style={styles.statLabel}>Value Created</div>
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
  imageUploadSection: {
    border: '2px dashed #d1d5db',
    borderRadius: '12px',
    padding: '20px',
    transition: 'border-color 0.3s ease'
  },
  fileInput: {
    display: 'none'
  },
  imageUploadLabel: {
    display: 'block',
    cursor: 'pointer'
  },
  uploadPlaceholder: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#6b7280',
    transition: 'color 0.3s ease'
  },
  uploadIcon: {
    fontSize: '3rem',
    marginBottom: '16px',
    display: 'block'
  },
  uploadText: {
    fontSize: '1.2rem',
    fontWeight: '600',
    display: 'block',
    marginBottom: '8px'
  },
  uploadSubtext: {
    fontSize: '1rem',
    opacity: '0.7'
  },
  imagePreviews: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
    marginTop: '20px'
  },
  imagePreviewItem: {
    position: 'relative'
  },
  imageCarousel: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    height: '120px'
  },
  listingImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  imageCountBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600'
  },
  removeImageButton: {
    position: 'absolute',
    top: '8px',
    left: '8px',
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
    justifyContent: 'center'
  },
  placeholderImageSection: {
    textAlign: 'center',
    padding: '20px'
  },
  placeholderImage: {
    width: '80px',
    height: '80px',
    backgroundColor: '#f3f4f6',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    color: '#6b7280',
    margin: '0 auto 16px'
  },
  placeholderText: {
    color: '#6b7280',
    fontSize: '1rem'
  },
  checkboxSection: {
    marginBottom: '24px'
  },
  checkboxLabel: {
    fontWeight: '600',
    color: '#374151',
    fontSize: '1.1rem',
    marginBottom: '16px',
    display: 'block'
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  checkboxItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px'
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
    backgroundColor: '#f59e0b',
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
  tipsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  tipItem: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#6b7280'
  },
  impactCard: {
    backgroundColor: '#f59e0b',
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

export default DonateFood;