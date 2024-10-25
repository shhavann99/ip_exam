// src/Quiz.jsx
import React, { useState, useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Timer from './Timer'; // Import the Timer component

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(60); // Set the initial time for the quiz
  const [isQuizEnded, setIsQuizEnded] = useState(false); // State to track if the quiz has ended
  const [timeTaken, setTimeTaken] = useState(0); // State to store the time taken

  // Timer reducer
  const timerReducer = (state, action) => {
    switch (action.type) {
      case 'tick':
        return { secondsRemaining: state.secondsRemaining - 1 };
      case 'reset':
        return { secondsRemaining: 60 }; // Reset to 60 seconds
      default:
        throw new Error();
    }
  };

  const [timerState, dispatch] = useReducer(timerReducer, { secondsRemaining });

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  useEffect(() => {
    if (timerState.secondsRemaining <= 0 && !isQuizEnded) {
      setIsQuizEnded(true); // End the quiz when time runs out
      alert("Time's up!");
    }
  }, [timerState.secondsRemaining, isQuizEnded]);

  const handleAnswer = (answer) => {
    if (!isQuizEnded && selectedAnswer === '') {
      setSelectedAnswer(answer);
      if (answer === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(''); // Reset selected answer for the next question
    if (currentQuestion === questions.length - 1) {
      setIsQuizEnded(true); // End the quiz when the last question is answered
      setTimeTaken(60 - timerState.secondsRemaining); // Calculate the time taken
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setIsQuizEnded(false);
    setTimeTaken(0);
    dispatch({ type: 'reset' }); // Reset the timer to 60 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <Timer dispatch={dispatch} secondsRemaining={timerState.secondsRemaining} isQuizEnded={isQuizEnded} />
      {isQuizEnded ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Your Score: {score} / {questions.length}</h2>
          <p className="mb-4">You finished in {timeTaken} seconds.</p>
          <button onClick={resetQuiz} className="bg-blue-500 text-white p-2 rounded">Retry Quiz</button>
        </div>
      ) : (
        currentQuestion < questions.length && (
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
            <div className="mb-4">
              {questions[currentQuestion].options.map((option) => (
                <div key={option} className="flex items-center">
                  <button
                    className={`block w-full text-left p-2 mb-2 rounded border 
                      ${selectedAnswer === option && option === questions[currentQuestion].answer ? 'bg-blue-300' : ''}
                      ${selectedAnswer === option && option !== questions[currentQuestion].answer ? 'bg-red-300' : 'hover:bg-blue-200'}`}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedAnswer} // Disable the button if an answer is selected
                  >
                    {option}
                  </button>
                  {selectedAnswer === option && option === questions[currentQuestion].answer && (
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 ml-2" />
                  )}
                  {selectedAnswer === option && option !== questions[currentQuestion].answer && (
                    <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 ml-2" />
                  )}
                </div>
              ))}
            </div>
            <button
              className={`mt-4 bg-blue-500 text-white p-2 rounded ${!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              Next
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Quiz;
