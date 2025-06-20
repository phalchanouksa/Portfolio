'use client';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Cursor from './Cursor';

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
    <div className="min-h-screen flex flex-col font-body bg-white text-gray-800 hide-cursor">
      <Cursor />
      <motion.header
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50"
        animate={{ y: showNav ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
      >
        <nav className="max-w-4xl mx-auto flex gap-6 p-4 font-semibold">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </motion.header>
      <main className="flex-1 pt-20 px-4">{children}</main>
      <footer className="text-center py-6 text-sm bg-gray-100">
        &copy; {new Date().getFullYear()} My Portfolio
      </footer>
    </div>
  );
}
