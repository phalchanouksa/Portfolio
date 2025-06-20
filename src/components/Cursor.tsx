'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
      className="pointer-events-none fixed top-0 left-0 z-50 w-6 h-6 border-2 border-gray-800 rounded-full"
      animate={{ x: pos.x - 12, y: pos.y - 12 }}
      transition={{ type: 'spring', mass: 0.5 }}
    />
  );
}
