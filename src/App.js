import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Gonggi from "./Components/Gonggi";
import HumanModel from "./Components/Human";
import ModelViewer from "./Components/Test";
import Table from "./Components/Table";



const Model = ({ path }) => {
  const { scene } = useGLTF(path); // Load file .glb

  return <primitive object={scene} />;
};
const rootPosition = 0
const variance = 3

const random = (n = 3) => {
  return Math.floor(Math.random() * n) + 1;
}

const randomColor = () => {
  const number = random(5)
  switch (number) {
    case 1: {
      return "#ff2400"
    }
    case 2: {
      return "#fdff00"
    }
    case 3: {
      return "#76ff7a"
    }
    case 4: {
      return "#33BFFF"
    }
    case 5: {
      return "#7b68ee"
    }
    default: {
      return "#FFFFFF"
    }
  }
}

const randomShape = () => {
  const number = random()

  switch (number) {
    case 1: {
      return "circle"
    }
    case 2: {
      return "triangle"
    }
    case 3: {
      return "square"
    }
    default: {
      return "none"
    }
  }
}


export default function App() {
  return (
    <div className="border border-2  h-full">
      <Canvas camera={{ position: [0, 40, 40], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
          return (
            <group position={[0, 0.5, (item - 1) * variance]} rotation={[-Math.PI / 2, 0, 0]}>
              {
                [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((item2) => {
                  return (
                    <Gonggi shape={randomShape()} pos={[rootPosition + item2 * variance, 20, 0]} color={randomColor()} />
                  )
                })
              }
            </group>
          )
        })}


        <Table />
        <OrbitControls enablePan={true} />
      </Canvas>
      {/* <HumanModel /> */}
    </div>
  );
}
