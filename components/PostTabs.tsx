'use client';

import { useRouter } from 'next/navigation';

interface PostTabsProps {
  tags?: string[];
  selectedCategory?: string;
}

export default function PostTabs({ tags = [], selectedCategory }: PostTabsProps) {
  const router = useRouter();
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
