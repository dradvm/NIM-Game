import { createContext, memo, useCallback, useEffect, useState } from "react"
import Player from "@constants/player"
import { Canvas } from "@react-three/fiber"
import Table from "@components/Table"
import BoxGonggi from "@components/BoxGonggi"
import { OrbitControls } from "@react-three/drei"



const NimContext = createContext()

export default memo(function GameRoom() {


    const [gameTurn, setGameTurn] = useState(Player.player)

    const numberGonggi = 5
    const numberGonggiBox = 5
    const [gonggis, setGonggis] = useState(Array(numberGonggiBox).fill(numberGonggi))
    const [computerSelected, setComputerSelected] = useState({
        box: -1,
        gonggi: 0
    })




    const handlePlayerTurn = useCallback(() => {
    }, []);

    const endPlayerTurn = useCallback(() => {
        setGameTurn(Player.computer)
    }, [])


    const endComputerTurn = useCallback(() => {
        setGameTurn(Player.player)
    }, [])
    const getRandomNumber = useCallback((min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }, [])


    const handleComputerTurn = useCallback(() => {

        var nimSum = gonggis.reduce((nimSum, gonggi) => nimSum ^ gonggi, 0)
        var boxSelect
        var numberGonggiSelect
        var boxNotEmpty = gonggis.map((item, index) => item !== 0 ? index : -1).filter((item) => item !== -1)

        if (nimSum === 0) {
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
        setComputerSelected({
            box: boxSelect,
            gonggi: numberGonggiSelect
        })
    }, [gonggis]);


    const isEndGame = useCallback(() => {
        return gonggis.every((gonggi) => gonggi === 0)
    }, [gonggis])

    useEffect(() => {
        console.log(gameTurn)
        if (!isEndGame()) {
            if (gameTurn === Player.computer) {
                handleComputerTurn()
            }
            else if (gameTurn === Player.player) {
                handlePlayerTurn()
            }
        }
    }, [gameTurn])


    const x = 300
    const y = 200
    return (
        <NimContext.Provider value={{ gameTurn, endPlayerTurn, endComputerTurn, setGonggis, computerSelected, }}>
            <div className="h-full w-full">
                <Canvas camera={{ position: [0, 40, 40], fov: 60 }} frameloop="demand">
                    <ambientLight intensity={.1} />




                    <Table />
                    <group position={[- ((numberGonggiBox - 1) * 6) / 2, 0, 0]}>

                        {gonggis.map((item, index) => {
                            return (
                                <BoxGonggi position={[index * 6, 0.25, 0]} isRandomGonggi={true} indexBox={index} numberGonggi={numberGonggi} />
                            )
                        })}
                    </group>

                    {/* <pointLight position={[0, y, 0]} intensity={50000} />

                    <pointLight position={[x / 2, y, x / 2]} intensity={20000} />
                    <pointLight position={[-x / 2, y, -x / 2]} intensity={20000} />
                    <pointLight position={[-x / 2, y, x / 2]} intensity={20000} />
                    <pointLight position={[x / 2, y, -x / 2]} intensity={20000} /> */}

                    <directionalLight position={[0, y, 0]} intensity={1} />
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[x, y, x]} />
                        <meshStandardMaterial color="#707070" side={2} />
                    </mesh>

                    <OrbitControls />
                </Canvas>
            </div>
        </NimContext.Provider>
    )
})
export { NimContext }