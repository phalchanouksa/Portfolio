'use client';
import SEO from '@/components/SEO';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
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
        <Tilt
          className={styles.profileTilt}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareEnable
          glareMaxOpacity={0.2}
          glareBorderRadius="9999px"
          scale={1.05}
        >
          <Image
            src="/vercel.svg"
            alt="Profile"
            width={200}
            height={200}
            className={styles.profile}
          />
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
