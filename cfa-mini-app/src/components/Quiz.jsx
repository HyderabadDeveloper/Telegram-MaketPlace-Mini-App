import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  Flag, 
  HelpCircle, 
  ChevronRight, 
  CheckCircle, 
  XCircle,
  ArrowLeft
} from 'lucide-react';
import ExplanationText from './ExplanationText';

export default function Quiz({ questions, mode = 'practice', onQuizComplete, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const currentQ = questions[currentIndex] || questions[0];
  const totalQ = questions.length;
  const currentSelected = selectedAnswers[currentIndex];
  const isExamMode = mode === 'exam';

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (index) => {
    if (!isExamMode && currentSelected !== undefined) return; // In Practice mode, lock after selection
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: index
    }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < totalQ - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onQuizComplete({
        selectedAnswers,
        timeSpent: secondsElapsed,
        questions
      });
    }
  };

  const letters = ['A', 'B', 'C'];

  return (
    <div className="quiz-container">
      {/* Top Header Bar */}
      <div className="quiz-top-bar">
        <button className="icon-btn" onClick={onExit} title="Exit Session">
          <ArrowLeft size={18} />
        </button>

        <div className="quiz-progress-text">
          Question <span style={{ color: '#F8FAFC' }}>{currentIndex + 1}</span> of {totalQ}
          {isExamMode && <span style={{ fontSize: '11px', color: '#F59E0B', marginLeft: '6px' }}>(Exam Mode)</span>}
        </div>

        <div className="quiz-timer">
          <Timer size={15} />
          <span>{formatTime(secondsElapsed)}</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ 
            width: `${((currentIndex + 1) / totalQ) * 100}%`,
            background: isExamMode ? 'linear-gradient(90deg, #F59E0B, #EF4444)' : 'linear-gradient(90deg, #3B82F6, #10B981)'
          }}
        />
      </div>

      {/* Question Card */}
      <div className="glass-card question-card">
        <div className="question-meta">
          <span className="question-topic">{currentQ.topic}</span>
          <button 
            className={`flag-btn ${flaggedQuestions[currentIndex] ? 'flagged' : ''}`}
            onClick={toggleFlag}
          >
            <Flag size={14} fill={flaggedQuestions[currentIndex] ? '#F59E0B' : 'none'} />
            {flaggedQuestions[currentIndex] ? 'Flagged' : 'Flag'}
          </button>
        </div>

        <div className="question-text">{currentQ.question}</div>

        {/* Options */}
        <div className="options-list">
          {currentQ.options.map((optText, optIdx) => {
            const isSelected = currentSelected === optIdx;
            const isCorrectOption = optIdx === currentQ.correctIndex;
            const isAnswered = currentSelected !== undefined;

            let statusClass = '';
            if (isExamMode) {
              // Exam Mode: Only show 'selected' highlight, no green/red feedback
              if (isSelected) statusClass = 'selected';
            } else {
              // Practice Mode: Show immediate correct/incorrect feedback
              if (isAnswered) {
                if (isCorrectOption) {
                  statusClass = 'correct';
                } else if (isSelected && !isCorrectOption) {
                  statusClass = 'incorrect';
                }
              } else if (isSelected) {
                statusClass = 'selected';
              }
            }

            return (
              <button
                key={optIdx}
                className={`option-btn ${statusClass}`}
                onClick={() => handleSelectOption(optIdx)}
              >
                <div className="option-letter">{letters[optIdx]}</div>
                <div style={{ flex: 1 }}>{optText}</div>
                
                {/* Icons only shown in Practice Mode */}
                {!isExamMode && isAnswered && isCorrectOption && (
                  <CheckCircle size={18} color="#10B981" />
                )}
                {!isExamMode && isAnswered && isSelected && !isCorrectOption && (
                  <XCircle size={18} color="#EF4444" />
                )}
              </button>
            );
          })}
        </div>

        {/* Practice Mode Explanation Box */}
        {!isExamMode && currentSelected !== undefined && (
          <div style={{ marginTop: '4px' }}>
            {!showExplanation ? (
              <button 
                className="secondary-btn" 
                onClick={() => setShowExplanation(true)}
                style={{ fontSize: '13px', padding: '10px' }}
              >
                <HelpCircle size={15} color="#3B82F6" />
                View Explanation & Formula Breakdown
              </button>
            ) : (
              <div className="explanation-box">
                <div className="explanation-title">
                  <HelpCircle size={16} color="#3B82F6" />
                  Explanation & Formula Breakdown
                </div>
                <ExplanationText>{currentQ.explanation}</ExplanationText>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Navigation Button */}
      {currentSelected !== undefined && (
        <button className="primary-btn" onClick={handleNext}>
          {currentIndex < totalQ - 1 ? 'Next Question' : 'Submit & View Score'}
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
