import React, { useState } from 'react';

const ImageUpload = ({ onImagesChange, maxImages = 5, existingImages = [] }) => {
  const [images, setImages] = useState(existingImages);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        alert(`${file.name} is not a supported image format (JPEG, PNG, WebP only)`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    const newImages = [...images, ...validFiles];
    setImages(newImages);
    onImagesChange(newImages);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div style={styles.container}>
      <div style={styles.uploadArea}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          style={styles.fileInput}
          id="image-upload"
          disabled={images.length >= maxImages}
        />
        <label htmlFor="image-upload" style={styles.uploadLabel}>
          <div style={styles.uploadIcon}>📷</div>
          <div style={styles.uploadText}>
            <div style={styles.uploadTitle}>
              {images.length === 0 ? 'Upload Images' : `Add More Images (${images.length}/${maxImages})`}
            </div>
            <div style={styles.uploadSubtitle}>
              PNG, JPG, WebP up to 5MB each
            </div>
          </div>
        </label>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div style={styles.previewSection}>
          <div style={styles.previewHeader}>
            <h4 style={styles.previewTitle}>Selected Images</h4>
            <span style={styles.imageCount}>({images.length}/{maxImages})</span>
          </div>
          <div style={styles.previewGrid}>
            {images.map((image, index) => (
              <div key={index} style={styles.previewItem}>
                <img 
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)} 
                  alt={`Preview ${index + 1}`}
                  style={styles.previewImage}
                />
                <button 
                  onClick={() => removeImage(index)}
                  style={styles.removeButton}
                  title="Remove image"
                >
                  ×
                </button>
                {typeof image !== 'string' && (
                  <div style={styles.imageInfo}>
                    <div style={styles.imageName}>{image.name}</div>
                    <div style={styles.imageSize}>
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Tips */}
      <div style={styles.tips}>
        <strong>💡 Tips for better images:</strong>
        <ul style={styles.tipsList}>
          <li>Use good lighting</li>
          <li>Show items clearly</li>
          <li>Include multiple angles</li>
          <li>Show any damages or special features</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%'
  },
  uploadArea: {
    border: '2px dashed #d1d5db',
    borderRadius: '12px',
    padding: '40px 20px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: '#fafafa',
    marginBottom: '20px'
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
  previewSection: {
    marginTop: '20px'
  },
  previewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  previewTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    margin: 0
  },
  imageCount: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
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
  removeButton: {
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
  imageInfo: {
    padding: '8px',
    backgroundColor: 'white'
  },
  imageName: {
    fontSize: '12px',
    color: '#374151',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  imageSize: {
    fontSize: '11px',
    color: '#6b7280'
  },
  tips: {
    marginTop: '16px',
    padding: '16px',
    backgroundColor: '#f0f9ff',
    borderRadius: '8px',
    border: '1px solid #bae6fd'
  },
  tipsList: {
    margin: '8px 0 0 0',
    paddingLeft: '20px',
    fontSize: '14px',
    color: '#0369a1'
  }
};

export default ImageUpload;