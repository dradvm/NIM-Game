import { memo, useCallback, useContext, useEffect, useState } from "react";
import NimContext from "./NimContext";
import Player from "@constants/player"
import Game from "@constants/game"
import { GameContext } from "@/App";
import GameRoom from "./GameRoom";


export default memo(function GameRoomPvP() {

    const { socketRef, gameMode, isFirstPlayer } = useContext(GameContext)
    const [gameTurn, setGameTurn] = useState(isFirstPlayer ? Player.player1 : Player.player2)

    // const numberGonggiBox = botMode.level.numberGonggiBox
    // const numberGonggiBox = 5
    // const [gonggis, setGonggis] = useState(Array(numberGonggiBox).fill(0).map(() => getRandomNumber(1, numberGonggiBox)))
    const [gonggis, setGonggis] = useState([])
    const endPlayer1Turn = useCallback(() => {
        setGameTurn(Player.player2)
    }, [])


    const endPlayer2Turn = useCallback(() => {
        setGameTurn(Player.player2)
    }, [])




    const isEndGame = useCallback(() => {
        return gonggis.every((gonggi) => gonggi === 0)
    }, [gonggis])

    useEffect(() => {
        if (!isEndGame()) {

        }
    }, [gameTurn])

    useEffect(() => {
        console.log("render")
        if (gameMode === Game.gamePvP) {
            socketRef.current.emit("getGonggis")
            socketRef.current.on("gonggis", (data) => {
                console.log(data)
                setGonggis(data)
            })
        }
    }, [])

    useEffect(() => {
        console.log("----")
        console.log(gonggis)
        console.log("----")
    }, [gonggis])

    return (
        <NimContext.Provider value={{ gameTurn, endPlayer1Turn, endPlayer2Turn, gonggis, setGonggis }}>
            <GameRoom />
        </NimContext.Provider>
    )
})