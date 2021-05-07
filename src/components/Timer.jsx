import React, { useState, useRef } from 'react';

function Timer() {
  const [state, setState] = useState({ timer: 3, timeLeft: 0 });

  const timerInput = useRef();

  const showNotification = async () => {
    // TODO... Pending!
  };

  const startTimer = async () => {
    let { timer } = state;
    setState({ timeLeft: timer });

    const countdownInterval = setInterval(() => {
      timer -= 1;
      setState({ timeLeft: timer });
      if (timer <= 0) {
        clearInterval(countdownInterval);
        showNotification();
      }
    }, 1000);
  };

  return (
    <div className="Timer">
      <div className="name">Timer ⏲</div>
      {state.timeLeft === 0 ? (
        <div className="center">
          <input
            type="number"
            min="0"
            max="999"
            step="1"
            ref={timerInput}
            value={state.timer}
            onChange={() => setState({ timer: timerInput.current })}
          />
          <button type="button" onClick={startTimer}>
            Start
          </button>
        </div>
      ) : (
        <div className="timeLeft">{state.timeLeft}s</div>
      )}
    </div>
  );
}

export default Timer;
