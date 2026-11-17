import React, { useState } from 'react';
import { 
  Play, 
  Layers, 
  ShieldCheck, 
  Calculator, 
  FileText, 
  TrendingUp, 
  PieChart, 
  Sliders, 
  Clock, 
  HelpCircle,
  ChevronRight,
  BookOpenCheck,
  FileSpreadsheet
} from 'lucide-react';
import { TOPICS_LIST } from '../data/quizData';

export default function QuizSetup({ onStartQuiz, isLoading = false, error = '' }) {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [questionCount, setQuestionCount] = useState(5);
  const [quizMode, setQuizMode] = useState('practice'); // 'practice' | 'exam'

  const getTopicIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={20} />;
      case 'Calculator': return <Calculator size={20} />;
      case 'FileText': return <FileText size={20} />;
      case 'TrendingUp': return <TrendingUp size={20} />;
      case 'PieChart': return <PieChart size={20} />;
      default: return <Layers size={20} />;
    }
  };

  const selectedTopicObj = TOPICS_LIST.find(t => t.id === selectedTopic) || TOPICS_LIST[0];
  const countOptions = [5, 10, 15, 20];

  const estMins = Math.round(questionCount * 1.5);

  const handleLaunch = () => {
    if (isLoading) return;
    onStartQuiz({
      topicId: selectedTopic,
      count: questionCount,
      mode: quizMode,
      topicName: selectedTopicObj.name
    });
  };

  return (
    <div className="dashboard-content">
      {/* Header Banner */}
      <div className="hero-cta" style={{ background: 'linear-gradient(135deg, #1E2640 0%, #111827 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3B82F6', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '4px' }}>
          <Sliders size={16} />
          Quiz Configuration
        </div>
        <div className="hero-title">Custom Practice Session</div>
        <div className="hero-subtitle">
          Configure mode, topic, and length to customize your study session.
        </div>
      </div>

      {/* 1. Quiz Mode Selector */}
      <div>
        <div className="section-header">
          <div className="section-title">
            <BookOpenCheck size={18} color="#3B82F6" />
            1. Select Session Mode
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {/* Practice Mode Card */}
          <div
            onClick={() => setQuizMode('practice')}
            className={`glass-card`}
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              cursor: 'pointer',
              border: quizMode === 'practice' ? '2px solid #3B82F6' : '1px solid var(--border-color)',
              background: quizMode === 'practice' ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-card)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div 
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: quizMode === 'practice' ? '#3B82F6' : 'var(--accent-blue-light)',
                  color: quizMode === 'practice' ? '#FFFFFF' : '#3B82F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <BookOpenCheck size={18} />
              </div>
              <div 
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: `2px solid ${quizMode === 'practice' ? '#3B82F6' : '#64748B'}`,
                  background: quizMode === 'practice' ? '#3B82F6' : 'transparent'
                }}
              />
            </div>
            <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)' }}>
              Practice Mode
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Instant answers & detailed CFA explanations after every question.
            </div>
          </div>

          {/* Exam Mode Card */}
          <div
            onClick={() => setQuizMode('exam')}
            className={`glass-card`}
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              cursor: 'pointer',
              border: quizMode === 'exam' ? '2px solid #F59E0B' : '1px solid var(--border-color)',
              background: quizMode === 'exam' ? 'rgba(245, 158, 11, 0.12)' : 'var(--bg-card)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div 
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: quizMode === 'exam' ? '#F59E0B' : 'rgba(245, 158, 11, 0.15)',
                  color: quizMode === 'exam' ? '#FFFFFF' : '#F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FileSpreadsheet size={18} />
              </div>
              <div 
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: `2px solid ${quizMode === 'exam' ? '#F59E0B' : '#64748B'}`,
                  background: quizMode === 'exam' ? '#F59E0B' : 'transparent'
                }}
              />
            </div>
            <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)' }}>
              Exam Mode
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Exam simulation. No hints or solutions revealed until final score report.
            </div>
          </div>
        </div>
      </div>

      {/* 2. Topic Selection */}
      <div>
        <div className="section-header">
          <div className="section-title">
            <Layers size={18} color="#3B82F6" />
            2. Select Topic
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {TOPICS_LIST.map((t) => {
            const isSelected = selectedTopic === t.id;
            return (
              <div 
                key={t.id}
                className={`glass-card`}
                onClick={() => setSelectedTopic(t.id)}
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  borderColor: isSelected ? '#3B82F6' : 'var(--border-color)',
                  background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-card)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div className="topic-info">
                  <div 
                    className="topic-icon"
                    style={{
                      background: isSelected ? '#3B82F6' : 'var(--accent-blue-light)',
                      color: isSelected ? '#FFFFFF' : '#3B82F6'
                    }}
                  >
                    {getTopicIcon(t.icon)}
                  </div>
                  <div>
                    <div className="topic-name">{t.name}</div>
                    <div className="topic-count">{t.desc}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div 
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? '#3B82F6' : '#64748B'}`,
                      background: isSelected ? '#3B82F6' : 'transparent'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Question Count Selector */}
      <div>
        <div className="section-header">
          <div className="section-title">
            <HelpCircle size={18} color="#3B82F6" />
            3. Questions in One Go
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#3B82F6' }}>
            {questionCount} Questions
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {countOptions.map((cnt) => {
              const active = questionCount === cnt;
              return (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuestionCount(cnt)}
                  style={{
                    flex: 1,
                    padding: '12px 6px',
                    borderRadius: '12px',
                    border: active ? '2px solid #3B82F6' : '1px solid var(--border-color)',
                    background: active ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : 'var(--bg-secondary)',
                    color: active ? '#FFFFFF' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: active ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                  }}
                >
                  {cnt} Qs
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#94A3B8', paddingTop: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} color="#F59E0B" /> Estimated Time: ~{estMins} mins
            </span>
            <span style={{ fontWeight: 600 }}>CFA Exam Pace</span>
          </div>
        </div>
      </div>

      {/* Start Button */}
      {error && <div role="alert" style={{ color: '#FCA5A5', fontSize: '13px', textAlign: 'center' }}>{error}</div>}

      <button className="primary-btn" onClick={handleLaunch} disabled={isLoading} style={{ padding: '16px', fontSize: '16px', opacity: isLoading ? 0.7 : 1 }}>
        <Play size={18} fill="#FFFFFF" />
        {isLoading ? 'Loading Questions…' : `Start ${quizMode === 'exam' ? 'Exam' : 'Practice'} Session (${questionCount} Qs)`}
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
