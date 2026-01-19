import { redirect } from 'next/navigation';
import { getAllTags } from '@/lib/posts';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  // 기존 URL을 위한 리다이렉트를 위해 모든 카테고리 생성
  return tags.map((tag) => ({
    category: encodeURIComponent(tag),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // 기존 /category/[category] URL을 쿼리 파라미터 방식으로 리다이렉트
  let category: string;
  try {
    category = decodeURIComponent(params.category);
  } catch (e) {
    category = params.category;
  }
  
  redirect(`/posts/?category=${encodeURIComponent(category)}`);
}

