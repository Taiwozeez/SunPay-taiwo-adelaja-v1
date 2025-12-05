"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: "/images/dashboardIcon.png" },
  { name: "Account", href: "/dashboard/account", icon: "/images/usericon.png" },
  { name: "Payment History", href: "/dashboard/payment-history", icon: "/images/menu-board.png" },
  { name: "Support", href: "/dashboard/support", icon: "/images/feedback.png" },
  { name: "Settings", href: "/dashboard/settings", icon: "/images/settings.png" },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ isCollapsed, onToggle, isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onMobileClose}
          aria-label="Close sidebar overlay"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onMobileClose()
            }
          }}
        />
      )}

      <aside
        className={cn(
          "h-screen bg-amber-50 border-r border-amber-200 flex flex-col transition-all duration-300 z-50 sticky top-0",
          isCollapsed ? "w-[70px]" : "w-[220px]",
          "max-lg:fixed lg:sticky",
          isMobileOpen ? "left-0" : "-left-full lg:left-0",
        )}
        aria-label="Main navigation"
      >
        {/* Logo and collapse button */}
        <div className="p-4 border-b border-amber-200 flex items-center justify-between">
          {!isCollapsed && <span className="font-semibold text-[30px] text-amber-900">SunPay</span>}
          <button
            onClick={onToggle}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-amber-100 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className={cn("w-5 h-5 text-amber-700 transition-transform", isCollapsed && "rotate-180")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={onMobileClose}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-amber-100 transition-colors"
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <svg 
              className="w-5 h-5 text-amber-700" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 py-4">
          {!isCollapsed && (
            <p className="px-4 text-[10px] font-medium text-amber-600 uppercase tracking-wider mb-2">
              Menu
            </p>
          )}
          <nav className="space-y-1 px-2" aria-label="Sidebar navigation">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                    isActive ? "bg-amber-200 text-amber-900 font-medium" : "text-amber-800 hover:bg-amber-100",
                    isCollapsed && "justify-center px-2",
                  )}
                  title={isCollapsed ? item.name : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Image
                    src={item.icon || "/placeholder.svg"}
                    alt=""
                    width={18}
                    height={18}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                  {isCollapsed && (
                    <span className="sr-only">{item.name}</span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Logout at bottom */}
        <div className="p-2 border-t border-amber-200">
          <button
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-amber-800 hover:bg-amber-100 w-full",
              isCollapsed && "justify-center px-2",
            )}
            aria-label="Log out"
            title="Log out"
          >
            <Image 
              src="/icons/logout.png" 
              alt="" 
              width={18} 
              height={18} 
              className="flex-shrink-0"
              aria-hidden="true"
            />
            {!isCollapsed && <span>Log Out</span>}
            {isCollapsed && (
              <span className="sr-only">Log Out</span>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}