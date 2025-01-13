import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Table() {
    return (
        <>
            {/* Mặt bàn */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[90, 0.5, 60]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
        </>
    );
}
export default Table;
