import { memo, useMemo } from "react";

import * as THREE from "three";

const Square = memo(function ({ width, lineWidth, ...props }) {
    const shape = new THREE.Shape();
    shape.moveTo(-width, -width);
    shape.lineTo(width, -width);
    shape.lineTo(width, width);
    shape.lineTo(-width, width);
    shape.closePath();

    const innerShape = new THREE.Shape();
    innerShape.moveTo(-(width - lineWidth), -(width - lineWidth));
    innerShape.lineTo((width - lineWidth), -(width - lineWidth));
    innerShape.lineTo((width - lineWidth), (width - lineWidth));
    innerShape.lineTo(-(width - lineWidth), (width - lineWidth));
    innerShape.closePath();

    shape.holes.push(innerShape);
    return (
        <mesh {...props}>
            <extrudeGeometry args={[shape, { depth: 0.1, bevelEnabled: false }]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
        </mesh>
    )
})
const Triangle = memo(function ({ width, lineWidth, ...props }) {
    const shape = new THREE.Shape();

    shape.moveTo(-width, -width);
    shape.lineTo(width, -width);
    shape.lineTo(0, width);
    shape.closePath();

    const innerShape = new THREE.Shape();
    innerShape.moveTo(-(width - lineWidth * 1.5), -(width - lineWidth));
    innerShape.lineTo((width - lineWidth * 1.5), -(width - lineWidth));
    innerShape.lineTo(0, (width - lineWidth * 1.5));
    innerShape.closePath();

    shape.holes.push(innerShape);
    return (
        <mesh {...props}>
            <extrudeGeometry args={[shape, { depth: 0.1, bevelEnabled: false }]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
        </mesh>
    )
})
const Circle = memo(function ({ width, lineWidth, segments = 64, ...props }) {
    const geometry = useMemo(() => {
        const shape = new THREE.Shape();
        shape.absarc(0, 0, width, 0, Math.PI * 2, false);

        const innerShape = new THREE.Shape();
        const innerRadius = width - lineWidth;
        innerShape.absarc(0, 0, innerRadius, 0, Math.PI * 2, false);

        shape.holes.push(innerShape);

        return new THREE.ExtrudeGeometry(shape, {
            depth: 0.1,
            bevelEnabled: false,
            curveSegments: segments // 🔥 Tăng số lượng đoạn để làm mịn hình tròn
        });
    }, [width, lineWidth]);

    return (
        <mesh geometry={geometry} {...props}>
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
        </mesh>
    );
})



export { Square, Triangle, Circle };
