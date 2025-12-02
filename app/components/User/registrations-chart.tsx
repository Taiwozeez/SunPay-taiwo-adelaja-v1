"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { day: "Mon", registrations: 20 },
  { day: "Tue", registrations: 30 },
  { day: "Wed", registrations: 40 },
  { day: "Thu", registrations: 30 },
  { day: "Fri", registrations: 28 },
  { day: "Sat", registrations: 38 },
  { day: "Sun", registrations: 10 },
]

export function RegistrationsChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((d) => d.day),
        datasets: [
          {
            label: "New Registrations",
            data: data.map((d) => d.registrations),
            backgroundColor: "#00D9CC",
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: "x" as const,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 40,
            ticks: {
              stepSize: 10,
              color: "#999",
            },
            grid: {
              color: "#f0f0f0",
              drawBorder: false,
            },
          },
          x: {
            ticks: {
              color: "#999",
            },
            grid: {
              display: false,
            },
          },
        },
      },
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  return (
    <Card className="bg-white border border-gray-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">New User Registrations</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80">
          <canvas ref={canvasRef} />
        </div>
      </CardContent>
    </Card>
  )
}
