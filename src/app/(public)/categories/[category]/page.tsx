import { notFound } from "next/navigation"

const categories = [
  "electronics",
  "computers",
  "fashion",
  "home-garden",
  "health-beauty",
  "books",
  "gaming",
  "sports-fitness",
]

export default function CategoryPage({ params }: { params: { category: string } }) {
  if (!categories.includes(params.category)) {
    notFound()
  }

  const categoryName = params.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {categoryName}
          </h1>
          <p className="text-xl text-gray-600">Explore our {categoryName.toLowerCase()} collection</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            This category page is under construction. Check back soon for amazing products!
          </p>
        </div>
      </div>
    </div>
  )
}
