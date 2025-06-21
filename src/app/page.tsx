'use client';
import SEO from '@/components/SEO';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Environment } from '@react-three/drei';
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
              <Text3D font="/helvetiker_regular.typeface.json" size={1} height={0.3} bevelEnabled bevelSize={0.02} bevelThickness={0.02}>
                Ouksa
                <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
              </Text3D>
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
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.sectionTitle}>About Me</h2>
        <p className={styles.sectionText}>
          I am a web developer passionate about building modern interactive
          experiences. This portfolio showcases my latest work and writings.
        </p>
      </motion.section>

      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className={styles.sectionTitle}>Projects</h2>
        <p className={styles.sectionText}>
          From small experiments to large-scale applications, my projects
          explore creative uses of technology and thoughtful design.
        </p>
      </motion.section>

      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className={styles.sectionTitle}>Get in Touch</h2>
        <p className={styles.sectionText}>
          Feel free to reach out if you&#39;d like to collaborate or just say hello.
        </p>
      </motion.section>
    </>
  );
}
