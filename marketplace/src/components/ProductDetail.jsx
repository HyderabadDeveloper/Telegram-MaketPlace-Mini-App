import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, MessageSquare, Share2, Edit3, Trash2, CheckCircle2, Copy, Check, Eye, User, Calendar } from 'lucide-react';
import { openTelegramChat, shareProduct, copyToClipboard, hapticImpact, hapticNotification } from '../utils/telegram';

export default function ProductDetail({ product, onBack, onEdit, onDelete, currentUser }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80'];

  const isOwner = product.is_owner || String(product.seller_telegram_id) === String(currentUser?.id);

  const handleShare = () => {
    const url = shareProduct(product);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyDirectLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?product=${product.id}`;
    copyToClipboard(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Top Header Navigation */}
      <div className="glass-panel" style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <button
          onClick={() => { hapticImpact('light'); onBack(); }}
          className="btn-secondary"
          style={{ padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-full)' }}
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handleShare}
            className="btn-secondary"
            style={{ padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-full)' }}
          >
            <Share2 size={16} color="#38bdf8" />
            <span>Share</span>
          </button>

          {isOwner && (
            <>
              <button
                onClick={() => { hapticImpact('medium'); onEdit(product); }}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-full)', borderColor: '#38bdf8' }}
              >
                <Edit3 size={16} color="#38bdf8" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  hapticImpact('heavy');
                  if (window.confirm('Are you sure you want to delete this product listing?')) {
                    onDelete(product.id);
                  }
                }}
                className="btn-danger"
                style={{ padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-full)' }}
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div style={{ position: 'relative', width: '100%', maxHeight: '420px', background: '#090d16', overflow: 'hidden' }}>
        <img
          src={images[currentImageIndex]}
          alt={product.title}
          style={{
            width: '100%',
            height: '350px',
            objectFit: 'contain',
            background: '#04070d'
          }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80';
          }}
        />

        {/* Multi-image indicators */}
        {images.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '6px',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)'
          }}>
            {images.map((_, idx) => (
              <div
                key={idx}
                onClick={() => { hapticImpact('light'); setCurrentImageIndex(idx); }}
                style={{
                  width: idx === currentImageIndex ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: idx === currentImageIndex ? '#38bdf8' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div style={{ padding: '1.25rem 1rem' }}>
        {/* Category & Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <span className="badge">
            {product.category || 'Item'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={14} /> {product.views || 0} views
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} /> {new Date(product.created_at || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: '1.3', marginBottom: '0.75rem' }}>
          {product.title}
        </h1>

        {/* Price & Location */}
        <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Price
            </span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>
              {product.currency || '$'}{Number(product.price).toLocaleString()}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Location
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
              <MapPin size={16} color="#38bdf8" />
              <span>{product.location}</span>
            </div>
          </div>
        </div>

        {/* Seller Info Box */}
        <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'block', marginBottom: '0.6rem' }}>
            Seller Information
          </span>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#fff',
                fontSize: '1.1rem'
              }}>
                {product.seller_name ? product.seller_name.charAt(0) : 'U'}
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                  {product.seller_name}
                </h4>
                {product.seller_username && (
                  <p style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>
                    @{product.seller_username.replace(/^@/, '')}
                  </p>
                )}
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Telegram ID: {product.seller_telegram_id}
                </p>
              </div>
            </div>

            {isOwner && (
              <span className="badge badge-owner">
                Owner
              </span>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            Description
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
            {product.description || 'No detailed description provided.'}
          </p>
        </div>

        {/* Shareable Product URL Generator Box */}
        <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>
              Direct Product URL
            </span>
            <button
              onClick={handleCopyDirectLink}
              style={{
                background: 'none',
                border: 'none',
                color: copiedLink ? '#10b981' : '#38bdf8',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {copiedLink ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            wordBreak: 'break-all',
            fontFamily: 'monospace'
          }}>
            {`${window.location.origin}${window.location.pathname}?product=${product.id}`}
          </div>
        </div>

        {/* Action Buttons: Chat on Telegram & Call Phone */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={() => openTelegramChat(product.seller_username, product.contact_phone)}
            className="btn-primary"
            style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
          >
            <MessageSquare size={20} />
            <span>Chat on Telegram (@{product.seller_username || product.seller_name})</span>
          </button>

          {product.contact_phone && (
            <a
              href={`tel:${product.contact_phone}`}
              className="btn-secondary"
              style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem', textDecoration: 'none' }}
              onClick={() => hapticImpact('medium')}
            >
              <Phone size={18} color="#10b981" />
              <span>Call Seller ({product.contact_phone})</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
