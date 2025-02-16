import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Geometry, Base, Addition } from '@react-three/csg'
import Random from '@utils/random';
import Player from '@constants/player';
import Gonggi from '@components/Gonggi';
import NimContext from '@components/GameRoom/NimContext';
import { GameContext } from "@/App";



export default memo(function BoxGonggi({
    lengthBox = 12,
    widthBox = 4,
    heightBox = 2,
    wallBox = 0.2,
    isRandomGonggi = false,
    distanceGonggi = 3,
    numberGonggi = 10,
    indexBox,
    ...props }) {

    const { botMode } = useContext(GameContext)

    const length = useMemo(() => botMode.level.numberGonggiBox * distanceGonggi, [botMode, distanceGonggi])
    const width = useMemo(() => widthBox, [widthBox])
    const height = useMemo(() => heightBox, [heightBox])
    const wall = useMemo(() => wallBox, [wallBox])
    const { gameTurn, endPlayerTurn, endComputerTurn, setGonggis, computerSelected } = useContext(NimContext)


    const [gonggiItems, setGonggiItems] = useState(Array(numberGonggi).fill().map((_, i) => {
        return {
            index: i,
            isVisible: true,
            color: Random.randomColor(),
            shape: Random.randomShape()
        }
    }))


    const handleSelectGonggi = useCallback(((index) => {
        if (gameTurn === Player.player) {
            setGonggiItems((prev) => {
                const newItems = [...prev]
                newItems.forEach((item) => {
                    if (item.isVisible) {
                        item.isVisible = !(item.index <= index)
                    }
                })
                return newItems
            })
            setTimeout(endPlayerTurn, 100)
        }
    }), [gameTurn])



    useEffect(() => {
        setGonggis((prev) => {
            var gonggis = [...prev]
            gonggis[indexBox] = gonggiItems.reduce((count, item) => count + (item.isVisible ? 1 : 0), 0)
            return gonggis
        })
    }, [gonggiItems, indexBox, setGonggis])

    const visibleGonggiItems = useMemo(() => {
        return gonggiItems.filter(gonggi => gonggi.isVisible)
    }, [gonggiItems]);
    useEffect(() => {
        if (gameTurn === Player.computer && indexBox === computerSelected.box) {

            var lastGonggiItemVisible = 0
            gonggiItems.forEach((gonggi) => {
                if (gonggi.isVisible) {
                    lastGonggiItemVisible = gonggi.index
                }
            })
            var currentGonggiHoverComputer = lastGonggiItemVisible - computerSelected.gonggi + 1
            setTimeout(() => {
                setGonggiItems((prev) => {
                    const newItems = [...prev]
                    newItems.forEach((item) => {
                        if (item.isVisible) {
                            item.isVisible = !(item.index >= currentGonggiHoverComputer)
                        }
                    })
                    return newItems
                })
                endComputerTurn()
            }, 500)
        }
    }, [computerSelected])


    return (
        <group {...props} rotation={[-Math.PI / 2, 0, Math.PI / 2]} >


            <mesh position={[0, 0, 0]}>
                <Geometry >
                    <Base >
                        <boxGeometry args={[length, width, wall]} />
                    </Base>
                    <Addition position={[0, (width + wall) / 2, (height - wall) / 2]}>
                        <boxGeometry args={[length, wall, height]} />
                    </Addition>
                    <Addition position={[0, -(width + wall) / 2, (height - wall) / 2]}>
                        <boxGeometry args={[length, wall, height]} />
                    </Addition>
                    <Addition position={[(length + wall) / 2, 0, (height - wall) / 2]}>
                        <boxGeometry args={[wall, width + wall * 2, height]} />
                    </Addition>
                    <Addition position={[-(length + wall) / 2, 0, (height - wall) / 2]}>
                        <boxGeometry args={[wall, width + wall * 2, height]} />
                    </Addition>

                </Geometry>
                <meshStandardMaterial
                    metalness={1} // Tăng độ kim loại (0-1)
                    roughness={0.1} // Giảm độ thô (0-1) để vật liệu trở nên bóng hơn
                    color="#414a4c" // Màu của vật liệu
                />

            </mesh>
            <group position={[- ((numberGonggi - 1) * distanceGonggi) / 2, 0, wall]}>
                {isRandomGonggi &&
                    visibleGonggiItems.map((gonggi) => (
                        <Gonggi
                            key={gonggi.index}
                            pos={[gonggi.index * distanceGonggi, 0, 0]}
                            color={gonggi.color}
                            shape={gonggi.shape}
                            indexItem={gonggi.index}
                            onClick={() => handleSelectGonggi(gonggi.index)}
                        />
                    ))}
            </group>
        </group>
    );
});

