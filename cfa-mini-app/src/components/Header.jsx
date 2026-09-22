import React from 'react';
import { Flame, Moon, Sun, Award } from 'lucide-react';

export default function Header({ telegramUser, streak, theme, toggleTheme }) {
  const userName = telegramUser?.first_name || 'CFA Candidate';
  const initial = userName.charAt(0).toUpperCase();

  return (
    <header className="app-header">
      <div className="user-info">
        <div className="avatar">
          {initial}
        </div>
        <div className="user-text">
          <div className="user-name">{userName}</div>
          <div className="user-badge">
            <Award size={13} /> Level I Candidate
          </div>
        </div>
      </div>

      <div className="header-actions">
        <div className="streak-pill" title="Daily Practice Streak">
          <Flame size={16} fill="#F59E0B" />
          <span>{streak} Days</span>
        </div>

        <button 
          className="icon-btn" 
          onClick={toggleTheme} 
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
