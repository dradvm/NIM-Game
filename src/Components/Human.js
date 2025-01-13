// HumanModel.jsx
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Shape } from '@react-three/drei';
import * as THREE from 'three';


const width = 0.4
const linewidth = 0.1

const Triangle = () => {
    const shape = new THREE.Shape();

    shape.moveTo(-width * 1.3, -width);
    shape.lineTo(width * 1.3, -width);
    shape.lineTo(0, width);
    shape.closePath();

    const innerShape = new THREE.Shape();
    innerShape.moveTo(-(width * 1.3 - linewidth * 1.5), -(width - linewidth));
    innerShape.lineTo((width * 1.3 - linewidth * 1.5), -(width - linewidth));
    innerShape.lineTo(0, (width - linewidth * 1.5));
    innerShape.closePath();

    shape.holes.push(innerShape);
    return shape;
};

const ShapeImage = ({ shape }) => {

    return (
        <mesh position={[0, 2.3, 0.5]}>
            <extrudeGeometry args={[shape, { depth: 0.5, bevelEnabled: false }]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
        </mesh>
    )
}


const HalfOvalSphere = () => {
    const createHalfOvalSphere = () => {
        // Tạo hình cầu oval với scale trên trục Y để tạo độ bẹp
        const sphereGeometry = new THREE.SphereGeometry(1, 512, 512); // Độ phân giải cao
        const positionAttribute = sphereGeometry.attributes.position;
        const positions = positionAttribute.array;

        // Cắt nửa dưới (z < 0) của hình cầu oval
        for (let i = 0; i < positions.length; i += 3) {
            const z = positions[i + 2];

            // Loại bỏ các điểm có tọa độ z < 0 (cắt nửa dưới)
            if (z > 0.3) {
                positions[i] = positions[i + 1] = positions[i + 2] = 0; // Đặt các điểm bị loại bỏ về gốc
            }
        }

        positionAttribute.needsUpdate = true;

        // Scale hình cầu thành oval
        sphereGeometry.scale(1.1, 1.3, 1); // Tạo hình oval (mở rộng trục Y)

        return sphereGeometry;
    };

    const material = new THREE.MeshStandardMaterial({
        color: '#FF007F',
        metalness: 0.1,
        roughness: 0.5,
        side: THREE.DoubleSide, // Hiển thị cả mặt trong và ngoài
    });

    return (
        <mesh position={[0, 1.8, 0]} geometry={createHalfOvalSphere()} material={material} />
    );
};
const HumanModel = () => {
    return (
        <Canvas style={{ width: '100%', height: '100vh' }}>
            {/* Ánh sáng */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* Mô hình Pink Man */}
            <group position={[0, 0, 0]}>
                {/* Đầu */}
                <mesh position={[0, 1.8, 0]} scale={[1, 1.2, 1]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>

                <HalfOvalSphere />
                <mesh position={[0, 1.7, 0]}>
                    <cylinderGeometry args={[1, 1, 0.1, 32]} />
                    <meshStandardMaterial color="#3b3c36" />
                </mesh>
                <mesh position={[-0.1, 1.4, 0.45]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
                    <meshStandardMaterial color="#3b3c36" />
                </mesh>
                <mesh position={[0.1, 1.4, 0.45]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
                    <meshStandardMaterial color="#3b3c36" />
                </mesh>
                <ShapeImage shape={Triangle()} />
                <mesh position={[0, 1, 0]}>
                    <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
                    <meshStandardMaterial color="#f5c6a5" />
                </mesh>
            </group>
            {/* Điều khiển */}
            <OrbitControls />
        </Canvas>
    );
};

export default HumanModel;
