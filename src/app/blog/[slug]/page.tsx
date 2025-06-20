import { notFound } from 'next/navigation';
import { getPostSlugs, getPostData } from '@/lib/posts';
import styles from './page.module.css';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Post({ params }: any) {
  try {
    const post = await getPostData(params.slug);
    return (
      <article className={styles.article}>
        <h1>{post.title}</h1>
        <p className={styles.date}>{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    );
  } catch {
    notFound();
  }
}
