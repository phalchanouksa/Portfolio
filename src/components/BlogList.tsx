'use client';
import Tilt from 'react-parallax-tilt';
import Link from 'next/link';
import styles from '../app/blog/page.module.css';
import { PostMeta } from '@/lib/posts';

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Tilt
            className={styles.item}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareEnable
            glareMaxOpacity={0.1}
            scale={1.02}
          >
            <Link href={`/blog/${post.slug}`} className={styles.link}>
              {post.title}
            </Link>
            <span className={styles.date}>{post.date}</span>
          </Tilt>
        </li>
      ))}
    </ul>
  );
}
