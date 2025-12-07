"use client"

import { useEffect, useState } from "react"
import { HiChevronRight, HiChevronLeft } from "react-icons/hi"

interface Transaction {
  id: string
  date: string
  amount: number
  lampNo: string
  keycode: string
  status: "Successful" | "Failed"
}

const generateKeycode = (): string => {
  const digits = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join("")
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
    status: "Failed",
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
    status: "Failed",
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

const carouselImages = [
  {
    id: 1,
    src: "https://ng.sunking.com/wp-content/uploads/2025/09/HomePlus_Horizontal-20240704_2025-scaled.png",
    alt: "Sun King Home Plus",
    title: "Sun King Home Plus",
    description: "Reliable solar home systems",
  },
  {
    id: 2,
    src: "https://ng.sunking.com/wp-content/uploads/2024/03/Home-500X_v1-1-800x602.png",
    alt: "Solar Products",
    title: "Solar Products",
    description: "High-quality solar solutions",
  },
  {
    id: 3,
    src: "https://ng.sunking.com/wp-content/uploads/2024/12/Home-500X-GSM-Spec-Sheet_v0.0-1-min-800x480.png",
    alt: "Energy Access",
    title: "Energy Access",
    description: "Bringing power to homes",
  },
  {
    id: 4,
    src: "https://ng.sunking.com/wp-content/uploads/2025/09/PowerHub-3300-Panel-_-v3-scaled.png",
    alt: "Sustainable Energy",
    title: "Sustainable Energy",
    description: "Clean, renewable power",
  },
]

export function RecentTransactions() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const slides = []
  for (let i = 0; i < carouselImages.length; i += 2) {
    slides.push(carouselImages.slice(i, i + 2))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
  }

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="w-full max-w-[95vw] mx-auto space-y-4">
      {/* Transactions Section */}
      <div className="bg-gradient-to-br from-secondary via-muted to-secondary rounded-2xl p-4 md:p-6 relative overflow-hidden border-2 border-border shadow-xl shadow-primary/5">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(247 216 26 / 0.3) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Recent Transactions</h2>
              <p className="text-sm text-muted-foreground">Your latest payment activities</p>
            </div>

            <a
              href="/payment-history"
              className="flex items-center justify-center gap-2 text-primary hover:text-accent font-semibold py-3 px-5 rounded-xl border-2 border-border hover:border-accent hover:bg-card transition-all w-full sm:w-auto"
              title="View all transactions"
              aria-label="View all transactions"
            >
              <span className="whitespace-nowrap">View All</span>
              <HiChevronRight className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Card View */}
          {isMobile ? (
            <div className="space-y-3 w-full">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-card rounded-xl p-4 shadow-md border-2 border-border w-full hover:border-accent transition-colors"
                >
                  <div className="flex justify-between items-start mb-3 w-full">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{transaction.date}</p>
                      <p className="text-lg font-bold text-foreground truncate">
                        ₦{transaction.amount.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 ${
                        transaction.status === "Successful"
                          ? "bg-success-light text-success"
                          : "bg-error-light text-error"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm w-full">
                    <div className="flex justify-between w-full">
                      <span className="text-muted-foreground flex-shrink-0 font-medium">Lamp No.</span>
                      <span className="text-primary font-semibold truncate ml-2 text-right">{transaction.lampNo}</span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span className="text-muted-foreground flex-shrink-0 font-medium">Keycode</span>
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
            <div className="bg-card rounded-xl shadow-lg overflow-hidden border-2 border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-secondary to-muted border-b-2 border-border">
                      <th className="text-left py-4 px-5 text-sm font-bold text-foreground">Date</th>
                      <th className="text-left py-4 px-5 text-sm font-bold text-foreground">Amount</th>
                      <th className="text-left py-4 px-5 text-sm font-bold text-foreground">Lamp No.</th>
                      <th className="text-left py-4 px-5 text-sm font-bold text-foreground">Keycode</th>
                      <th className="text-left py-4 px-5 text-sm font-bold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction, index) => (
                      <tr
                        key={transaction.id}
                        className={`border-b border-border hover:bg-secondary/50 transition-colors ${
                          index % 2 === 0 ? "bg-card" : "bg-muted/30"
                        }`}
                      >
                        <td className="py-4 px-5 text-sm text-foreground font-medium">{transaction.date}</td>
                        <td className="py-4 px-5 text-sm font-bold text-foreground">
                          ₦{transaction.amount.toLocaleString()}
                        </td>
                        <td className="py-4 px-5 text-sm text-primary font-semibold">{transaction.lampNo}</td>
                        <td className="py-4 px-5 text-sm text-cyan-600 font-mono min-w-[150px]">
                          {transaction.keycode}
                        </td>
                        <td className="py-4 px-5">
                          <span
                            className={`text-sm font-semibold px-3 py-1 rounded-lg ${
                              transaction.status === "Successful"
                                ? "bg-success-light text-success"
                                : "bg-error-light text-error"
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

      {/* Image Grid Carousel */}
      <div className="bg-card rounded-2xl p-4 border-2 border-border shadow-lg">
        <div className="relative overflow-hidden rounded-xl">
          <div className="relative h-40 overflow-hidden">
            {slides.map((slideImages, slideIndex) => (
              <div
                key={slideIndex}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  slideIndex === currentSlideIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="grid grid-cols-2 gap-4 h-full p-2">
                  {slideImages.map((image) => (
                    <div key={image.id} className="relative rounded-xl overflow-hidden group border border-border">
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-secondary to-muted transition-transform duration-300 group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${image.src}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent"></div>
                      </div>

                      <div className="relative h-full p-4 flex flex-col justify-end z-10">
                        <h3 className="text-sm font-bold text-white mb-1 drop-shadow-md line-clamp-1">{image.title}</h3>
                        <p className="text-white/90 text-xs drop-shadow-md line-clamp-2">{image.description}</p>
                        <button className="mt-2 bg-primary/90 hover:bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors w-fit">
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
                className={`h-2.5 rounded-full transition-all ${
                  index === currentSlideIndex
                    ? "bg-primary w-7"
                    : "bg-muted-foreground/40 hover:bg-muted-foreground w-2.5"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center rounded-xl bg-card/90 hover:bg-card text-foreground transition-all shadow-lg border border-border"
            aria-label="Previous slide"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center rounded-xl bg-card/90 hover:bg-card text-foreground transition-all shadow-lg border border-border"
            aria-label="Next slide"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
