import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 style={{ fontSize: '2em', fontWeight: 600 }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: '1.5em', fontWeight: 600 }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontSize: '1.25em', fontWeight: 600 }}>{children}</h3>,
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code
            style={{
              backgroundColor: 'rgba(27, 31, 35, 0.05)',
              borderRadius: '3px',
              fontSize: '85%',
              padding: '0.2em 0.4em',
            }}
          >
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => (
      <pre
        style={{
          backgroundColor: '#f6f8fa',
          borderRadius: '3px',
          fontSize: '85%',
          lineHeight: '1.45',
          overflow: 'auto',
          padding: '16px',
        }}
      >
        {children}
      </pre>
    ),
    ...components,
  };
}

