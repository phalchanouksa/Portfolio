import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './Layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} My Portfolio
      </footer>
    </div>
  );
}
