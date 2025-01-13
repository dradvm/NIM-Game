// src/components/ModelViewer.js
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // GLTFLoader để tải mô hình glTF
import { OrbitControls } from '@react-three/drei'; // OrbitControls để điều khiển góc nhìn

const ModelViewer = ({ modelPath }) => {
    const model = useLoader(GLTFLoader, modelPath); // Tải mô hình từ đường dẫn

    return (
        <mesh>
            <primitive object={model.scene} /> {/* Hiển thị mô hình trong React */}
            <OrbitControls /> {/* Điều khiển góc nhìn */}
        </mesh>
    );
};

export default ModelViewer;
