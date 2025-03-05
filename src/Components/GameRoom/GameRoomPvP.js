import { memo, useCallback, useContext, useEffect, useState } from "react";
import NimContext from "./NimContext";
import Player from "@constants/player"
import Game from "@constants/game"
import { GameContext } from "@/App";
import GameRoom from "./GameRoom";


export default memo(function GameRoomPvP() {

    const { socketRef, gameMode, isFirstPlayer } = useContext(GameContext)
    const [gameTurn, setGameTurn] = useState(Player.player1)
    const [gamePlayer, setGamePlayer] = useState(isFirstPlayer ? Player.player1 : Player.player2)

    // const numberGonggiBox = botMode.level.numberGonggiBox
    // const numberGonggiBox = 5
    // const [gonggis, setGonggis] = useState(Array(numberGonggiBox).fill(0).map(() => getRandomNumber(1, numberGonggiBox)))
    const [gonggis, setGonggis] = useState([])


    const endPlayer1Turn = useCallback(() => {
        // setGameTurn(Player.player2)
    }, [])


    const endPlayer2Turn = useCallback(() => {
        // setGameTurn(Player.player1)
    }, [])


    const isEndGame = useCallback(() => {
        return gonggis.every((gonggi) => gonggi === 0)
    }, [gonggis])

    useEffect(() => {
        if (!isEndGame()) {

        }
    }, [gameTurn])

    useEffect(() => {
        socketRef.current.emit("getGonggis")
        socketRef.current.on("gonggis", (data) => {
            setGonggis(data)
        })
        socketRef.current.on("turn", (turn) => {
            setGameTurn(turn ? Player.player1 : Player.player2)
        })

        // return () => {
        //     socketRef.current.off("gonggis")
        //     socketRef.current.off("turn")
        // }

    }, [])


    return (
        <NimContext.Provider value={{ gamePlayer, gameTurn, endPlayer1Turn, endPlayer2Turn, gonggis, setGonggis }}>
            <GameRoom />
        </NimContext.Provider>
    )
})