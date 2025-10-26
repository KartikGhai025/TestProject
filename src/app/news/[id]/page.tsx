"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { NewsService } from "@/modules/news/services/news.service"
import { News } from "@/modules/news/models/news.model"
import {
  ArrowLeft,
  Clock,
  Eye,
  Tag,
  User,
  Star,
  Calendar,
} from "lucide-react"

// --- Import Swiper React components ---
import { Swiper, SwiperSlide } from "swiper/react"
// --- Import Swiper modules ---
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules"

// --- Import Swiper styles ---
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// --- Helper Function: Time Ago ---
function formatTimeAgo(dateString: string): string {
  if (!dateString) return ""
  try {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) {
      const floored = Math.floor(interval)
      return `${floored} year${floored > 1 ? "s" : ""} ago`
    }
    interval = seconds / 2592000
    if (interval > 1) {
      const floored = Math.floor(interval)
      return `${floored} month${floored > 1 ? "s" : ""} ago`
    }
    interval = seconds / 86400
    if (interval > 1) {
      const floored = Math.floor(interval)
      return `${floored} day${floored > 1 ? "s" : ""} ago`
    }
    interval = seconds / 3600
    if (interval > 1) {
      const floored = Math.floor(interval)
      return `${floored} hour${floored > 1 ? "s" : ""} ago`
    }
    interval = seconds / 60
    if (interval > 1) {
      const floored = Math.floor(interval)
      return `${floored} minute${floored > 1 ? "s" : ""} ago`
    }
    const floored = Math.floor(seconds)
    return `${floored} second${floored > 1 ? "s" : ""} ago`
  } catch (error) {
    console.error("Error formatting date:", error)
    return new Date(dateString).toLocaleDateString()
  }
}

// --- Clean Skeleton Loading ---
const NewsDetailSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse space-y-8">
        {/* Back Button */}
        <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
        
        {/* Image */}
        <div className="w-full h-96 bg-gray-200 rounded-xl"></div>
        
        {/* Meta Info */}
        <div className="flex gap-4 flex-wrap">
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-28 bg-gray-200 rounded-full"></div>
        </div>
        
        {/* Title */}
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

// --- Main Page Component ---
export default function NewsDetailPage() {
  const [news, setNews] = useState<News | null>(null)
  const path = usePathname()
  const id = path.split("/").pop()!

  useEffect(() => {
    if (id) {
      NewsService.getById(id)
        .then(setNews)
        .catch((err) => console.error("Failed to fetch news:", err))
    }
  }, [id])

  if (!news) return <NewsDetailSkeleton />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/news"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {news.viewsCount?.toLocaleString() ?? 0}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {formatTimeAgo(news.$createdAt)}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Image Carousel */}
          {news.images && news.images.length > 0 && (
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ 
                  clickable: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={news.images.length > 1}
                className="w-full aspect-video"
              >
                {news.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`${news.title} - image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Featured Badge */}
              {news.isFeatured && (
                <div className="absolute top-4 right-4 bg-amber-400 text-amber-900 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-semibold shadow-lg z-10">
                  <Star className="w-4 h-4 fill-current" />
                  Featured
                </div>
              )}
            </div>
          )}

          {/* Article Content */}
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Category & Metadata */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {news.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  {news.category}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(news.$createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {news.title}
            </h1>

            {/* Author Info */}
            {news.authorName && (
              <div className="flex items-center gap-3 pb-6 mb-8 border-b border-gray-200">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                  {news.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 font-medium">{news.authorName}</span>
                  </div>
                  <p className="text-sm text-gray-500">Article Author</p>
                </div>
              </div>
            )}

            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-ul:list-disc prose-ol:list-decimal"
              dangerouslySetInnerHTML={{ __html: news.description }}
            />
          </div>
        </article>

        {/* Bottom Info Card */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span>
                  <strong className="text-gray-900">{news.viewsCount?.toLocaleString() ?? 0}</strong> views
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span>Published {formatTimeAgo(news.$createdAt)}</span>
              </span>
            </div>
            
            <Link
              href="/news"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Read More Articles
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}