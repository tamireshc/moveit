import React, { useContext } from "react";
import { CountdownContext } from "../context/CountdownContext";
import styles from "../styles/components/Countdown.module.css";

const Countdown = () => {
  const {
    minutes,
    seconds,
    hasFinish,
    isActive,
    resetCountdown,
    startCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, "0").split("");
  const [secondsLeft, secondsRigth] = String(seconds)
    .padStart(2, "0")
    .split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRigth}</span>
        </div>
      </div>
      {hasFinish ? (
        <button disabled className={styles.countdownButton}>
          Ciclo Encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar Ciclo
            </button>
          ) : (
            <button className={styles.countdownButton} onClick={startCountdown}>
              Iniciar um Ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Countdown;
