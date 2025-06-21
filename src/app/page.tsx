'use client';
import SEO from '@/components/SEO';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Tilt from 'react-parallax-tilt';
import styles from './page.module.css';

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <>
      <SEO title="Home" description="Personal portfolio" />
      <motion.section
        style={{ y }}
        className={styles.hero}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.bubbles} aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareMaxOpacity={0.2} className={styles.canvasWrap}>
          <Canvas style={{ height: 200, width: 200 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[0, 0, 2]} />
              <OrbitControls enableZoom={false} />
              <TorusKnot args={[1, 0.3, 128, 32]} rotation={[0.2, 0.4, 0]}>
                <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
              </TorusKnot>
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </Tilt>
        <h1 className={styles.title}>Jane Doe</h1>
        <p className={styles.description}>Welcome to my personal portfolio built with Next.js. Here you&#39;ll find my latest writings.</p>
        <div className={styles.links}>
          <a href="https://github.com">GitHub</a>
          <a href="https://twitter.com">Twitter</a>
        </div>
      </motion.section>
    </>
  );
}
