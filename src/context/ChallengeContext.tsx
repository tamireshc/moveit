import React, { ReactNode, useEffect } from "react";
import { createContext } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import LevelUpModal from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  experienceTonextLevel: number;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

//o ChallengesProviderProps esta envolvendo todo o app no index.txt

interface ChallengesProviderProps {
  children: ReactNode;
  // foram inseridos as tipagens dos valores retornados dos cookies aki
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}
//esse rest sao as propriedades buscadas nos cookies determinadas no index.txt
export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = React.useState(rest.level ?? 1); //completadas com o rest ou o valor 0 buscadas nos cookies
  const [currentExperience, setCurrentExperience] = React.useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = React.useState(
    rest.challengesCompleted ?? 0
  );

  const [activeChallenge, setActiveChallenge] = React.useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = React.useState(false);

  const experienceTonextLevel = Math.pow((level + 1) * 4, 2);
  //solicitação de notificação na tela ao abrir pela 1x
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  //armazenamento nos cookies dos valores da interface - add o yarn add js-cookies
  //                                                   - yarn add @types/js-cookies -D

  useEffect(() => {
    Cookies.set("level", level.toString());
    Cookies.set("currentExperience", currentExperience.toString());
    Cookies.set("challengesCompleted", challengesCompleted.toString());
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    // inserção das notificações na interface

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio!!!", {
        body: `valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceTonextLevel) {
      finalExperience = finalExperience - experienceTonextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentExperience,
        activeChallenge,
        challengesCompleted,
        startNewChallenge,
        resetChallenge,
        levelUp,
        experienceTonextLevel,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {/* modal criado tem q estar dentro de cum ChallengeContext.provider para ter acesso as variaveis */}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
}
