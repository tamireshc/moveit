import React from "react";
import { ChallengeContext } from "../context/ChallengeContext";
import styles from "../styles/components/CompletedChallenges.module.css";

const CompletedChallenges = () => {
  const { challengesCompleted } = React.useContext(ChallengeContext);
  return (
    <div className={styles.CompletedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
};

export default CompletedChallenges;
