"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { HiMenu, HiX, HiSearch, HiBell, HiCog, HiSwitchHorizontal, HiLogout } from "react-icons/hi"
import { FiUser } from "react-icons/fi"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSwitchAccount = (lampNumber: string) => {
    console.log("Switching to account:", lampNumber)
    setIsDropdownOpen(false)
    // Add your account switching logic here
  }

  const handleLogout = () => {
    console.log("Logging out...")
    setIsDropdownOpen(false)
    // Add your logout logic here
  }

  const handleSettings = () => {
    console.log("Opening settings...")
    setIsDropdownOpen(false)
    // Add your settings logic here
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

        {/* User avatar with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={handleAvatarClick}
            className={`h-12 w-12 rounded-xl overflow-hidden bg-secondary border-2 focus:outline-none focus:ring-2 focus:ring-ring hover:border-accent transition-colors ${
              isDropdownOpen ? "border-primary ring-2 ring-primary/20" : "border-border"
            }`}
            aria-label="User profile"
            title="User profile"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            <Image
              src="/images/avatar.png"
              alt="User avatar"
              width={48}
              height={48}
              className="object-cover w-full h-full"
              priority={false}
            />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-card border-2 border-border rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-5">
              {/* Current user info */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/avatar.png"
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">Taiwo Adelaja</p>
                    <p className="text-xs text-muted-foreground truncate">taiwo.adelaja@example.com</p>
                  </div>
                </div>
              </div>

              {/* Settings option */}
              <button
                onClick={handleSettings}
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-secondary transition-colors border-b border-border"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <HiCog className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Settings</p>
                  <p className="text-xs text-muted-foreground">Manage your account settings</p>
                </div>
              </button>

              {/* Switch Account section */}
              <div className="px-4 pt-3 pb-2 border-b border-border">
                <div className="flex items-center gap-2 mb-2">
                  <HiSwitchHorizontal className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-semibold text-foreground">Switch Account</p>
                </div>
                
                <div className="space-y-2">
                  {/* Active account */}
                  <button
                    onClick={() => handleSwitchAccount("123456789")}
                    className="w-full p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FiUser className="w-4 h-4 text-primary" />
                        <div className="text-left">
                          <p className="font-medium text-primary">LN: 123456789</p>
                          <p className="text-xs text-primary/80">Active</p>
                        </div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                    </div>
                  </button>

                  {/* Complete account */}
                  <button
                    onClick={() => handleSwitchAccount("987654321")}
                    className="w-full p-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FiUser className="w-4 h-4 text-green-500" />
                        <div className="text-left">
                          <p className="font-medium text-green-600">LN: 987654321</p>
                          <p className="text-xs text-green-500/80">Complete</p>
                        </div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Logout option */}
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <div className="h-9 w-9 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <HiLogout className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Log Out</p>
                  <p className="text-xs text-muted-foreground">Sign out from your account</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}