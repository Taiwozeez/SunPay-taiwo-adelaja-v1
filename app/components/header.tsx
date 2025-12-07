"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { HiMenu, HiX, HiSearch, HiBell } from "react-icons/hi"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

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
      }, 300)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue)
    }
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
    setSearchValue("")
  }

  return (
    <header className="h-16 bg-card border-b-2 border-border flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm">
      {/* Left side - Hamburger and last login */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="h-12 w-12 lg:hidden flex items-center justify-center rounded-xl hover:bg-secondary transition-colors text-foreground"
          onClick={onMenuClick}
          aria-label="Open menu"
          title="Open menu"
        >
          <HiMenu className="w-7 h-7" aria-hidden="true" />
        </button>
        <span className="text-sm text-muted-foreground hidden sm:block">
          Last Login: <span className="font-semibold text-foreground">Friday 11, 2025</span> | 01:40 AM
        </span>
      </div>

      {/* Right side - Search, notifications, avatar */}
      <div className="flex items-center gap-3">
        {/* Search container */}
        <div className="relative flex items-center">
          <div
            className={`
            absolute right-full mr-2 transition-all duration-300 ease-in-out
            ${isSearchOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}
          `}
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="w-64 h-11 pl-4 pr-12 py-2 bg-input border-2 border-border rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent
                         text-foreground placeholder-muted-foreground transition-all"
                aria-label="Search"
              />
              <button
                type="button"
                onClick={handleSearchClose}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close search"
                title="Close search"
              >
                <HiX className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>
          </div>

          <button
            type="button"
            onClick={handleSearchClick}
            className={`
              h-11 w-11 flex items-center justify-center rounded-xl transition-all
              ${isSearchOpen ? "bg-secondary text-primary" : "hover:bg-secondary text-foreground"}
            `}
            aria-label={isSearchOpen ? "Close search" : "Open search"}
            title={isSearchOpen ? "Close search" : "Open search"}
            aria-expanded={isSearchOpen ? "true" : "false"}
          >
            <HiSearch className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Notification button with blinking dot */}
        <button
          type="button"
          className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-secondary transition-colors relative text-foreground"
          aria-label="Notifications"
          title="Notifications"
        >
          <HiBell className="w-6 h-6" aria-hidden="true" />
          <span className="absolute top-2 right-2 h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="sr-only">Notifications (new notifications available)</span>
        </button>

        {/* User avatar */}
        <button
          type="button"
          className="h-12 w-12 rounded-xl overflow-hidden bg-secondary border-2 border-border focus:outline-none focus:ring-2 focus:ring-ring hover:border-accent transition-colors"
          aria-label="User profile"
          title="User profile"
        >
          <Image
            src="/diverse-user-avatars.png"
            alt="User avatar"
            width={48}
            height={48}
            className="object-cover w-full h-full"
            priority={false}
          />
        </button>
      </div>
    </header>
  )
}
