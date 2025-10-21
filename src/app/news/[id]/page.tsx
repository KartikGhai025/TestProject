"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NewsService } from "@/modules/news/services/news.service";
import { News } from "@/modules/news/models/news.model";

export default function NewsDetailPage() {
  const [news, setNews] = useState<News | null>(null);
  const path = usePathname();
  const id = path.split("/").pop()!;

  useEffect(() => {
    NewsService.getById(id).then(setNews);
  }, [id]);

  if (!news) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{news.title}</h1>
      <p>{news.content}</p>
      <p className="text-gray-500 mt-2">Author: {news.author}</p>
    </div>
  );
}