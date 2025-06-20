import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostSlugs() {
  const files = await fs.readdir(postsDirectory);
  return files.filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''));
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    contentHtml,
  };
}

export async function getSortedPostsMeta(): Promise<PostMeta[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map(async slug => {
    const data = await getPostData(slug);
    return { slug, title: data.title, date: data.date };
  }));
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
