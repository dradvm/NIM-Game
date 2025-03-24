import { memo, useEffect } from "react";

export default memo(function GlowingTriangle({ isGlowing, color, ...props }) {

    return (
        <mesh {...props}>
            <cylinderGeometry args={[1, 1, 0.5, 3]} />
            <meshStandardMaterial
                emissive={color}
                emissiveIntensity={isGlowing ? 1 : 0}
                color={color}
            />
        </mesh>
    );
})