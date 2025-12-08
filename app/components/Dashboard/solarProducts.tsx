"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { HiChevronRight } from "react-icons/hi"
import { IoFlash, IoBatteryCharging } from "react-icons/io5"
import { WiDaySunny } from "react-icons/wi"
import Chart from "chart.js/auto"

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
  const [imageError, setImageError] = useState(false)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  const product = currentCustomerDevice

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    // Generate time labels for today
    const labels = Array.from({ length: 12 }, (_, i) => {
      const hour = (i * 2 + 6) % 24
      return `${hour}:00`
    })

    // Generate data points
    const consumptionData = labels.map((_, i) => {
      const baseValue = product.dailyConsumption || 0
      const value = Math.sin(i * 0.5) * 2 + baseValue / 6
      return Math.max(0, value)
    })

    const generationData = labels.map((_, i) => {
      if (!product.dailyGeneration) return 0
      return Math.max(0, (product.dailyGeneration / 6) * (1 + Math.sin(i * 0.7) * 0.5))
    })

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Consumption',
            data: consumptionData,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3b82f6',
            pointRadius: 2,
            pointHoverRadius: 4,
          },
          {
            label: 'Generation',
            data: generationData,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10b981',
            pointRadius: 2,
            pointHoverRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#f8fafc',
            bodyColor: '#f8fafc',
            borderColor: '#334155',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (context) => {
                const value = context.parsed.y ?? 0
                return `${context.dataset.label}: ${value.toFixed(2)} kWh`
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 10
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(148, 163, 184, 0.1)',
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 10
              },
              callback: function(value) {
                return value + ' kWh'
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  const getBatteryColor = (percentage: number) => {
    if (percentage >= 75) return "#16A34A"
    if (percentage >= 50) return "#F7D81A"
    if (percentage >= 25) return "#EA580C"
    return "#DC2626"
  }

  const getDeviceIcon = () => {
    if (product.type.includes("Inverter")) return <IoFlash className="text-4xl text-primary" />
    if (product.type.includes("Panel")) return <WiDaySunny className="text-5xl text-primary" />
    if (product.type.includes("Battery")) return <IoBatteryCharging className="text-4xl text-primary" />
    return <IoFlash className="text-4xl text-primary" />
  }

  return (
    <div className="bg-card rounded-2xl border-2 border-border shadow-xl shadow-primary/5 overflow-hidden">
      {/* Product Image Header */}
      <div className="relative w-full h-52 bg-gradient-to-br from-secondary via-muted to-secondary">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {/* Increased image size from w-40 h-40 to w-48 h-48 */}
          <div className="relative w-48 h-48 bg-card rounded-2xl flex items-center justify-center p-4 border-2 border-border shadow-xl">
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
            {/* Made status badge smaller - reduced padding and font size */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-success-light border border-success/30 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
              <span className="text-xs font-semibold text-success">{product.status}</span>
            </div>
            {/* Removed updated time */}
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
              Today&apos;s Energy
            </h4>
            {/* Removed weekly button */}
          </div>

          {/* Chart.js Chart */}
          <div className="h-48 bg-muted/30 rounded-xl p-4 border border-border relative">
            <canvas ref={chartRef} />
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