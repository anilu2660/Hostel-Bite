import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Torus, Box, Octahedron, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced floating particles with more variety
function FloatingParticles() {
    const particlesRef = useRef();
    const count = 60;

    const particles = useMemo(() => {
        const temp = [];
        const shapes = ['sphere', 'box', 'octahedron', 'icosahedron'];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 25;
            const y = (Math.random() - 0.5) * 25;
            const z = (Math.random() - 0.5) * 25;
            const scale = Math.random() * 0.6 + 0.2;
            const speed = Math.random() * 0.02 + 0.01;
            const rotationSpeed = Math.random() * 0.03 + 0.01;
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = new THREE.Color(
                Math.random() > 0.66 ? '#f58220' :
                    Math.random() > 0.5 ? '#0ea5e9' :
                        Math.random() > 0.33 ? '#ec4899' : '#10b981'
            );
            temp.push({ position: [x, y, z], scale, speed, rotationSpeed, color, shape });
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.children.forEach((particle, i) => {
                // Floating motion
                particle.position.y += Math.sin(state.clock.elapsedTime * particles[i].speed + i) * 0.015;
                particle.position.x += Math.cos(state.clock.elapsedTime * particles[i].speed + i) * 0.01;

                // Rotation
                particle.rotation.x += particles[i].rotationSpeed;
                particle.rotation.y += particles[i].rotationSpeed * 0.7;
                particle.rotation.z += particles[i].rotationSpeed * 0.5;
            });
        }
    });

    const renderParticle = (particle, i) => {
        const commonProps = {
            key: i,
            position: particle.position,
            scale: particle.scale,
        };

        const material = (
            <meshStandardMaterial
                color={particle.color}
                emissive={particle.color}
                emissiveIntensity={0.6}
                transparent
                opacity={0.7}
                metalness={0.5}
                roughness={0.2}
            />
        );

        switch (particle.shape) {
            case 'box':
                return <Box {...commonProps} args={[1, 1, 1]}>{material}</Box>;
            case 'octahedron':
                return <Octahedron {...commonProps} args={[1]}>{material}</Octahedron>;
            case 'icosahedron':
                return <Icosahedron {...commonProps} args={[1]}>{material}</Icosahedron>;
            default:
                return <Sphere {...commonProps} args={[1, 16, 16]}>{material}</Sphere>;
        }
    };

    return (
        <group ref={particlesRef}>
            {particles.map((particle, i) => renderParticle(particle, i))}
        </group>
    );
}

// Enhanced wave mesh with color transitions
function WaveMesh() {
    const meshRef = useRef();
    const materialRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
            meshRef.current.position.z = -5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
        }

        // Color transition
        if (materialRef.current) {
            const hue = (state.clock.elapsedTime * 0.05) % 1;
            materialRef.current.color.setHSL(hue, 0.7, 0.5);
            materialRef.current.emissive.setHSL(hue, 0.7, 0.3);
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -5]}>
            <sphereGeometry args={[3.5, 128, 128]} />
            <MeshDistortMaterial
                ref={materialRef}
                color="#f58220"
                attach="material"
                distort={0.5}
                speed={3}
                roughness={0.1}
                metalness={0.9}
                transparent
                opacity={0.15}
            />
        </mesh>
    );
}

// Rotating torus with enhanced effects
function RotatingTorus() {
    const torusRef = useRef();
    const materialRef = useRef();

    useFrame((state) => {
        if (torusRef.current) {
            torusRef.current.rotation.x += 0.015;
            torusRef.current.rotation.y += 0.008;
            torusRef.current.position.y = 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
        }

        // Pulsing effect
        if (materialRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.5;
            materialRef.current.emissiveIntensity = pulse;
        }
    });

    return (
        <mesh ref={torusRef} position={[5, 2, -3]}>
            <torusGeometry args={[1.2, 0.4, 24, 100]} />
            <meshStandardMaterial
                ref={materialRef}
                color="#0ea5e9"
                emissive="#0ea5e9"
                emissiveIntensity={0.5}
                transparent
                opacity={0.4}
                wireframe
                metalness={0.8}
            />
        </mesh>
    );
}

// New: Orbiting rings
function OrbitingRings() {
    const ringsRef = useRef();

    useFrame((state) => {
        if (ringsRef.current) {
            ringsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
            ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
        }
    });

    return (
        <group ref={ringsRef} position={[-5, -2, -4]}>
            <Torus args={[2, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                    color="#ec4899"
                    emissive="#ec4899"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.3}
                />
            </Torus>
            <Torus args={[2.5, 0.08, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
                <meshStandardMaterial
                    color="#10b981"
                    emissive="#10b981"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.3}
                />
            </Torus>
        </group>
    );
}

// New: Floating cubes constellation
function FloatingCubes() {
    const cubesRef = useRef();
    const cubes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 15; i++) {
            const angle = (i / 15) * Math.PI * 2;
            const radius = 8;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (Math.random() - 0.5) * 4;
            temp.push({ position: [x, y, z], delay: i * 0.2 });
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (cubesRef.current) {
            cubesRef.current.children.forEach((cube, i) => {
                cube.rotation.x = state.clock.elapsedTime * 0.5 + cubes[i].delay;
                cube.rotation.y = state.clock.elapsedTime * 0.3 + cubes[i].delay;
                cube.position.y = cubes[i].position[1] + Math.sin(state.clock.elapsedTime + cubes[i].delay) * 0.5;
            });
        }
    });

    return (
        <group ref={cubesRef}>
            {cubes.map((cube, i) => (
                <Box key={i} args={[0.3, 0.3, 0.3]} position={cube.position}>
                    <meshStandardMaterial
                        color={i % 2 === 0 ? '#f58220' : '#0ea5e9'}
                        emissive={i % 2 === 0 ? '#f58220' : '#0ea5e9'}
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.6}
                        wireframe
                    />
                </Box>
            ))}
        </group>
    );
}

// Enhanced lighting system
function DynamicLights() {
    const light1Ref = useRef();
    const light2Ref = useRef();
    const light3Ref = useRef();

    useFrame((state) => {
        if (light1Ref.current) {
            light1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 10;
            light1Ref.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 10;
        }
        if (light2Ref.current) {
            light2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.7) * 8;
            light2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 8;
        }
        if (light3Ref.current) {
            light3Ref.current.intensity = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
        }
    });

    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight ref={light1Ref} position={[10, 10, 10]} intensity={1.2} color="#f58220" />
            <pointLight ref={light2Ref} position={[-10, -10, -10]} intensity={0.8} color="#0ea5e9" />
            <pointLight ref={light3Ref} position={[0, 5, 5]} intensity={0.6} color="#ec4899" />
            <spotLight
                position={[0, 15, 0]}
                angle={0.4}
                penumbra={1}
                intensity={0.8}
                color="#10b981"
                castShadow
            />
        </>
    );
}

// Main 3D Scene
function Scene() {
    return (
        <>
            <DynamicLights />
            <FloatingParticles />
            <WaveMesh />
            <RotatingTorus />
            <OrbitingRings />
            <FloatingCubes />
        </>
    );
}

// Main component
const MenuBackground3D = () => {
    return (
        <div className="fixed inset-0 -z-10 opacity-50 dark:opacity-35">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 75 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance'
                }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default MenuBackground3D;
