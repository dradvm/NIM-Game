import { a } from "@react-spring/three";
import React, { memo, useCallback, useMemo, useRef } from "react";
import * as THREE from "three";
import Shape from "@constants/shape";
import Color from "@constants/color";
import { Square, Triangle, Circle } from "./Shape";



const spikes = 7;
const outerRadius = 1.5;
const innerRadius = 0.25;

function createGonggiShape() {

    const shape = new THREE.Shape();
    const curvePoints = [];

    for (let i = 0; i < spikes * 3; i++) {
        const angle = (i * Math.PI * 2) / spikes;
        var radius
        if (i % 3 === 1 || i % 3 === 2) {
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
        const nextPoint = i !== (spikes - 1) * 3 ? curvePoints[i + 3] : curvePoints[0]
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


export default memo(function Gonggi({
    shape = Shape.circle,
    color = Color.purple,
    pos,
    indexItem,
    ...props }) {


    const width = 0.4
    const lineWidth = 0.05

    const getShape = useCallback((shape) => {
        if (shape === Shape.square) {
            return <Square width={width} lineWidth={lineWidth} position={[0, 0, 0.8]} />
        }
        else if (shape === Shape.triangle) {
            return <Triangle width={width} lineWidth={lineWidth} position={[0, 0.05, 0.8]} />
        }
        else if (shape === Shape.circle) {
            return <Circle width={width} lineWidth={lineWidth} position={[0, 0, 0.8]} />
        }
    }, [])

    const gonggiImage = useMemo(() => getShape(shape), [getShape, shape])
    return (
        <a.group {...props}
            position={pos}
        >
            <mesh>
                <extrudeGeometry
                    args={[
                        createGonggiShape(),
                        { depth: 0.5 },
                    ]}
                />
                <meshStandardMaterial color={color} metalness={0.4} roughness={1} />
            </mesh>
            <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.9, 0.7, 32]} />
                <meshStandardMaterial color={color}
                    metalness={0.5}
                />
            </mesh>
            {gonggiImage}
        </a.group>
    );
})