const STORAGE_KEY = 'cfa_mini_app_user_progress_v3';
const GUEST_ID_KEY = 'cfa_mini_app_guest_id';

export const INITIAL_TOPIC_STATS = {
  "Ethics & Professional Standards": { attempted: 0, correct: 0 },
  "Quantitative Methods": { attempted: 0, correct: 0 },
  "Financial Statement Analysis": { attempted: 0, correct: 0 },
  "Equity Investments": { attempted: 0, correct: 0 },
  "Fixed Income & Derivatives": { attempted: 0, correct: 0 }
};

export const DEFAULT_USER_PROGRESS = {
  telegramId: 'guest_default',
  solvedTotal: 0,
  correctTotal: 0,
  dailyCompleted: 0,
  dailyTarget: 10,
  streak: 1,
  topicStats: INITIAL_TOPIC_STATS,
  history: []
};

// Helper: Extract or generate unique User ID (Telegram ID or Guest fallback)
export function getTelegramUserId(telegramUser) {
  if (telegramUser?.id) return String(telegramUser.id);
  
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return String(window.Telegram.WebApp.initDataUnsafe.user.id);
  }

  // Persistent guest fallback ID
  try {
    let guestId = localStorage.getItem(GUEST_ID_KEY);
    if (!guestId) {
      guestId = 'guest_' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem(GUEST_ID_KEY, guestId);
    }
    return guestId;
  } catch (e) {
    return 'guest_default';
  }
}

// Load cached progress from localStorage
export function loadUserProgress(telegramUser) {
  const telegramId = getTelegramUserId(telegramUser);
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${telegramId}`);
    if (!raw) {
      return {
        ...DEFAULT_USER_PROGRESS,
        telegramId
      };
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_USER_PROGRESS,
      ...parsed,
      telegramId,
      topicStats: {
        ...INITIAL_TOPIC_STATS,
        ...(parsed.topicStats || {})
      },
      history: parsed.history || []
    };
  } catch (e) {
    console.error('Failed to load local progress:', e);
    return { ...DEFAULT_USER_PROGRESS, telegramId };
  }
}

// Save progress to local cache
export function saveUserProgress(progress) {
  try {
    const telegramId = progress.telegramId || 'guest_default';
    localStorage.setItem(`${STORAGE_KEY}_${telegramId}`, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save local progress:', e);
  }
}

// Fetch user progress from Cloudflare D1
export async function fetchUserProgressFromD1(telegramUser) {
  const telegramId = getTelegramUserId(telegramUser);
  const firstName = telegramUser?.first_name || '';
  const username = telegramUser?.username || '';

  try {
    const res = await fetch(`/api/user-progress?telegram_id=${telegramId}&first_name=${encodeURIComponent(firstName)}&username=${encodeURIComponent(username)}`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const d1Data = await res.json();
      if (d1Data && !d1Data.error) {
        const merged = {
          ...DEFAULT_USER_PROGRESS,
          ...d1Data,
          telegramId,
          topicStats: {
            ...INITIAL_TOPIC_STATS,
            ...(d1Data.topicStats || {})
          }
        };
        saveUserProgress(merged);
        return merged;
      }
    }
  } catch (e) {
    console.warn('D1 offline or endpoint unavailable, using local cache:', e);
  }
  return loadUserProgress(telegramUser);
}

// Record completed quiz: Updates local cache instantly + syncs asynchronously to Cloudflare D1
export function recordQuizCompletion(quizResults, mode = 'practice', topicName = 'Mixed Mock', telegramUser = null) {
  const telegramId = getTelegramUserId(telegramUser);
  const currentProgress = loadUserProgress(telegramUser);
  const { selectedAnswers, timeSpent, questions } = quizResults;

  let newCorrect = 0;
  const newTopicStats = { ...currentProgress.topicStats };

  questions.forEach((q, idx) => {
    const userChoice = selectedAnswers[idx];
    const isCorrect = userChoice === q.correctIndex;
    if (isCorrect) newCorrect += 1;

    const topicKey = q.topic;
    if (!newTopicStats[topicKey]) {
      newTopicStats[topicKey] = { attempted: 0, correct: 0 };
    }

    newTopicStats[topicKey] = {
      attempted: newTopicStats[topicKey].attempted + 1,
      correct: newTopicStats[topicKey].correct + (isCorrect ? 1 : 0)
    };
  });

  const percentage = Math.round((newCorrect / questions.length) * 100);
  const updatedSolved = currentProgress.solvedTotal + questions.length;
  const updatedCorrect = currentProgress.correctTotal + newCorrect;
  const updatedDaily = currentProgress.dailyCompleted + questions.length;

  const newHistoryItem = {
    id: 'quiz-' + Date.now(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    topicName: topicName,
    mode: mode,
    score: newCorrect,
    total: questions.length,
    percentage: percentage,
    timeSpent: timeSpent
  };

  const updatedHistory = [newHistoryItem, ...currentProgress.history].slice(0, 25);

  const updatedProgress = {
    ...currentProgress,
    telegramId,
    solvedTotal: updatedSolved,
    correctTotal: updatedCorrect,
    dailyCompleted: updatedDaily,
    topicStats: newTopicStats,
    history: updatedHistory
  };

  // Instant local save
  saveUserProgress(updatedProgress);

  // Background Cloudflare D1 Sync
  fetch('/api/user-progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      telegram_id: telegramId,
      quizResults,
      mode,
      topicName
    })
  }).catch(err => console.warn('D1 Sync notice:', err));

  return updatedProgress;
}
