

import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Geometry, Base, Addition } from '@react-three/csg'
import Random from '@utils/random';
import Player from '@constants/player';
import Gonggi from '@components/Gonggi';
import NimContext from '@components/GameRoom/NimContext';
import { GameContext } from "@/App";
import Game from '@constants/game';


export default memo(function BoxGonggi({
    lengthBox = 12,
    widthBox = 4,
    heightBox = 2,
    wallBox = 0.2,
    distanceGonggi = 3,
    numberGonggi = 10,
    gonggiItemsPvP = [],
    boxGonggi,
    indexBox,
    ...props }) {

    const { botMode, gameMode, isFirstPlayer, socketRef, levelMode } = useContext(GameContext)

    const length = useMemo(() => levelMode.numberGonggiBox * distanceGonggi, [botMode, distanceGonggi])
    const width = useMemo(() => widthBox, [widthBox])
    const height = useMemo(() => heightBox, [heightBox])
    const wall = useMemo(() => wallBox, [wallBox])
    const { gamePlayer, gameTurn, endPlayerTurn, players } = useContext(NimContext)

    const [gonggiItems, setGonggiItems] = useState(boxGonggi)



    const handleSelectGonggi = useCallback((index) => {
        if (gameMode === Game.gamePvE) {
            if (gameTurn === Player.player) {
                boxGonggi.forEach((item) => {
                    if (item.isVisible && item.index <= index) {
                        item.isVisible = false
                    }
                })
                setGonggiItems(boxGonggi.map((item) => item))
                endPlayerTurn()
            }
        }
        else if (gameMode === Game.gamePvP) {
            if (gameTurn === gamePlayer && players.length === 2) {
                socketRef.current.emit("selectGonggi", { index, indexBox })
            }
        }
    }, [gameTurn, boxGonggi, endPlayerTurn, gameMode, socketRef, gamePlayer, players])

    useEffect(() => {
        setGonggiItems(boxGonggi)
    }, [boxGonggi])


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
            <group position={[- ((boxGonggi.length - 1) * distanceGonggi) / 2, 0, wall]}>
                {gonggiItems !== null && gonggiItems.map((gonggi) => (
                    gonggi.isVisible && <Gonggi
                        key={gonggi.index}
                        pos={[gonggi.index * distanceGonggi, 0, 0]}
                        color={gonggi.color}
                        shape={gonggi.shape}
                        isVisible={gonggi.isVisible}
                        indexItem={gonggi.index}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleSelectGonggi(gonggi.index)
                        }}
                    />
                ))}
            </group>
        </group>
    );
});
