"use client"

import type React from "react"
import { HiChevronRight } from "react-icons/hi"

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  value: string
  subtext?: string
  href?: string
}

export function ContactCard({ icon, title, value, subtext, href }: ContactCardProps) {
  const content = (
    <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 group h-full">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="p-2 sm:p-3 bg-secondary rounded-lg sm:rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-primary font-medium mb-1 truncate">{title}</p>
          <p className="text-base sm:text-lg font-semibold text-foreground truncate">{value}</p>
          {subtext && <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">{subtext}</p>}
        </div>
        <div className="text-primary group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0">
          <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
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
