import React from 'react';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { hapticImpact } from '../utils/telegram';

export default function FilterModal({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedLocation,
  setSelectedLocation,
  categories,
  locations,
  onReset
}) {
  if (!isOpen) return null;

  const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'price_asc', label: 'Price: Low to High' },
    { id: 'price_desc', label: 'Price: High to Low' },
    { id: 'popular', label: 'Most Popular (Views)' }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '600px',
          maxHeight: '85vh',
          borderTopLeftRadius: 'var(--radius-lg)',
          borderTopRightRadius: 'var(--radius-lg)',
          padding: '1.25rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
          animation: 'slideUp 0.25s ease-out'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={20} color="#38bdf8" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Sort & Filter</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => { hapticImpact('light'); onReset(); }}
              className="btn-secondary"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', borderRadius: 'var(--radius-full)' }}
            >
              <RotateCcw size={14} /> Reset
            </button>

            <button
              onClick={() => { hapticImpact('light'); onClose(); }}
              className="btn-icon"
              style={{ width: '32px', height: '32px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Sort By */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label className="input-label" style={{ marginBottom: '0.5rem' }}>Sort By</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {sortOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => { hapticImpact('light'); setSelectedSort(opt.id); }}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: selectedSort === opt.id ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255,255,255,0.04)',
                  border: selectedSort === opt.id ? '1px solid #38bdf8' : '1px solid var(--border-color)',
                  color: selectedSort === opt.id ? '#38bdf8' : 'var(--text-primary)',
                  fontWeight: selectedSort === opt.id ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{opt.label}</span>
                {selectedSort === opt.id && <Check size={14} color="#38bdf8" />}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label className="input-label" style={{ marginBottom: '0.5rem' }}>Category</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {(categories || ['All', 'CFA Level 1', 'CFA Level 2', 'FRM Part 1', 'FRM Part 2', 'Courses', 'Others']).map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => { hapticImpact('light'); setSelectedCategory(cat); }}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: selectedCategory === cat ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
                  border: selectedCategory === cat ? 'none' : '1px solid var(--border-color)',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-primary)',
                  fontSize: '0.82rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label className="input-label" style={{ marginBottom: '0.5rem' }}>Price Range</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <input
              type="number"
              className="input-field"
              placeholder="Min Price ($)"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              className="input-field"
              placeholder="Max Price ($)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Apply Button */}
        <div style={{ marginTop: '0.5rem' }}>
          <button
            onClick={() => { hapticImpact('medium'); onClose(); }}
            className="btn-primary"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
