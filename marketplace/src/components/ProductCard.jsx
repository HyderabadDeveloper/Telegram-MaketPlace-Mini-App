import React from 'react';
import { MapPin, Eye, Share2, Layers, CheckCircle2 } from 'lucide-react';
import { hapticImpact, shareProduct } from '../utils/telegram';

export default function ProductCard({ product, onClick, onShare }) {
  const images = Array.isArray(product.images) ? product.images : [];
  const primaryImage = images[0] || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&auto=format&fit=crop&q=80';

  const handleShareClick = (e) => {
    e.stopPropagation();
    shareProduct(product);
    if (onShare) onShare(product);
  };

  return (
    <div 
      className="glass-card"
      onClick={() => { hapticImpact('light'); onClick(product); }}
      style={{
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      {/* Image Container */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '75%', background: '#090d16', overflow: 'hidden' }}>
        <img
          src={primaryImage}
          alt={product.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 50%)'
        }} />

        {/* Price Tag */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(255,255,255,0.15)',
          fontWeight: 800,
          fontSize: '0.95rem',
          color: '#38bdf8'
        }}>
          {product.currency || '$'}{Number(product.price).toLocaleString()}
        </div>

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          right: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Owner or Sold badge */}
          {product.is_sold ? (
            <span className="badge badge-sold">
              <CheckCircle2 size={12} /> Sold
            </span>
          ) : product.is_owner ? (
            <span className="badge badge-owner">
              Yours
            </span>
          ) : (
            <span className="badge">
              {product.category || 'Item'}
            </span>
          )}

          {/* Image count badge */}
          {images.length > 1 && (
            <span style={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '0.15rem 0.45rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '3px'
            }}>
              <Layers size={10} />
              {images.length}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            lineHeight: '1.35',
            color: 'var(--text-primary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '0.4rem'
          }}>
            {product.title}
          </h3>

          {/* Location */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            <MapPin size={12} color="#38bdf8" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {product.location}
            </span>
          </div>
        </div>

        {/* Footer info: views & share button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '0.6rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Eye size={12} />
            {product.views || 0} views
          </span>

          <button
            onClick={handleShareClick}
            style={{
              background: 'none',
              border: 'none',
              color: '#38bdf8',
              cursor: 'pointer',
              padding: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '0.72rem',
              fontWeight: 600
            }}
            title="Share Product Link"
          >
            <Share2 size={13} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
