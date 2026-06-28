import React, { useMemo } from 'react';
import * as THREE from 'three';

interface LineData {
  start: [number, number, number];
  end: [number, number, number];
}

const DiagonalLines: React.FC = () => {
  const lines: LineData[] = useMemo(
    () => [
      { start: [-6, -4, -3], end: [4, 5, -5] },
      { start: [5, -3, -4], end: [-3, 6, -6] },
      { start: [-4, 3, -2], end: [6, -5, -7] },
      { start: [3, 4, -5], end: [-5, -3, -3] },
      { start: [-7, 0, -4], end: [2, 7, -8] },
      { start: [6, 2, -6], end: [-2, -6, -2] },
      { start: [-3, -5, -5], end: [7, 3, -4] },
      { start: [1, 6, -3], end: [-6, -4, -7] },
    ],
    []
  );

  const geometries = useMemo(() => {
    return lines.map((line) => {
      const geometry = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        line.start[0], line.start[1], line.start[2],
        line.end[0], line.end[1], line.end[2],
      ]);
      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      return geometry;
    });
  }, [lines]);

  return (
    <group>
      {geometries.map((geometry, i) => (
        <line key={i} geometry={geometry}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.07} />
        </line>
      ))}
    </group>
  );
};

export default DiagonalLines;
