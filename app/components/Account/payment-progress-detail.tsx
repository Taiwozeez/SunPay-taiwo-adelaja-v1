"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function PaymentProgressDetail() {
  const [progress] = useState(5.9)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white rounded-2xl border border-amber-100 shadow-lg overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 p-6 border-b border-amber-100">
        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-2">
          Payment Progress
        </motion.h2>
        <motion.p variants={itemVariants} className="text-gray-600">
          Track your payment journey towards full ownership
        </motion.p>
      </div>

      <div className="p-6">
        {/* Progress Visualization at the Top */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
          {/* Progress Circle - Larger */}
          <div className="relative w-64 h-64 mb-6">
            {/* Background Circle */}
            <div className="absolute inset-0 rounded-full border-[12px] border-gray-100" />

            {/* Progress Arc */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="progressGradientLarge" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <filter id="glowLarge" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#progressGradientLarge)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - progress / 100) }}
                transition={{
                  type: "spring" as const,
                  stiffness: 100,
                  damping: 20,
                  delay: 0.5,
                }}
                transform="rotate(-90 50 50)"
                filter="url(#glowLarge)"
              />
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 200,
                  damping: 15,
                  delay: 0.7,
                }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-gray-900 mb-1">{progress}%</div>
                <div className="text-sm text-gray-500">Complete</div>
              </motion.div>
            </div>
          </div>

          {/* Progress Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-200 mb-6"
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-green-500" />
            <span className="text-sm font-medium text-gray-700">$9,000 paid of $153,000 total</span>
          </motion.div>

          {/* Progress Bar */}
          <motion.div variants={itemVariants} className="w-full max-w-md">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>$0</span>
              <span>$153,000</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-orange-400 via-amber-400 to-green-400 rounded-full relative"
              >
                <motion.div
                  animate={{
                    boxShadow: ["0 0 0 0 rgba(245, 158, 11, 0.7)", "0 0 0 8px rgba(245, 158, 11, 0)"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 0.5,
                  }}
                  className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-amber-500 rounded-full"
                />
              </motion.div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-medium text-amber-600">Paid: $9,000</span>
              <span className="text-sm text-gray-500">Remaining: $144,000</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid - Better arranged in 2x2 layout */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Minimum Payment Card */}
            <motion.div
              variants={statItemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-xl border border-amber-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Minimum Payment</div>
                  <div className="text-xs text-gray-500">Monthly minimum due</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">$2,400</div>
            </motion.div>

            {/* Unlock Price Card */}
            <motion.div
              variants={statItemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Unlock Price</div>
                  <div className="text-xs text-gray-500">Full ownership amount</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">$153,000</div>
            </motion.div>

            {/* Nominal Term Card */}
            <motion.div
              variants={statItemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Nominal Term</div>
                  <div className="text-xs text-gray-500">1 year, 1 month, 24 days</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">420 days</div>
            </motion.div>

            {/* Total Paid Card */}
            <motion.div
              variants={statItemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-50 to-violet-50 p-5 rounded-xl border border-purple-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
                    <path d="M12 2v2m0 16v2" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Total Paid</div>
                  <div className="text-xs text-gray-500">Amount paid so far</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">$9,000</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Outstanding Balance Card - Moved Below and Smaller */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="relative overflow-hidden rounded-xl border border-amber-200">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-yellow-50" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="absolute h-full bg-gradient-to-r from-amber-200/30 to-yellow-200/30"
            />
            <div className="relative p-5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Outstanding Balance</div>
                  <div className="text-2xl font-bold text-gray-900">$144,000</div>
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl">
                  ⚡
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium text-amber-600">Remaining balance</span> to unlock full ownership
              </div>
            </div>
          </div>
        </motion.div>

        {/* Make Payment Button - Smaller */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-semibold py-3 px-8 rounded-xl transition-all shadow-md text-sm"
          >
            Make Payment
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}