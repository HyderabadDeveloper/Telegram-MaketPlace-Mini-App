import React from 'react';
import { 
  Play, 
  Target, 
  Zap, 
  CheckCircle2, 
  ShieldCheck,
  Calculator,
  FileText,
  TrendingUp,
  PieChart,
  BarChart3,
  Layers,
  History,
  Clock,
  BookOpenCheck,
  FileSpreadsheet
} from 'lucide-react';
import { TOPICS_LIST } from '../data/quizData';

export default function Dashboard({ onStartQuiz, userProgress }) {
  const { solvedTotal, correctTotal, dailyCompleted, dailyTarget, topicStats, history } = userProgress;

  const overallAccuracy = solvedTotal > 0 ? Math.round((correctTotal / solvedTotal) * 100) : 0;

  const getTopicIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={18} />;
      case 'Calculator': return <Calculator size={18} />;
      case 'FileText': return <FileText size={18} />;
      case 'TrendingUp': return <TrendingUp size={18} />;
      case 'PieChart': return <PieChart size={18} />;
      default: return <Layers size={18} />;
    }
  };

  const topicBreakdown = TOPICS_LIST.filter(t => t.id !== 'all');

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="dashboard-content">
      {/* Hero CTA */}
      <div className="hero-cta">
        <div className="hero-title">Practice CFA Level I</div>
        <div className="hero-subtitle">
          40 exam-level questions available across 5 key CFA topics.
        </div>
        <button className="primary-btn" onClick={onStartQuiz}>
          <Play size={18} fill="#FFFFFF" />
          Start Practice / Exam Session
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
          <div className="stat-value" style={{ color: '#10B981' }}>{overallAccuracy}%</div>
          <div className="stat-footer">{correctTotal} of {solvedTotal} Correct</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Questions Solved</span>
            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
              <Zap size={16} />
            </div>
          </div>
          <div className="stat-value">{solvedTotal}</div>
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
            {dailyCompleted} / {dailyTarget} Qs
          </span>
        </div>
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(100, (dailyCompleted / dailyTarget) * 100)}%` }}
          />
        </div>
      </div>

      {/* Topic Mastery Breakdown (Computed dynamically) */}
      <div>
        <div className="section-header">
          <div className="section-title">
            <BarChart3 size={18} color="#3B82F6" />
            Topic Mastery
          </div>
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>Calculated Live</span>
        </div>

        <div className="topics-grid">
          {topicBreakdown.map((topic) => {
            // Check both exact name and key
            const stat = topicStats[topic.name] || topicStats[topic.id] || { attempted: 0, correct: 0 };
            const masteryPct = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0;

            return (
              <div key={topic.id} className="glass-card topic-item">
                <div className="topic-info">
                  <div className="topic-icon">
                    {getTopicIcon(topic.icon)}
                  </div>
                  <div>
                    <div className="topic-name">{topic.name}</div>
                    <div className="topic-count">{stat.correct}/{stat.attempted} Solved</div>
                  </div>
                </div>
                <div className="topic-mastery" style={{ color: masteryPct >= 70 ? '#10B981' : masteryPct >= 50 ? '#F59E0B' : '#94A3B8' }}>
                  {masteryPct}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz History Section */}
      <div>
        <div className="section-header">
          <div className="section-title">
            <History size={18} color="#3B82F6" />
            Recent Quiz History
          </div>
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>{history.length} Sessions</span>
        </div>

        {history.length === 0 ? (
          <div className="glass-card" style={{ padding: '20px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
            No quiz sessions completed yet. Start your first practice quiz!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {history.map((item) => (
              <div key={item.id} className="glass-card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '10px', 
                      background: item.mode === 'exam' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                      color: item.mode === 'exam' ? '#F59E0B' : '#3B82F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {item.mode === 'exam' ? <FileSpreadsheet size={18} /> : <BookOpenCheck size={18} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>
                      {item.topicName}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                      <span>{item.date}</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={11} /> {formatTime(item.timeSpent)}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: item.percentage >= 70 ? '#10B981' : item.percentage >= 50 ? '#F59E0B' : '#EF4444' }}>
                    {item.score}/{item.total} ({item.percentage}%)
                  </div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: item.mode === 'exam' ? '#F59E0B' : '#3B82F6', marginTop: '2px' }}>
                    {item.mode} Mode
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
