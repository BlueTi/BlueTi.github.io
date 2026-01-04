'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/lib/posts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.posts || []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchPosts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = (slug: string) => {
    router.push(`/posts/${encodeURIComponent(slug)}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="search-modal-overlay" onClick={onClose} />
      <div className="search-modal">
        <div className="search-modal-header">
          <input
            ref={inputRef}
            type="text"
            placeholder="포스트 검색... (⌘K 또는 Ctrl+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          <button onClick={onClose} className="search-close-button" aria-label="닫기">
            ✕
          </button>
        </div>
        <div className="search-results">
          {isLoading && (
            <div className="search-loading">검색 중...</div>
          )}
          {!isLoading && query.trim() && results.length === 0 && (
            <div className="search-no-results">검색 결과가 없습니다.</div>
          )}
          {!isLoading && results.length > 0 && (
            <div className="search-results-list">
              {results.map((post) => (
                <div
                  key={post.slug}
                  className="search-result-item"
                  onClick={() => handleResultClick(post.slug)}
                >
                  <div className="search-result-title">{post.title}</div>
                  {post.description && (
                    <div className="search-result-description">{post.description}</div>
                  )}
                  <div className="search-result-meta">
                    <span className="search-result-date">
                      {new Date(post.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    {(post.tags || post.categories || []).length > 0 && (
                      <div className="search-result-tags">
                        {(post.tags || post.categories || []).map((tag) => (
                          <span key={tag} className="search-result-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .search-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          backdrop-filter: blur(4px);
        }
        .search-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          background-color: var(--background-color);
          border-radius: 12px;
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .search-modal-header {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .search-input {
          flex: 1;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(--surface-color);
          color: var(--primary-text-color);
          outline: none;
        }
        .search-input:focus {
          border-color: var(--accent-color);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .search-close-button {
          margin-left: 0.75rem;
          padding: 0.5rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--secondary-text-color);
          cursor: pointer;
          line-height: 1;
        }
        .search-close-button:hover {
          color: var(--primary-text-color);
        }
        .search-results {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
        }
        .search-loading,
        .search-no-results {
          padding: 2rem;
          text-align: center;
          color: var(--secondary-text-color);
        }
        .search-results-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .search-result-item {
          padding: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          border: 1px solid transparent;
        }
        .search-result-item:hover {
          background-color: var(--surface-color);
          border-color: var(--border-color);
        }
        .search-result-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--primary-text-color);
          margin-bottom: 0.5rem;
        }
        .search-result-description {
          font-size: 0.875rem;
          color: var(--secondary-text-color);
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }
        .search-result-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: var(--secondary-text-color);
        }
        .search-result-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .search-result-tag {
          padding: 0.25rem 0.5rem;
          background-color: var(--tag-bg);
          color: var(--tag-text);
          border-radius: 4px;
          font-size: 0.75rem;
        }
      `}</style>
    </>
  );
}

