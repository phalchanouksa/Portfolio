import { notFound } from 'next/navigation';
import SEO from '@/components/SEO';
import { getPostSlugs, getPostData } from '@/lib/posts';

export const dynamic = 'force-static';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await getPostData(slug);
    return (
      <>
        <SEO title={post.title} description={post.title} />
        <article className="prose mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-500 text-sm mb-8">{post.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
      </>
    );
  } catch {
    notFound();
  }
}
