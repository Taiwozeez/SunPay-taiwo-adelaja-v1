"use client";

import type React from "react"
import { useState } from "react"
import { Sidebar } from "../components/sidebar"
import { Header } from "../components/header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header is fixed and NOT part of the scrollable content */}
        <div className="sticky top-0 z-40">
          <Header onMenuClick={() => setIsMobileOpen(true)} />
        </div>
        
        {/* Main content area is scrollable */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}