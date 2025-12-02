"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function OrderActivityChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    const canvas = chartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Order Created",
            data: [80, 120, 100, 140, 90, 110, 85],
            borderColor: "#C9FCFB",
            backgroundColor: "#C9FCFB",
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#C9FCFB",
          },
          {
            label: "Order Completed",
            data: [50, 90, 85, 100, 70, 95, 60],
            borderColor: "#f59e0b",
            backgroundColor: "#f59e0b",
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#f59e0b",
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
            ticks: { color: "#9ca3af", font: { size: 12 } },
          },
        },
      },
    })

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Order Activity</h3>
        <p className="text-xs text-gray-500">Last 7 days</p>
      </div>

      <div className="h-[200px] w-full">
        <canvas ref={chartRef} />
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#C9FCFB" }} />
          <span className="text-xs text-gray-600">Order Created</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-xs text-gray-600">Order Completed</span>
        </div>
      </div>
    </div>
  )
}
