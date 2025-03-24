

import { createContext, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import BoxGonggi from "@components/BoxGonggi"
import { OrbitControls, PointerLockControls } from "@react-three/drei"
import NimContext from "./NimContext"
import { GameContext } from "@/App"
import Game from '@constants/game';
import Player from '@constants/player';
import MenuSetting from "../Menu/MenuSetting"
import GlowingTriangle from "@components/GameRoom/GlowingTriangle"
import ScoreBoard from "@components/ScoreBoard"
import PressButton from "../PressButton/PressButton"
import Random from "@utils/random"
import AudioPlayer from "../AudioPlayer/AudioPlayer"

export default memo(function GameRoom() {

    const { socketRef, gameMode, isFirstPlayer } = useContext(GameContext)
    const { gonggis, gamePlayer, gameTurn, score, setGonggis, setGameTurn, isEndGame, players } = useContext(NimContext)
    const numberGonggiBox = useMemo(() => gonggis.length, [gonggis])
    const [isEscape, setIsEscape] = useState(false)
    const [gonggiItems, setGonggiItems] = useState([])
    const x = 300
    const y = 200
    useEffect(() => {
        setGonggiItems(gonggis)
    }, [gonggis])


    const gamePlayerPerspective = useMemo(() => {
        return (gamePlayer === Player.player1 || gameMode === Game.gamePvE) ? 40 : -40
    }, [gamePlayer, gameMode])

    const resetGame = useCallback(() => {
        if (isEndGame()) {
            if (gameMode === Game.gamePvE) {
                setGonggis(Array(numberGonggiBox).fill(0).map(() => {
                    const randomSize = Random.randomNumber(1, numberGonggiBox)
                    return Array(randomSize).fill().map((_, i) => ({
                        index: i,
                        isVisible: true,
                        color: Random.randomColor(),
                        shape: Random.randomShape()
                    }));
                }))
                setGameTurn(Player.player)
            }
            else {
                socketRef.current.emit("resetGame")
            }
        }
    }, [setGonggis, numberGonggiBox, isEndGame, setGameTurn, gameMode, socketRef])

    useEffect(() => {


        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsEscape((prev) => !prev)
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [])
    return (
        <div className="h-full w-full">
            <AudioPlayer />
            {isEscape && <MenuSetting setIsEscape={setIsEscape} />}
            <Canvas gl={{ powerPreference: "high-performance", precision: "lowp", version: 2 }} camera={{ position: [0, 40, gamePlayerPerspective], fov: 60 }} shadows={false} dpr={[1, 1.5]} frameloop="always">
                <ambientLight intensity={.1} />


                <group position={[- ((numberGonggiBox - 1) * 6) / 2, 0, 0]}>

                    {
                        gonggiItems.map((box, index) => {
                            return (
                                <BoxGonggi position={[index * 6, 0.25, 0]} indexBox={index} boxGonggi={box} />
                            )
                        })
                    }
                </group>

                <directionalLight position={[0, y, 0]} intensity={1} />
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[x, y, x]} />
                    <meshStandardMaterial color="#707070" side={2} />
                </mesh>


                <group>

                    <GlowingTriangle color={"red"} isGlowing={(gameTurn === Player.player1) || (gameTurn === Player.player)} position={[0, 0.5, 20]} rotation={[Math.PI, 0, 0]} />
                    <GlowingTriangle color={"blue"} isGlowing={(gameTurn === Player.player2) || (gameTurn === Player.computer)} position={[0, 0.5, -20]} />
                    <PressButton position={[35, 1.25, 0]} handleFunction={resetGame} />
                    <ScoreBoard score={score} {...(gameMode === Game.gamePvP ? { player1: players[0], player2: players[1], players } : {})} />
                    {/* Mặt bàn */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[80, 0.5, 50]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>
                </group>

                <OrbitControls
                    minPolarAngle={Math.PI / 8}
                    maxPolarAngle={Math.PI / 2}
                    minAzimuthAngle={isFirstPlayer ? -Math.PI / 4 : Math.PI * 3 / 4}
                    maxAzimuthAngle={isFirstPlayer ? Math.PI / 4 : Math.PI * 5 / 4}
                    minDistance={40}
                    maxDistance={70}
                    enablePan={false}
                />
            </Canvas>
        </div>
    )
})
