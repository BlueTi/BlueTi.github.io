import PostTabs from '@/components/PostTabs';
import PostCardColumn from '@/components/PostCardColumn';
import { getPostsByCategory, getAllTags } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
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

