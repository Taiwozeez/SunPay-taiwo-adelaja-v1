"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Generic solar product interface
interface SolarProduct {
  id: number
  name: string
  type: string
  imagePath: string // Your actual image path
  status: string
  batteryLevel?: number // Optional for products without battery
  lastCharged?: string
  dailyConsumption?: number // kWh
  dailyGeneration?: number // kWh
  gridUsage?: number // kWh
  currentLoad?: number // kW
  efficiency?: number // percentage
  temperature?: number // °C
  voltage?: number // V
  cycles?: number
  chargeRate?: number // kW
  dischargeRate?: number // kW
  health?: number // percentage
}

// Chart data union type
type ChartDataItem = 
  | { time: string; value: number; secondaryValue: number }
  | { day: string; value: number; secondaryValue: number }

// Current customer's device - PowerPlay Pro
const currentCustomerDevice: SolarProduct = {
  id: 1,
  name: "PowerPlay Pro",
  type: "Solar Inverter System",
  imagePath: "/images/powerplay.jpg", // Your actual image path
  status: "System Active",
  batteryLevel: 85,
  lastCharged: "2 hours ago",
  dailyConsumption: 12.5, // kWh
  dailyGeneration: 8.2, // kWh
  gridUsage: 4.3, // kWh
  currentLoad: 2.1, // kW
  efficiency: 94, // percentage
  temperature: 36, // °C
  voltage: 240, // V
  cycles: 1250
}

export function SolarProductStatus() {
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly">("daily")
  const [currentTime, setCurrentTime] = useState("")
  const [imageError, setImageError] = useState(false)
  
  // Using current customer's device
  const product = currentCustomerDevice

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [])

  // Calculate battery color
  const getBatteryColor = (percentage: number) => {
    if (percentage >= 75) return "#10b981" // Green
    if (percentage >= 50) return "#f59e0b" // Amber
    if (percentage >= 25) return "#f97316" // Orange
    return "#ef4444" // Red
  }

  // Generate chart data based on time frame
  const generateChartData = (): ChartDataItem[] => {
    if (timeFrame === "daily") {
      return Array.from({ length: 12 }, (_, i) => {
        const hour = (i * 2 + 6) % 24
        const baseValue = product.dailyConsumption ? product.dailyConsumption : product.dailyGeneration || 0
        const value = Math.sin(i * 0.5) * 2 + baseValue / 6
        return {
          time: `${hour}:00`,
          value: Math.max(0, value),
          secondaryValue: product.dailyGeneration ? 
            Math.max(0, (product.dailyGeneration / 6) * (1 + Math.sin(i * 0.7) * 0.5)) : 0
        }
      })
    } else {
      // Weekly data - FIXED: removed unused 'i' parameter
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
        day,
        value: (product.dailyConsumption || product.dailyGeneration || 0) * (0.8 + Math.random() * 0.4),
        secondaryValue: product.dailyGeneration ? 
          (product.dailyGeneration || 0) * (0.7 + Math.random() * 0.6) : 0
      }))
    }
  }

  const chartData = generateChartData()

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* LARGE PRODUCT IMAGE AT THE VERY TOP */}
      <div className="relative w-full h-48 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        {/* Product Image - Centered and Prominent */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {/* Device Image Container */}
          <div className="relative w-40 h-40 bg-white rounded-2xl flex items-center justify-center p-4 border-2 border-amber-200 shadow-lg">
            {!imageError ? (
              // Using Next.js Image component for optimized images
              <div className="relative w-full h-full">
                <Image 
                  src={product.imagePath} 
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  priority
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              // Fallback icon if image fails to load
              <div className="flex flex-col items-center justify-center">
                <div className="text-5xl mb-2">
                  {product.type.includes("Inverter") ? "⚡" : 
                   product.type.includes("Panel") ? "☀️" : 
                   product.type.includes("Battery") ? "🔋" : "⚡"}
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Image unavailable
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Device Name Badge at Top */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-medium text-emerald-700">{product.status}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Updated: {currentTime}</p>
          </div>
        </div>
        
        {/* Device Type Badge at Bottom */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full">
            <p className="text-sm font-medium">{product.type}</p>
          </div>
        </div>
      </div>

      {/* Content below the image */}
      <div className="p-5">
        {/* Real-time Status Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Battery Level with Visualization (if applicable) */}
          {product.batteryLevel !== undefined && (
            <div className="col-span-2 bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Battery Status</span>
                  {product.lastCharged && (
                    <span className="text-xs text-gray-500">• Last charged: {product.lastCharged}</span>
                  )}
                </div>
                <span className="text-sm font-bold" style={{ color: getBatteryColor(product.batteryLevel) }}>
                  {product.batteryLevel}%
                </span>
              </div>
              
              {/* Battery Visual */}
              <div className="relative mt-3">
                {/* Battery outline */}
                <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${product.batteryLevel}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full rounded-lg"
                    style={{ backgroundColor: getBatteryColor(product.batteryLevel) }}
                  />
                </div>
                {/* Battery tip */}
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-4 bg-gray-300 rounded-r"></div>
              </div>
              
              {/* Battery markers */}
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Primary Metric */}
          <div className={`rounded-xl p-3 border ${
            product.dailyConsumption 
              ? "bg-gradient-to-br from-blue-50 to-white border-blue-200"
              : "bg-gradient-to-br from-amber-50 to-white border-amber-200"
          }`}>
            <div className="flex items-center justify-between mb-1">
              <p className={`text-xs font-medium ${
                product.dailyConsumption ? "text-blue-700" : "text-amber-700"
              }`}>
                {product.dailyConsumption ? "Daily Consumption" : "Daily Generation"}
              </p>
              <div className={`w-2 h-2 rounded-full ${
                product.dailyConsumption ? "bg-blue-500" : "bg-amber-500"
              } animate-pulse`}></div>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {product.dailyConsumption || product.dailyGeneration} 
              <span className="text-sm text-gray-500 ml-1">kWh</span>
            </p>
          </div>

          {/* Secondary Metric */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">
              {product.gridUsage ? "Grid Usage" : 
               product.efficiency ? "Efficiency" : 
               product.chargeRate ? "Charge Rate" : 
               product.currentLoad ? "Current Load" : "Voltage"}
            </p>
            <p className="text-lg font-bold text-gray-900">
              {product.gridUsage || product.efficiency || product.chargeRate || product.currentLoad || product.voltage}
              <span className="text-sm text-gray-500 ml-1">
                {product.gridUsage || product.currentLoad || product.chargeRate ? "kW" : 
                 product.efficiency || product.batteryLevel ? "%" : 
                 product.voltage ? "V" : ""}
              </span>
            </p>
          </div>
        </div>

        {/* Energy Graph */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">
              {timeFrame === "daily" ? "Today's Energy" : "This Week's Energy"}
            </h4>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTimeFrame("daily")}
                className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
                  timeFrame === "daily"
                    ? "bg-amber-100 text-amber-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                aria-label="Show daily view"
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setTimeFrame("weekly")}
                className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
                  timeFrame === "weekly"
                    ? "bg-amber-100 text-amber-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                aria-label="Show weekly view"
              >
                Weekly
              </button>
            </div>
          </div>

          {/* Dual Bar Chart (for generation vs consumption) */}
          <div className="h-32 flex items-end gap-1">
            {chartData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center relative">
                {/* Consumption bar (if applicable) */}
                {product.dailyConsumption && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(100, (item.value / 5) * 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="w-3/4 bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg"
                  />
                )}
                
                {/* Generation bar */}
                {product.dailyGeneration && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(100, (item.secondaryValue / 5) * 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.05 + 0.2 }}
                    className="w-3/4 bg-gradient-to-t from-amber-400 to-amber-300 rounded-t-lg mt-1"
                  />
                )}
                
                {/* Single bar for products without generation */}
                {!product.dailyGeneration && !product.dailyConsumption && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(100, (item.value / 5) * 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="w-full bg-gradient-to-t from-amber-400 to-amber-300 rounded-t-lg"
                  />
                )}
                
                <span className="text-xs text-gray-500 mt-1">
                  {timeFrame === "daily" 
                    ? (item as { time: string }).time.split(":")[0] 
                    : (item as { day: string }).day
                  }
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Status Info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4 flex-wrap">
            {product.currentLoad && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Load: {product.currentLoad} kW
              </span>
            )}
            {product.temperature && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Temp: {product.temperature}°C
              </span>
            )}
            {product.cycles && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Cycles: {product.cycles}
              </span>
            )}
            {product.health && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Health: {product.health}%
              </span>
            )}
          </div>
          <button 
            type="button"
            className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded"
            aria-label="View device details"
          >
            View Details
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}