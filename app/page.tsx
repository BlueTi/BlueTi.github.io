import Bio from '@/components/Bio';
import PostTabs from '@/components/PostTabs';
import PostCardColumn from '@/components/PostCardColumn';
import { getAllPosts, getAllTags } from '@/lib/posts';

export default async function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <Bio />
      <PostTabs tags={tags} />
      <PostCardColumn posts={posts} />
    </>
  );
}

