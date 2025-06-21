'use client';
import Tilt from 'react-parallax-tilt';
import Link from 'next/link';
import styles from '../app/blog/page.module.css';
import { PostMeta } from '@/lib/posts';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('li');
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <ul className={styles.list} ref={containerRef}>
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
