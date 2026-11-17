import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import QuizSetup from './components/QuizSetup';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import Learn from './components/Learn';
import BottomNav from './components/BottomNav';
import { loadUserProgress, fetchUserProgressFromD1, recordQuizCompletion } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [telegramUser, setTelegramUser] = useState(null);
  
  // Persistent User Progress state
  const [userProgress, setUserProgress] = useState(loadUserProgress(null));

  // Active quiz session state
  const [activeQuizQuestions, setActiveQuizQuestions] = useState([]);
  const [activeQuizMeta, setActiveQuizMeta] = useState({ mode: 'practice', topicName: 'Mixed Mock' });
  const [quizResults, setQuizResults] = useState(null);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [questionLoadError, setQuestionLoadError] = useState('');

  // Initialize Telegram WebApp SDK & Sync Cloudflare D1 User Database
  useEffect(() => {
    let tgUser = null;
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      if (tg.initDataUnsafe?.user) {
        tgUser = tg.initDataUnsafe.user;
        setTelegramUser(tgUser);
      }
    }

    // Load / Sync User Progress from D1 / LocalStorage
    fetchUserProgressFromD1(tgUser).then((syncedData) => {
      if (syncedData) {
        setUserProgress(syncedData);
      }
    });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleOpenSetup = () => {
    setActiveTab('setup');
  };

  const handleStartCustomQuiz = async ({ topicId, count, mode, topicName }) => {
    setIsLoadingQuestions(true);
    setQuestionLoadError('');

    try {
      const params = new URLSearchParams({ topic: topicId, count: String(count) });
      const response = await fetch(`/api/questions?${params}`);
      const contentType = response.headers.get('content-type') || '';

      if (!contentType.includes('application/json')) {
        throw new Error('The questions endpoint is unavailable. Deploy the Worker with `npm run deploy` and try again.');
      }

      const data = await response.json();

      if (!response.ok || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error(data.error || 'No questions were returned.');
      }

      setActiveQuizQuestions(data.questions);
      setActiveQuizMeta({ mode, topicName });
      setActiveTab('quiz');
    } catch (error) {
      setQuestionLoadError(error.message || 'Unable to load questions. Please try again.');
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    const updated = recordQuizCompletion(results, activeQuizMeta.mode, activeQuizMeta.topicName, telegramUser);
    setUserProgress(updated);
    setActiveTab('results');
  };

  const handleGoHome = () => {
    setActiveTab('dashboard');
  };

  return (
    <div className="app-container">
      {/* Header is shown on dashboard, setup, learn, and results */}
      {activeTab !== 'quiz' && (
        <Header 
          telegramUser={telegramUser} 
          streak={userProgress.streak} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      )}

      {/* Main Views */}
      <main style={{ flex: 1 }}>
        {activeTab === 'dashboard' && (
          <Dashboard 
            onStartQuiz={handleOpenSetup} 
            userProgress={userProgress} 
          />
        )}

        {activeTab === 'setup' && (
          <QuizSetup 
            onStartQuiz={handleStartCustomQuiz}
            isLoading={isLoadingQuestions}
            error={questionLoadError}
          />
        )}

        {activeTab === 'quiz' && (
          <Quiz 
            questions={activeQuizQuestions}
            mode={activeQuizMeta.mode}
            onQuizComplete={handleQuizComplete} 
            onExit={handleGoHome} 
          />
        )}

        {activeTab === 'results' && quizResults && (
          <QuizResult 
            results={quizResults} 
            onRestartQuiz={handleOpenSetup} 
            onGoHome={handleGoHome} 
          />
        )}

        {activeTab === 'learn' && (
          <Learn />
        )}
      </main>

      {/* Bottom Navigation */}
      {activeTab !== 'quiz' && (
        <BottomNav 
          activeTab={activeTab === 'setup' ? 'quiz' : activeTab} 
          setActiveTab={setActiveTab} 
          onStartQuiz={handleOpenSetup} 
        />
      )}
    </div>
  );
}
