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
  // output: 'export'를 사용할 때는 파일 경로로 사용되므로 인코딩된 값을 반환해야 함
  return tags.map((tag) => ({
    category: encodeURIComponent(tag),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // params.category는 인코딩된 상태로 들어오므로 디코딩 필요
  let category: string;
  try {
    category = decodeURIComponent(params.category);
  } catch (e) {
    // 이미 디코딩된 경우 그대로 사용
    category = params.category;
  }
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

