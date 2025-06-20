import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <section className={styles.container}>
      <Image src="/vercel.svg" alt="Profile" width={150} height={150} className={styles.avatar} />
      <h1>Hi, I'm Jane Doe</h1>
      <p>Welcome to my personal portfolio built with Next.js. Here you'll find my latest writings.</p>
      <div className={styles.links}>
        <a href="https://github.com">GitHub</a>
        <a href="https://twitter.com">Twitter</a>
      </div>
    </section>
  );
}
