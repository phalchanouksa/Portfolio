'use client';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Layout.module.css';
import CommandMenu from './CommandMenu';
import Cursor from './Cursor';

export default function Layout({ children }: { children: ReactNode }) {
  const [showNav, setShowNav] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored as 'light' | 'dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        animate={{ y: showNav ? 0 : '-100%' }}
        initial={{ y: -60 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.navContainer}>
          <Link href="/" className={`${styles.logo} ${styles.logoText}`}>Ouksa</Link>
          <div className={styles.menu}>
            <nav className={styles.nav}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="/">Home</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="/blog">Blog</Link>
              </motion.div>
            </nav>
            <button
              className={styles.themeToggle}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
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
