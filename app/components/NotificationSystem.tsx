"use client"

import { useState, useEffect, useRef } from "react"

const notifications = [
  "Payment Successful",
  "New Offer Available",
  "Wallet Credited",
  "Subscription Due",
  "Security Alert",
]

// Create a type for the global function
declare global {
  interface Window {
    stopNotifications?: () => void
  }
}

export default function NotificationSystem() {
  const [currentNotif, setCurrentNotif] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [done, setDone] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto pop-out one-by-one on load
  useEffect(() => {
    if (!notifications.length) return
    
    let index = 0
    setAnimating(true)

    intervalRef.current = setInterval(() => {
      setAnimating(false)
      setTimeout(() => {
        index += 1
        if (index < notifications.length) {
          setCurrentNotif(index)
          setAnimating(true)
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          setDone(true)
        }
      }, 400)
    }, 3000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Stop notifications when component unmounts or user interacts
  const stopNotifications = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      setDone(true)
    }
  }

  // Export function to stop notifications from header
  useEffect(() => {
    // Make stop function available globally for header to call
    window.stopNotifications = stopNotifications
    return () => {
      delete window.stopNotifications
    }
  }, [])

  if (done) return null

  return (
    <div className="fixed top-20 right-6 w-56 z-50">
      <div
        className={`bg-white border border-gray-200 shadow-lg rounded-md text-sm font-medium text-gray-800 px-4 py-3 transition-all duration-500 ${
          animating ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        <div className="flex justify-between items-start">
          <span>{notifications[currentNotif]}</span>
          <button
            onClick={stopNotifications}
            className="text-gray-400 hover:text-gray-600 ml-2"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}