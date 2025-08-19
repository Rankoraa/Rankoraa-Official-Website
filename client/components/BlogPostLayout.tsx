"use client";

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}

      {/* styled-jsx CSS applied only on the client */}
      <style jsx>{`
        article {
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.8;
          font-size: 1.05rem;
        }
        article h2 {
          margin-top: 2rem;
          font-size: 1.5rem;
        }
        article img {
          border-radius: 12px;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
