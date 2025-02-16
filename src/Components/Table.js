import React, { memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Table() {
    return (
        <>
            {/* Mặt bàn */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[80, 0.5, 50]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
        </>
    );
}
export default memo(Table);
