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
  // output: export를 사용할 때는 인코딩된 값을 반환해야 함
  return tags.map((tag) => ({
    category: encodeURIComponent(tag),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // params.category는 이미 URL 인코딩된 상태로 들어옴
  let decodedCategory: string;
  try {
    decodedCategory = decodeURIComponent(params.category);
  } catch (e) {
    // 이미 디코딩된 경우 그대로 사용
    decodedCategory = params.category;
  }
  const posts = getPostsByCategory(decodedCategory);
  const tags = getAllTags();

  if (posts.length === 0 && decodedCategory !== 'All') {
    notFound();
  }

  return (
    <>
      <div className="category-page-header-wrapper">
        <div className="category-page-title">{decodedCategory}</div>
        <div className="category-page-subtitle">{posts.length} posts</div>
      </div>
      <PostTabs tags={tags} />
      <PostCardColumn posts={posts} />
    </>
  );
}

