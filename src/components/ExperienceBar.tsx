import React from "react";
import { ChallengeContext } from "../context/ChallengeContext";
import styles from "../styles/components/ExperienceBar.module.css";

const ExperienceBar = () => {
  const { currentExperience, experienceTonextLevel } = React.useContext(
    ChallengeContext
  );

  const percentToNextLevel = Math.round(
    (currentExperience * 100) / experienceTonextLevel
  );
  return (
    <header className={styles.experienceBar}>
      <span>0 XP</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }}></div>
        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExperience}xp
        </span>
      </div>
      <span> {experienceTonextLevel} XP</span>
    </header>
  );
};

export default ExperienceBar;
