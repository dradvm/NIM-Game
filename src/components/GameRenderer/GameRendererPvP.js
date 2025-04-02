import { createContext, memo, useContext, useEffect, useMemo, useRef, useState } from "react";


import MenuModePvP from "@components/Menu/MenuModePvP";
import GameRoomPvP from "@components/GameRoom/GameRoomPvP";

import Screen from "@constants/screen";
import { io, Socket } from "socket.io-client";
import MenuLoading from "../Menu/MenuLoading";
import GameContext from "../Context/GameContext";
import SocketContext from "../Context/SocketContext";

export default memo(function GameRendererPvP() {
    const { screen } = useContext(GameContext)

    const socketRef = useRef()
    const [isLoadingSocket, setIsLoadingSocket] = useState(true)

    const content = useMemo(() => {
        switch (screen) {
            case Screen.menuPvP:
                return <MenuModePvP />
            case Screen.gamePvP:
                return <GameRoomPvP />
            default:
                return <></>
        }
    }, [screen])



    useEffect(() => {
        socketRef.current = io("https://nim-game-socket.onrender.com/")

        socketRef.current.on("connect", () => {
            setTimeout(() => {
                setIsLoadingSocket(false)
            }, 1000)
        });

        return () => {
            socketRef.current.disconnect()
        }

    }, [])

    return (
        <SocketContext.Provider value={{ socketRef }}>
            {!isLoadingSocket ? content : <MenuLoading />}
        </SocketContext.Provider>
    )
})