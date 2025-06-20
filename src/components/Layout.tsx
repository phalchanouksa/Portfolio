import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-gray-800 text-white py-4">
        <nav className="container mx-auto flex gap-4 px-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8 flex-1">{children}</main>
      <footer className="bg-gray-100 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} My Portfolio
      </footer>
    </div>
  );
}
