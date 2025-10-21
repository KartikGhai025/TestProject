"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Grid3X3, Store, Newspaper, User } from "lucide-react"

const navItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/categories", label: "Category", icon: Grid3X3 },
  { href: "/stores", label: "Stores", icon: Store },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/account", label: "Account", icon: User },
]

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t">
      <nav className="px-4 py-2">
        <ul className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300"
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center">
                    <Icon
                      className={`w-5 h-5 mb-1 transition-colors ${isActive ? "text-purple-600" : "text-gray-500"}`}
                    />
                    <span
                      className={`text-xs font-medium transition-colors ${
                        isActive ? "text-purple-600" : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
