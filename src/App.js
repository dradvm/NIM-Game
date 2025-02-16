import React, { createContext, memo, useCallback, useEffect, useMemo, useState } from "react";

import Screen from "@constants/screen";
import Menu from "@components/Menu/Menu";
import { io } from "socket.io-client";
import MenuModePvP from "@components/Menu/MenuModePvP";
import MenuModePvE from "@components/Menu/MenuModePvE";
import Bot from "@constants/bot"
import GameRoomPvE from "@components/GameRoom/GameRoomPvE";



// const socket = io("http://localhost:3001");

const GameContext = createContext()

export default memo(function App() {
  const [screen, setScreen] = useState(Screen.menu)
  const [botMode, setBotMode] = useState(Bot[0])
  const [winMode, setWinMode] = useState(true)
  const [firstPlayMode, setFirstPlayMode] = useState(true)

  const content = useMemo(() => {
    switch (screen) {
      case Screen.menu:
        return <Menu />
      // return <GameRoom />
      case Screen.modePvP:
        return <MenuModePvP />
      case Screen.modePvE:
        return <MenuModePvE />
      case Screen.gamePvE:
        return <GameRoomPvE />
      default:
        return <></>
    }
  }, [screen])



  // const [moves, setMoves] = useState([]);

  // useEffect(() => {
  //   // Lắng nghe khi nhận được nước đi từ đối thủ
  //   socket.on("receiveMove", (move) => {
  //     setMoves((prev) => [...prev, move]);
  //   });

  //   return () => {
  //     socket.off("receiveMove");
  //   };
  // }, []);
  // const sendMove = () => {
  //   const move = `Move at ${new Date().toLocaleTimeString()}`;
  //   socket.emit("sendMove", move);
  //   setMoves((prev) => [...prev, move]);
  // };
  return (
    // <div>
    //   <h1>Online Game</h1>
    //   <button onClick={sendMove}>Send Move</button>
    //   <ul>
    //     {moves.map((move, index) => (
    //       <li key={index}>{move}</li>
    //     ))}
    //   </ul>
    // </div>
    <GameContext.Provider value={{
      screen, setScreen,
      botMode, setBotMode,
      winMode, setWinMode,
      firstPlayMode, setFirstPlayMode
    }}>
      {content}
    </GameContext.Provider>
  );
})

export { GameContext }