import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  categories?: string[];
  tags?: string[];
  emoji?: string;
  content: string;
}

// style 속성을 className으로 변환하는 헬퍼 함수 (더 안전한 방법)
function convertStyleAttributes(content: string): string {
  // <div style="text-align:center"> 형태를 <div className="text-center">로 변환
  // 또는 style 속성을 제거하고 className으로 대체
  return content.replace(
    /<(\w+)([^>]*)\s+style="([^"]*)"([^>]*)>/g,
    (match, tag: string, before: string, styleString: string, after: string) => {
      // text-align:center 같은 간단한 스타일만 처리
      if (styleString.includes('text-align:center')) {
        return `<${tag}${before} className="text-center"${after}>`;
      }
      // 그 외의 경우 style 속성 제거
      return `<${tag}${before}${after}>`;
    }
  );
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content: rawContent } = matter(fileContents);
      // style 속성을 변환
      const content = convertStyleAttributes(rawContent);

      // categories가 문자열인 경우 배열로 변환 (공백으로 구분)
      let categories = data.categories || [];
      if (typeof categories === 'string') {
        // 공백으로 구분된 문자열을 배열로 변환
        categories = categories
          .split(/\s+/)
          .map((cat) => cat.trim())
          .filter((cat) => cat.length > 0);
      } else if (!Array.isArray(categories)) {
        categories = [];
      }

      // tags가 문자열인 경우 배열로 변환 (공백으로 구분)
      let tags = data.tags || [];
      if (typeof tags === 'string') {
        // 공백으로 구분된 문자열을 배열로 변환
        tags = tags
          .split(/\s+/)
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);
      } else if (!Array.isArray(tags)) {
        tags = [];
      }

      // tags가 없고 categories가 있으면 tags에 categories 추가
      if (tags.length === 0 && categories.length > 0) {
        tags = [...categories];
      }

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        categories,
        tags,
        emoji: data.emoji || '',
        content,
      };
    })
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });

  return allPostsData;
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const mdPath = path.join(postsDirectory, `${slug}.md`);

    let fullPath: string | null = null;
    if (fs.existsSync(mdxPath)) {
      fullPath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
      fullPath = mdPath;
    } else {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content: rawContent } = matter(fileContents);
    // style 속성을 변환
    const content = convertStyleAttributes(rawContent);
    
    // categories가 문자열인 경우 배열로 변환 (공백으로 구분)
    let categories = data.categories || [];
    if (typeof categories === 'string') {
      // 공백으로 구분된 문자열을 배열로 변환
      categories = categories
        .split(/\s+/)
        .map((cat) => cat.trim())
        .filter((cat) => cat.length > 0);
    } else if (!Array.isArray(categories)) {
      categories = [];
    }

    // tags가 문자열인 경우 배열로 변환 (공백으로 구분)
    let tags = data.tags || [];
    if (typeof tags === 'string') {
      // 공백으로 구분된 문자열을 배열로 변환
      tags = tags
        .split(/\s+/)
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    } else if (!Array.isArray(tags)) {
      tags = [];
    }

    // tags가 없고 categories가 있으면 tags에 categories 추가
    if (tags.length === 0 && categories.length > 0) {
      tags = [...categories];
    }

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      categories,
      tags,
      emoji: data.emoji || '',
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(
    (post) =>
      post.categories?.includes(category) || post.tags?.includes(category)
  );
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tagSet = new Set<string>();
  
  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
    post.categories?.forEach((category) => tagSet.add(category));
  });
  
  return Array.from(tagSet).sort();
}

