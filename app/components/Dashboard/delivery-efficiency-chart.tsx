"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const chartData = [
  { name: "On-Time", value: 83, color: "#C9FCFB" },
  { name: "Delayed", value: 12, color: "#f59e0b" },
  { name: "Cancelled", value: 5, color: "#6b7280" },
]

export function DeliveryEfficiencyChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: chartData.map((d) => d.name),
        datasets: [
          {
            data: chartData.map((d) => d.value),
            backgroundColor: chartData.map((d) => d.color),
            borderWidth: 0,
            spacing: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
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
    <div className="bg-white rounded-xl p-4 border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Efficiency</h3>
      <div className="flex items-center gap-4">
        <div className="w-[120px] h-[120px]">
          <canvas ref={chartRef} />
        </div>
        <div className="space-y-2">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-gray-600">{item.name}</span>
              <span className="text-xs font-semibold text-gray-900 ml-auto">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
