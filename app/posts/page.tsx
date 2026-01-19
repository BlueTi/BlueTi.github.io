import PostTabs from '@/components/PostTabs';
import PostCardColumn from '@/components/PostCardColumn';
import PostsPageClient from '@/components/PostsPageClient';
import { getAllPosts, getAllTags } from '@/lib/posts';

export default function PostsPage() {
  const allPosts = getAllPosts();
  const tags = getAllTags();

  return <PostsPageClient allPosts={allPosts} tags={tags} />;
}

