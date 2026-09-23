import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import ProductForm from './components/ProductForm';
import FilterModal from './components/FilterModal';
import { initTelegramApp, getTelegramUser, getInitData, setDevUser, hapticImpact } from './utils/telegram';
import { Store, Plus, Sparkles, RefreshCw, UserCheck, Search, Filter } from 'lucide-react';

export default function App() {
  // Telegram User Context
  const [user, setUser] = useState(null);

  // App Navigation & Tabs: 'feed' | 'my_listings' | 'detail'
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Products & Loading state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form & Modals
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Metadata
  const [categories, setCategories] = useState(['All']);
  const [locations, setLocations] = useState(['All']);

  // Count active filters
  const activeFiltersCount = (selectedCategory !== 'All' ? 1 : 0) +
    (selectedSort !== 'newest' ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0);

  // 1. Initialize Telegram WebApp
  useEffect(() => {
    initTelegramApp();
    const currentUser = getTelegramUser();
    setUser(currentUser);
    fetchMetadata();
  }, []);

  // 2. Deep Linking check: ?product=<id>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');

    if (productId) {
      fetchSingleProduct(productId);
    }
  }, []);

  // 3. Fetch products on search/filter/tab change
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const initData = getInitData();
      const queryParams = new URLSearchParams();

      if (searchTerm.trim()) queryParams.append('q', searchTerm.trim());
      if (selectedCategory !== 'All') queryParams.append('category', selectedCategory);
      if (selectedSort) queryParams.append('sort', selectedSort);
      if (minPrice) queryParams.append('min_price', minPrice);
      if (maxPrice) queryParams.append('max_price', maxPrice);

      if (activeTab === 'my_listings' && user) {
        queryParams.append('seller_id', user.id);
      }

      const headers = {
        'x-telegram-init-data': initData
      };
      if (user) {
        headers['x-dev-telegram-id'] = user.id;
        headers['x-dev-telegram-username'] = user.username;
        headers['x-dev-telegram-name'] = `${user.first_name} ${user.last_name || ''}`;
      }

      const res = await fetch(`/api/products?${queryParams.toString()}`, { headers });
      if (!res.ok) throw new Error('Failed to fetch products');

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, selectedSort, minPrice, maxPrice, activeTab, user]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchMetadata = async () => {
    try {
      const res = await fetch('/api/meta/filters');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || ['All']);
        setLocations(data.locations || ['All']);
      }
    } catch (e) {
      // fallback defaults
    }
  };

  const fetchSingleProduct = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const prod = await res.json();
        setSelectedProduct(prod);
        setActiveTab('detail');
      }
    } catch (e) {
      console.error('Failed to load deep-linked product:', e);
    } finally {
      setLoading(false);
    }
  };

  // Create or Update Product Handler
  const handleProductSubmit = async (payload, devProfile) => {
    const isEdit = Boolean(editingProduct);
    const url = isEdit ? `/api/products/${editingProduct.id}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';

    const headers = {
      'Content-Type': 'application/json',
      'x-telegram-init-data': getInitData()
    };

    const activeUser = devProfile || user;
    if (activeUser) {
      headers['x-dev-telegram-id'] = activeUser.id;
      headers['x-dev-telegram-username'] = activeUser.username || `user_${activeUser.id}`;
      headers['x-dev-telegram-name'] = activeUser.first_name || 'Seller';
      
      if (devProfile && devProfile.id) {
        handleSwitchDevUser(devProfile.id, devProfile.first_name || 'Seller', devProfile.username || `user_${devProfile.id}`);
      }
    }

    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Failed to save product');
    }

    const savedProduct = await res.json();

    setShowCreateForm(false);
    setEditingProduct(null);

    // Refresh products list
    fetchProducts();

    // Navigate to product detail
    setSelectedProduct(savedProduct);
    setActiveTab('detail');
  };

  // Delete Product Handler
  const handleProductDelete = async (id) => {
    try {
      const headers = {
        'x-telegram-init-data': getInitData()
      };
      if (user) {
        headers['x-dev-telegram-id'] = user.id;
      }

      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to delete listing');
        return;
      }

      setSelectedProduct(null);
      setActiveTab('feed');
      fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting product');
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSort('newest');
    setMinPrice('');
    setMaxPrice('');
    setSelectedLocation('All');
    setSearchTerm('');
  };

  // Switch mock user for dev testing outside Telegram
  const handleSwitchDevUser = (newId, newName, newUsername) => {
    const newUser = {
      id: newId,
      first_name: newName,
      last_name: '',
      username: newUsername,
      photo_url: ''
    };
    setDevUser(newUser);
    setUser(newUser);
    hapticImpact('medium');
  };

  return (
    <div className="app-container">
      {/* Dev Mode User Switcher (For local browser testing) */}
      {!window.Telegram?.WebApp?.initData && (
        <div style={{
          background: 'rgba(56, 189, 248, 0.12)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.25)',
          padding: '0.4rem 1rem',
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#38bdf8'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <UserCheck size={14} />
            <span>Dev Mode: logged as <strong>@{user?.username}</strong> ({user?.first_name})</span>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => handleSwitchDevUser('123456789', 'Alex Rivera', 'alex_tg')}
              style={{ background: user?.id === '123456789' ? '#38bdf8' : 'rgba(255,255,255,0.1)', color: user?.id === '123456789' ? '#0f172a' : '#fff', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
            >
              Alex (User 1)
            </button>
            <button
              onClick={() => handleSwitchDevUser('987654321', 'Elena Rostova', 'elena_m')}
              style={{ background: user?.id === '987654321' ? '#38bdf8' : 'rgba(255,255,255,0.1)', color: user?.id === '987654321' ? '#0f172a' : '#fff', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}
            >
              Elena (User 2)
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      {activeTab !== 'detail' && (
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenFilter={() => setShowFilterModal(true)}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedProduct(null);
          }}
          onOpenCreate={() => {
            setEditingProduct(null);
            setShowCreateForm(true);
          }}
          activeFiltersCount={activeFiltersCount}
          user={user}
        />
      )}

      {/* MAIN VIEW CONTENT */}
      {activeTab === 'detail' && selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => {
            setSelectedProduct(null);
            setActiveTab('feed');
            // Clean URL query param
            window.history.replaceState({}, '', window.location.pathname);
          }}
          onEdit={(prod) => {
            setEditingProduct(prod);
            setShowCreateForm(true);
          }}
          onDelete={handleProductDelete}
          currentUser={user}
        />
      ) : (
        <main>
          {/* Category Chips Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            padding: '0.75rem 1rem 0.25rem 1rem',
            scrollbarWidth: 'none'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  hapticImpact('light');
                  setSelectedCategory(cat);
                }}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: selectedCategory === cat ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
                  border: selectedCategory === cat ? 'none' : '1px solid var(--border-color)',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Section Header */}
          <div style={{
            padding: '0.75rem 1rem 0.25rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {activeTab === 'my_listings' ? 'My Listed Products' : (selectedCategory !== 'All' ? `${selectedCategory} Items` : 'Recent Products')}
            </h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {products.length} {products.length === 1 ? 'item' : 'items'} found
            </span>
          </div>

          {/* Loading Skeleton Grid */}
          {loading ? (
            <div className="product-grid">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="glass-card" style={{ height: '260px', padding: '0.8rem' }}>
                  <div className="skeleton" style={{ width: '100%', height: '140px', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem' }} />
                  <div className="skeleton" style={{ width: '70%', height: '16px', marginBottom: '0.5rem' }} />
                  <div className="skeleton" style={{ width: '40%', height: '14px' }} />
                </div>
              ))}
            </div>
          ) : error ? (
            /* Error State */
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>
              <button onClick={fetchProducts} className="btn-secondary">
                <RefreshCw size={16} /> Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            /* Empty State */
            <div style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                color: '#38bdf8'
              }}>
                <Store size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                {activeTab === 'my_listings' ? "You haven't listed any products yet" : 'No products found'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '320px', marginBottom: '1.25rem' }}>
                {activeTab === 'my_listings'
                  ? 'List your items, set prices, add pictures, and share links directly with Telegram buyers!'
                  : 'Try adjusting your search query, location, or filter options.'}
              </p>
              {activeTab === 'my_listings' ? (
                <button
                  onClick={() => { setEditingProduct(null); setShowCreateForm(true); }}
                  className="btn-primary"
                >
                  <Plus size={18} /> List Product Now
                </button>
              ) : (
                <button onClick={handleResetFilters} className="btn-secondary">
                  Reset All Filters
                </button>
              )}
            </div>
          ) : (
            /* Products Grid */
            <div className="product-grid">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={(prod) => {
                    setSelectedProduct(prod);
                    setActiveTab('detail');
                  }}
                />
              ))}
            </div>
          )}
        </main>
      )}

      {/* Product Form Modal (Create or Edit) */}
      {showCreateForm && (
        <ProductForm
          productToEdit={editingProduct}
          onSubmit={handleProductSubmit}
          onClose={() => {
            setShowCreateForm(false);
            setEditingProduct(null);
          }}
          user={user}
        />
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        categories={categories}
        locations={locations}
        onReset={handleResetFilters}
      />
    </div>
  );
}
