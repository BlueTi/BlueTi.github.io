import Link from 'next/link';
import { Post } from '@/lib/posts';

interface PostCardColumnProps {
  posts: Post[];
}

// 날짜 포맷팅을 일관되게 처리하는 함수
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  
  return `${year}년 ${monthNames[month - 1]} ${day}일`;
}

export default function PostCardColumn({ posts }: PostCardColumnProps) {
  return (
    <div className="post-card-column-wrapper">
      <div className="post-card-column">
        {posts.map((post) => (
          <div key={post.slug} className="post-card-wrapper">
            <div className="post-card">
              <Link href={`/posts/${encodeURIComponent(post.slug)}`} className="post-card-link">
                <div className="title">{post.title}</div>
                {post.description && (
                  <p className="description">{post.description}</p>
                )}
              </Link>
              <div className="info">
                <div className="date">
                  {formatDate(post.date)}
                </div>
                <div className="categories">
                  {(post.tags || post.categories || []).slice(0, 3).map((tag) => (
                    <Link
                      key={tag}
                      href={`/category/${encodeURIComponent(tag)}`}
                      className="category"
                    >
                      {tag}
                    </Link>
                  ))}
                  {(post.tags || post.categories || []).length > 3 && (
                    <span className="category-more">
                      +{(post.tags || post.categories || []).length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

