// src/app/news/[id]/layout.tsx
import Link from 'next/link';

export default function NewsDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/news" className="text-blue-600 hover:underline">
          &larr; Back to News
        </Link>
      </div>
      {children}
    </div>
  );
}