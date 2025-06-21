'use client';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  const [showNav, setShowNav] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const curr = window.scrollY;
      setShowNav(curr < last || curr < 10);
      setScrolled(curr > 50);
      last = curr;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.container}>
      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        animate={{ y: showNav ? 0 : '-100%' }}
        initial={{ y: -60 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            Jane
          </Link>
          <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </div>
      </motion.header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} My Portfolio
      </footer>
    </div>
  );
}
