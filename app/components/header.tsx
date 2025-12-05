"use client"

import { useState, useRef, useEffect } from "react"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Focus the input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus()
        }
      }, 300) // Wait for animation to start
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue)
      // Implement your search logic here
    }
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
    setSearchValue("")
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-40">
      {/* Left side - Hamburger and last login */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="h-12 w-12 lg:hidden flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          onClick={onMenuClick}
          aria-label="Open menu"
          title="Open menu"
        >
          <svg 
            className="w-8 h-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-lg text-gray-600 hidden sm:block">
          Last Login: <span className="font-medium text-gray-900">Friday 11, 2025</span> | 01:40 AM
        </span>
      </div>

      {/* Right side - Search, notifications, avatar */}
      <div className="flex items-center gap-4">
        {/* Search container */}
        <div className="relative flex items-center">
          {/* Search input with slide animation */}
          <div className={`
            absolute right-full mr-2 transition-all duration-300 ease-in-out
            ${isSearchOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}
          `}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="w-64 h-12 pl-4 pr-12 py-2 bg-gray-50 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         text-gray-900 placeholder-gray-500 transition-all"
                aria-label="Search"
              />
              {/* Close button inside search input */}
              <button
                type="button"
                onClick={handleSearchClose}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Close search"
                title="Close search"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>

          {/* Search icon button */}
          <button
            type="button"
            onClick={handleSearchClick}
            className={`
              h-12 w-12 flex items-center justify-center rounded-md transition-all
              ${isSearchOpen ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "hover:bg-gray-100"}
            `}
            aria-label={isSearchOpen ? "Close search" : "Open search"}
            title={isSearchOpen ? "Close search" : "Open search"}
            aria-expanded={isSearchOpen}
          >
            <svg 
              className="w-7 h-7" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* Notification button with blinking dot */}
        <button
          type="button"
          className="h-12 w-12 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors relative"
          aria-label="Notifications"
          title="Notifications"
        >
          <svg 
            className="w-7 h-7" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {/* Red blinking dot */}
          <span className="absolute top-2.5 right-2.5 h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
          </span>
          {/* Screen reader text for notification count */}
          <span className="sr-only">Notifications (new notifications available)</span>
        </button>

        {/* User avatar */}
        <button
          type="button"
          className="h-14 w-14 rounded-full overflow-hidden bg-gray-200 border-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="User profile"
          title="User profile"
        >
          <img 
            src="/diverse-user-avatars.png" 
            alt="User avatar" 
            className="object-cover w-full h-full" 
          />
        </button>
      </div>
    </header>
  )
}