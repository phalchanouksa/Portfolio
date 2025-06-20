'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div
      className={styles.cursor}
      animate={{ x: pos.x - 12, y: pos.y - 12 }}
      transition={{ type: 'spring', mass: 0.5 }}
    />
  );
}
