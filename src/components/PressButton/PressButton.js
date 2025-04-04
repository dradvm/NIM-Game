
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { memo, useContext, useMemo } from "react";
import pixelFont from "../../fonts/PixelifySans-VariableFont_wght.ttf";
import GameContext from "@components/Context/GameContext";
import Game from '@constants/game';

export default memo(function PressButton({
    lengthBox = 8,
    widthBox = 3.6,
    heightBox = 1,
    pressHeightBox = 0.3,
    handleFunction = () => { },
    ...props
}) {
    const { isFirstPlayer, gameMode } = useContext(GameContext)
    const length = useMemo(() => lengthBox, [lengthBox])
    const width = useMemo(() => widthBox, [widthBox])
    const height = useMemo(() => heightBox, [heightBox])
    const pressHeight = useMemo(() => pressHeightBox, [pressHeightBox])
    const [spring, api] = useSpring(() => ({ position: [0, 0, 0] }));
    const handlePointerDown = () => {
        api.start({ position: [0, -pressHeightBox, 0] }); // Nhấn xuống
        handleFunction()
    };

    const handlePointerUp = () => {
        api.start({ position: [0, 0, 0] }); // Quay về vị trí ban đầu
    };

    return (
        <group {...props}>
            <animated.mesh
                position={spring.position}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                castShadow
            >
                <boxGeometry args={[length - 1, height, width - 1]} />
                <meshStandardMaterial color="red" emissive="darkred" emissiveIntensity={0.3} />
                <Text
                    font={pixelFont}
                    position={[0, height / 2 + 0.1, 0]}
                    rotation={[-Math.PI / 2, 0, ((isFirstPlayer || gameMode === Game.gamePvE) ? 0 : Math.PI)]}
                    fontSize={1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Reset
                </Text>
            </animated.mesh>
            <mesh position={[0, -(pressHeight + 0.1), 0]}>
                <boxGeometry args={[length, height, width]} />
                <meshStandardMaterial color="black" />
            </mesh>

        </group >

    );
})