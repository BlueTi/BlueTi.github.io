'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchModal from './SearchModal';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) 또는 Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // ESC 키로 닫기
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  return (
    <>
      <header className="page-header-wrapper">
        <div className="page-header">
          <div className="front-section">
            <Link href="/" className="link">
              blueti.github.io
            </Link>
          </div>
          <div className="trailing-section">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="search-button"
              aria-label="검색"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <Link
              href="/posts"
              className={`link ${pathname === '/posts' ? 'active' : ''}`}
            >
              posts
            </Link>
          </div>
        </div>
      </header>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <style jsx>{`
        .search-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          background: none;
          border: none;
          color: var(--primary-text-color);
          cursor: pointer;
          border-radius: 6px;
          transition: background-color 0.2s ease;
          margin-right: 0.75rem;
        }
        .search-button:hover {
          background-color: var(--surface-color);
        }
        .search-button svg {
          width: 20px;
          height: 20px;
        }
        @media (max-width: 768px) {
          .search-button {
            margin-right: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}

