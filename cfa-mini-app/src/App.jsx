import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import BottomNav from './components/BottomNav';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [telegramUser, setTelegramUser] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const [userStats, setUserStats] = useState({
    accuracy: 78,
    solvedTotal: 41,
    dailyCompleted: 5,
    dailyTarget: 10,
    streak: 5
  });

  // Initialize Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      if (tg.initDataUnsafe?.user) {
        setTelegramUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleStartQuiz = () => {
    setActiveTab('quiz');
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);

    // Update stats dynamically
    let correct = 0;
    results.questions.forEach((q, idx) => {
      if (results.selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    setUserStats((prev) => {
      const newTotal = prev.solvedTotal + results.questions.length;
      const newDaily = prev.dailyCompleted + results.questions.length;
      return {
        ...prev,
        solvedTotal: newTotal,
        dailyCompleted: newDaily,
        accuracy: Math.round(((prev.accuracy * prev.solvedTotal + (correct / results.questions.length) * 100 * results.questions.length) / newTotal))
      };
    });

    setActiveTab('results');
  };

  const handleGoHome = () => {
    setActiveTab('dashboard');
  };

  return (
    <div className="app-container">
      {/* Header is shown on dashboard and results */}
      {activeTab !== 'quiz' && (
        <Header 
          telegramUser={telegramUser} 
          streak={userStats.streak} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      )}

      {/* Main Views */}
      <main style={{ flex: 1 }}>
        {activeTab === 'dashboard' && (
          <Dashboard 
            onStartQuiz={handleStartQuiz} 
            userStats={userStats} 
          />
        )}

        {activeTab === 'quiz' && (
          <Quiz 
            onQuizComplete={handleQuizComplete} 
            onExit={handleGoHome} 
          />
        )}

        {activeTab === 'results' && quizResults && (
          <QuizResult 
            results={quizResults} 
            onRestartQuiz={handleStartQuiz} 
            onGoHome={handleGoHome} 
          />
        )}
      </main>

      {/* Bottom Navigation */}
      {activeTab !== 'quiz' && (
        <BottomNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onStartQuiz={handleStartQuiz} 
        />
      )}
    </div>
  );
}
