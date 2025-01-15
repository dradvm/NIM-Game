import React, { useEffect, useState } from 'react';
import { Geometry, Base, Addition } from '@react-three/csg'
import { DoubleSide } from 'three';
import Gonggi from './Gonggi';
import Random from '../utils/random';
import { useHover } from '@use-gesture/react';




const BoxGonggi = ({
    lengthBox = 12,
    widthBox = 4,
    heightBox = 2,
    wallBox = 0.2,
    isRandomGonggi = false,
    distanceGonggi = 3,
    numberGonggi = 10,
    ...props }) => {

    const [length, setLength] = useState(numberGonggi * distanceGonggi)
    const [width, setWidth] = useState(widthBox)
    const [height, setHeight] = useState(heightBox)
    const [wall, setWall] = useState(wallBox)

    const [gonggiItems, setGonggiItems] = useState(Array(numberGonggi).fill().map((_, i) => {
        return {
            index: i,
            isVisible: true,
            isClicked: false,
            color: Random.randomColor(),
            shape: Random.randomShape()
        }
    }))


    const handleClickGonggi = (index) => {

        setGonggiItems((prev) => {
            return prev.map((item) => {
                if (item.index !== index) {
                    return item
                }
                return {
                    ...item,
                    // isVisible: false
                    isClicked: true
                }
            })
        })
    }



    return (
        <group {...props} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>


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
                {isRandomGonggi ?
                    gonggiItems.map((gonggi) => {
                        console.log(gonggi)
                        if (gonggi.isVisible) {
                            return (
                                <Gonggi
                                    pos={[gonggi.index * distanceGonggi, 0, 0]}
                                    onClick={() => handleClickGonggi(gonggi.index)}
                                    color={gonggi.color}
                                    shape={gonggi.shape}
                                    isClicked={gonggi.isClicked}
                                />
                            )
                        }

                    })
                    : ""}
            </group>
        </group>
    );
};

export default BoxGonggi;
