import Link from 'next/link';
import { Post } from '@/lib/posts';

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="post-header">
      {post.emoji && <div className="emoji">{post.emoji}</div>}
      {((post.tags && post.tags.length > 0) || (post.categories && post.categories.length > 0)) && (
        <div className="categories">
          {(post.tags || post.categories || []).map((tag) => (
            <Link
              key={tag}
              href={`/category/${encodeURIComponent(tag)}/`}
              className="category"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
      <h1 className="title">{post.title}</h1>
      <div className="info">
        <div className="author">
          posted by <strong>Jard</strong>,
        </div>{' '}
        {new Date(post.date).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </header>
  );
}

