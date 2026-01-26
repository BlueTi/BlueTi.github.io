import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DarkModeButton from '@/components/DarkModeButton';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'blueti.github.io',
  description: '재호의 개발일기',
  authors: [{ name: '이재호' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <GoogleAnalytics />
        <div className="page-wrapper">
          <Header />
          <main className="page-content">{children}</main>
          <Footer />
          <DarkModeButton />
        </div>
      </body>
    </html>
  );
}

