'use client';

import { useEffect, useRef } from 'react';

interface CommentsProps {
  repo: string; // 예: "BlueTi/BlueTi.github.io"
  repoId?: string; // Giscus 설정에서 받은 repo-id
  category?: string; // Giscus 설정에서 받은 category
  categoryId?: string; // Giscus 설정에서 받은 category-id
  mapping?: string; // "pathname" | "url" | "title" | "og:title"
  reactionsEnabled?: boolean; // true | false
  emitMetadata?: boolean; // true | false
  inputPosition?: 'top' | 'bottom'; // 'top' | 'bottom'
  theme?: 'light' | 'dark' | 'dark_dimmed' | 'transparent_dark' | 'preferred_color_scheme';
  lang?: string; // 'ko' | 'en' 등
  loading?: 'lazy' | 'eager';
}

export default function Comments({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  reactionsEnabled = true,
  emitMetadata = false,
  inputPosition = 'bottom',
  theme = 'preferred_color_scheme',
  lang = 'ko',
  loading = 'lazy',
}: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);
  const isGiscusLoaded = useRef(false);

  useEffect(() => {
    if (isGiscusLoaded.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    if (repoId) script.setAttribute('data-repo-id', repoId);
    if (category) script.setAttribute('data-category', category);
    if (categoryId) script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-reactions-enabled', reactionsEnabled ? '1' : '0');
    script.setAttribute('data-emit-metadata', emitMetadata ? '1' : '0');
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', loading);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
      isGiscusLoaded.current = true;
    }

    return () => {
      // Cleanup: 스크립트 제거
      if (commentsRef.current && commentsRef.current.contains(script)) {
        commentsRef.current.removeChild(script);
        isGiscusLoaded.current = false;
      }
    };
  }, [
    repo,
    repoId,
    category,
    categoryId,
    mapping,
    reactionsEnabled,
    emitMetadata,
    inputPosition,
    theme,
    lang,
    loading,
  ]);

  return (
    <div className="comments-container">
      <div ref={commentsRef} className="giscus" />
      <style jsx>{`
        .comments-container {
          margin-top: 3rem;
          padding-top: 3rem;
          border-top: 1px solid var(--border-color, #e5e7eb);
        }
        .giscus {
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
}
