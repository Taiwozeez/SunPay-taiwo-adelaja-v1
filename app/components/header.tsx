"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("make-payment")
  const [signInOpen, setSignInOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const profileRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { id: "make-payment", label: "Make Payment", path: "/#make-payment" },
    { id: "add-money", label: "Add Money", path: "/#add-money" },
    { id: "check-payment-history", label: "Payment History/Keycode", path: "/payment-history" },
    { id: "how-it-works", label: "How It Works", path: "/#how-it-works" },
    { id: "account", label: "Account", path: "/account-details" },
    { id: "help", label: "Help", path: "/help" },
  ]

  const notifications = [
    "Payment Successful",
    "New Offer Available",
    "Wallet Credited",
    "Subscription Due",
    "Security Alert",
  ]

  // Profile avatar image path
  const avatarImagePath = "/images/student-avatar4.jpg"

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      if (dropdownOpen && !target.closest('.notification-bell')) {
        setDropdownOpen(false)
      }
      
      if (profileDropdownOpen && profileRef.current && !profileRef.current.contains(target)) {
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen, profileDropdownOpen])

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
    if (window.stopNotifications) {
      window.stopNotifications()
    }
    setDropdownOpen(!dropdownOpen)
  }

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen)
  }

  const handleLogout = () => {
    setProfileDropdownOpen(false)
    console.log("Logging out...")
  }

  const handleProfile = () => {
    setProfileDropdownOpen(false)
    console.log("Navigating to profile...")
  }

  const handleImageError = () => {
    setImageError(true)
  }

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.3
      }
    }
  }

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 40,
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 40,
        duration: 0.3
      }
    }
  }

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  const modalVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.3
      }
    }
  }

  // Staggered animation for nav items
  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  }

  // Notification Bell Component with enhanced animation
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <motion.span 
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3, // Wait 3 seconds between animations
            ease: "easeInOut",
            times: [0, 0.2, 0.4] // Quick scale up and down, then wait
          }}
        >
          {notifications.length}
        </motion.span>
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="p-2">
              <h3 className="text-sm font-semibold text-gray-900 px-2 py-1">Notifications</h3>
              <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                {notifications.map((notif, idx) => (
                  <motion.li
                    key={idx}
                    className="px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer rounded-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {notif}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  // Profile Avatar Component
  const ProfileAvatar = () => (
    <div className="relative" ref={profileRef}>
      <button
        type="button"
        aria-label="Profile menu"
        onClick={handleProfileClick}
        className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 hover:border-gray-400 transition-colors focus:outline-none"
      >
        {!imageError ? (
          <Image 
            src={avatarImagePath} 
            alt="User avatar"
            width={32}
            height={32}
            className="w-full h-full object-cover"
            onError={handleImageError}
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-800 text-white font-semibold text-sm flex items-center justify-center">
            U
          </div>
        )}
      </button>

      <AnimatePresence>
        {profileDropdownOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="py-1">
              <motion.button
                onClick={handleProfile}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </motion.button>
              <motion.button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log Out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <>
      <style jsx global>{`
        html { scroll-behavior: smooth; }
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
            <ProfileAvatar />
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button
              aria-label="Sign In"
              onClick={() => setSignInOpen(true)}
              className="bg-black border border-yellow-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
            
            <NotificationBell />
            <ProfileAvatar />

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

        {/* Mobile menu with Framer Motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="lg:hidden fixed inset-0 top-16 bg-black/50 z-40"
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="lg:hidden fixed mx-4 mt-2 rounded-xl shadow-lg bg-yellow-500 z-50 w-[calc(100%-2rem)]"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.nav 
                  className="flex flex-col gap-1 p-4"
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {navItems.map(({ id, label, path }) => (
                    <motion.a
                      key={id}
                      href={path}
                      onClick={handleNavClick(path, id)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === id
                          ? "bg-black text-white"
                          : "hover:bg-yellow-400"
                      }`}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.02,
                        x: 8,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {label}
                    </motion.a>
                  ))}
                </motion.nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Sign In Modal with Framer Motion */}
        <AnimatePresence>
          {signInOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => setSignInOpen(false)}
              />
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center"
                variants={modalVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setSignInOpen(false)}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 text-gray-700 text-2xl font-bold hover:text-gray-900 transition-colors"
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
                    <motion.button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 rounded-lg transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign In
                    </motion.button>
                  </form>
                  <p className="mt-4 text-sm text-gray-600 text-center">
                    Don&#39;t have an account? <a href="#" className="text-yellow-500 hover:underline">Register</a>
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}