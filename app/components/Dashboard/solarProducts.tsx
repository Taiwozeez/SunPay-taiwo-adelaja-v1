"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { HiChevronRight } from "react-icons/hi"
import { IoFlash, IoBatteryCharging } from "react-icons/io5"
import { WiDaySunny } from "react-icons/wi"

interface SolarProduct {
  id: number
  name: string
  type: string
  imagePath: string
  status: string
  batteryLevel?: number
  lastCharged?: string
  dailyConsumption?: number
  dailyGeneration?: number
  gridUsage?: number
  currentLoad?: number
  efficiency?: number
  temperature?: number
  voltage?: number
  cycles?: number
  chargeRate?: number
  dischargeRate?: number
  health?: number
}

type ChartDataItem =
  | { time: string; value: number; secondaryValue: number }
  | { day: string; value: number; secondaryValue: number }

const currentCustomerDevice: SolarProduct = {
  id: 1,
  name: "PowerPlay Pro",
  type: "Solar Inverter System",
  imagePath: "/images/powerplay.jpg",
  status: "System Active",
  batteryLevel: 85,
  lastCharged: "2 hours ago",
  dailyConsumption: 12.5,
  dailyGeneration: 8.2,
  gridUsage: 4.3,
  currentLoad: 2.1,
  efficiency: 94,
  temperature: 36,
  voltage: 240,
  cycles: 1250,
}

export function SolarProductStatus() {
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly">("daily")
  const [currentTime, setCurrentTime] = useState("")
  const [imageError, setImageError] = useState(false)

  const product = currentCustomerDevice

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  const getBatteryColor = (percentage: number) => {
    if (percentage >= 75) return "#16A34A"
    if (percentage >= 50) return "#F7D81A"
    if (percentage >= 25) return "#EA580C"
    return "#DC2626"
  }

  const generateChartData = (): ChartDataItem[] => {
    if (timeFrame === "daily") {
      return Array.from({ length: 12 }, (_, i) => {
        const hour = (i * 2 + 6) % 24
        const baseValue = product.dailyConsumption ? product.dailyConsumption : product.dailyGeneration || 0
        const value = Math.sin(i * 0.5) * 2 + baseValue / 6
        return {
          time: `${hour}:00`,
          value: Math.max(0, value),
          secondaryValue: product.dailyGeneration
            ? Math.max(0, (product.dailyGeneration / 6) * (1 + Math.sin(i * 0.7) * 0.5))
            : 0,
        }
      })
    } else {
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
        day,
        value: (product.dailyConsumption || product.dailyGeneration || 0) * (0.8 + Math.random() * 0.4),
        secondaryValue: product.dailyGeneration ? (product.dailyGeneration || 0) * (0.7 + Math.random() * 0.6) : 0,
      }))
    }
  }

  const chartData = generateChartData()

  const getDeviceIcon = () => {
    if (product.type.includes("Inverter")) return <IoFlash className="text-4xl text-primary" />
    if (product.type.includes("Panel")) return <WiDaySunny className="text-5xl text-primary" />
    if (product.type.includes("Battery")) return <IoBatteryCharging className="text-4xl text-primary" />
    return <IoFlash className="text-4xl text-primary" />
  }

  return (
    <div className="bg-card rounded-2xl border-2 border-border shadow-xl shadow-primary/5 overflow-hidden">
      {/* Product Image Header */}
      <div className="relative w-full h-48 bg-gradient-to-br from-secondary via-muted to-secondary">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative w-40 h-40 bg-card rounded-2xl flex items-center justify-center p-4 border-2 border-border shadow-xl">
            {!imageError ? (
              <div className="relative w-full h-full">
                <Image
                  src={product.imagePath || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  priority
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                {getDeviceIcon()}
                <p className="text-xs text-muted-foreground text-center mt-2">Image unavailable</p>
              </div>
            )}
          </div>
        </div>

        {/* Device Name Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="bg-card/95 backdrop-blur-sm px-4 py-2 rounded-xl border border-border shadow-sm">
            <h3 className="text-sm font-bold text-foreground">{product.name}</h3>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-success-light border border-success/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              <span className="text-sm font-semibold text-success">{product.status}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Updated: {currentTime}</p>
          </div>
        </div>

        {/* Device Type Badge */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-foreground/80 backdrop-blur-sm text-card px-5 py-2 rounded-xl">
            <p className="text-sm font-semibold">{product.type}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Status Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Battery Level */}
          {product.batteryLevel !== undefined && (
            <div className="col-span-2 bg-muted rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Battery Status</span>
                  {product.lastCharged && (
                    <span className="text-xs text-muted-foreground">• Last charged: {product.lastCharged}</span>
                  )}
                </div>
                <span className="text-sm font-bold" style={{ color: getBatteryColor(product.batteryLevel) }}>
                  {product.batteryLevel}%
                </span>
              </div>

              <div className="relative mt-3">
                <div className="w-full h-8 bg-card rounded-lg overflow-hidden border border-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${product.batteryLevel}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full rounded-lg"
                    style={{ backgroundColor: getBatteryColor(product.batteryLevel) }}
                  />
                </div>
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2.5 h-5 bg-muted-foreground/40 rounded-r"></div>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Primary Metric */}
          <div
            className={`rounded-xl p-4 border ${
              product.dailyConsumption ? "bg-blue-50 border-blue-200" : "bg-secondary border-border"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <p className={`text-xs font-semibold ${product.dailyConsumption ? "text-blue-700" : "text-primary"}`}>
                {product.dailyConsumption ? "Daily Consumption" : "Daily Generation"}
              </p>
              <div
                className={`w-2 h-2 rounded-full ${
                  product.dailyConsumption ? "bg-blue-500" : "bg-primary"
                } animate-pulse`}
              ></div>
            </div>
            <p className="text-lg font-bold text-foreground">
              {product.dailyConsumption || product.dailyGeneration}
              <span className="text-sm text-muted-foreground ml-1">kWh</span>
            </p>
          </div>

          {/* Secondary Metric */}
          <div className="bg-muted rounded-xl p-4 border border-border">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              {product.gridUsage
                ? "Grid Usage"
                : product.efficiency
                  ? "Efficiency"
                  : product.chargeRate
                    ? "Charge Rate"
                    : product.currentLoad
                      ? "Current Load"
                      : "Voltage"}
            </p>
            <p className="text-lg font-bold text-foreground">
              {product.gridUsage || product.efficiency || product.chargeRate || product.currentLoad || product.voltage}
              <span className="text-sm text-muted-foreground ml-1">
                {product.gridUsage || product.currentLoad || product.chargeRate
                  ? "kW"
                  : product.efficiency || product.batteryLevel
                    ? "%"
                    : product.voltage
                      ? "V"
                      : ""}
              </span>
            </p>
          </div>
        </div>

        {/* Energy Graph */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">
              {timeFrame === "daily" ? "Today's Energy" : "This Week's Energy"}
            </h4>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTimeFrame("daily")}
                className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${
                  timeFrame === "daily"
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-label="Show daily view"
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setTimeFrame("weekly")}
                className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${
                  timeFrame === "weekly"
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-label="Show weekly view"
              >
                Weekly
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="h-32 flex items-end gap-1.5 bg-muted/50 rounded-xl p-3 border border-border">
            {chartData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center relative">
                {product.dailyConsumption && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(100, (item.value / 5) * 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="w-3/4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"
                  />
                )}

                {product.dailyGeneration && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(100, (item.secondaryValue / 5) * 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.05 + 0.2 }}
                    className="w-3/4 bg-gradient-to-t from-primary to-accent rounded-t-md mt-1"
                  />
                )}

                {!product.dailyGeneration && !product.dailyConsumption && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(100, (item.value / 5) * 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="w-full bg-gradient-to-t from-primary to-accent rounded-t-md"
                  />
                )}

                <span className="text-[10px] text-muted-foreground mt-1 font-medium">
                  {timeFrame === "daily"
                    ? (item as { time: string }).time.split(":")[0]
                    : (item as { day: string }).day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Status */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4 flex-wrap">
            {product.currentLoad && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="font-medium">Load: {product.currentLoad} kW</span>
              </span>
            )}
            {product.temperature && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-medium">Temp: {product.temperature}°C</span>
              </span>
            )}
            {product.cycles && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span className="font-medium">Cycles: {product.cycles}</span>
              </span>
            )}
            {product.health && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="font-medium">Health: {product.health}%</span>
              </span>
            )}
          </div>
          <button
            type="button"
            className="text-primary hover:text-accent text-sm font-semibold flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded transition-colors"
            aria-label="View device details"
          >
            View Details
            <HiChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
