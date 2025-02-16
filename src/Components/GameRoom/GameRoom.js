import { createContext, memo, useContext, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import Table from "@components/Table"
import BoxGonggi from "@components/BoxGonggi"
import { OrbitControls, PointerLockControls } from "@react-three/drei"
import NimContext from "./NimContext"
import * as THREE from "three";
export default memo(function GameRoom() {

    const { gonggis } = useContext(NimContext)
    const numberGonggiBox = useMemo(() => gonggis.length, [])
    const x = 300
    const y = 200

    const gonggisDisplay = useMemo(() => gonggis.map((item, index) => {
        return (
            <BoxGonggi position={[index * 6, 0.25, 0]} isRandomGonggi={true} indexBox={index} numberGonggi={item} />
        )
    }), [])

    return (
        <div className="h-full w-full">
            <Canvas gl={{ powerPreference: "high-performance", precision: "lowp", version: 2 }} camera={{ position: [0, 40, 40], fov: 60 }} shadows={false} dpr={[1, 1.5]} frameloop="always">
                <ambientLight intensity={.1} />




                <Table />
                <group position={[- ((numberGonggiBox - 1) * 6) / 2, 0, 0]}>

                    {gonggisDisplay.map((item) => item)}
                </group>

                <directionalLight position={[0, y, 0]} intensity={1} />
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[x, y, x]} />
                    <meshStandardMaterial color="#707070" side={2} />
                </mesh>

                <OrbitControls />
                {/* <PointerLockControls />
                <CustomArrow /> */}
            </Canvas>
        </div>
    )
})

const CustomArrow = () => {
    const { camera } = useThree();
    const arrowRef = useRef(null);

    useFrame(() => {
        if (arrowRef.current) {
            const dir = new THREE.Vector3();
            camera.getWorldDirection(dir);
            arrowRef.current.setDirection(dir);
            arrowRef.current.position.copy(camera.position);
        }
    });

    return <primitive object={new THREE.ArrowHelper(new THREE.Vector3(), new THREE.Vector3(), 2, "red")} ref={arrowRef} />;
};

