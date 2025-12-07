"use client"

import { useState, useEffect } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

interface Product {
  id: number
  name: string
  description: string
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Solar Panel Kit",
    description: "Complete 300W solar panel setup with inverter and battery storage",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "LED Lighting System",
    description: "Energy-efficient LED lights with smart control for homes and offices",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop",
  },
]

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? products.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === products.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <div className="bg-gradient-to-br from-secondary via-muted to-secondary rounded-2xl p-4 md:p-6 relative overflow-hidden h-full border-2 border-border shadow-xl shadow-primary/5">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(247 216 26 / 0.3) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">Check Out More Products</h2>
          <p className="text-sm text-muted-foreground">Discover our solar energy solutions</p>
        </div>

        {/* Carousel Container */}
        <div className="flex-grow relative bg-card rounded-xl shadow-lg overflow-hidden border-2 border-border">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-xl bg-card/90 hover:bg-card text-foreground flex items-center justify-center z-10 transition-all shadow-lg border border-border"
            title="Previous product"
            aria-label="Previous product"
          >
            <HiChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-xl bg-card/90 hover:bg-card text-foreground flex items-center justify-center z-10 transition-all shadow-lg border border-border"
            title="Next product"
            aria-label="Next product"
          >
            <HiChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Slides */}
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 h-full">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Product Image */}
                    <div className="h-1/2 md:h-full md:w-1/2 overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="h-1/2 md:h-full md:w-1/2 p-5 md:p-6 flex flex-col justify-center bg-gradient-to-br from-card to-muted/30">
                      <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-primary font-bold text-lg">From ₦45,000</span>
                        <button
                          className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground font-semibold py-2.5 px-5 rounded-xl transition-all text-sm shadow-lg"
                          title={`Learn more about ${product.name}`}
                          aria-label={`Learn more about ${product.name}`}
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          {/* Dots */}
          <div className="flex space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-7" : "bg-muted-foreground/40 hover:bg-muted-foreground w-2.5"
                }`}
                title={`Go to product ${index + 1}`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>

          {/* View More Link */}
          <a
            href="/products"
            className="text-sm text-primary hover:text-accent font-semibold flex items-center gap-1 transition-colors"
            title="View all products"
            aria-label="View all products"
          >
            View More
            <HiChevronRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
