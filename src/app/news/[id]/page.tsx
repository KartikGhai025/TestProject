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
  ChevronDown,
} from "lucide-react"

// --- Import Swiper React components ---
import { Swiper, SwiperSlide } from "swiper/react"
// --- Import Swiper modules ---
import { Navigation, Pagination, A11y, Autoplay, Parallax } from "swiper/modules"

// --- Import Swiper styles ---
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/parallax"

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

// --- Fullscreen Skeleton Loading ---
const NewsDetailSkeleton = () => (
  <div className="min-h-screen bg-gray-100">
    <div className="animate-pulse">
      {/* Hero */}
      <div className="h-screen bg-gray-300 relative">
        <div className="absolute top-8 left-8 h-10 w-32 bg-gray-400 rounded-lg"></div>
        <div className="absolute bottom-20 left-0 right-0 px-8 space-y-4">
          <div className="h-12 bg-gray-400 rounded w-3/4"></div>
          <div className="h-8 bg-gray-400 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
)

// --- Main Page Component ---
export default function NewsDetailPage() {
  const [news, setNews] = useState<News | null>(null)
  const [showContent, setShowContent] = useState(false)
  const path = usePathname()
  const id = path.split("/").pop()!

  useEffect(() => {
    if (id) {
      NewsService.getById(id)
        .then(setNews)
        .catch((err) => console.error("Failed to fetch news:", err))
    }
  }, [id])

  const scrollToContent = () => {
    setShowContent(true)
    const contentElement = document.getElementById("article-content")
    contentElement?.scrollIntoView({ behavior: "smooth" })
  }

  if (!news) return <NewsDetailSkeleton />

  return (
    <div className="min-h-screen bg-white">
      {/* Fullscreen Hero Carousel */}
      <section className="h-screen relative">
        {news.images && news.images.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay, Parallax]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            parallax={true}
            loop={news.images.length > 1}
            className="w-full h-full"
          >
            {news.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full">
                  {/* Image with parallax */}
                  <div 
                    className="absolute inset-0"
                    data-swiper-parallax="-23%"
                  >
                    <img
                      src={img}
                      alt={`${news.title} - image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
        )}

        {/* Floating Back Button */}
        <div className="absolute top-6 left-6 z-30">
          <Link
            href="/news"
            className="flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm hover:bg-white text-gray-900 rounded-lg shadow-lg transition-all font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12 lg:p-16 max-w-5xl">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {news.category && (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold shadow-lg">
                <Tag className="w-4 h-4" />
                {news.category}
              </span>
            )}
            {news.isFeatured && (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-amber-900 rounded-full text-sm font-semibold shadow-lg">
                <Star className="w-4 h-4 fill-current" />
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-2xl"
            data-swiper-parallax="-300"
          >
            {news.title}
          </h1>

          {/* Metadata */}
          <div 
            className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 text-sm md:text-base mb-8"
            data-swiper-parallax="-200"
          >
            {news.authorName && (
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <User className="w-4 h-4" />
                {news.authorName}
              </span>
            )}
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              {formatTimeAgo(news.$createdAt)}
            </span>
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Eye className="w-4 h-4" />
              {news.viewsCount?.toLocaleString() ?? 0} views
            </span>
          </div>

          {/* Scroll Down Indicator */}
          <button
            onClick={scrollToContent}
            className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors animate-bounce"
          >
            <span className="text-sm font-medium">Read Article</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Article Content Section */}
      <section id="article-content" className="bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
          {/* Author Card */}
          {news.authorName && (
            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {news.authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-wide font-semibold mb-1">Written by</p>
                <p className="text-gray-900 text-xl font-bold">{news.authorName}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(news.$createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Article Body */}
          <div
            className="prose prose-xl max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mb-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-ul:my-6 prose-ol:my-6 prose-li:my-2"
            dangerouslySetInnerHTML={{ __html: news.description }}
          />

          {/* Bottom Stats */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-8 text-gray-600">
              <span className="flex items-center gap-2 text-lg">
                <Eye className="w-6 h-6 text-blue-600" />
                <strong className="text-gray-900">{news.viewsCount?.toLocaleString() ?? 0}</strong>
              </span>
              <span className="flex items-center gap-2 text-lg">
                <Calendar className="w-6 h-6 text-green-600" />
                {formatTimeAgo(news.$createdAt)}
              </span>
            </div>
            
            <Link
              href="/news"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}