"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function FloatingChat() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1000)
    const hideTimer = setTimeout(() => setShowMessage(false), 7000)
    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end space-x-2">
      {/* Pop-out message */}
      {showMessage && (
        <div className="bg-white text-gray-900 shadow-lg rounded-xl px-4 py-2 text-sm font-medium flex items-center gap-2 animate-slide-left">
          <span className="text-lg">👋</span>
          <span>Hi, need help?</span>
        </div>
      )}

      {/* Chat Icon with stronger Radar Ping */}
      <Link href="/help" aria-label="Go to Help page">
        <div className="relative flex items-center justify-center">
          {/* First (larger) radar ping */}
          <span className="absolute inline-flex h-16 w-16 rounded-full bg-yellow-400 opacity-40 animate-ping" />
          {/* Second (smaller) radar ping */}
          <span className="absolute inline-flex h-12 w-12 rounded-full bg-yellow-400 opacity-50 animate-ping animation-delay-200" />
          
          <button className="relative z-10 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-full p-3 shadow-lg transition-all duration-300">
            {/* Chat bubble SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" />
            </svg>
          </button>
        </div>
      </Link>
    </div>
  )
}
