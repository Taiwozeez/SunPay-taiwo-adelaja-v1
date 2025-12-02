"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const companies = [
  { name: "TechCorp", value: 92 },
  { name: "Innovate Labs", value: 88 },
  { name: "Digital Solutions", value: 76 },
  { name: "Startup Hub", value: 64 },
  { name: "CreativeWorks", value: 56 },
]

export function CompanyEngagement() {
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
      type: "bar",
      data: {
        labels: companies.map((c) => c.name),
        datasets: [
          {
            label: "Participation",
            data: companies.map((c) => c.value),
            backgroundColor: "#14b8a6",
            borderRadius: 4,
            barThickness: 16,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#9ca3af", font: { size: 12 } },
            max: 100,
          },
          y: {
            grid: { display: false },
            ticks: { color: "#9ca3af", font: { size: 12 } },
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
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Company Engagement</h3>
      <p className="text-xs text-gray-500 mb-4">Top companies by queue participation</p>
      <div className="h-[200px] w-full">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}
