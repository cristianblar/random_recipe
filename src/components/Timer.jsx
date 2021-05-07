/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import React, { useState, useRef } from 'react';

function Timer() {
  const [state, setState] = useState({ timer: 3, timeLeft: 0 });

  const timerInput = useRef();

  const showNotification = async () => {
    // Registro a serviceWorker requerido para Android (igual funcionará en Desktop):
    const registration = await navigator.serviceWorker.getRegistration();
    // Validación del registro:
    if (!registration) return alert(`The notifications aren't working 😞`);
    // Envío de la notificación:
    registration.showNotification('Timer finished!', {
      body: 'Ding ding ding',
    });
  };

  const startTimer = async () => {
    // Check de soporte a notificaciones (Android requiere serviceWorker):
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      return alert(`Your browser doesn't support notifications 😞`);
    }

    // Check inicial de permisos (no funcionará si no se da permiso):
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    // Si las notificaciones están bloqueadas (no funcionará):
    if (Notification.permission === 'blocked') {
      return alert(`The notifications were blocked 😢`);
    }

    // Default case, just in case:
    if (Notification.permission !== 'granted') {
      return alert(`Something went wrong, please, try again`);
    }

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
