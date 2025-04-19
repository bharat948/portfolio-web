import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import { skills } from "../../config/portfolio";
import * as THREE from "three";

type SkillNodeProps = {
  position: [number, number, number];
  skill: string;
  proficiency: number;
  index: number;
};

const SkillNode: React.FC<SkillNodeProps> = ({ position, skill, proficiency, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const hue = (index * 30) % 360;
  const color = new THREE.Color(`hsl(${hue}, 70%, 60%)`);
  
  // Scale based on proficiency
  const scale = 0.5 + (proficiency / 100) * 0.5;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    // Gentle hover effect - different for each skill
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.1;
  });
  
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[scale * 0.2, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
          roughness={0.2} 
          metalness={0.8} 
        />
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {skill}
        </Text>
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
          opacity={0.7}
        >
          {proficiency}%
        </Text>
      </mesh>
    </Float>
  );
};

const SkillSphere: React.FC = () => {
  const nodesRef = useRef<THREE.Group>(null);
  
  // Create a sphere-like distribution of skills
  const skillPositions = useMemo(() => {
    return skills.map((_, index) => {
      const phi = Math.acos(-1 + (2 * index) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      
      return [
        2.5 * Math.cos(theta) * Math.sin(phi),
        2.5 * Math.sin(theta) * Math.sin(phi),
        2.5 * Math.cos(phi),
      ] as [number, number, number];
    });
  }, []);
  
  useFrame((state) => {
    if (!nodesRef.current) return;
    nodesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });
  
  return (
    <group ref={nodesRef}>
      {skills.map((skill, index) => (
        <SkillNode
          key={skill.name}
          position={skillPositions[index]}
          skill={skill.name}
          proficiency={skill.proficiency}
          index={index}
        />
      ))}
    </group>
  );
};

const SkillsCanvas: React.FC = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <SkillSphere />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default SkillsCanvas;