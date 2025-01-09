import React, { useEffect, useState } from "react";
import * as THREE from "three";


const width = 0.8
const linewidth = 0.2

function createGonggiShape() {
    const spikes = 7;
    const outerRadius = 3.5;
    const innerRadius = 1;

    const shape = new THREE.Shape();
    const curvePoints = [];

    for (let i = 0; i < spikes * 3; i++) {
        const angle = (i * Math.PI * 2) / spikes;
        var radius
        if (i % 3 == 1 || i % 3 == 2) {
            radius = outerRadius
        }
        else {
            radius = innerRadius;
        }
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        curvePoints.push(new THREE.Vector2(x, y));
    }
    for (let i = 0; i < curvePoints.length; i = i + 3) {
        const currentPoint = curvePoints[i]
        const controlPoint1 = curvePoints[i + 1]
        const controlPoint2 = curvePoints[i + 2]
        const nextPoint = i != (spikes - 1) * 3 ? curvePoints[i + 3] : curvePoints[0]
        const curve = new THREE.CubicBezierCurve3(currentPoint, controlPoint1, controlPoint2, nextPoint)

        const points = curve.getPoints(50);
        shape.moveTo(points[0].x, points[0].y);
        for (let j = 1; j < points.length; j++) {
            shape.lineTo(points[j].x, points[j].y);
        }
    }

    shape.closePath();
    return shape;
}

const ShapeImage = ({ shape }) => {

    return (
        <mesh position={[0, 0, 2.6]}>
            <extrudeGeometry args={[shape, { depth: 0.1, bevelEnabled: false }]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
        </mesh>
    )
}

const Square = () => {
    const shape = new THREE.Shape();
    shape.moveTo(-width, -width);
    shape.lineTo(width, -width);
    shape.lineTo(width, width);
    shape.lineTo(-width, width);
    shape.closePath();

    const innerShape = new THREE.Shape();
    innerShape.moveTo(-(width - linewidth), -(width - linewidth));
    innerShape.lineTo((width - linewidth), -(width - linewidth));
    innerShape.lineTo((width - linewidth), (width - linewidth));
    innerShape.lineTo(-(width - linewidth), (width - linewidth));
    innerShape.closePath();

    shape.holes.push(innerShape);
    return shape
}
const Triangle = () => {
    const shape = new THREE.Shape();

    shape.moveTo(-width, -width);
    shape.lineTo(width, -width);
    shape.lineTo(0, width);
    shape.closePath();

    const innerShape = new THREE.Shape();
    innerShape.moveTo(-(width - linewidth * 1.5), -(width - linewidth));
    innerShape.lineTo((width - linewidth * 1.5), -(width - linewidth));
    innerShape.lineTo(0, (width - linewidth * 1.5));
    innerShape.closePath();

    shape.holes.push(innerShape);
    return shape;
};
const Circle = () => {
    const shape = new THREE.Shape();

    shape.absarc(0, 0, width, 0, Math.PI * 2, false);

    const innerShape = new THREE.Shape();
    const innerRadius = width - linewidth;

    innerShape.absarc(0, 0, innerRadius, 0, Math.PI * 2, false);

    shape.holes.push(innerShape);
    return shape;
};



export default function Gonggi({ shape = "triangle", color = "#7b68ee", ...props }) {

    const [gonggiImage, setGonggiImage] = useState(Square())

    useEffect(() => {
        if (shape == "square") {
            setGonggiImage(Square())
        }
        else if (shape == "triangle") {
            setGonggiImage(Triangle())
        }
        else if (shape == "circle") {
            setGonggiImage(Circle())
        }
    }, [shape])

    return (
        <group {...props}>
            <mesh>
                <extrudeGeometry
                    args={[
                        createGonggiShape(),
                        { depth: 2 },
                    ]}
                />
                <meshStandardMaterial color={color}
                    emissive={color} emissiveIntensity={0.05} />
            </mesh>
            <mesh position={[0, 0, 2.1]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[1.5, 1.5, 1, 32]} />
                <meshStandardMaterial color={color}
                    metalness={0.01}
                />
            </mesh>
            <ShapeImage shape={gonggiImage} />
        </group>
    );
}