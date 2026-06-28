import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const particleCount = 15;

export default function Smoke({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  // [x, y, z, life, scale, vx, vy, vz]
  const particles = useMemo(() => {
    const arr = new Float32Array(particleCount * 8);
    for (let i = 0; i < particleCount; i++) {
      resetParticle(arr, i, position, true);
    }
    return arr;
  }, [position]);

  function resetParticle(arr: Float32Array, i: number, pos: [number, number, number], randomLife = false) {
    const offset = i * 8;
    arr[offset] = pos[0] + (Math.random() - 0.5) * 0.1;
    arr[offset + 1] = pos[1];
    arr[offset + 2] = pos[2] + (Math.random() - 0.5) * 0.1;
    arr[offset + 3] = randomLife ? Math.random() : 0; // life
    arr[offset + 4] = Math.random() * 0.1 + 0.05; // base scale
    arr[offset + 5] = -0.4 - Math.random() * 0.3; // blow backward (-X)
    arr[offset + 6] = 0.5 + Math.random() * 0.5;  // float upward (+Y)
    arr[offset + 7] = (Math.random() - 0.5) * 0.3; // drift (Z)
  }

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Rev the engine based on scroll!
    const scrollY = window.scrollY;
    // At scroll=0, idle speed. As scroll increases, smoke shoots out faster.
    const scrollMultiplier = 1 + Math.min(scrollY * 0.003, 3); 

    for (let i = 0; i < particleCount; i++) {
      const offset = i * 8;
      
      particles[offset + 3] += delta * (0.5 * scrollMultiplier); // age faster when revving
      
      if (particles[offset + 3] >= 1) {
        resetParticle(particles, i, position);
      }
      
      const life = particles[offset + 3];
      
      // Update position
      particles[offset] += particles[offset + 5] * delta * scrollMultiplier;
      particles[offset + 1] += particles[offset + 6] * delta * scrollMultiplier;
      particles[offset + 2] += particles[offset + 7] * delta * scrollMultiplier;
      
      dummy.position.set(particles[offset], particles[offset + 1], particles[offset + 2]);
      
      // Scale grows as it dissipates
      const currentScale = particles[offset + 4] * (1 + life * 5);
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      // Fade out to transparent (additive blending means darker color = more transparent)
      // Light white smoke with more fade
      const intensity = Math.max(0, (1 - life) * 0.4); 
      color.setRGB(intensity, intensity, intensity); 
      meshRef.current.setColorAt(i, color);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshBasicMaterial 
        transparent 
        opacity={0.4} 
        depthWrite={false} 
        wireframe 
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
