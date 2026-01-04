# BlueTi Blog

Next.js + MDX로 만든 기술 블로그입니다.

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 프로젝트 구조

```
.
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   ├── about/             # About 페이지
│   └── posts/             # 포스트 관련 페이지
├── components/            # React 컴포넌트
├── content/               # MDX 포스트 파일
│   └── posts/
├── lib/                   # 유틸리티 함수
│   └── posts.ts          # 포스트 관련 함수
└── public/                # 정적 파일
```

## 포스트 작성

`content/posts/` 디렉토리에 `.mdx` 또는 `.md` 파일을 생성하세요.

포스트의 frontmatter 예시:

```mdx
---
title: 포스트 제목
date: 2024-01-01
description: 포스트 설명
categories:
  - 알고리즘
emoji: 🧢
---

포스트 내용...
```

## GitHub Pages 배포

이 블로그는 GitHub Pages에 자동으로 배포됩니다.

### 배포 방법

1. **GitHub 리포지토리 설정**
   - GitHub 리포지토리에서 Settings → Pages로 이동
   - Source를 "GitHub Actions"로 설정

2. **자동 배포**
   - `main` 브랜치에 푸시하면 자동으로 빌드 및 배포됩니다
   - GitHub Actions 워크플로우가 자동으로 실행됩니다

3. **수동 배포 (로컬에서)**
   ```bash
   npm run build
   # out 디렉토리가 생성됩니다
   # 이 디렉토리를 gh-pages 브랜치에 푸시하거나
   # GitHub Actions를 사용하는 것을 권장합니다
   ```

### 배포 확인

배포가 완료되면 `https://blueti.github.io`에서 블로그를 확인할 수 있습니다.

## 기술 스택

- Next.js 14 (App Router)
- MDX
- TypeScript
- CSS Modules

