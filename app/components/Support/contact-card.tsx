"use client"

import type React from "react"

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  value: string
  subtext?: string
  href?: string
  bgColor?: string
}

export function ContactCard({ icon, title, value, subtext, href, bgColor = "bg-amber-50" }: ContactCardProps) {
  const content = (
    <div
      className={`${bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 group h-full`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-amber-700 font-medium mb-1 truncate">{title}</p>
          <p className="text-base sm:text-lg font-semibold text-gray-800 truncate">{value}</p>
          {subtext && <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{subtext}</p>}
        </div>
        <div className="text-amber-400 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0">
          <svg width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    )
  }

  return content
}