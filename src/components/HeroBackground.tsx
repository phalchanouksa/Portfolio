'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, Environment, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

function Knot() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.01;
  });
  return (
    <TorusKnot
      ref={ref}
      args={[1, 0.3, 128, 32]}
      material-color="#6366f1"
      material-metalness={0.6}
      material-roughness={0.2}
    />
  );
}

export default function HeroBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -300]);

  return (
    <motion.div style={{ y }} className="backgroundCanvasWrapper">
      <Canvas className="backgroundCanvas" camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Knot />
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </motion.div>
  );
}
