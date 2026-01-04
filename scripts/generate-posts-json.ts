import fs from 'fs';
import path from 'path';
import { getAllPosts } from '../lib/posts';

// 포스트 메타데이터만 추출 (content 제외)
const allPosts = getAllPosts().map((post) => ({
  slug: post.slug,
  title: post.title,
  date: post.date,
  description: post.description,
  categories: post.categories,
  tags: post.tags,
  emoji: post.emoji,
}));

// public 디렉토리에 JSON 파일 생성
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'posts.json');
fs.writeFileSync(outputPath, JSON.stringify(allPosts, null, 2));

console.log(`Generated ${allPosts.length} posts metadata to ${outputPath}`);

