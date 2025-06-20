import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
// Import global styles from the same directory so Tailwind CSS classes are included
import './globals.css';
import Layout from '@/components/Layout';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Personal portfolio built with Next.js',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
