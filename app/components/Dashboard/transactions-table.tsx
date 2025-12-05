"use client"

import { useEffect, useState } from "react"

interface Transaction {
  id: string
  date: string
  amount: number
  lampNo: string
  keycode: string
  status: "Successful" | "Failed"
}

// Function to generate random 15-digit keycode in format XXX-XXX-XXX-XXX-XXX
const generateKeycode = (): string => {
  const digits = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('')
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)}-${digits.slice(9, 12)}-${digits.slice(12, 15)}`
}

const recentTransactions: Transaction[] = [
  {
    id: "TXN001",
    date: "1 Nov 2025",
    amount: 2000,
    lampNo: "LX: 4872859",
    keycode: generateKeycode(),
    status: "Successful",
  },
  { 
    id: "TXN002", 
    date: "2 Nov 2025", 
    amount: 3500, 
    lampNo: "LX: 80216847", 
    keycode: "N/A", 
    status: "Failed" 
  },
  {
    id: "TXN003",
    date: "3 Nov 2025",
    amount: 1200,
    lampNo: "LX: 61497125",
    keycode: generateKeycode(),
    status: "Successful",
  },
  {
    id: "TXN004",
    date: "4 Nov 2025",
    amount: 5000,
    lampNo: "LX: 21547860",
    keycode: generateKeycode(),
    status: "Successful",
  },
  { 
    id: "TXN005", 
    date: "5 Nov 2025", 
    amount: 1800, 
    lampNo: "LX: 78012548", 
    keycode: "N/A", 
    status: "Failed" 
  },
  {
    id: "TXN006",
    date: "6 Nov 2025",
    amount: 7000,
    lampNo: "LX: 34692378",
    keycode: generateKeycode(),
    status: "Successful",
  },
]

/// Updated carousel images with the provided URL
const carouselImages = [
  {
    id: 1,
    src: "https://ng.sunking.com/wp-content/uploads/2025/09/HomePlus_Horizontal-20240704_2025-scaled.png", // This is a webpage, not an image
    alt: "Sun King Home Plus",
    title: "Sun King Home Plus",
    description: "Reliable solar home systems"
  },
  {
    id: 2,
    src: "https://ng.sunking.com/wp-content/uploads/2024/03/Home-500X_v1-1-800x602.png",
    alt: "Solar Products",
    title: "Solar Products",
    description: "High-quality solar solutions"
  },
  {
    id: 3,
    src: "https://ng.sunking.com/wp-content/uploads/2024/12/Home-500X-GSM-Spec-Sheet_v0.0-1-min-800x480.png",
    alt: "Energy Access",
    title: "Energy Access",
    description: "Bringing power to homes"
  },
  {
    id: 4,
    src: "https://ng.sunking.com/wp-content/uploads/2025/09/PowerHub-3300-Panel-_-v3-scaled.png",
    alt: "Sustainable Energy",
    title: "Sustainable Energy",
    description: "Clean, renewable power"
  }
]

export function RecentTransactions() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate slides - 2 images per slide
  const slides = [];
  for (let i = 0; i < carouselImages.length; i += 2) {
    slides.push(carouselImages.slice(i, i + 2));
  }

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    )
  }

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="w-full max-w-[95vw] mx-auto space-y-4">
      {/* Transactions Section */}
      <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-2xl p-4 md:p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(251 191 36 / 0.3) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
              <p className="text-sm text-gray-500">Your latest payment activities</p>
            </div>

            <a
              href="/payment-history"
              className="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 font-medium py-2.5 px-4 rounded-xl border border-amber-300 hover:bg-amber-50 transition-colors w-full sm:w-auto"
              title="View all transactions"
              aria-label="View all transactions"
            >
              <span className="whitespace-nowrap">View All</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          </div>

          {/* Mobile Card View */}
          {isMobile ? (
            <div className="space-y-3 w-full">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full">
                  <div className="flex justify-between items-start mb-3 w-full">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{transaction.date}</p>
                      <p className="text-lg font-bold text-gray-900 truncate">₦{transaction.amount.toLocaleString()}</p>
                    </div>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full flex-shrink-0 ${
                      transaction.status === "Successful" 
                        ? "bg-green-50 text-green-600" 
                        : "bg-red-50 text-red-500"
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm w-full">
                    <div className="flex justify-between w-full">
                      <span className="text-gray-500 flex-shrink-0">Lamp No.</span>
                      <span className="text-amber-600 font-medium truncate ml-2 text-right">{transaction.lampNo}</span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span className="text-gray-500 flex-shrink-0">Keycode</span>
                      <span className="text-cyan-600 font-mono text-xs break-all ml-2 text-right max-w-[60%]">
                        {transaction.keycode}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop Table View */
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-amber-50 border-b border-amber-100">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Lamp No.</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Keycode</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction, index) => (
                      <tr
                        key={transaction.id}
                        className={`border-b border-gray-50 hover:bg-amber-50/50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                        }`}
                      >
                        <td className="py-4 px-4 text-sm text-gray-900">{transaction.date}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                          ₦{transaction.amount.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-sm text-amber-600 font-medium">{transaction.lampNo}</td>
                        <td className="py-4 px-4 text-sm text-cyan-600 font-mono min-w-[150px]">
                          {transaction.keycode}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-sm font-medium ${
                              transaction.status === "Successful" ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Grid Carousel Section */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
        <div className="relative overflow-hidden rounded-xl">
          {/* Slides Container */}
          <div className="relative h-40 overflow-hidden"> {/* ← HEIGHT ADJUSTED HERE: Changed from h-64 to h-48 */}
            {slides.map((slideImages, slideIndex) => (
              <div
                key={slideIndex}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  slideIndex === currentSlideIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Grid Container */}
                <div className="grid grid-cols-2 gap-4 h-full p-2">
                  {slideImages.map((image) => (
                    <div 
                      key={image.id}
                      className="relative rounded-lg overflow-hidden group"
                    >
                      {/* Image Background */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-amber-100 to-yellow-100 transition-transform duration-300 group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${image.src}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative h-full p-4 flex flex-col justify-end z-10">
                        <h3 className="text-sm font-bold text-white mb-1 drop-shadow-md line-clamp-1">
                          {image.title}
                        </h3>
                        <p className="text-white/90 text-xs drop-shadow-md line-clamp-2">
                          {image.description}
                        </p>
                        <button className="mt-2 bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-1 rounded-full transition-colors w-fit backdrop-blur-sm">
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlideIndex 
                    ? 'bg-amber-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-800 transition-colors shadow-md"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-800 transition-colors shadow-md"
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}