import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ShieldCheck, 
  Calculator, 
  FileText, 
  TrendingUp, 
  PieChart, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Info,
  Sparkles
} from 'lucide-react';
import { LEARN_MODULES } from '../data/learnData';

export default function Learn() {
  const [activeModuleId, setActiveModuleId] = useState('ethics');
  const [contentType, setContentType] = useState('concepts'); // 'concepts' | 'formulas'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const getModuleIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={18} />;
      case 'Calculator': return <Calculator size={18} />;
      case 'FileText': return <FileText size={18} />;
      case 'TrendingUp': return <TrendingUp size={18} />;
      case 'PieChart': return <PieChart size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  const activeModule = LEARN_MODULES.find(m => m.id === activeModuleId) || LEARN_MODULES[0];

  const toggleAccordion = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // Filter items based on search query
  const rawList = contentType === 'concepts' ? activeModule.concepts : activeModule.formulas;
  const filteredList = rawList.filter(item => {
    const q = searchQuery.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(q);
    const textMatch = contentType === 'concepts' 
      ? item.summary.toLowerCase().includes(q) || item.details.toLowerCase().includes(q)
      : item.formula.toLowerCase().includes(q) || item.variables.toLowerCase().includes(q);
    return titleMatch || textMatch;
  });

  return (
    <div className="dashboard-content">
      {/* Hero Header */}
      <div className="hero-cta" style={{ background: 'linear-gradient(135deg, #1E2640 0%, #0F172A 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3B82F6', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '4px' }}>
          <Sparkles size={16} color="#F59E0B" />
          CFA Knowledge Hub
        </div>
        <div className="hero-title">Learn & Formula Sheet</div>
        <div className="hero-subtitle">
          10 core concepts and 10 essential formulas for each CFA Level I module.
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginTop: '12px' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search concepts or formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px 12px 40px',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              background: 'rgba(15, 23, 42, 0.8)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Module Selector Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {LEARN_MODULES.map((mod) => {
          const isSelected = activeModuleId === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => {
                setActiveModuleId(mod.id);
                setExpandedId(null);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
                border: isSelected ? '1px solid #3B82F6' : '1px solid var(--border-color)',
                background: isSelected ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : 'var(--bg-card)',
                color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              {getModuleIcon(mod.icon)}
              {mod.title}
            </button>
          );
        })}
      </div>

      {/* Content Type Toggle: Concepts vs Formulas */}
      <div className="glass-card" style={{ padding: '6px', display: 'flex', gap: '6px' }}>
        <button
          onClick={() => { setContentType('concepts'); setExpandedId(null); }}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            background: contentType === 'concepts' ? 'var(--bg-secondary)' : 'transparent',
            color: contentType === 'concepts' ? '#3B82F6' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <BookOpen size={16} />
          Key Concepts (10)
        </button>

        <button
          onClick={() => { setContentType('formulas'); setExpandedId(null); }}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            background: contentType === 'formulas' ? 'var(--bg-secondary)' : 'transparent',
            color: contentType === 'formulas' ? '#3B82F6' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Calculator size={16} />
          Essential Formulas (10)
        </button>
      </div>

      {/* Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="section-header" style={{ marginBottom: '4px' }}>
          <div className="section-title">
            {contentType === 'concepts' ? '10 Core Concepts' : '10 Must-Know Formulas'} - {activeModule.title}
          </div>
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>
            {filteredList.length} Items
          </span>
        </div>

        {filteredList.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          return (
            <div 
              key={item.id} 
              className="glass-card" 
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                transition: 'all 0.2s ease',
                borderLeft: isExpanded ? '4px solid #3B82F6' : '1px solid var(--border-color)'
              }}
            >
              {/* Header Row */}
              <div 
                onClick={() => toggleAccordion(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span 
                    style={{
                      background: 'rgba(59, 130, 246, 0.15)',
                      color: '#3B82F6',
                      fontWeight: 700,
                      fontSize: '11px',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)',
                      flexShrink: 0
                    }}
                  >
                    #{idx + 1}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    {contentType === 'concepts' && (
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {item.summary}
                      </p>
                    )}
                  </div>
                </div>

                <button 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#94A3B8', 
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>

              {/* Formula Preview Box if formulas mode */}
              {contentType === 'formulas' && (
                <div 
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    padding: '14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    fontFamily: 'var(--font-mono)',
                    color: '#93C5FD',
                    fontSize: '14px',
                    fontWeight: 700,
                    textAlign: 'center',
                    wordBreak: 'break-word'
                  }}
                >
                  {item.formula}
                </div>
              )}

              {/* Collapsible Details */}
              {isExpanded && (
                <div 
                  className="explanation-box" 
                  style={{ 
                    marginTop: '4px',
                    background: 'var(--bg-secondary)',
                    borderLeft: 'none',
                    border: '1px solid var(--border-color)',
                    padding: '14px'
                  }}
                >
                  {contentType === 'concepts' ? (
                    <div>
                      <div className="explanation-title" style={{ marginBottom: '6px' }}>
                        <Info size={15} color="#3B82F6" />
                        Detailed CFA Exam Note
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                        {item.details}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                        <strong style={{ color: '#3B82F6' }}>Variables:</strong> {item.variables}
                      </div>
                      <div style={{ fontSize: '12px', color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '4px' }}>
                        <Info size={14} />
                        <strong>Exam Note:</strong> {item.note}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
