'use client';
import SEO from '@/components/SEO';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroBackground from '@/components/HeroBackground';
import ParallaxSection from '@/components/ParallaxSection';

import styles from './page.module.css';

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -150]);

  return (
    <>
      <SEO title="Home" description="Personal portfolio" />
      <motion.section
        style={{ y }}
        className={styles.hero}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <HeroBackground />
        <div className={styles.bubbles} aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* Logo removed as requested */}
        <h1 className={styles.title}>Jane Doe</h1>
        <p className={styles.description}>Welcome to my personal portfolio built with Next.js. Here you&#39;ll find my latest writings.</p>
        <div className={styles.links}>
          <a href="https://github.com">GitHub</a>
          <a href="https://twitter.com">Twitter</a>
        </div>
      </motion.section>
      <ParallaxSection className={styles.section}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <p className={styles.sectionText}>
          I am a web developer passionate about building modern interactive
          experiences. This portfolio showcases my latest work and writings.
        </p>
      </ParallaxSection>

      <ParallaxSection className={styles.section} delay={0.15}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <p className={styles.sectionText}>
          JavaScript, React, Three.js, and modern CSS techniques are some of the tools I use daily.
        </p>
      </ParallaxSection>

      <ParallaxSection className={styles.section} delay={0.1}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <p className={styles.sectionText}>
          From small experiments to large-scale applications, my projects
          explore creative uses of technology and thoughtful design.
        </p>
      </ParallaxSection>

      <ParallaxSection className={styles.section} delay={0.2}>
        <h2 className={styles.sectionTitle}>Get in Touch</h2>
        <p className={styles.sectionText}>
          Feel free to reach out if you&#39;d like to collaborate or just say hello.
        </p>
      </ParallaxSection>
      <ParallaxSection className={styles.section} delay={0.25}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <p className={styles.sectionText}>
          I&apos;ve worked on numerous freelance projects ranging from simple landing pages to full-stack applications. My focus is always on clean code and intuitive interfaces.
        </p>
      </ParallaxSection>

      <ParallaxSection className={styles.section} delay={0.3}>
        <h2 className={styles.sectionTitle}>Testimonials</h2>
        <p className={styles.sectionText}>
          &quot;Working with Jane was a pleasure. Her attention to detail and creative approach brought our project to life.&quot; – Happy Client
        </p>
      </ParallaxSection>
    </>
  );
}
