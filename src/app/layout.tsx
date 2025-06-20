import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';
import '../app/globals.css';
import Layout from '@/components/Layout';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Personal portfolio built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={merriweather.variable}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
