import React from 'react';
import { Search, SlidersHorizontal, Plus, Store, User, X } from 'lucide-react';
import { hapticImpact } from '../utils/telegram';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onOpenFilter,
  activeTab,
  setActiveTab,
  onOpenCreate,
  activeFiltersCount,
  user
}) {
  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '0.85rem 1rem',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem'
      }}>
        {/* Brand Header */}
        <div 
          onClick={() => { hapticImpact('light'); setActiveTab('feed'); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px var(--accent-glow)'
          }}>
            <Store size={20} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              CFA & FRM Marketplace
            </h1>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: '-2px' }}>
              Study Books & Course Materials
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => { hapticImpact('medium'); onOpenCreate(); }}
            className="btn-primary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', borderRadius: 'var(--radius-full)' }}
          >
            <Plus size={16} />
            <span>List Product</span>
          </button>
        </div>
      </div>

      {/* Search & Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: 1 }}>
          <Search 
            size={18} 
            color="var(--text-secondary)" 
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input
            type="text"
            className="input-field"
            placeholder="Search products, locations, keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              paddingLeft: '38px',
              paddingRight: searchTerm ? '36px' : '12px',
              paddingTop: '0.55rem',
              paddingBottom: '0.55rem',
              fontSize: '0.88rem',
              borderRadius: 'var(--radius-full)'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => { setSearchTerm(''); hapticImpact('light'); }}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '2px'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <button
          onClick={() => { hapticImpact('light'); onOpenFilter(); }}
          className="btn-secondary"
          style={{
            position: 'relative',
            padding: '0.55rem',
            borderRadius: 'var(--radius-full)',
            background: activeFiltersCount > 0 ? 'rgba(56, 189, 248, 0.15)' : undefined,
            borderColor: activeFiltersCount > 0 ? '#38bdf8' : undefined
          }}
          title="Filter & Sort"
        >
          <SlidersHorizontal size={18} color={activeFiltersCount > 0 ? '#38bdf8' : 'var(--text-primary)'} />
          {activeFiltersCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#38bdf8',
              color: '#0f172a',
              fontSize: '0.65rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginTop: '0.75rem',
        paddingTop: '0.4rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        fontSize: '0.85rem',
        fontWeight: 600
      }}>
        <div
          onClick={() => { hapticImpact('light'); setActiveTab('feed'); }}
          style={{
            cursor: 'pointer',
            color: activeTab === 'feed' ? '#38bdf8' : 'var(--text-secondary)',
            borderBottom: activeTab === 'feed' ? '2px solid #38bdf8' : '2px solid transparent',
            paddingBottom: '0.3rem',
            transition: 'all 0.2s'
          }}
        >
          Explore All
        </div>

        <div
          onClick={() => { hapticImpact('light'); setActiveTab('my_listings'); }}
          style={{
            cursor: 'pointer',
            color: activeTab === 'my_listings' ? '#38bdf8' : 'var(--text-secondary)',
            borderBottom: activeTab === 'my_listings' ? '2px solid #38bdf8' : '2px solid transparent',
            paddingBottom: '0.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'all 0.2s'
          }}
        >
          <User size={14} />
          <span>My Listings</span>
        </div>
      </div>
    </header>
  );
}
