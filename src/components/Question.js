import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // side effect for the setTimeout that decreases the time by 1 every second and its clean up function.
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setTimeRemaining(currentTime => currentTime -1)
    }, 1000);
    return ()=>{
      clearTimeout(timer);
    };
    //needed variables.
  }, [timeRemaining]
  );

  // side effect for calling the prop onAnswer(false) and resetting the time back to 10 when it reaches 0.
  useEffect(()=>{
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
