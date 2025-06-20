'use client';
import SEO from '@/components/SEO';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <>
      <SEO title="Home" description="Personal portfolio" />
      <motion.section style={{ y }} className="min-h-screen flex flex-col items-center justify-center space-y-6 text-center px-4">
        <Image src="/vercel.svg" alt="Profile" width={200} height={200} className="rounded-full" />
        <h1 className="text-4xl md:text-6xl font-bold">Jane Doe</h1>
        <p className="max-w-xl text-lg text-gray-600">Welcome to my personal portfolio built with Next.js. Here you&#39;ll find my latest writings.</p>
        <div className="flex gap-4 font-semibold">
          <a href="https://github.com" className="underline">GitHub</a>
          <a href="https://twitter.com" className="underline">Twitter</a>
        </div>
      </motion.section>
    </>
  );
}
