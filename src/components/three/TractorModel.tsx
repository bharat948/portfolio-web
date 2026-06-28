import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Smoke from './Smoke';

interface TractorModelProps {
  mouse: [number, number];
}

/** Shared PBR material palette (created once at module load). */
const MATS = {
  body: new THREE.MeshPhysicalMaterial({ color: '#2f7d32', metalness: 0.55, roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
  metal: new THREE.MeshStandardMaterial({ color: '#16181c', metalness: 0.9, roughness: 0.4 }),
  rim: new THREE.MeshStandardMaterial({ color: '#f2c200', metalness: 0.5, roughness: 0.35 }),
  rubber: new THREE.MeshStandardMaterial({ color: '#0a0a0a', metalness: 0, roughness: 0.85 }),
  glass: new THREE.MeshPhysicalMaterial({ color: '#bcd6e6', metalness: 0, roughness: 0.05, transmission: 0.85, transparent: true, opacity: 0.5 }),
  chrome: new THREE.MeshStandardMaterial({ color: '#e6eaee', metalness: 1, roughness: 0.1 }),
};

/** Reusable solid PBR part. */
const Part: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  children?: React.ReactNode;
  /** showEdges kept for call-site compatibility; ignored in the PBR build. */
  showEdges?: boolean;
  material?: THREE.Material;
}> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  children,
  material = MATS.body,
}) => {
  return (
    <mesh position={position} rotation={rotation} scale={scale} material={material}>
      {children}
    </mesh>
  );
};

/** High-detail wheel with aggressive deep treads */
const Wheel: React.FC<{
  radius: number;
  width: number;
  position: [number, number, number];
  treadCount?: number;
  innerRef?: React.Ref<THREE.Group>;
}> = ({ radius, width, position, treadCount = 24, innerRef }) => {
  return (
    <group position={position} ref={innerRef}>
      {/* Main Tyre body */}
      <Part rotation={[Math.PI / 2, 0, 0]} material={MATS.rubber}>
        <cylinderGeometry args={[radius * 0.9, radius * 0.9, width, 32]} />
      </Part>

      {/* Aggressive tractor treads (chevrons) */}
      {Array.from({ length: treadCount }).map((_, i) => {
        const angle = (i / treadCount) * Math.PI * 2;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            <Part
              position={[0, radius * 0.92, 0]}
              rotation={[Math.PI / 2, 0, Math.PI / 8]}
              material={MATS.rubber}
            >
              <boxGeometry args={[width * 1.15, 0.12, 0.15]} />
            </Part>
          </group>
        );
      })}

      {/* Deep Hub Rim */}
      <Part rotation={[0, 0, 0]} material={MATS.rim}>
        <torusGeometry args={[radius * 0.5, radius * 0.08, 8, 32]} />
      </Part>
      <Part rotation={[Math.PI / 2, 0, 0]} material={MATS.rim}>
        <cylinderGeometry args={[radius * 0.5, radius * 0.5, width * 0.4, 16]} />
      </Part>
      {/* Center axle cap */}
      <Part rotation={[Math.PI / 2, 0, 0]} material={MATS.chrome}>
        <cylinderGeometry args={[radius * 0.15, radius * 0.15, width * 1.1, 12]} />
      </Part>
    </group>
  );
};

const TractorModel: React.FC<TractorModelProps> = ({ mouse }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const rearWheelLRef = useRef<THREE.Group>(null!);
  const rearWheelRRef = useRef<THREE.Group>(null!);
  const frontWheelLRef = useRef<THREE.Group>(null!);
  const frontWheelRRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Scroll based movement (move from left to right as you scroll down)
    const scrollY = window.scrollY;
    // Map scrollY to X position. Adjust multiplier to control speed.
    const targetPosX = -2.5 + scrollY * 0.003;
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetPosX,
      delta * 4
    );

    // Mechanical Wheel Rotation (synced with actual lerped X movement)
    // Distance moved = current X. Angle = distance / radius
    const currentX = groupRef.current.position.x;
    const rearRot = -(currentX - -2.5) / 1.25; // radius 1.25
    const frontRot = -(currentX - -2.5) / 0.7; // radius 0.7

    if (rearWheelLRef.current) rearWheelLRef.current.rotation.z = rearRot;
    if (rearWheelRRef.current) rearWheelRRef.current.rotation.z = rearRot;
    if (frontWheelLRef.current) frontWheelLRef.current.rotation.z = frontRot;
    if (frontWheelRRef.current) frontWheelRRef.current.rotation.z = frontRot;

    // Calculate how much control the mouse has over rotation based on scroll.
    // 1.0 at the very top (Hero section), 0.0 once you've scrolled down 400px.
    const interactFactor = Math.max(0, 1 - scrollY / 400);

    // Blend between intense cursor play (Hero) and locked right-facing (Scrolling)
    const targetRotY = mouse[0] * (Math.PI * 0.6 * interactFactor + 0.05 * (1 - interactFactor)); 
    const targetRotX = mouse[1] * (0.4 * interactFactor + 0.05 * (1 - interactFactor));

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      delta * 4
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      delta * 4
    );
  });

  return (
    <group ref={groupRef} position={[-2.5, -0.6, 0]} scale={0.55}>
      {/* ── Main Heavy Chassis ── */}
      <Part position={[0.5, 0.6, 0]} material={MATS.metal}>
        <boxGeometry args={[4.2, 0.7, 0.9]} />
      </Part>
      {/* Front weight block (counterweight) */}
      <Part position={[2.8, 0.5, 0]} material={MATS.metal}>
        <boxGeometry args={[0.5, 0.6, 0.8]} />
      </Part>
      
      {/* ── Sculpted Engine Hood ── */}
      {/* Lower hood base */}
      <Part position={[1.5, 1.1, 0]}>
        <boxGeometry args={[2.0, 0.4, 1.0]} />
      </Part>
      {/* Mid stepped hood */}
      <Part position={[1.4, 1.4, 0]}>
        <boxGeometry args={[1.8, 0.2, 0.9]} />
      </Part>
      {/* Top rounded hood (approximated with rotated cylinder) */}
      <Part position={[1.4, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.45, 0.45, 1.8, 16, 1, false, 0, Math.PI]} />
      </Part>
      {/* Grille Details */}
      <Part position={[2.51, 1.15, 0]} material={MATS.chrome}>
        <boxGeometry args={[0.05, 0.8, 0.9]} />
      </Part>

      {/* ── Exhaust Pipe (Thick muffler base + curved top) ── */}
      <group position={[1.9, 1.6, 0.5]}>
        <Part position={[0, 0.4, 0]} material={MATS.chrome}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        </Part>
        <Part position={[0, 1.1, 0]} material={MATS.chrome}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 12]} />
        </Part>
        <Part position={[-0.1, 1.5, 0]} rotation={[0, 0, 0]} material={MATS.chrome}>
          <torusGeometry args={[0.1, 0.05, 8, 12, Math.PI / 2]} />
        </Part>
        {/* Wireframe smoke emitting from the exhaust tip! */}
        <Smoke position={[-0.2, 1.6, 0]} />
      </group>

      {/* ── Detailed Cab Frame ── */}
      {/* Cab Floor */}
      <Part position={[-0.9, 1.05, 0]}>
        <boxGeometry args={[1.6, 0.2, 1.4]} />
      </Part>
      {/* Structural Pillars */}
      <Part position={[-0.2, 1.9, 0.65]} rotation={[0, 0, -0.05]}><boxGeometry args={[0.08, 1.6, 0.08]} /></Part>
      <Part position={[-0.2, 1.9, -0.65]} rotation={[0, 0, -0.05]}><boxGeometry args={[0.08, 1.6, 0.08]} /></Part>
      <Part position={[-1.6, 1.9, 0.65]}><boxGeometry args={[0.08, 1.6, 0.08]} /></Part>
      <Part position={[-1.6, 1.9, -0.65]}><boxGeometry args={[0.08, 1.6, 0.08]} /></Part>
      {/* Roof */}
      <Part position={[-0.9, 2.75, 0]} rotation={[0, 0, 0.03]}>
        <boxGeometry args={[1.6, 0.15, 1.5]} />
      </Part>
      
      {/* Side Mirrors */}
      <group position={[-0.1, 2.0, 0.7]}>
        <Part position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.02, 0.02, 0.4, 8]} /></Part>
        <Part position={[0, 0, 0.4]}><boxGeometry args={[0.1, 0.4, 0.2]} /></Part>
      </group>
      <group position={[-0.1, 2.0, -0.7]}>
        <Part position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.02, 0.02, 0.4, 8]} /></Part>
        <Part position={[0, 0, -0.4]}><boxGeometry args={[0.1, 0.4, 0.2]} /></Part>
      </group>

      {/* ── Interior ── */}
      <Part position={[-1.1, 1.5, 0]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.1, 0.7, 0.6]} />
      </Part>
      <Part position={[-0.9, 1.25, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.6]} />
      </Part>
      <Part position={[-0.4, 1.4, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
      </Part>
      <Part position={[-0.2, 1.7, 0]} rotation={[0, Math.PI / 2, -0.6]}>
        <torusGeometry args={[0.2, 0.02, 8, 16]} />
      </Part>

      {/* ── Sweeping Fenders ── */}
      <Part position={[-0.9, 0.1, 1.2]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.35, 0.35, 6, 24, Math.PI]} />
      </Part>
      <Part position={[-0.9, 0.1, -1.2]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.35, 0.35, 6, 24, Math.PI]} />
      </Part>

      {/* ── Front Suspension/Linkage Details ── */}
      <group position={[2.1, 0.2, 0]}>
        {/* V-arms to the wheels */}
        <Part position={[0, -0.1, 0.4]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        </Part>
        <Part position={[0, -0.1, -0.4]} rotation={[-0.4, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        </Part>
      </group>

      {/* ── Axles ── */}
      <Part position={[-0.9, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={MATS.metal}>
        <cylinderGeometry args={[0.15, 0.15, 2.4, 8]} />
      </Part>
      <Part position={[2.1, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]} material={MATS.metal}>
        <cylinderGeometry args={[0.1, 0.1, 1.9, 8]} />
      </Part>

      {/* ── Wheels ── */}
      {/* Massive rear wheels */}
      <Wheel radius={1.25} width={0.6} position={[-0.9, 0, 1.2]} treadCount={28} innerRef={rearWheelLRef} />
      <Wheel radius={1.25} width={0.6} position={[-0.9, 0, -1.2]} treadCount={28} innerRef={rearWheelRRef} />
      
      {/* Thick front wheels */}
      <Wheel radius={0.7} width={0.4} position={[2.1, -0.1, 0.95]} treadCount={20} innerRef={frontWheelLRef} />
      <Wheel radius={0.7} width={0.4} position={[2.1, -0.1, -0.95]} treadCount={20} innerRef={frontWheelRRef} />

      {/* ── Roof Lights & Beacons ── */}
      {[0.5, 0.2, -0.2, -0.5].map((z, i) => (
        <Part key={i} position={[-0.2, 2.85, z]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
        </Part>
      ))}
      <Part position={[-1.5, 2.9, 0.6]}>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
      </Part>
      <Part position={[-1.5, 3.05, 0.6]}>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 12]} />
      </Part>

      {/* ── Rim Accent Light ── */}
      <spotLight
        color="#EA580C"
        intensity={6}
        position={[-6, 6, -5]}
        angle={0.7}
        penumbra={1}
        distance={25}
      />
    </group>
  );
};

export default TractorModel;
