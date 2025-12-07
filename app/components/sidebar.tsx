"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  HiChevronDoubleLeft,
  HiX,
  HiOutlineViewGrid,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineSupport,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi"
import { IoSunny } from "react-icons/io5"

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: HiOutlineViewGrid },
  { name: "Account", href: "/dashboard/account", icon: HiOutlineUser },
  { name: "Payment History", href: "/dashboard/payment-history", icon: HiOutlineDocumentText },
  { name: "Support", href: "/dashboard/support", icon: HiOutlineSupport },
  { name: "Settings", href: "/dashboard/settings", icon: HiOutlineCog },
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
          className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
          aria-label="Close sidebar overlay"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onMobileClose()
            }
          }}
        />
      )}

      <aside
        className={cn(
          "h-screen bg-gradient-to-b from-secondary via-secondary/80 to-muted border-r-2 border-border flex flex-col transition-all duration-300 z-50 sticky top-0",
          isCollapsed ? "w-[70px]" : "w-[240px]",
          "max-lg:fixed lg:sticky",
          isMobileOpen ? "left-0" : "-left-full lg:left-0",
        )}
        aria-label="Main navigation"
      >
        {/* Logo and collapse button */}
        <div className="p-4 border-b-2 border-border flex items-center justify-between bg-card/50">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <IoSunny className="text-primary-foreground text-lg" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SunPay
              </span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="hidden lg:flex items-center justify-center w-9 h-9 rounded-xl hover:bg-accent/20 transition-colors text-primary"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <HiChevronDoubleLeft
              className={cn("w-5 h-5 transition-transform", isCollapsed && "rotate-180")}
              aria-hidden="true"
            />
          </button>
          <button
            onClick={onMobileClose}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-accent/20 transition-colors text-primary"
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <HiX className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 py-6">
          {!isCollapsed && (
            <p className="px-4 text-[11px] font-semibold text-primary uppercase tracking-widest mb-4">Menu</p>
          )}
          <nav className="space-y-2 px-3" aria-label="Sidebar navigation">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all",
                    isActive
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-lg shadow-primary/25"
                      : "text-foreground hover:bg-accent/20 hover:text-primary",
                    isCollapsed && "justify-center px-3",
                  )}
                  title={isCollapsed ? item.name : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary-foreground")}
                    aria-hidden="true"
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                  {isCollapsed && <span className="sr-only">{item.name}</span>}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Logout at bottom */}
        <div className="p-3 border-t-2 border-border bg-card/30">
          <button
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all text-foreground hover:bg-error-light hover:text-error w-full",
              isCollapsed && "justify-center px-3",
            )}
            aria-label="Log out"
            title="Log out"
          >
            <HiOutlineLogout className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            {!isCollapsed && <span className="font-medium">Log Out</span>}
            {isCollapsed && <span className="sr-only">Log Out</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
