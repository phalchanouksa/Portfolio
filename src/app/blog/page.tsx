import Link from 'next/link';
import { getSortedPostsMeta } from '@/lib/posts';
import styles from './page.module.css';

export const metadata = { title: 'Blog' };

export default async function Blog() {
  const posts = await getSortedPostsMeta();
  return (
    <div>
      <h1>Blog</h1>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.item}>
            <Link href={`/blog/${post.slug}`} className={styles.title}>
              {post.title}
            </Link>
            <span className={styles.date}>{post.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
