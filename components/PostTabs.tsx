'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface PostTabsProps {
  tags?: string[];
  selectedCategory?: string;
}

function PostTabsContent({ tags = [], selectedCategory }: PostTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTab = selectedCategory || 'All';

  const tabs = ['All', ...tags];

  const handleTabClick = (tab: string) => {
    if (tab === 'All') {
      router.push('/posts/');
    } else {
      router.push(`/posts/?category=${encodeURIComponent(tab)}`);
    }
  };

  return (
    <aside className="category-sidebar">
      <div className="category-sidebar-title">카테고리</div>
      <nav className="category-sidebar-nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`category-sidebar-item ${selectedTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default function PostTabs(props: PostTabsProps) {
  return (
    <Suspense fallback={
      <aside className="category-sidebar">
        <div className="category-sidebar-title">카테고리</div>
        <nav className="category-sidebar-nav">
          <div>로딩 중...</div>
        </nav>
      </aside>
    }>
      <PostTabsContent {...props} />
    </Suspense>
  );
}
