import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (!query.trim()) {
    return NextResponse.json({ posts: [] });
  }

  const allPosts = getAllPosts();
  const searchTerm = query.toLowerCase();

  const results = allPosts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = post.description?.toLowerCase().includes(searchTerm);
    const contentMatch = post.content.toLowerCase().includes(searchTerm);
    const tagMatch = post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm));
    const categoryMatch = post.categories?.some((cat) =>
      cat.toLowerCase().includes(searchTerm)
    );

    return titleMatch || descriptionMatch || contentMatch || tagMatch || categoryMatch;
  });

  return NextResponse.json({ posts: results });
}

