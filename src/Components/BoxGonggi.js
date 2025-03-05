// import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
// import { Geometry, Base, Addition } from '@react-three/csg'
// import Random from '@utils/random';
// import Player from '@constants/player';
// import Gonggi from '@components/Gonggi';
// import NimContext from '@components/GameRoom/NimContext';
// import { GameContext } from "@/App";
// import Game from '@constants/game';



// export default memo(function BoxGonggi({
//     lengthBox = 12,
//     widthBox = 4,
//     heightBox = 2,
//     wallBox = 0.2,
//     distanceGonggi = 3,
//     numberGonggi = 10,
//     gonggisPvP = [],
//     indexBox,
//     ...props }) {

//     const { botMode, socketRef, gameMode } = useContext(GameContext)

//     const length = useMemo(() => botMode.level.numberGonggiBox * distanceGonggi, [botMode, distanceGonggi])
//     const width = useMemo(() => widthBox, [widthBox])
//     const height = useMemo(() => heightBox, [heightBox])
//     const wall = useMemo(() => wallBox, [wallBox])
//     const { gameTurn, endPlayerTurn, endComputerTurn, gonggis, setGonggis, computerSelected, endPlayer1Turn, endPlayer2Turn } = useContext(NimContext)


//     const [gonggiItems, setGonggiItems] = useState(gameMode === Game.gamePvE ? Array(numberGonggi).fill().map((_, i) => {
//         return {
//             index: i,
//             isVisible: true,
//             color: Random.randomColor(),
//             shape: Random.randomShape()
//         }
//     }) : [])


//     const handleSelectGonggi = useCallback(((index) => {
//         if (gameMode === Game.gamePvE) {
//             if (gameTurn === Player.player) {
//                 setGonggiItems((prev) => {
//                     const newItems = [...prev]
//                     newItems.forEach((item) => {
//                         if (item.isVisible) {
//                             item.isVisible = !(item.index <= index)
//                         }
//                     })
//                     return newItems
//                 })
//                 setTimeout(endPlayerTurn, 100)
//             }
//         }
//         else if (gameMode === Game.gamePvP) {
//             const newGonggiItems = [...gonggisPvP]
//             var newGonggis = [...gonggis]
//             if (gameTurn === Player.player1) {
//                 newGonggiItems.forEach((item) => {
//                     if (item.isVisible) {
//                         item.isVisible = !(item.index <= index)
//                     }
//                 })
//                 setTimeout(endPlayer1Turn, 100)

//             }
//             else if (gameTurn === Player.player2) {
//                 newGonggiItems.forEach((item) => {
//                     if (item.isVisible) {
//                         item.isVisible = !(item.index >= index)
//                     }
//                 })
//                 setTimeout(endPlayer2Turn, 100)

//             }
//             newGonggis[indexBox] = newGonggiItems.reduce((count, item) => count + (item.isVisible ? 1 : 0), 0)
//             socketRef.current.emit("selectGonggi", { newGonggis, newGonggiItems, indexBox })
//         }
//     }), [gameTurn])



//     useEffect(() => {
//         if (gameMode === Game.gamePvE) {
//             setGonggis((prev) => {
//                 var gonggis = [...prev]
//                 gonggis[indexBox] = gonggiItems.reduce((count, item) => count + (item.isVisible ? 1 : 0), 0)
//                 return gonggis
//             })
//         }
//     }, [gonggiItems, indexBox, setGonggis])




//     const visibleGonggiItems = useMemo(() => {
//         return gonggiItems.filter(gonggi => gonggi.isVisible)
//     }, [gonggiItems]);



//     useEffect(() => {
//         if (gameMode === Game.gamePvE && gameTurn === Player.computer && indexBox === computerSelected.box) {
//             console.log(computerSelected)
//             console.log(gonggis)
//             var lastGonggiItemVisible = 0
//             gonggiItems.forEach((gonggi) => {
//                 if (gonggi.isVisible) {
//                     lastGonggiItemVisible = gonggi.index
//                 }
//             })
//             var currentGonggiHoverComputer = lastGonggiItemVisible - computerSelected.gonggi + 1
//             setTimeout(() => {
//                 setGonggiItems((prev) => {
//                     const newItems = [...prev]
//                     newItems.forEach((item) => {
//                         if (item.isVisible) {
//                             item.isVisible = !(item.index >= currentGonggiHoverComputer)
//                         }
//                     })
//                     return newItems
//                 })
//                 endComputerTurn()
//             }, 500)
//         }
//     }, [computerSelected])


//     return (
//         <group {...props} rotation={[-Math.PI / 2, 0, Math.PI / 2]} >


//             <mesh position={[0, 0, 0]}>
//                 <Geometry >
//                     <Base >
//                         <boxGeometry args={[length, width, wall]} />
//                     </Base>
//                     <Addition position={[0, (width + wall) / 2, (height - wall) / 2]}>
//                         <boxGeometry args={[length, wall, height]} />
//                     </Addition>
//                     <Addition position={[0, -(width + wall) / 2, (height - wall) / 2]}>
//                         <boxGeometry args={[length, wall, height]} />
//                     </Addition>
//                     <Addition position={[(length + wall) / 2, 0, (height - wall) / 2]}>
//                         <boxGeometry args={[wall, width + wall * 2, height]} />
//                     </Addition>
//                     <Addition position={[-(length + wall) / 2, 0, (height - wall) / 2]}>
//                         <boxGeometry args={[wall, width + wall * 2, height]} />
//                     </Addition>

//                 </Geometry>
//                 <meshStandardMaterial
//                     metalness={1} // Tăng độ kim loại (0-1)
//                     roughness={0.1} // Giảm độ thô (0-1) để vật liệu trở nên bóng hơn
//                     color="#414a4c" // Màu của vật liệu
//                 />

//             </mesh>
//             <group position={[- ((numberGonggi - 1) * distanceGonggi) / 2, 0, wall]}>
//                 {/* {console.log(numberGonggi)}
//                 {console.log(gonggisPvP)} */}
//                 {gameMode === Game.gamePvE ? visibleGonggiItems.map((gonggi) => (
//                     <Gonggi
//                         key={gonggi.index}
//                         pos={[gonggi.index * distanceGonggi, 0, 0]}
//                         color={gonggi.color}
//                         shape={gonggi.shape}
//                         indexItem={gonggi.index}
//                         onClick={() => handleSelectGonggi(gonggi.index)}
//                     />))
//                     :
//                     gonggisPvP.filter((gonggi) => gonggi.isVisible).map((gonggi) => (
//                         <Gonggi
//                             key={gonggi.index}
//                             pos={[gonggi.index * distanceGonggi, 0, 0]}
//                             color={gonggi.color}
//                             shape={gonggi.shape}
//                             indexItem={gonggi.index}
//                             onClick={() => handleSelectGonggi(gonggi.index)}
//                         />))
//                 }
//             </group>
//         </group>
//     );
// });

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
    indexBox,
    ...props }) {

    const { botMode, gameMode, isFirstPlayer, socketRef } = useContext(GameContext)

    // const length = useMemo(() => botMode.level.numberGonggiBox * distanceGonggi, [botMode, distanceGonggi])
    const length = useMemo(() => 9 * distanceGonggi, [botMode, distanceGonggi])
    const width = useMemo(() => widthBox, [widthBox])
    const height = useMemo(() => heightBox, [heightBox])
    const wall = useMemo(() => wallBox, [wallBox])
    const { gamePlayer, gameTurn, endPlayerTurn, endComputerTurn, endPlayer1Turn, endPlayer2Turn, gonggis, setGonggis, computerSelected } = useContext(NimContext)

    const [gonggiItems, setGonggiItems] = useState(Array(numberGonggi).fill().map((_, i) => {
        return {
            index: i,
            isVisible: true,
            color: Random.randomColor(),
            shape: Random.randomShape()
        }
    }))


    const handleSelectGonggi = useCallback((index) => {
        if (gameTurn === Player.player) {
            setGonggiItems((prev) => {
                const newItems = [...prev]
                newItems.forEach((item) => {
                    if (item.isVisible && item.index <= index) {
                        item.isVisible = false
                    }
                })
                return newItems
            })
            setTimeout(endPlayerTurn, 100)
        }
    }, [gameTurn])


    const handleSelectGonggiPlayer = useCallback((index) => {
        if (gameTurn === Player.player1 && gamePlayer === Player.player1) {
            console.log("click 1")
            console.log(index, indexBox)
            socketRef.current.emit("selectGonggi", { index, indexBox })
            setTimeout(endPlayer1Turn, 100)
        }
        else if (gameTurn === Player.player2 && gamePlayer === Player.player2) {
            console.log("click 2")
            console.log(index, indexBox)
            socketRef.current.emit("selectGonggi", { index, indexBox })
            setTimeout(endPlayer2Turn, 100)
        }



    }, [gameTurn])

    useEffect(() => {
        if (gameMode === Game.gamePvE) {
            setGonggis((prev) => {
                var gonggis = [...prev]
                gonggis[indexBox] = gonggiItems.reduce((count, item) => count + (item.isVisible ? 1 : 0), 0)
                return gonggis
            })
        }
    }, [gonggiItems, indexBox, setGonggis])

    const visibleGonggiItems = useMemo(() => {
        return gonggiItems.filter(gonggi => gonggi.isVisible)
    }, [gonggiItems]);
    useEffect(() => {
        if (gameMode === Game.gamePvE && gameTurn === Player.computer && indexBox === computerSelected.box) {

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

                {gameMode === Game.gamePvE
                    ?
                    visibleGonggiItems.map((gonggi) => (
                        <Gonggi
                            key={gonggi.index}
                            pos={[gonggi.index * distanceGonggi, 0, 0]}
                            color={gonggi.color}
                            shape={gonggi.shape}
                            indexItem={gonggi.index}
                            onClick={() => handleSelectGonggi(gonggi.index)}
                        />
                    ))
                    :
                    gonggiItemsPvP.filter((gonggi) => gonggi.isVisible).map((gonggi) => (
                        <Gonggi
                            key={gonggi.index}
                            pos={[gonggi.index * distanceGonggi, 0, 0]}
                            color={gonggi.color}
                            shape={gonggi.shape}
                            indexItem={gonggi.index}
                            onClick={(e) => {
                                e.stopPropagation()
                                handleSelectGonggiPlayer(gonggi.index)
                            }}
                        />
                    ))
                }
            </group>
        </group>
    );
});