"use client"
import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { User, Clock, Bookmark, Inbox, ChevronDown, LayoutGrid, List,Check } from "lucide-react"
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

// --- News Card ---
interface NewsCardProps {
  article: any
  view: "grid" | "list"
}

function NewsCard({ article, view }: NewsCardProps) {
  return (
    <div
      className={`bg-white/90 rounded-2xl shadow hover:shadow-md transition p-4 flex ${
        view === "list" ? "flex-row" : "flex-col"
      }`}
    >
      <Link
        href={`/news/${article.$id}`}
        className={`${view === "list" ? "w-48 flex-shrink-0" : "w-full"} overflow-hidden rounded-lg`}
      >
        <img
          src={article.images?.[0] || "/placeholder.svg"}
          alt={article.title}
          className={`object-cover w-full ${view === "list" ? "h-full" : "h-48"}`}
        />
      </Link>

      <div className="flex flex-col flex-grow ml-0 md:ml-4 mt-2 md:mt-0">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-2 py-1 rounded text-xs font-medium truncate">
            {article.category}
          </span>
          <button
            aria-label="Save article"
            className="p-1 rounded-full text-gray-500 hover:text-blue-600 transition"
          >
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
  )
}

// --- Dropdown Component ---
interface CategoryDropdownProps {
  categories: string[]
  activeCategory: string | null
  onSelectCategory: (cat: string | null) => void
}

function CategoryDropdown({ categories, activeCategory, onSelectCategory }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative w-full md:w-64 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white/80 rounded-xl shadow text-gray-700 hover:shadow-md transition"
      >
        <span>{activeCategory || "All Categories"}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-white/90 rounded-xl shadow mt-1 max-h-60 overflow-y-auto z-10">
          <li
            onClick={() => { onSelectCategory(null); setIsOpen(false) }}
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
              !activeCategory ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            All Categories
          </li>
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => { onSelectCategory(cat); setIsOpen(false) }}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                activeCategory === cat ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// --- Main Component ---
export default function NewsList() {
  const { news, fetchNews, loading } = useNewsStore()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  const categories = Array.from(new Set(news.map((n) => n.category)))
  const filteredArticles = activeCategory ? news.filter(n => n.category === activeCategory) : news

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <CategoryDropdown
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
     <div className="flex gap-2">
  <button
    onClick={() => setView("grid")}
    className={`p-2 rounded-full border transition ${
      view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    }`}
    aria-label="Grid view"
  >
    <LayoutGrid className="w-5 h-5" />
  </button>
  <button
    onClick={() => setView("list")}
    className={`p-2 rounded-full border transition ${
      view === "list" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    }`}
    aria-label="List view"
  >
    <List className="w-5 h-5" />
  </button>
</div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading articles...</p>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-20 bg-white/80 rounded-2xl shadow">
          <Inbox className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">No articles found.</p>
        </div>
      ) : (
        <div className={`grid gap-4 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {filteredArticles.map(article => (
            <NewsCard key={article.$id} article={article} view={view} />
          ))}
        </div>
      )}
    </div>
  )
}
