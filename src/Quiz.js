// Quiz.js
import React, { useState } from 'react';
import quizData from './quizData';
import './Quiz.css'; // Add this for styling

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerOptionClick = (option) => {
    const correctAnswer = quizData[currentQuestion].answer;
    setSelectedAnswer(option);
    if (option === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setIsCorrect(null);
        setSelectedAnswer('');
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>🎉 Quiz Completed!</h2>
          <p>You scored <strong>{score}</strong> out of <strong>{quizData.length}</strong></p>
        </div>
      ) : (
        <>
          <div className="question-section">
            <h3>Question {currentQuestion + 1} of {quizData.length}</h3>
            <p className="question-text">{quizData[currentQuestion].question}</p>
          </div>

          <div className="answer-section">
            {quizData[currentQuestion].options.map((option) => (
              <button
                key={option}
                className={`answer-button ${
                  selectedAnswer === option
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                onClick={() => handleAnswerOptionClick(option)}
                disabled={selectedAnswer !== ''}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer && (
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
