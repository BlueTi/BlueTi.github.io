'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import PostTabs from '@/components/PostTabs';
import PostCardColumn from '@/components/PostCardColumn';
import { Post } from '@/lib/posts';

interface PostsPageClientProps {
  allPosts: Post[];
  tags: string[];
}

function PostsPageContent({ allPosts, tags }: PostsPageClientProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || undefined;
  
  // 카테고리가 있으면 필터링, 없으면 전체 포스트
  const posts = category
    ? allPosts.filter(
        (post) =>
          post.categories?.includes(category) || post.tags?.includes(category)
      )
    : allPosts;
  const displayTitle = category || 'All';

  return (
    <>
      <div className="category-page-header-wrapper">
        <div className="category-page-title">{displayTitle}</div>
        <div className="category-page-subtitle">{posts.length} posts</div>
      </div>
      <div className="content-with-sidebar">
        <PostTabs tags={tags} selectedCategory={category} />
        <div className="main-content">
          <PostCardColumn posts={posts} />
        </div>
      </div>
    </>
  );
}

export default function PostsPageClient(props: PostsPageClientProps) {
  return (
    <Suspense fallback={
      <div className="category-page-header-wrapper">
        <div className="category-page-title">로딩 중...</div>
      </div>
    }>
      <PostsPageContent {...props} />
    </Suspense>
  );
}
