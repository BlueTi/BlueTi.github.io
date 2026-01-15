'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface PostTabsProps {
  tags?: string[];
}

export default function PostTabs({ tags = [] }: PostTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState('All');

  useEffect(() => {
    // 현재 경로에서 선택된 탭 설정
    if (pathname.startsWith('/category/')) {
      // trailing slash 제거 후 디코딩
      const categoryPath = pathname.split('/category/')[1].replace(/\/$/, '');
      const category = decodeURIComponent(categoryPath);
      setSelectedTab(category);
    } else {
      setSelectedTab('All');
    }
  }, [pathname]);

  const tabs = ['All', ...tags];

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    if (tab === 'All') {
      router.push('/posts/');
    } else {
      router.push(`/category/${encodeURIComponent(tab)}/`);
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

