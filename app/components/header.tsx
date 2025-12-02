"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left side - Back button and last login */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Image src="/images/close.png" alt="Back" width={16} height={16} />
        </Button>
        <span className="text-sm text-gray-600">
          Last Login: <span className="font-medium">Friday 11, 2025</span> | 01:40 AM
        </span>
      </div>

      {/* Right side - Search, notifications, avatar */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Image src="/images/search.png" alt="Search" width={30} height={30} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 relative">
          <Image src="/images/bell.png" alt="Notifications" width={30} height={30} />
        </Button>
        <div className="h-9 w-9 rounded-full overflow-hidden bg-gray-200">
          <Image src="/images/avatar.png" alt="User avatar" width={36} height={36} className="object-cover" />
        </div>
      </div>
    </header>
  )
}
