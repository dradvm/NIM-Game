import React, { useEffect, useState } from "react";
import * as THREE from "three";


const width = 0.4
const linewidth = 0.05

function createGonggiShape() {
    const spikes = 7;
    const outerRadius = 1.5;
    const innerRadius = 0.25;

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
        <mesh position={[0, 0, 0.8]}>
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

const getShape = (shape) => {
    if (shape == "square") {
        return Square()
    }
    else if (shape == "triangle") {
        return Triangle()
    }
    else if (shape == "circle") {
        return Circle()
    }
}

export default function Gonggi({ shape = "triangle", color = "#7b68ee", pos, ...props }) {

    const [gonggiImage, setGonggiImage] = useState(getShape(shape))
    const [position, setPosition] = useState(pos)
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);




    useEffect(() => {
        if (!clicked) {

            console.log("hover", hovered)
            var newPos = Array.from(pos)
            newPos[2] += hovered ? 1 : 0
            setPosition(newPos)
        }
    }, [hovered])
    useEffect(() => {
        console.log("click", clicked)
        if (clicked) {

            var newPos = Array.from(pos)
            newPos[1] += 1
            setPosition(newPos)
        }
        else {
            setPosition(pos)
        }
    }, [clicked])

    return (
        <group {...props}
            position={position}
            onPointerOver={(e) => setHovered(true)} // Khi hover vào
            onPointerOut={(e) => setHovered(false)} // Khi rời chuột
            onClick={(e) => setClicked(!clicked)}  // Khi click

        >
            <mesh>
                <extrudeGeometry
                    args={[
                        createGonggiShape(),
                        { depth: 0.5 },
                    ]}
                />
                <meshStandardMaterial color={color}
                    emissive={color} emissiveIntensity={0.05} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.9, 0.7, 32]} />
                <meshStandardMaterial color={color}
                    metalness={0.2}
                />
            </mesh>
            <ShapeImage shape={gonggiImage} />
        </group>
    );
}