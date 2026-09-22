import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award,
  ChevronDown
} from 'lucide-react';

export default function QuizResult({ results, onRestartQuiz, onGoHome }) {
  const { selectedAnswers, timeSpent, questions } = results;

  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) {
      correctCount += 1;
    }
  });

  const percentage = Math.round((correctCount / questions.length) * 100);

  useEffect(() => {
    if (percentage >= 60) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  const getMessage = () => {
    if (percentage === 100) return { title: 'Perfect Score!', sub: 'Outstanding mastery of CFA Level I concepts!' };
    if (percentage >= 80) return { title: 'Great Job!', sub: 'Solid performance across key topics.' };
    if (percentage >= 60) return { title: 'Passed!', sub: 'Good effort, review the explanations below.' };
    return { title: 'Keep Practicing!', sub: 'Review missed questions to reinforce your knowledge.' };
  };

  const msg = getMessage();
  const letters = ['A', 'B', 'C'];

  return (
    <div className="results-container">
      {/* Trophy / Header */}
      <div className="score-circle">
        <div className="score-percentage">{percentage}%</div>
        <div className="score-label">{correctCount} / {questions.length} Correct</div>
      </div>

      <div>
        <h2 className="results-title">{msg.title}</h2>
        <p className="results-subtitle">{msg.sub}</p>
      </div>

      {/* Quick Summary Grid */}
      <div className="stats-grid" style={{ width: '100%' }}>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Score</span>
            <Award size={16} color="#F59E0B" />
          </div>
          <div className="stat-value">{correctCount}/{questions.length}</div>
          <div className="stat-footer">Questions Correct</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Time Taken</span>
            <Clock size={16} color="#3B82F6" />
          </div>
          <div className="stat-value">{formatTime(timeSpent)}</div>
          <div className="stat-footer">Total Time</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
        <button className="primary-btn" onClick={onRestartQuiz} style={{ flex: 1 }}>
          <RotateCcw size={16} />
          Retry Quiz
        </button>
        <button className="secondary-btn" onClick={onGoHome} style={{ flex: 1 }}>
          <Home size={16} />
          Dashboard
        </button>
      </div>

      {/* Question Review List */}
      <div style={{ width: '100%', marginTop: '12px' }}>
        <div className="section-header">
          <div className="section-title">Question Breakdown</div>
        </div>

        <div className="review-list">
          {questions.map((q, idx) => {
            const userChoice = selectedAnswers[idx];
            const isCorrect = userChoice === q.correctIndex;

            return (
              <div key={q.id} className="glass-card review-item">
                <div className="review-header">
                  <span style={{ color: '#3B82F6' }}>Q{idx + 1}. {q.topic}</span>
                  {isCorrect ? (
                    <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={15} /> Correct
                    </span>
                  ) : (
                    <span style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <XCircle size={15} /> Incorrect
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '14px', fontWeight: 600, color: '#F8FAFC' }}>
                  {q.question}
                </div>

                <div style={{ fontSize: '13px', color: '#94A3B8' }}>
                  Your answer: <strong style={{ color: isCorrect ? '#10B981' : '#EF4444' }}>
                    {userChoice !== undefined ? `${letters[userChoice]}: ${q.options[userChoice]}` : 'Not answered'}
                  </strong>
                </div>

                {!isCorrect && (
                  <div style={{ fontSize: '13px', color: '#10B981' }}>
                    Correct answer: <strong>{letters[q.correctIndex]}: {q.options[q.correctIndex]}</strong>
                  </div>
                )}

                <div className="explanation-box" style={{ marginTop: '6px' }}>
                  <div className="explanation-title">Explanation</div>
                  <div>{q.explanation}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
