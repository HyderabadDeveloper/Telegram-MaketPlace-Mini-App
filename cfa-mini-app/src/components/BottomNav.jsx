import React from 'react';
import { LayoutDashboard, BookOpen, GraduationCap } from 'lucide-react';

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
        className={`nav-item ${activeTab === 'quiz' || activeTab === 'setup' ? 'active' : ''}`}
        onClick={() => handleTabClick('quiz')}
      >
        <BookOpen size={20} />
        <span>Practice Quiz</span>
      </button>

      <button 
        className={`nav-item ${activeTab === 'learn' ? 'active' : ''}`}
        onClick={() => handleTabClick('learn')}
      >
        <GraduationCap size={20} />
        <span>Learn</span>
      </button>
    </nav>
  );
}
