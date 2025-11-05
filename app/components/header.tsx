"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("make-payment")
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { id: "make-payment", label: "Make Payment", path: "/#make-payment" },
    { id: "add-money", label: "Add Money", path: "/#add-money" },
    { id: "check-payment-history", label: "Payment History/Keycode", path: "/payment-history" },
    { id: "how-it-works", label: "How It Works", path: "/#how-it-works" },
    { id: "help", label: "Help", path: "/help" },
  ]

  // Track active section on scroll and active page links
  useEffect(() => {
    const handleScroll = () => {
      navItems.forEach(({ id, path }) => {
        if (path.startsWith("/#")) {
          const el = document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= 120 && rect.bottom >= 120) {
              setActiveSection(id)
            }
          }
        } else if (pathname === path) {
          setActiveSection(id)
        }
      })
    }

    handleScroll() // run once on load
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

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <header className="bg-yellow-500 text-black sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <span className="text-lg font-bold">SunPay</span>

          {/* Desktop Navigation */}
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

          {/* Desktop Sign In */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="bg-black border border-yellow-400 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button className="bg-black border border-yellow-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
              Sign In
            </button>
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

        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 top-16 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          >
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
      </header>
    </>
  )
}
