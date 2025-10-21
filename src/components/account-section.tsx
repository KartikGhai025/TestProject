"use client"

import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"

interface AccountSectionProps {
  icon: ReactNode
  title: string
  description: string
  onClick?: () => void
  badge?: string
}

export default function AccountSection({ icon, title, description, onClick, badge }: AccountSectionProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white text-sm font-medium rounded-full">
              {badge}
            </span>
          )}
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
        </div>
      </div>
    </div>
  )
}
