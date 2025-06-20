import Link from 'next/link';
import SEO from '@/components/SEO';
import { getSortedPostsMeta } from '@/lib/posts';

export const metadata = { title: 'Blog' };

export default async function Blog() {
  const posts = await getSortedPostsMeta();
  return (
    <>
      <SEO title="Blog" description="Blog posts" />
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold my-8">Blog</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="flex justify-between">
              <Link href={`/blog/${post.slug}`} className="text-blue-600 underline font-medium">
                {post.title}
              </Link>
              <span className="text-gray-500 text-sm">{post.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
