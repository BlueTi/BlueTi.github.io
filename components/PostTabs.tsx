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
      const category = decodeURIComponent(pathname.split('/category/')[1]);
      setSelectedTab(category);
    } else {
      setSelectedTab('All');
    }
  }, [pathname]);

  const tabs = ['All', ...tags];

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    if (tab === 'All') {
      router.push('/posts');
    } else {
      router.push(`/category/${encodeURIComponent(tab)}`);
    }
  };

  return (
    <div className="post-tabs-wrapper">
      <div className="post-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${selectedTab === tab ? 'selected' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

