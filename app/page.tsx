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
      <div className="content-with-sidebar">
        <PostTabs tags={tags} />
        <div className="main-content">
          <PostCardColumn posts={posts} />
        </div>
      </div>
    </>
  );
}

