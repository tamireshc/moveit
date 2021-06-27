import React, { useContext } from "react";
import { ChallengeContext } from "../context/ChallengeContext";
import styles from "../styles/components/Profile.module.css";

const Profile = () => {
  const { level } = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/tamireshc.png" alt="" />
      <div>
        <strong>Tamires Sousa</strong>
        <p>
          <img src="icons/level.svg" alt="" />
          Level {level}
        </p>
      </div>
    </div>
  );
};

export default Profile;
