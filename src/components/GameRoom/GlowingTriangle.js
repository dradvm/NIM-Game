import { memo, useEffect } from "react";

export default memo(function GlowingTriangle({ isGlowing, color, emissive, ...props }) {

    return (
        <mesh {...props}>
            <cylinderGeometry args={[1, 1, 0.5, 3]} />
            <meshStandardMaterial
                emissive={emissive}
                emissiveIntensity={isGlowing ? 0.8 : 0}
                color={color}
            />
        </mesh>
    );
})