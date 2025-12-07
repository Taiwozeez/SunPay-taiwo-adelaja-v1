"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { Header } from "./components/header"
import FloatingChat from "./components/FloatingChat"

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const hideLayout = ["/login", "/sign-up", "/forgot-password"].includes(pathname)

  if (hideLayout) {
    return (
      <>
        {children}
        <FloatingChat />
      </>
    )
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-40">
          <Header onMenuClick={() => setIsMobileOpen(true)} />
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-br from-background via-muted/30 to-secondary/20">
          {children}
        </main>
      </div>
      <FloatingChat />
    </div>
  )
}
