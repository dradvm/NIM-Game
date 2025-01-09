import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Gonggi from "./Components/Gonggi";

export default function App() {
  return (
    <div className="border">
      <Canvas camera={{ position: [0, 0, 30], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Gonggi shape="circle" position={[-20, 0, 0]} color="#ff2400" />
        <Gonggi shape="triangle" position={[-10, 0, 0]} color="#fdff00" />
        <Gonggi shape="triangle" color="#76ff7a" />
        <Gonggi shape="circle" position={[10, 0, 0]} color="#33BFFF" />
        <Gonggi shape="square" position={[20, 0, 0]} color="#7b68ee" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
