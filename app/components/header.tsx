"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("make-payment")
  const [signInOpen, setSignInOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { id: "make-payment", label: "Make Payment", path: "/#make-payment" },
    { id: "add-money", label: "Add Money", path: "/#add-money" },
    { id: "check-payment-history", label: "Payment History/Keycode", path: "/payment-history" },
    { id: "how-it-works", label: "How It Works", path: "/#how-it-works" },
    { id: "help", label: "Help", path: "/help" },
  ]

  const notifications = [
    "Payment Successful",
    "New Offer Available",
    "Wallet Credited",
    "Subscription Due",
    "Security Alert",
  ]

  useEffect(() => {
    const handleScroll = () => {
      navItems.forEach(({ id, path }) => {
        if (path.startsWith("/#")) {
          const el = document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= 120 && rect.bottom >= 120) setActiveSection(id)
          }
        } else if (pathname === path) {
          setActiveSection(id)
        }
      })
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleNavClick = (path: string, id?: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (path.startsWith("/#") && pathname === "/") {
      const el = document.getElementById(id!)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(path)
    }
  }

  const handleBellClick = () => {
    // Stop the auto-pop notifications when bell is clicked
    if (window.stopNotifications) {
      window.stopNotifications()
    }
    setDropdownOpen(!dropdownOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (dropdownOpen && !target.closest('.notification-bell')) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  // Notification Bell Component
  const NotificationBell = () => (
    <div className="relative notification-bell">
      <button
        type="button"
        aria-label="Notifications"
        onClick={handleBellClick}
        className="relative focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black hover:text-gray-800 transition"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-5-5.917V4a2 2 0 10-4 0v1.083A6.002 6.002 0 004 11v3c0 .386-.149.735-.395 1.001L2 17h5m0 0v1a3 3 0 006 0v-1m-6 0h6"
          />
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {notifications.length}
        </span>
      </button>

      {/* Dropdown List - Now works on both desktop and mobile */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-slideDown">
          <div className="p-2">
            <h3 className="text-sm font-semibold text-gray-900 px-2 py-1">Notifications</h3>
            <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
              {notifications.map((notif, idx) => (
                <li
                  key={idx}
                  className="px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer rounded-md"
                >
                  {notif}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease forwards;
        }
      `}</style>

      <header className="bg-yellow-500 text-black sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold">SunPay</span>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(({ id, label, path }) => (
              <a
                key={id}
                href={path}
                onClick={handleNavClick(path, id)}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  activeSection === id
                    ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-black"
                    : "hover:text-gray-800"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 relative">
            <button
              aria-label="Sign In"
              onClick={() => setSignInOpen(true)}
              className="bg-black border border-yellow-400 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
            <NotificationBell />
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button
              aria-label="Sign In"
              onClick={() => setSignInOpen(true)}
              className="bg-black border border-yellow-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
            
            {/* Mobile Notification Bell - Now with dropdown */}
            <NotificationBell />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:bg-yellow-400 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-yellow-500 mx-4 mt-2 rounded-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
              <nav className="flex flex-col gap-1 p-4">
                {navItems.map(({ id, label, path }) => (
                  <a
                    key={id}
                    href={path}
                    onClick={handleNavClick(path, id)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors relative ${
                      activeSection === id
                        ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-black"
                        : "hover:bg-yellow-400"
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Sign In Modal */}
        {signInOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
              <button
                onClick={() => setSignInOpen(false)}
                aria-label="Close modal"
                className="absolute top-4 right-4 text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Sign In</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
                    Lamp Number / Phone Number
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your lamp number or phone"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 rounded-lg transition"
                >
                  Sign In
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-600 text-center">
                Don&#39;t have an account? <a href="#" className="text-yellow-500 hover:underline">Register</a>
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  )
}