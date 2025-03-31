import React, { createContext, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import Screen from "@constants/screen";
import Menu from "@components/Menu/Menu";
import Bot from "@constants/bot"
import GameRendererPvP from "./components/GameRenderer/GameRendererPvP";
import GameRendererPvE from "./components/GameRenderer/GameRendererPvE";
import GameContext from "@components/Context/GameContext"

export default memo(function App() {
  const [screen, setScreen] = useState(Screen.menu)
  const [gameMode, setGameMode] = useState(null)
  const [botMode, setBotMode] = useState(Bot[0])
  const [levelMode, setLevelMode] = useState(Bot[0].level)
  const [isFirstPlayer, setIsFirstPlayer] = useState(true)
  const [volume, setVolume] = useState(75);

  const stopAudioRef = useRef(null)
  const content = useMemo(() => {
    switch (screen) {
      case Screen.menu:
        return <Menu />
      case Screen.menuPvP:
      case Screen.gamePvP:
        return <GameRendererPvP />
      case Screen.menuPvE:
      case Screen.gamePvE:
        return <GameRendererPvE />
      default:
        return <></>
    }
  }, [screen])



  return (

    <GameContext.Provider value={{
      stopAudioRef,
      gameMode, setGameMode,
      screen, setScreen,
      botMode, setBotMode,
      levelMode, setLevelMode,
      isFirstPlayer, setIsFirstPlayer,
      volume, setVolume
    }}>
      {content}
    </GameContext.Provider>
  );
})
