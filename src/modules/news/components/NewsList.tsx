"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { User, Clock, Bookmark, Inbox, ChevronDown, LayoutGrid, List } from "lucide-react"
import { useNewsStore } from "@/modules/news/store/news.store"

// --- Helper: Time Ago ---
function formatTimeAgo(dateString: string) {
  if (!dateString) return ""
  const date = new Date(dateString)
  const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  if (diff < 60) return `${diff} sec ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`
}

// --- Main Component ---
export default function NewsList() {
  const { news, fetchNews, loading } = useNewsStore()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const categoryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const categories = Array.from(new Set(news.map((n) => n.category)))
  const filteredArticles = activeCategory ? news.filter(n => n.category === activeCategory) : news

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Category Dropdown */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <div ref={categoryRef} className="relative w-full md:w-64 mb-2 md:mb-0">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-white/80 rounded-xl shadow text-gray-700 hover:shadow-md transition"
          >
            <span>{activeCategory || "All Categories"}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
          </button>

          {categoryOpen && (
            <ul className="absolute top-full left-0 w-full bg-white/90 rounded-xl shadow mt-1 max-h-60 overflow-y-auto z-10">
              <li
                onClick={() => { setActiveCategory(null); setCategoryOpen(false) }}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${!activeCategory ? "bg-blue-100 font-semibold" : ""}`}
              >
                All Categories
              </li>
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setCategoryOpen(false) }}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${activeCategory === cat ? "bg-blue-100 font-semibold" : ""}`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Loading / Empty State */}
      {loading ? (
        <p className="text-center text-gray-500">Loading articles...</p>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-20 bg-white/80 rounded-2xl shadow">
          <Inbox className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">No articles found.</p>
        </div>
      ) : (
        <>
          {/* Mobile: Grid */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredArticles.map(article => (
              <div
                key={article.$id}
                className="bg-white/90 rounded-2xl shadow hover:shadow-md transition p-4 flex flex-col"
              >
                <Link href={`/news/${article.$id}`} className="w-full overflow-hidden rounded-lg">
                  <img
                    src={article.images?.[0] || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover w-full h-48 rounded-lg"
                  />
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium truncate">{article.category}</span>
                  <button className="p-1 rounded-full text-gray-500 hover:text-blue-600 transition">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                <Link href={`/news/${article.$id}`}>
                  <h3 className="font-semibold text-gray-800 mt-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{article.description}</p>
                </Link>
                <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span className="truncate">{article.authorName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(article.$createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: List */}
          <div className="hidden md:flex flex-col gap-4">
            {filteredArticles.map(article => (
              <div
                key={article.$id}
                className="bg-white/90 rounded-2xl shadow hover:shadow-md transition p-4 flex flex-row"
              >
                <Link href={`/news/${article.$id}`} className="w-48 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={article.images?.[0] || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </Link>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium truncate">{article.category}</span>
                    <button className="p-1 rounded-full text-gray-500 hover:text-blue-600 transition">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                  <Link href={`/news/${article.$id}`} className="flex-grow">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{article.description}</p>
                  </Link>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span className="truncate">{article.authorName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(article.$createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
