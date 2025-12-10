"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { HiCurrencyDollar, HiCheckCircle, HiCalendar, HiCash } from "react-icons/hi"

export function PaymentProgressDetail() {
  // Updated values in Naira
  const unlockPrice = 1500000; // ₦1,500,000
  const minimumPayment = 25000; // ₦25,000
  const totalPaid = 600000; // ₦600,000
  
  // Calculate progress and outstanding balance
  const progress = (totalPaid / unlockPrice) * 100;
  const outstandingBalance = unlockPrice - totalPaid;
  
  // Calculate remaining term in days (assuming monthly payments of minimum payment)
  const remainingMonths = Math.ceil(outstandingBalance / minimumPayment);
  const totalTermMonths = Math.ceil(unlockPrice / minimumPayment);
  const paidMonths = Math.floor(totalPaid / minimumPayment);
  const remainingTermDays = remainingMonths * 30; // Approximate 30 days per month
  
  const totalTermDays = totalTermMonths * 30;
  const termDisplay = formatTerm(remainingTermDays);

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

  // Helper function to format Naira amounts
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Helper function to format term
  function formatTerm(days: number) {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;
    
    const parts = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
    if (remainingDays > 0 || parts.length === 0) parts.push(`${remainingDays} day${remainingDays !== 1 ? 's' : ''}`);
    
    return parts.join(', ');
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-card rounded-2xl border-2 border-border shadow-xl shadow-primary/5 overflow-hidden"
    >
      {/* Header Section - themed background */}
      <div className="bg-secondary p-6 border-b-2 border-border">
        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-foreground mb-2">
          Payment Progress
        </motion.h2>
        <motion.p variants={itemVariants} className="text-muted-foreground">
          Track your payment journey towards full ownership
        </motion.p>
      </div>

      <div className="p-6">
        {/* Progress Visualization at the Top */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
          {/* Progress Circle - Larger */}
          <div className="relative w-64 h-64 mb-6">
            {/* Background Circle */}
            <div className="absolute inset-0 rounded-full border-[12px] border-muted" />

            {/* Progress Arc */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="progressGradientLarge" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#F7D81A" />
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
                <div className="text-5xl font-bold text-foreground mb-1">{progress.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </motion.div>
            </div>
          </div>

          {/* Progress Label - themed */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full border-2 border-border mb-6"
          >
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-sm font-medium text-foreground">
              {formatNaira(totalPaid)} paid of {formatNaira(unlockPrice)} total
            </span>
          </motion.div>

          {/* Progress Bar */}
          <motion.div variants={itemVariants} className="w-full max-w-md">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>₦0</span>
              <span>{formatNaira(unlockPrice)}</span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
                className="h-full bg-primary rounded-full relative"
              >
                <motion.div
                  animate={{
                    boxShadow: ["0 0 0 0 rgba(247, 216, 26, 0.7)", "0 0 0 8px rgba(247, 216, 26, 0)"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 0.5,
                  }}
                  className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-card border-2 border-primary rounded-full"
                />
              </motion.div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-medium text-primary">Paid: {formatNaira(totalPaid)}</span>
              <span className="text-sm text-muted-foreground">Remaining: {formatNaira(outstandingBalance)}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid - Better arranged in 2x2 layout - KEEPING COLORFUL */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Minimum Payment Card - Amber */}
            <motion.div
              variants={statItemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-amber-50 p-5 rounded-xl border border-amber-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <HiCurrencyDollar className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Minimum Payment</div>
                  <div className="text-xs text-gray-500">Monthly minimum due</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{formatNaira(minimumPayment)}</div>
            </motion.div>

            {/* Unlock Price Card - Green */}
            <motion.div
              variants={statItemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-green-50 p-5 rounded-xl border border-green-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Unlock Price</div>
                  <div className="text-xs text-gray-500">Full ownership amount</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{formatNaira(unlockPrice)}</div>
            </motion.div>

            {/* Nominal Term Card - Blue */}
            <motion.div
              variants={statItemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-blue-50 p-5 rounded-xl border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <HiCalendar className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Nominal Term</div>
                  <div className="text-xs text-gray-500">Based on minimum payments</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{remainingTermDays} days</div>
              <div className="text-xs text-gray-500 mt-1">{termDisplay} remaining</div>
            </motion.div>

            {/* Total Paid Card - Purple */}
            <motion.div
              variants={statItemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-purple-50 p-5 rounded-xl border border-purple-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <HiCash className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Total Paid</div>
                  <div className="text-xs text-gray-500">Amount paid so far</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{formatNaira(totalPaid)}</div>
              <div className="text-xs text-gray-500 mt-1">{paidMonths} months completed</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Outstanding Balance Card - themed */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="relative overflow-hidden rounded-xl border-2 border-border">
            <div className="absolute inset-0 bg-secondary" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="absolute h-full bg-primary/20"
            />
            <div className="relative p-5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Outstanding Balance</div>
                  <div className="text-2xl font-bold text-foreground">{formatNaira(outstandingBalance)}</div>
                </div>
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xl">⚡</div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-primary">Remaining balance</span> to unlock full ownership
              </div>
              <div className="mt-2 text-sm text-gray-600">
                At {formatNaira(minimumPayment)} per month: {remainingMonths} payments remaining
              </div>
            </div>
          </div>
        </motion.div>

        {/* Make Payment Button */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(247, 216, 26, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-xl transition-all shadow-md text-sm"
          >
            Make Payment
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}