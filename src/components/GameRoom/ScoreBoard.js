import React, { memo, useContext, useEffect, useMemo } from "react";
import { RoundedBox, Text } from "@react-three/drei";
import pixelFont from "../../fonts/PixelifySans-VariableFont_wght.ttf";
import Game from "@constants/game"
import GameContext from "@components/Context/GameContext";
export default memo(function ScoreBoard({ player1 = "Player", player2 = "Computer", players = [], score, position = [-40 + 1 + 0.5, 3.8, 0] }) {

    const x = 30
    const y = 6
    const z = 2

    const x2 = 6
    const y2 = 1.5
    const z2 = z / 2 + 0.01

    const spacing = 0.5

    const { gameMode } = useContext(GameContext)

    const pos = useMemo(() => {
        return [position[0] + z / 2, position[1] + y / 2, position[2]]
    }, [position])


    return (
        <group position={pos} rotation={[0, Math.PI / 2, 0]}>

            <mesh position={[0, 0, -0.1]}>
                <boxGeometry args={[x, y, z]} />
                <meshStandardMaterial color="black" />
            </mesh>

            <RoundedBox args={[x - 0.2, y - 0.2, z - 0.1]} radius={0.4}>
                <meshStandardMaterial color="#f5f5f5" />
            </RoundedBox>
            {console.log(players)}
            {gameMode === Game.gamePvP && players.length < 2 ?
                <group>
                    <Text
                        font={pixelFont}
                        position={[0, 0, z2]}
                        fontSize={1.5}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Đợi người chơi khác...
                    </Text>
                </group>
                :
                <group>
                    <Text
                        font={pixelFont}
                        position={[-x2, y2, z2]}
                        fontSize={1}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {player1}
                    </Text>

                    <Text
                        font={pixelFont}
                        position={[x2, y2, z2]}
                        fontSize={1}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {player2}
                    </Text>

                    <Text
                        font={pixelFont}
                        position={[-x2, -  spacing, z2]}
                        fontSize={2}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {score.player1}
                    </Text>

                    <Text
                        font={pixelFont}
                        position={[0, -  spacing, z2]}
                        fontSize={2}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        -
                    </Text>

                    <Text
                        font={pixelFont}
                        position={[x2, - spacing, z2]}
                        fontSize={2}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {score.player2}
                    </Text>
                </group>
            }
        </group>
    );
});
