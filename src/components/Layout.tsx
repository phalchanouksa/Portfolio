import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-black text-white border-b-4 border-accent py-4">
        <nav className="container mx-auto flex gap-6 px-4 font-semibold">
          <Link href="/" className="hover:text-accent">Home</Link>
          <Link href="/blog" className="hover:text-accent">Blog</Link>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8 flex-1">{children}</main>
      <footer className="bg-gray-900 text-gray-400 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} My Portfolio
      </footer>
    </div>
  );
}
