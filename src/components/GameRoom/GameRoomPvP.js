import { memo, useCallback, useContext, useEffect, useState } from "react";
import NimContext from "./NimContext";
import Player from "@constants/player"
import Game from "@constants/game"
import { GameContext } from "@/App";
import GameRoom from "./GameRoom";


export default memo(function GameRoomPvP() {

    const { socketRef, isFirstPlayer } = useContext(GameContext)
    const [gameTurn, setGameTurn] = useState(Player.player1)
    const [gamePlayer, setGamePlayer] = useState(isFirstPlayer ? Player.player1 : Player.player2)
    const [score, setScore] = useState({ player1: 0, player2: 0 })
    const [gonggis, setGonggis] = useState([])
    const [players, setPlayers] = useState([])


    const endPlayer1Turn = useCallback(() => {
        // setGameTurn(Player.player2)
    }, [])


    const endPlayer2Turn = useCallback(() => {
        // setGameTurn(Player.player1)
    }, [])

    const getGonggisNumberInBox = useCallback(() => {
        return gonggis.map((box) => {
            return box.reduce((total, gonggi) => total + (gonggi.isVisible ? 1 : 0), 0)
        })
    }, [gonggis])

    const isEndGame = useCallback(() => {
        const gonggisNumberInBox = getGonggisNumberInBox()
        return gonggisNumberInBox.every((gonggi) => gonggi === 0) && gonggis.length > 0
    }, [getGonggisNumberInBox, gonggis])



    useEffect(() => {
        if (!isEndGame()) {
        }
        else {
            console.log(score)
            handleScore(gameTurn !== Player.player1)
        }
    }, [gonggis])


    const handleScore = useCallback((isPlayer1Win) => {
        var scorePlusPlayer1 = isPlayer1Win ? 1 : 0
        var scorePlusPlayer2 = isPlayer1Win ? 0 : 1
        setScore((prev) => ({
            player1: prev.player1 + scorePlusPlayer1,
            player2: prev.player2 + scorePlusPlayer2
        }))
    }, [])

    useEffect(() => {
        socketRef.current.emit("getGonggis")
        socketRef.current.emit("getPlayers")
        socketRef.current.on("gonggis", (data) => {
            setGonggis(data)
        })
        socketRef.current.on("turn", (turn) => {
            setGameTurn(turn ? Player.player1 : Player.player2)
        })
        socketRef.current.on("roomDeleted", () => {

        })

        socketRef.current.on("players", (data) => {
            console.log(data)
            setPlayers([...data])
        })
    }, [])


    return (
        <NimContext.Provider value={{ gamePlayer, gameTurn, endPlayer1Turn, endPlayer2Turn, gonggis, setGonggis, score, isEndGame, players }}>
            <GameRoom />
        </NimContext.Provider>
    )
})