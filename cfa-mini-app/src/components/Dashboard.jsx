import React from 'react';
import { 
  Play, 
  Target, 
  Zap, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Calculator,
  FileText,
  TrendingUp,
  PieChart,
  BarChart3
} from 'lucide-react';
import { TOPIC_MASTERY_DATA } from '../data/quizData';

export default function Dashboard({ onStartQuiz, userStats }) {
  const getTopicIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={18} />;
      case 'Calculator': return <Calculator size={18} />;
      case 'FileText': return <FileText size={18} />;
      case 'TrendingUp': return <TrendingUp size={18} />;
      default: return <PieChart size={18} />;
    }
  };

  return (
    <div className="dashboard-content">
      {/* Hero CTA */}
      <div className="hero-cta">
        <div className="hero-title">Practice CFA Level I</div>
        <div className="hero-subtitle">
          5 high-probability exam questions with step-by-step explanations.
        </div>
        <button className="primary-btn" onClick={onStartQuiz}>
          <Play size={18} fill="#FFFFFF" />
          Start Practice Quiz (5 Qs)
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Accuracy</span>
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#10B981' }}>{userStats.accuracy}%</div>
          <div className="stat-footer">+4% vs last week</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Questions</span>
            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
              <Zap size={16} />
            </div>
          </div>
          <div className="stat-value">{userStats.solvedTotal}</div>
          <div className="stat-footer">Target: 500 Qs</div>
        </div>
      </div>

      {/* Daily Goal Card */}
      <div className="glass-card daily-goal-card">
        <div className="goal-info">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Target size={16} color="#3B82F6" />
            Daily Goal Progress
          </span>
          <span style={{ color: '#3B82F6', fontWeight: 700 }}>
            {userStats.dailyCompleted} / {userStats.dailyTarget} Qs
          </span>
        </div>
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(100, (userStats.dailyCompleted / userStats.dailyTarget) * 100)}%` }}
          />
        </div>
      </div>

      {/* Topic Mastery Breakdown */}
      <div>
        <div className="section-header">
          <div className="section-title">
            <BarChart3 size={18} color="#3B82F6" />
            Topic Mastery
          </div>
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>CFA Level I</span>
        </div>

        <div className="topics-grid">
          {TOPIC_MASTERY_DATA.map((topic, idx) => (
            <div key={idx} className="glass-card topic-item">
              <div className="topic-info">
                <div className="topic-icon">
                  {getTopicIcon(topic.icon)}
                </div>
                <div>
                  <div className="topic-name">{topic.name}</div>
                  <div className="topic-count">{topic.count}</div>
                </div>
              </div>
              <div className="topic-mastery">{topic.mastery}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
