'use client';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center bg-white" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <motion.span className="text-2xl font-bold" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        Loading...
      </motion.span>
    </motion.div>
  );
}
