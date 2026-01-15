import PostTabs from '@/components/PostTabs';
import PostCardColumn from '@/components/PostCardColumn';
import { getPostsByCategory, getAllTags } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  // Next.js가 자동으로 URL 인코딩을 처리하므로 원본 값을 반환
  // trailingSlash: true 설정으로 인해 자동으로 /index.html이 생성됨
  return tags.map((tag) => ({
    category: tag,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // params.category는 Next.js가 자동으로 디코딩함
  const category = params.category;
  const posts = getPostsByCategory(category);
  const tags = getAllTags();

  if (posts.length === 0 && category !== 'All') {
    notFound();
  }

  return (
    <>
      <div className="category-page-header-wrapper">
        <div className="category-page-title">{category}</div>
        <div className="category-page-subtitle">{posts.length} posts</div>
      </div>
      <div className="content-with-sidebar">
        <PostTabs tags={tags} />
        <div className="main-content">
          <PostCardColumn posts={posts} />
        </div>
      </div>
    </>
  );
}

