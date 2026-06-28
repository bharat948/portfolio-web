import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import TractorModel from './TractorModel';
import Particles from './Particles';
import DiagonalLines from './DiagonalLines';

interface HeroSceneProps {
  mouse: [number, number];
  visible: boolean;
}

const SceneContent: React.FC<{ mouse: [number, number] }> = ({ mouse }) => {
  return (
    <>
      {/* Fog for depth fade into dark background */}
      <fog attach="fog" args={['#0A0A0A', 8, 20]} />

      {/* ── Lighting Rig ── */}
      {/* Subtle ambient fill */}
      <ambientLight intensity={0.15} />

      {/* Main key light – upper right */}
      <spotLight
        position={[5, 6, 4]}
        intensity={0.8}
        color="#f5f5f0"
        angle={0.4}
        penumbra={0.8}
        castShadow={false}
      />

      {/* Orange-red rim glow – behind object */}
      <pointLight position={[-4, 3, -4]} color="#EA580C" intensity={2} distance={15} />

      {/* Secondary accent – opposite side */}
      <pointLight position={[3, -1, -3]} color="#C2410C" intensity={1.2} distance={12} />

      {/* ── Scene Objects ── */}
      <TractorModel mouse={mouse} />
      <Particles count={150} />
      <DiagonalLines />

      <Preload all />
    </>
  );
};

const HeroScene: React.FC<HeroSceneProps> = React.memo(({ mouse, visible }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.2s ease-in-out',
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 1, 6], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]}
      >
        <React.Suspense fallback={null}>
          <SceneContent mouse={mouse} />
        </React.Suspense>
      </Canvas>
    </div>
  );
});

HeroScene.displayName = 'HeroScene';

export default HeroScene;
