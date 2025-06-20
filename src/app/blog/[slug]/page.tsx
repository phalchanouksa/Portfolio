// @ts-nocheck
import { notFound } from 'next/navigation';
import { getPostSlugs, getPostData } from '@/lib/posts';

export const dynamic = 'force-static';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Post({ params }: any) {
  try {
    const post = await getPostData(params.slug);
    return (
      <article className="prose prose-slate dark:prose-invert mx-auto">
        <h1>{post.title}</h1>
        <p className="text-sm text-gray-500">{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    );
  } catch {
    notFound();
  }
}
