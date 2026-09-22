import React from 'react';
import { LayoutDashboard, BookOpen, BarChart2 } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, onStartQuiz }) {
  const handleTabClick = (tabKey) => {
    if (tabKey === 'quiz') {
      onStartQuiz();
    } else {
      setActiveTab(tabKey);
    }
  };

  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
        onClick={() => handleTabClick('dashboard')}
      >
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </button>

      <button 
        className={`nav-item ${activeTab === 'quiz' ? 'active' : ''}`}
        onClick={() => handleTabClick('quiz')}
      >
        <BookOpen size={20} />
        <span>Practice Quiz</span>
      </button>

      <button 
        className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
        onClick={() => handleTabClick('dashboard')}
      >
        <BarChart2 size={20} />
        <span>Analytics</span>
      </button>
    </nav>
  );
}
