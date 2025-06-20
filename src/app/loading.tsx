'use client';
import { motion } from 'framer-motion';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <motion.div className={styles.overlay} initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <motion.span className={styles.text} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        Loading...
      </motion.span>
    </motion.div>
  );
}
