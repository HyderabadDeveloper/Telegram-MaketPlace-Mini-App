import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, MapPin, DollarSign, Tag, Phone, Image as ImageIcon, AlertCircle, UserCheck } from 'lucide-react';
import { hapticImpact, hapticNotification } from '../utils/telegram';

export default function ProductForm({ productToEdit, onSubmit, onClose, user }) {
  const isEditing = Boolean(productToEdit);
  const isDevMode = typeof window !== 'undefined' && !window.Telegram?.WebApp?.initData;

  const [devTelegramId, setDevTelegramId] = useState(user?.id || '123456789');
  const [devUsername, setDevUsername] = useState(user?.username || 'alex_tg');
  const [devFirstName, setDevFirstName] = useState(user?.first_name || 'Alex');

  const [title, setTitle] = useState(productToEdit?.title || '');
  const [price, setPrice] = useState(productToEdit?.price || '');
  const [currency, setCurrency] = useState(productToEdit?.currency || '₹');
  const [location, setLocation] = useState(productToEdit?.location || '');
  const [contactPhone, setContactPhone] = useState(productToEdit?.contact_phone || '');
  const [category, setCategory] = useState(productToEdit?.category || 'CFA Level 1');
  const [description, setDescription] = useState(productToEdit?.description || '');
  const [images, setImages] = useState(productToEdit?.images || []);
  const [imageUrlInput, setImageUrlInput] = useState('');

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');
    hapticImpact('light');

    try {
      const formData = new FormData();
      for (let i = 0; i < Math.min(files.length, 5); i++) {
        formData.append('images', files[i]);
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Image upload failed');
      }

      const data = await res.json();
      if (data.urls) {
        setImages(prev => [...prev, ...data.urls]);
        hapticNotification('success');
      }
    } catch (err) {
      console.error('File upload error:', err);
      // Fallback: convert file to base64 data URI if server upload fails
      try {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      } catch (fErr) {
        setError('Failed to upload image file.');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput || !imageUrlInput.trim()) return;
    setImages(prev => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
    hapticImpact('light');
  };

  const handleRemoveImage = (indexToRemove) => {
    hapticImpact('light');
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Product title / name is required.');
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      setError('Please enter a valid product price.');
      return;
    }
    if (!location.trim()) {
      setError('Location is required so buyers can locate your item.');
      return;
    }

    setSubmitting(true);
    hapticImpact('medium');

    try {
      const payload = {
        title: title.trim(),
        price: Number(price),
        currency,
        location: location.trim(),
        contact_phone: contactPhone.trim(),
        category,
        description: description.trim(),
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80']
      };

      const devProfile = isDevMode ? {
        id: devTelegramId.trim() || user?.id || '123456789',
        username: devUsername.trim() || user?.username || 'alex_tg',
        first_name: devFirstName.trim() || user?.first_name || 'Alex'
      } : null;

      await onSubmit(payload, devProfile);
      hapticNotification('success');
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to save product listing');
      hapticNotification('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div className="glass-panel" style={{
        padding: '0.85rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
          {isEditing ? 'Edit Product Listing' : 'List New Product'}
        </h2>
        <button
          onClick={() => { hapticImpact('light'); onClose(); }}
          className="btn-icon"
        >
          <X size={20} />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} style={{ padding: '1.25rem 1rem', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.88rem'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Telegram User Info Notice / Dev Mode ID Prompt */}
        {isDevMode ? (
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px dashed rgba(245, 158, 11, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700 }}>
              <UserCheck size={16} />
              <span>Dev Mode: Enter Seller Telegram Credentials</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label" style={{ color: '#f59e0b' }}>Telegram User ID *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. 123456789"
                  value={devTelegramId}
                  onChange={(e) => setDevTelegramId(e.target.value)}
                  required
                />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label" style={{ color: '#f59e0b' }}>Telegram Username</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. alex_tg"
                  value={devUsername}
                  onChange={(e) => setDevUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label" style={{ color: '#f59e0b' }}>Seller First Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Alex"
                value={devFirstName}
                onChange={(e) => setDevFirstName(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div style={{
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            fontSize: '0.82rem',
            color: '#38bdf8',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.8rem'
            }}>
              {user?.first_name ? user.first_name.charAt(0) : 'U'}
            </div>
            <div>
              Listing as: <strong>{user?.first_name} (@{user?.username || 'user_' + user?.id})</strong>
            </div>
          </div>
        )}

        {/* Product Title / Name */}
        <div className="input-group">
          <label className="input-label">Product Name / Title *</label>
          <input
            type="text"
            className="input-field"
            placeholder="CFA Level 1 Study Material"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Price & Currency */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '0.75rem' }}>
          <div className="input-group">
            <label className="input-label">Price *</label>
            <input
              type="number"
              step="0.01"
              className="input-field"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Currency</label>
            <select
              className="input-field"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="₹">INR (₹)</option>
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="⭐">Stars (⭐)</option>
            </select>
          </div>
        </div>

        {/* Location & Category */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="input-group">
            <label className="input-label">Location *</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Mumbai, Jaipur"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Category</label>
            <select
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="CFA Level 1">CFA Level 1</option>
              <option value="CFA Level 2">CFA Level 2</option>
              <option value="FRM Part 1">FRM Part 1</option>
              <option value="FRM Part 2">FRM Part 2</option>
              <option value="Courses">Courses</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        {/* Contact Phone Number (Optional) */}
        <div className="input-group">
          <label className="input-label">Contact Number (Optional)</label>
          <input
            type="tel"
            className="input-field"
            placeholder="e.g. +91 98765 43210"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
        </div>

        {/* Image Upload / Pictures */}
        <div className="input-group">
          <label className="input-label">Product Pictures (Upload or Image URLs)</label>
          
          {/* Upload Box */}
          <div style={{
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center',
            background: 'rgba(15, 23, 42, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            marginBottom: '0.75rem'
          }}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="file-upload-input"
              disabled={uploading}
            />
            <label htmlFor="file-upload-input" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              <Upload size={24} color="#38bdf8" />
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {uploading ? 'Uploading images...' : 'Click to Upload Images'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Supports JPG, PNG, WebP up to 5MB
              </span>
            </label>
          </div>

          {/* Add Image URL fallback */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input
              type="url"
              className="input-field"
              placeholder="Or paste image URL (https://...)"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              style={{ fontSize: '0.85rem' }}
            />
            <button
              type="button"
              onClick={handleAddImageUrl}
              className="btn-secondary"
              style={{ whiteSpace: 'nowrap' }}
            >
              Add URL
            </button>
          </div>

          {/* Image Previews Grid */}
          {images.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
              {images.map((imgUrl, idx) => (
                <div key={idx} style={{ position: 'relative', width: '75px', height: '75px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src={imgUrl} alt={`Upload ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'rgba(239, 68, 68, 0.9)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="input-group">
          <label className="input-label">Description</label>
          <textarea
            className="input-field"
            rows="4"
            placeholder="Describe your item's condition, features, reason for selling..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: '1.5rem' }}>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
            style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
          >
            <span>{submitting ? 'Saving...' : (isEditing ? 'Update Listing' : 'Publish Product')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
