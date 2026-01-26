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

### 환경 변수 설정

#### 댓글 기능 (Giscus) 설정

1. **GitHub Discussions 활성화**
   - 리포지토리 Settings → General → Features → Discussions 활성화

2. **Giscus 앱 설치**
   - [Giscus 공식 사이트](https://giscus.app/)에서 GitHub 앱 설치
   - 리포지토리 선택 후 Install

3. **Giscus 설정 값 확인**
   - Giscus 사이트에서 설정 완료 후 다음 값 복사:
     - `data-repo-id`: `R_xxxxxxxxxxxxx`
     - `data-category-id`: `DIC_kwxxxxxxxxxxxxx`

4. **GitHub Secrets 설정**
   - Settings → Secrets and variables → Actions
   - 다음 Secrets 추가:
     - `NEXT_PUBLIC_GISCUS_REPO`: `BlueTi/BlueTi.github.io` (또는 본인 리포지토리)
     - `NEXT_PUBLIC_GISCUS_REPO_ID`: Giscus에서 받은 repo-id
     - `NEXT_PUBLIC_GISCUS_CATEGORY_ID`: Giscus에서 받은 category-id
     - (선택) `NEXT_PUBLIC_GISCUS_CATEGORY`: `Announcements`
     - (선택) `NEXT_PUBLIC_GISCUS_MAPPING`: `pathname`
     - (선택) `NEXT_PUBLIC_GISCUS_THEME`: `preferred_color_scheme`
     - (선택) `NEXT_PUBLIC_GISCUS_LANG`: `ko`

자세한 설정 방법은 `docs/comments-setup.md`를 참고하세요.

#### Google Analytics 설정

1. **로컬 개발 환경**
   - 프로젝트 루트에 `.env.local` 파일을 생성하세요
   - 다음 내용을 추가하세요:
     ```
     NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
     ```
   - `G-XXXXXXXXXX`는 Google Analytics에서 발급받은 측정 ID입니다

2. **GitHub Actions 배포 환경**
   - GitHub 리포지토리에서 Settings → Secrets and variables → Actions로 이동
   - New repository secret을 클릭
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: Google Analytics 측정 ID (예: `G-XXXXXXXXXX`)
   - `.github/workflows/deploy.yml`에서 환경 변수를 사용하도록 설정되어 있습니다

## 기술 스택

- Next.js 14 (App Router)
- MDX
- TypeScript
- CSS Modules

