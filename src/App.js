import React, { createContext, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import Screen from "@constants/screen";
import Menu from "@components/Menu/Menu";
import MenuModePvP from "@components/Menu/MenuModePvP";
import MenuModePvE from "@components/Menu/MenuModePvE";
import Bot from "@constants/bot"
import GameRoomPvE from "@components/GameRoom/GameRoomPvE";
import GameRoomPvP from "@components/GameRoom/GameRoomPvP";
import { io } from "socket.io-client";





const GameContext = createContext()

export default memo(function App() {
  const [screen, setScreen] = useState(Screen.menu)
  const [gameMode, setGameMode] = useState(null)
  const [botMode, setBotMode] = useState(Bot[0])
  const [winMode, setWinMode] = useState(true)
  const [isFirstPlayer, setIsFirstPlayer] = useState(true)

  const socketRef = useRef()
  const content = useMemo(() => {
    switch (screen) {
      case Screen.menu:
        return <Menu />
      // return <GameRoom />
      case Screen.menuPvP:
        return <MenuModePvP />
      case Screen.menuPvE:
        return <MenuModePvE />
      case Screen.gamePvP:
        return <GameRoomPvP />
      case Screen.gamePvE:
        return <GameRoomPvE />
      default:
        return <></>
    }
  }, [screen])

  useEffect(() => {
    socketRef.current = io("http://localhost:3002")



  }, [])


  return (

    <GameContext.Provider value={{
      socketRef,
      gameMode, setGameMode,
      screen, setScreen,
      botMode, setBotMode,
      winMode, setWinMode,
      isFirstPlayer, setIsFirstPlayer
    }}>
      {content}
    </GameContext.Provider>
  );
})

export { GameContext }