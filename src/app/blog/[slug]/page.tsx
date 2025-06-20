import { notFound } from 'next/navigation';
import SEO from '@/components/SEO';
import { getPostSlugs, getPostData } from '@/lib/posts';
import styles from './page.module.css';

interface PageProps<T> {
  params: Promise<T>
}

export const dynamic = 'force-static';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Post({ params }: PageProps<{ slug: string }>) {
  try {
    const { slug } = await params;
    const post = await getPostData(slug);
    return (
      <>
        <SEO title={post.title} description={post.title} />
        <article className={styles.article}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.meta}>{post.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
      </>
    );
  } catch {
    notFound();
  }
}
