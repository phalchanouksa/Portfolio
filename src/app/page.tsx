'use client';
import SEO from '@/components/SEO';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './page.module.css';

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <>
      <SEO title="Home" description="Personal portfolio" />
      <motion.section style={{ y }} className={styles.hero}>
        <Image src="/vercel.svg" alt="Profile" width={200} height={200} className={styles.profile} />
        <h1 className={styles.title}>Jane Doe</h1>
        <p className={styles.description}>Welcome to my personal portfolio built with Next.js. Here you&#39;ll find my latest writings.</p>
        <div className={styles.links}>
          <a href="https://github.com" className={styles.underline}>GitHub</a>
          <a href="https://twitter.com" className={styles.underline}>Twitter</a>
        </div>
      </motion.section>
    </>
  );
}
