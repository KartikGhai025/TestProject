import * as Icons from "lucide-react"
import Link from "next/link"

// Your active categories data
const categories = [
  { name: "Adopt Us", slug: "adopt-us", icon: "PawPrint", color: "#FF9F43" },
  { name: "Blood Bank", slug: "blood-bank", icon: "Droplet", color: "#E74C3C" },
  { name: "Doctors", slug: "doctors", icon: "Stethoscope", color: "#27AE60" },
  {
    name: "Cafes & Restaurants",
    slug: "cafes-restaurants",
    icon: "Coffee",
    color: "#D35400",
  },
  { name: "Coaching", slug: "coaching", icon: "BookOpen", color: "#8E44AD" },
  { name: "Colleges", slug: "colleges", icon: "GraduationCap", color: "#2980B9" },
  {
    name: "Emergency Services",
    slug: "emergency-services",
    icon: "AlertTriangle",
    color: "#C0392B",
  },
  {
    name: "Foodies Timeline",
    slug: "foodies-timeline",
    icon: "UtensilsCrossed",
    color: "#E67E22",
  },
  { name: "Funzone", slug: "funzone", icon: "PartyPopper", color: "#F39C12" },
  { name: "Gym", slug: "gym", icon: "Dumbbell", color: "#2ECC71" },
  { name: "Influencers", slug: "influencers", icon: "Camera", color: "#9B59B6" },
  { name: "Jobs", slug: "jobs", icon: "Briefcase", color: "#16A085" },
  { name: "Loan", slug: "loan", icon: "Banknote", color: "#2E86C1" },
  { name: "Lost & Found", slug: "lost-found", icon: "Search", color: "#7D3C98" },
  { name: "Matrimonial", slug: "matrimonial", icon: "Heart", color: "#E91E63" },
  {
    name: "New Openings",
    slug: "new-openings",
    icon: "Sparkles",
    color: "#F1C40F",
  },
  {
    name: "Preowned Vehicles",
    slug: "preowned-vehicles",
    icon: "Car",
    color: "#1ABC9C",
  },
  { name: "Properties", slug: "properties", icon: "Home", color: "#2980B9" },
  { name: "Sale", slug: "sale", icon: "Tag", color: "#C0392B" },
  { name: "Schools", slug: "schools", icon: "School", color: "#27AE60" },
  { name: "Services", slug: "services", icon: "Wrench", color: "#34495E" },
  { name: "Social Work", slug: "social-work", icon: "HandHeart", color: "#E74C3C" },
  { name: "Sports", slug: "sports", icon: "Trophy", color: "#F39C12" },
  {
    name: "Tour & Travels",
    slug: "tour-travels",
    icon: "Plane",
    color: "#3498DB",
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Added more padding (py-16 md:py-24) */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          {/* Made heading bigger and bolder */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Browse Categories
          </h1>
          {/* Made subheading slightly larger and lighter */}
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative">
          {categories.map((category) => {
            const LucideIcon = Icons[category.icon as keyof typeof Icons]

            return (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                // --- CARD CHANGES ---
                // 1. Added `group` to control child elements on hover
                // 2. Added `bg-white/70 backdrop-blur-lg` for a "glass" effect
                // 3. Added a subtle border
                // 4. Changed `shadow-lg` to `shadow-xl` and `hover:shadow-2xl` for more depth
                // 5. Changed `hover:-translate-y-1` to `hover:-translate-y-2` for a bigger lift
                // 6. Added `transition-all duration-300 ease-in-out` for a smoother feel
                className="group p-6 bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out text-center transform hover:-translate-y-2"
              >
                <div
                  // --- ICON BG CHANGES ---
                  // 1. Added `mx-auto` to ensure centering
                  // 2. Added `mb-5` for more space
                  // 3. Added `transition-all duration-300`
                  // 4. Added `group-hover:scale-110` to grow the icon on card hover
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto transition-all duration-300 ease-in-out group-hover:scale-110`}
                  style={{ background: category.color }}
                >
                  <LucideIcon className="w-8 h-8 text-white" />
                </div>
                {/* --- TEXT CHANGES --- */}
                {/* 1. Made font `font-semibold` and darker (`text-gray-900`)
                {/* 2. Added `transition-colors`
                {/* 3. Added `group-hover:text-blue-600` to change color on card hover */}
                <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                  {category.name}
                </h3>
              </Link>
            )
          })}
        </div>

        {/* --- "POPULAR" SECTION CHANGES --- */}
        {/* 1. Aligned blur/bg effect with the cards (`bg-white/70`) */}
        {/* 2. Added more padding (`p-10`) */}
        <div className="mt-20 md:mt-24 bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Popular This Week
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Smartphones",
              "Laptops",
              "Sneakers",
              "Headphones",
              "Watches",
              "Gaming Chairs",
            ].map((tag) => (
              <span
                key={tag}
                // --- TAG CHANGES ---
                // 1. Added `shadow-sm` and `hover:shadow-lg`
                // 2. Added `hover:scale-105` for a pop
                // 3. Added `transition-all`
                className="px-5 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium transition-all duration-200 ease-in-out shadow-sm hover:shadow-lg hover:scale-105 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}