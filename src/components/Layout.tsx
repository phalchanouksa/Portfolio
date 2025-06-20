'use client';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const curr = window.scrollY;
      setShowNav(curr < last || curr < 10);
      last = curr;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.container}>
      <motion.header
        className={styles.header}
        animate={{ y: showNav ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
      >
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </motion.header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} My Portfolio
      </footer>
    </div>
  );
}
