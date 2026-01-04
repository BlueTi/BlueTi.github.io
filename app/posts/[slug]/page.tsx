import React from 'react';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PostHeader from '@/components/PostHeader';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// style 문자열을 객체로 변환하는 헬퍼 함수
function parseStyle(styleString: string | undefined): React.CSSProperties | undefined {
  if (!styleString || typeof styleString !== 'string') return undefined;
  
  const styles: Record<string, string> = {};
  styleString.split(';').forEach((rule) => {
    const [property, value] = rule.split(':').map((s) => s.trim());
    if (property && value) {
      const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      styles[camelProperty] = value;
    }
  });
  return styles as React.CSSProperties;
}

// 모든 HTML 요소에 대해 style 속성을 처리하는 범용 컴포넌트 생성 함수
function createStyledComponent(Tag: keyof JSX.IntrinsicElements) {
  return (props: any) => {
    const { style, ...restProps } = props;
    // style이 문자열인 경우 객체로 변환 (rehype 플러그인이 처리하지 못한 경우 대비)
    let parsedStyle: React.CSSProperties | undefined = undefined;
    if (style) {
      if (typeof style === 'string') {
        parsedStyle = parseStyle(style);
      } else if (typeof style === 'object' && !Array.isArray(style)) {
        parsedStyle = style as React.CSSProperties;
      }
    }
    return React.createElement(Tag, { style: parsedStyle, ...restProps });
  };
}

// br 태그를 처리하는 컴포넌트
const Br = () => React.createElement('br');

const components: any = {
  div: createStyledComponent('div'),
  p: createStyledComponent('p'),
  span: createStyledComponent('span'),
  a: createStyledComponent('a'),
  h1: createStyledComponent('h1'),
  h2: createStyledComponent('h2'),
  h3: createStyledComponent('h3'),
  h4: createStyledComponent('h4'),
  h5: createStyledComponent('h5'),
  h6: createStyledComponent('h6'),
  section: createStyledComponent('section'),
  article: createStyledComponent('article'),
  header: createStyledComponent('header'),
  footer: createStyledComponent('footer'),
  nav: createStyledComponent('nav'),
  aside: createStyledComponent('aside'),
  main: createStyledComponent('main'),
  ul: createStyledComponent('ul'),
  ol: createStyledComponent('ol'),
  li: createStyledComponent('li'),
  table: createStyledComponent('table'),
  tbody: createStyledComponent('tbody'),
  thead: createStyledComponent('thead'),
  tfoot: createStyledComponent('tfoot'),
  tr: createStyledComponent('tr'),
  td: createStyledComponent('td'),
  th: createStyledComponent('th'),
  img: createStyledComponent('img'),
  blockquote: createStyledComponent('blockquote'),
  br: Br,
  // 모든 알 수 없는 태그도 처리
  '*': (props: any) => {
    const { style, ...restProps } = props;
    const parsedStyle = typeof style === 'string' ? parseStyle(style) : style;
    const Tag = props.tagName || 'div';
    return React.createElement(Tag, { style: parsedStyle, ...restProps });
  },
};

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PostHeader post={post} />
      <div className="post-content">
        <div className="markdown">
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [
                  rehypeHighlight,
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: 'append',
                      content: {
                        type: 'text',
                        value: '#',
                      },
                    },
                  ],
                ],
                format: 'mdx',
              },
              parseFrontmatter: false,
            }}
          />
        </div>
      </div>
    </>
  );
}

