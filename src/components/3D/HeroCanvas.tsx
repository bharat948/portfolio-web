import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Float, Text, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { MotionConfig } from "framer-motion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const Particles = () => {
  const particleCount = 500;
  const positions = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const colors = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const scales = useRef<Float32Array>(new Float32Array(particleCount));
  const pointsRef = useRef<THREE.Points>(null);
  
  React.useEffect(() => {
    const position = positions.current;
    const color = colors.current;
    const scale = scales.current;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      position[i3] = (Math.random() - 0.5) * 10;
      position[i3 + 1] = (Math.random() - 0.5) * 10;
      position[i3 + 2] = (Math.random() - 0.5) * 10;
      
      color[i3] = Math.random();
      color[i3 + 1] = Math.random();
      color[i3 + 2] = Math.random();
      
      scale[i] = Math.random();
    }
  }, []);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.075;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={particleCount}
          array={scales.current}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const FloatingText = () => {
  const { viewport } = useThree();
  
  return (
    <group position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
        <Text
          font="/fonts/Inter-Bold.woff"
          fontSize={viewport.width > 5 ? 0.5 : 0.35}
          color="#0066CC"
          position={[0, 0, 0]}
          anchorX="center"
          anchorY="middle"
        >
          CREATIVE DEVELOPER
        </Text>
      </Float>
    </group>
  );
};

const Torus = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });
  
  return (
    <motion.mesh
      ref={meshRef}
      animate={{
        y: [0, 0.2, 0],
        rotateZ: [0, Math.PI * 2],
      }}
      transition={{
        repeat: Infinity,
        duration: 10,
        ease: "linear",
      }}
    >
      <torusGeometry args={[1.5, 0.2, 16, 100]} />
      <meshStandardMaterial color="#0066CC" metalness={0.9} roughness={0.1} />
    </motion.mesh>
  );
};

const HeroCanvas: React.FC = () => {
  return (
    <div className="relative w-full h-screen">
      <MotionConfig transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}>
        <Canvas style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", 5, 20]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Torus />
            <Particles />
            <FloatingText />
            <Environment preset="city" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.5}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </MotionConfig>
    </div>
  );
};

export default HeroCanvas;