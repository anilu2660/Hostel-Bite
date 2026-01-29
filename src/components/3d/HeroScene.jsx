import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

// Floating Food Models
const FoodPlate = ({ position }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group ref={meshRef} position={position}>
                {/* Plate */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
                    <meshStandardMaterial color="#f58220" metalness={0.3} roughness={0.4} />
                </mesh>
                {/* Food on plate */}
                <mesh position={[0, 0.3, 0]}>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <meshStandardMaterial color="#fbbf24" metalness={0.2} roughness={0.6} />
                </mesh>
            </group>
        </Float>
    );
};

const TeaCup = ({ position }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y -= 0.003;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <group ref={meshRef} position={position}>
                {/* Cup body */}
                <mesh>
                    <cylinderGeometry args={[0.6, 0.5, 1, 32]} />
                    <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
                </mesh>
                {/* Tea inside */}
                <mesh position={[0, 0.3, 0]}>
                    <cylinderGeometry args={[0.55, 0.55, 0.4, 32]} />
                    <meshStandardMaterial color="#8b4513" metalness={0.1} roughness={0.8} />
                </mesh>
                {/* Handle */}
                <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.4, 0.08, 16, 32]} />
                    <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
                </mesh>
            </group>
        </Float>
    );
};

const Burger = ({ position }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.004;
        }
    });

    return (
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
            <group ref={meshRef} position={position}>
                {/* Bottom bun */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#d4a574" metalness={0.1} roughness={0.7} />
                </mesh>
                {/* Patty */}
                <mesh position={[0, 0.3, 0]}>
                    <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
                    <meshStandardMaterial color="#8b4513" metalness={0.2} roughness={0.8} />
                </mesh>
                {/* Cheese */}
                <mesh position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[0.75, 0.75, 0.1, 32]} />
                    <meshStandardMaterial color="#fbbf24" metalness={0.3} roughness={0.5} />
                </mesh>
                {/* Top bun */}
                <mesh position={[0, 0.8, 0]} rotation={[Math.PI, 0, 0]}>
                    <sphereGeometry args={[0.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#d4a574" metalness={0.1} roughness={0.7} />
                </mesh>
            </group>
        </Float>
    );
};

const Samosa = ({ position }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.006;
        }
    });

    return (
        <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.9}>
            <group ref={meshRef} position={position}>
                <mesh rotation={[0, 0, Math.PI / 6]}>
                    <coneGeometry args={[0.8, 1.5, 3]} />
                    <meshStandardMaterial color="#d4a574" metalness={0.2} roughness={0.6} />
                </mesh>
            </group>
        </Float>
    );
};

// Main Scene Component
const Scene = () => {
    const controlsRef = useRef();

    useFrame((state) => {
        // Gentle camera rotation
        if (controlsRef.current) {
            const time = state.clock.getElapsedTime();
            controlsRef.current.target.x = Math.sin(time * 0.1) * 0.5;
            controlsRef.current.target.y = Math.cos(time * 0.1) * 0.3;
            controlsRef.current.update();
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
            <OrbitControls
                ref={controlsRef}
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
                autoRotate
                autoRotateSpeed={0.5}
            />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0ea5e9" />
            <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} color="#f58220" />

            {/* Food Models */}
            <FoodPlate position={[-3, 0, 0]} />
            <TeaCup position={[3, 1, -2]} />
            <Burger position={[0, -1, 2]} />
            <Samosa position={[-2, 2, -3]} />
            <FoodPlate position={[4, -0.5, 1]} />
        </>
    );
};

// Hero Scene Component
const HeroScene = () => {
    return (
        <div className="w-full h-full">
            <Canvas
                shadows
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default HeroScene;
