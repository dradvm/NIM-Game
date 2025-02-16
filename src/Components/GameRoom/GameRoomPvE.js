import { memo, useCallback, useContext, useEffect, useState } from "react";
import GameRoom from "./GameRoom";
import Player from "@constants/player"
import Level from "@constants/level"
import NimContext from "./NimContext"
import { GameContext } from "@/App";

export default memo(function GameRoomPvE() {


    const getRandomNumber = useCallback((min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }, [])

    const { botMode, winMode, firstPlayMode } = useContext(GameContext)
    const [gameTurn, setGameTurn] = useState(firstPlayMode ? Player.player : Player.computer)

    const numberGonggiBox = botMode.level.numberGonggiBox
    const [gonggis, setGonggis] = useState(Array(numberGonggiBox).fill(0).map(() => getRandomNumber(1, numberGonggiBox)))
    const [computerSelected, setComputerSelected] = useState({
        box: -1,
        gonggi: 0
    })


    const handlePlayerTurn = useCallback(() => {
    }, []);

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
        var nimSum = gonggis.reduce((nimSum, gonggi) => nimSum ^ gonggi, 0)
        var boxNotEmpty = gonggis.map((item, index) => item !== 0 ? index : -1).filter((item) => item !== -1)

        if (nimSum === 0) {
            boxSelect = boxNotEmpty[getRandomNumber(0, boxNotEmpty.length - 1)]
            numberGonggiSelect = getRandomNumber(1, gonggis[boxSelect])
        }
        else {
            var action = actionChoose()
            console.log(action)
            if (action) {
                boxSelect = boxNotEmpty[getRandomNumber(0, boxNotEmpty.length - 1)]
                numberGonggiSelect = getRandomNumber(1, gonggis[boxSelect])
            }
            else {
                boxNotEmpty = boxNotEmpty.filter((item) => {
                    var gonggi = gonggis[item]
                    if ((gonggi ^ nimSum) < gonggi) {
                        return true
                    }
                    else {
                        return false
                    }
                })
                boxSelect = boxNotEmpty[getRandomNumber(0, boxNotEmpty.length - 1)]
                numberGonggiSelect = gonggis[boxSelect] - (gonggis[boxSelect] ^ nimSum)
            }
        }
        setComputerSelected({
            box: boxSelect,
            gonggi: numberGonggiSelect
        })
    }, [gonggis]);


    const isEndGame = useCallback(() => {
        return gonggis.every((gonggi) => gonggi === 0)
    }, [gonggis])

    useEffect(() => {
        if (!isEndGame()) {
            if (gameTurn === Player.computer) {
                handleComputerTurn()
            }
            else if (gameTurn === Player.player) {
                handlePlayerTurn()
            }
        }
    }, [gameTurn])



    return (
        <NimContext.Provider value={{ gameTurn, endPlayerTurn, endComputerTurn, setGonggis, computerSelected, gonggis }}>
            <GameRoom />
        </NimContext.Provider>
    )
})