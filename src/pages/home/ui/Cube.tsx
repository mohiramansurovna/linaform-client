import { Canvas } from "@react-three/fiber";
import { useState } from "react";

function RotatingCube() {
    const [hovered, setHovered] = useState(false);

    return (
        <mesh
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            rotation={hovered ? [0.5, 0.5, 0] : [0, 0, 0]}
        >
            {/* Cube geometry (like Unity’s cube primitive) */}
            <boxGeometry args={[1, 1, 1]} />
            {/* Basic material */}
            <meshStandardMaterial color={hovered ? "hotpink" : "skyblue"} />
        </mesh>
    );
}

export default function Hero3D() {
    return (
        <div className="w-full h-[400px]">
            <Canvas camera={{ position: [1, 3, 1] }}>
                {/* Light sources (like Unity scene lights) */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                {/* Our cube */}
                <RotatingCube />
            </Canvas>
        </div>
    );
}
