import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import GameRoom from "./GameRoom";
import Player from "@constants/player"
import Level from "@constants/level"
import Random from "@utils/random"
import NimContext from "@components/Context/NimContext";
import GameContext from "@components/Context/GameContext";
import SocketContext from "../Context/SocketContext";

export default memo(function GameRoomPvE() {


    const { botMode, isFirstPlayer } = useContext(GameContext)
    const [gameTurn, setGameTurn] = useState(isFirstPlayer ? Player.player : Player.computer)
    const [score, setScore] = useState({ player1: 0, player2: 0 })
    const [toggleResetGame, setToggleResetGame] = useState(false)
    const numberGonggiBox = botMode.level.numberGonggiBox
    const [gonggis, setGonggis] = useState(
        Array(numberGonggiBox).fill(0).map(() => {
            const randomSize = Random.randomNumber(1, numberGonggiBox)
            return Array(randomSize).fill().map((_, i) => ({
                index: i,
                isVisible: true,
                color: Random.randomColor(),
                shape: Random.randomShape()
            }));
        })
    );
    const socketRef = useRef(null)

    const getGonggisNumberInBox = useCallback(() => {
        return gonggis.map((box) => {
            return box.reduce((total, gonggi) => total + (gonggi.isVisible ? 1 : 0), 0)
        })
    }, [gonggis])


    const handleScore = useCallback((isPlayer1Win) => {
        var scorePlusPlayer1 = isPlayer1Win ? 1 : 0
        var scorePlusPlayer2 = isPlayer1Win ? 0 : 1
        setScore((prev) => ({
            player1: prev.player1 + scorePlusPlayer1,
            player2: prev.player2 + scorePlusPlayer2
        }))
    }, [])

    const endPlayerTurn = useCallback(() => {
        setGameTurn(Player.computer)
    }, [])


    const getPercentLevel = useCallback(() => {
        switch (botMode.level) {
            case Level.easy:
                return 0.2
            case Level.normal:
                return 0.5
            case Level.hard:
                return 0.8
            case Level.expert:
                return 1
            default:
                return 0
        }
    }, [botMode])

    const actionChoose = useCallback(() => {
        var percentActionExactly = getPercentLevel()
        if (Math.random() > percentActionExactly) {
            return true
        }
        else {
            return false
        }
    }, [])

    const endComputerTurn = useCallback(() => {
        setGameTurn(Player.player)
    }, [])

    const handleComputerTurn = useCallback(() => {

        var boxSelect
        var numberGonggiSelect
        const gonggisNumberInBox = getGonggisNumberInBox()
        var nimSum = gonggisNumberInBox.reduce((nimSum, gonggi) => nimSum ^ gonggi, 0)
        var boxNotEmpty = gonggisNumberInBox.map((item, index) => item !== 0 ? index : -1).filter((item) => item !== -1)

        if (nimSum === 0) {
            boxSelect = boxNotEmpty[Random.randomNumber(0, boxNotEmpty.length - 1)]
            numberGonggiSelect = Random.randomNumber(1, gonggisNumberInBox[boxSelect])
        }
        else {
            var action = actionChoose()
            if (action) {
                boxSelect = boxNotEmpty[Random.randomNumber(0, boxNotEmpty.length - 1)]
                numberGonggiSelect = Random.randomNumber(1, gonggisNumberInBox[boxSelect])
            }
            else {
                boxNotEmpty = boxNotEmpty.filter((item) => {
                    var gonggi = gonggisNumberInBox[item]
                    if ((gonggi ^ nimSum) < gonggi) {
                        return true
                    }
                    else {
                        return false
                    }
                })
                boxSelect = boxNotEmpty[Random.randomNumber(0, boxNotEmpty.length - 1)]
                numberGonggiSelect = gonggisNumberInBox[boxSelect] - (gonggisNumberInBox[boxSelect] ^ nimSum)
            }
        }
        setTimeout(() => {
            var lastGonggiItemVisible = 0
            gonggis[boxSelect].forEach((gonggi) => {
                if (gonggi.isVisible) {
                    lastGonggiItemVisible = gonggi.index
                }
            })
            var currentGonggiHoverComputer = lastGonggiItemVisible - numberGonggiSelect + 1
            gonggis[boxSelect].forEach((item) => {
                if (item.isVisible) {
                    item.isVisible = !(item.index >= currentGonggiHoverComputer)
                }
            })
            endComputerTurn()
        }, 500)
    }, [gonggis, getGonggisNumberInBox]);


    const isEndGame = useCallback(() => {
        const gonggisNumberInBox = getGonggisNumberInBox()
        return gonggisNumberInBox.every((gonggi) => gonggi === 0)
    }, [getGonggisNumberInBox])

    useEffect(() => {
        console.log("Change Game Turn")
        if (!isEndGame()) {
            if (gameTurn === Player.computer) {
                handleComputerTurn()
            }
            else if (gameTurn === Player.player) {
            }
        }
        else {
            handleScore(gameTurn !== Player.player)
        }
    }, [gameTurn, toggleResetGame])


    return (
        <SocketContext.Provider value={{ socketRef }}>
            <NimContext.Provider value={{ gameTurn, setGameTurn, endPlayerTurn, setGonggis, gonggis, score, isEndGame, setToggleResetGame }}>
                <GameRoom />
            </NimContext.Provider>
        </SocketContext.Provider>
    )
})