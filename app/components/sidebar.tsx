"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"

const mainMenuItems = [
  { name: "Dashboard", href: "/", icon: "/images/dashboardIcon.png" },
  { name: "Orders Management", href: "../dashboard/orders-managment", icon: "/images/ordericon.png" },
  { name: "Users", href: "../dashboard/user", icon: "/images/usericon.png" },
  { name: "Riders", href: "../dashboard/riders", icon: "/images/rider.png" },
  { name: "Company", href: "../dashboard/company", icon: "/images/usericon.png" },
  { name: "Queue Management", href: "../dashboard/queue-management", icon: "/images/qeueicon.png" },
  { name: "Menu & Inventory", href: "/inventory", icon: "/images/menu-board.png" },
  { name: "Payments", href: "/payments", icon: "/images/payments.png" },
  { name: "Feedback & Support", href: "/feedback", icon: "/images/feedback.png" },
]

const accountItems = [{ name: "Settings", href: "/settings", icon: "/images/settings.png" }]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[200px] min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <span className="font-semibold text-sm text-gray-800">[COMPANY LOGO]</span>
      </div>

      {/* Main Menu */}
      <div className="flex-1 py-4">
        <p className="px-4 text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
        <nav className="space-y-1 px-2">
          {mainMenuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive ? "text-gray-900" : "text-gray-600 hover:bg-gray-100",
                )}
                style={isActive ? { backgroundColor: "#C9FCFB" } : undefined}
              >
                <Image src={item.icon || "/placeholder.svg"} alt={item.name} width={16} height={16} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Account Section */}
        <div className="mt-6">
          <p className="px-4 text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">Account</p>
          <nav className="space-y-1 px-2">
            {accountItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                    isActive ? "text-gray-900" : "text-gray-600 hover:bg-gray-100",
                  )}
                  style={isActive ? { backgroundColor: "#C9FCFB" } : undefined}
                >
                  <Image src={item.icon || "/placeholder.svg"} alt={item.name} width={16} height={16} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}
