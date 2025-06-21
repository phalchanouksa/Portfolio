'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Layout.module.css';
import CommandMenu from './CommandMenu';
import Cursor from './Cursor';

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
            <Image
              src="/developer.svg"
              alt="Developer"
              width={40}
              height={40}
              className={styles.logoImage}
            />
          </Link>
          <nav className={styles.nav}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/">Home</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/blog">Blog</Link>
            </motion.div>
          </nav>
        </div>
      </motion.header>
      <AnimatePresence mode="wait">
        <motion.main key={typeof window !== 'undefined' ? location.pathname : ''} className={styles.main} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {children}
        </motion.main>
      </AnimatePresence>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} My Portfolio
      </footer>
      <CommandMenu />
      <Cursor />
    </div>
  );
}
