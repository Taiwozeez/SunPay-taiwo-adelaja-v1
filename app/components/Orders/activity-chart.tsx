"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function OrdersActivityChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    const canvas = chartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Queue Orders",
            data: [100, 150, 180, 140, 160, 190, 50],
            backgroundColor: "#14B8A6",
            borderRadius: 4,
          },
          {
            label: "Individual Orders",
            data: [50, 80, 50, 100, 60, 50, 40],
            backgroundColor: "#f59e0b",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#9ca3af", font: { size: 12 } },
          },
          y: {
            grid: { color: "#e5e7eb" },
            ticks: { color: "#9ca3af", font: { size: 12 }, beginAtZero: true },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Order Activity</h3>
        <p className="text-xs text-gray-500">Last 7 days</p>
      </div>

      <div className="h-64 w-full">
        <canvas ref={chartRef} />
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-teal-500" />
          <span className="text-xs text-gray-600">Queue Orders</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-xs text-gray-600">Individual Orders</span>
        </div>
      </div>
    </div>
  )
}
