import Link from 'next/link';
import { getSortedPostsMeta } from '@/lib/posts';

export const metadata = {
  title: 'Blog',
};

export default async function Blog() {
  const posts = await getSortedPostsMeta();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-display">Blog</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="hover:text-accent">
              {post.title}
            </Link>
            <span className="ml-2 text-sm text-gray-500">{post.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
