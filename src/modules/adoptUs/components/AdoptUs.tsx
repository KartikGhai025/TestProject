"use client";
import { useEffect } from "react";
import { useNewsStore } from "../store/news.store";
import { Loader } from "@/components/common/Loader";
import Link from "next/link";

export default function NewsList() {
  const { news, fetchNews, loading } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div key={item.$id} className="border p-4 rounded shadow">
          <h2 className="font-bold">{item.title}</h2>
          <p>{item.content}</p>
          <Link href={`/news/${item.$id}`} className="text-blue-500">Read more</Link>
        </div>
      ))}
    </div>
  );
}
