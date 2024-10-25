import React, { useEffect } from 'react';

function Timer({ dispatch, secondsRemaining, isQuizEnded }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  if (isQuizEnded) return null; // Do not display the timer if the quiz has ended

  return (
    <div className="timer text-2xl font-bold">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
