import SEO from '@/components/SEO';
import { getSortedPostsMeta } from '@/lib/posts';
import BlogList from '@/components/BlogList';
import styles from './page.module.css';

export const metadata = { title: 'Blog' };

export default async function Blog() {
  const posts = await getSortedPostsMeta();
  return (
    <>
      <SEO title="Blog" description="Blog posts" />
      <div className={styles.container}>
        <h1 className={styles.title}>Blog</h1>
        <BlogList posts={posts} />
      </div>
    </>
  );
}
