export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="page-footer-wrapper">
      <p className="page-footer">
        © {currentYear}{' '}
        <a href="https://github.com/BlueTi">이재호</a> powered by{' '}
        <a href="https://nextjs.org/">Next.js</a>
      </p>
    </footer>
  );
}

