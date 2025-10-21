// src/app/page.tsx
"use client"; // only needed if using hooks or client-side logic

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to My App</h1>
      <nav className="space-x-4">
        <Link href="/news" className="text-blue-500">
          News
        </Link>
        {/* Add links to other features */}
      </nav>
    </div>
  );
}
