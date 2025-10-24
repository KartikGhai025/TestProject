// src/app/news/[id]/layout.tsx
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Eye,
  Tag,
  User,
  Star,
  TrendingUp,
} from "lucide-react"
export default function NewsDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-0 py-0">
      <div className="mb-2">
       {/* <Link
          href="/news"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-gray-700 hover:text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-xl group mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to News</span>
        </Link> */}
      </div>
      {children}
    </div>
  );
}