import PostTabs from '@/components/PostTabs';
import PostCardColumn from '@/components/PostCardColumn';
import { getAllPosts, getAllTags } from '@/lib/posts';

export default function PostsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <div className="category-page-header-wrapper">
        <div className="category-page-title">All</div>
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

