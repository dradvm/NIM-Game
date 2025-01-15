import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Table from "./components/Table";
import BoxGonggi from "./components/BoxGonggi";






export default function App() {
  return (
    <div className="h-full relative">
      <div className="absolute h-full w-full">
        <Canvas camera={{ position: [0, 50, 30], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />




          <Table />
          <BoxGonggi position={[0, 0.25, 0]} isRandomGonggi={true} />
          <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* <div className="absolute top-0 bg-black h-full w-full opacity-80 blur">
      </div>
      <div className="absolute top-0 h-full w-full flex justify-around items-center ">
        <div className="px-20 py-10 bg-white">
          START
        </div>
      </div> */}
      {/* <HumanModel /> */}
    </div>
  );
}
