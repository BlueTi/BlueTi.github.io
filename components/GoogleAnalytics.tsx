'use client';

import Script from 'next/script';

// Next.js는 빌드 타임에 NEXT_PUBLIC_ 접두사가 붙은 환경 변수를
// 클라이언트 번들에 포함시킵니다.
// 환경 변수가 없으면 undefined가 됩니다.
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  // 환경 변수가 없으면 아무것도 렌더링하지 않음
  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
