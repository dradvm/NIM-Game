

import { createContext, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import BoxGonggi from "@components/GameRoom/BoxGonggi"
import { Line, OrbitControls, PointerLockControls } from "@react-three/drei"
import NimContext from "../Context/NimContext"
import Game from '@constants/game';
import Player from '@constants/player';
import MenuSetting from "../Menu/MenuSetting"
import GlowingTriangle from "@components/GameRoom/GlowingTriangle"
import ScoreBoard from "./ScoreBoard"
import PressButton from "../PressButton/PressButton"
import Random from "@utils/random"
import AudioPlayer from "../AudioPlayer/AudioPlayer"
import SocketContext from "../Context/SocketContext";
import GameContext from "../Context/GameContext"
import { Circle, Square, Triangle } from "./Shape"
import * as THREE from "three";


export default memo(function GameRoom() {


    const { gameMode, isFirstPlayer } = useContext(GameContext)
    const { socketRef } = useContext(SocketContext)
    const { gonggis, gamePlayer, gameTurn, score, setGonggis, setGameTurn, isEndGame, players } = useContext(NimContext)
    const numberGonggiBox = useMemo(() => gonggis.length, [gonggis])
    const [isEscape, setIsEscape] = useState(false)
    const [gonggiItems, setGonggiItems] = useState([])
    const x = 150
    const y = 150

    const width = y / 4
    const lineWidth = 2
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
                <ambientLight intensity={0.5} />
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[x, y, x]} />
                    <meshStandardMaterial
                        color="#ed1b76"
                        emissive="#f44786"
                        emissiveIntensity={0.3}
                        metalness={0.1}
                        roughness={0.3}
                        side={THREE.BackSide}
                    />
                </mesh>

                <Triangle width={width} lineWidth={lineWidth} position={[-(x / 2) + 0.3, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
                <Circle width={width} lineWidth={lineWidth} position={[0, 0, x / 2 - 0.3]} />
                <Square width={width} lineWidth={lineWidth} position={[(x / 2) - 0.3, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
                <Circle width={width} lineWidth={lineWidth} position={[0, 0, -(x / 2) + 0.3]} />


                <group>

                    <GlowingTriangle color={"#037a76"} emissive={"#249f9c"} isGlowing={(gameTurn === Player.player1) || (gameTurn === Player.player)} position={[0, 0.5, 20]} rotation={[Math.PI, 0, 0]} />
                    <GlowingTriangle color={"#ed1b76"} emissive={"#f44786"} isGlowing={(gameTurn === Player.player2) || (gameTurn === Player.computer)} position={[0, 0.5, -20]} />
                    <PressButton position={[35, 1.25, 0]} handleFunction={resetGame} />
                    <ScoreBoard position={[-40, 0.25, 0]} score={score} {...(gameMode === Game.gamePvP ? { player1: players[0], player2: players[1], players } : {})} />
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[80, 0.5, 50]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>
                </group>

                <OrbitControls
                    minPolarAngle={Math.PI / 8}
                    maxPolarAngle={Math.PI / 2}
                    minAzimuthAngle={(isFirstPlayer || gameMode === Game.gamePvE) ? -Math.PI / 4 : Math.PI * 3 / 4}
                    maxAzimuthAngle={(isFirstPlayer || gameMode === Game.gamePvE) ? Math.PI / 4 : Math.PI * 5 / 4}
                    minDistance={40}
                    maxDistance={70}
                    enablePan={false}
                />
                {/* <OrbitControls /> */}
            </Canvas>
        </div>
    )
})
