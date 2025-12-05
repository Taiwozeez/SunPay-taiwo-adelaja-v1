"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

export function PaymentProgress() {
  const progress = 5.9
  
  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const progressBarVariants: Variants = {
    initial: { width: "0%" },
    animate: {
      width: `${progress}%`,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.3
      }
    }
  }

  const statItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  const pulseVariants: Variants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-xl font-bold text-gray-900 mb-6 text-center"
      >
        Payment Progress
      </motion.h2>

      {/* Main Progress Circle */}
      <motion.div 
        variants={itemVariants}
        className="relative w-48 h-48 mx-auto mb-8"
      >
        {/* Background Circle */}
        <div className="absolute inset-0 rounded-full border-8 border-gray-100" />
        
        {/* Progress Arc */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
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
            stroke="url(#progressGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - progress / 100) }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.5
            }}
            transform="rotate(-90 50 50)"
            filter="url(#glow)"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="pulse"
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.7
              }}
              className="text-4xl font-bold text-gray-900 mb-1"
            >
              {progress}%
            </motion.div>
            <div className="text-xs text-gray-500">Complete</div>
          </motion.div>
        </div>

        {/* Progress Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -bottom-6 left-0 right-0 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-medium text-gray-700">
              ₦9,000 paid • ₦153,000 total
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Grid - 2 columns layout */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <motion.div
          variants={statItemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 p-4 rounded-xl border border-gray-100"
        >
          <div className="text-xs text-gray-500 mb-1">Minimum Payment</div>
          <div className="text-lg font-bold text-gray-900">₦2,400</div>
          <div className="text-xs text-gray-400 mt-1">Monthly minimum</div>
        </motion.div>

        <motion.div
          variants={statItemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 p-4 rounded-xl border border-gray-100"
        >
          <div className="text-xs text-gray-500 mb-1">Unlock Price</div>
          <div className="text-lg font-bold text-gray-900">₦153,000</div>
          <div className="text-xs text-gray-400 mt-1">Full payment</div>
        </motion.div>

        <motion.div
          variants={statItemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 p-4 rounded-xl border border-gray-100"
        >
          <div className="text-xs text-gray-500 mb-1">Nominal Term</div>
          <div className="text-lg font-bold text-gray-900">420 days</div>
          <div className="text-xs text-gray-400 mt-1">1 year, 1 month, 24 days</div>
        </motion.div>

        <motion.div
          variants={statItemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 p-4 rounded-xl border border-gray-100"
        >
          <div className="text-xs text-gray-500 mb-1">Total Paid</div>
          <div className="text-lg font-bold text-gray-900">₦9,000</div>
          <div className="text-xs text-gray-400 mt-1">Amount paid so far</div>
        </motion.div>
      </motion.div>

      {/* Outstanding Balance - Full Width */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-yellow-50 opacity-50" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute h-full bg-gradient-to-r from-amber-200/20 to-yellow-200/20"
        />
        <div className="relative p-4 rounded-xl border border-amber-200 bg-white/50 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-gray-500 mb-1">Outstanding Balance</div>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 1
                }}
                className="text-2xl font-bold text-gray-900"
              >
                ₦144,000
              </motion.div>
            </div>
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 1.1
              }}
              className="text-2xl"
              aria-hidden="true"
            >
              ⚡
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-2 text-xs text-gray-600"
          >
            <span className="font-medium text-amber-600">Remaining balance</span> to unlock full ownership
          </motion.div>
        </div>
      </motion.div>

      {/* Progress Bar Visualization */}
      <motion.div
        variants={itemVariants}
        className="mt-6"
      >
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>₦0</span>
          <span>₦153,000</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            variants={progressBarVariants}
            initial="initial"
            animate="animate"
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full relative"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(245, 158, 11, 0.7)",
                  "0 0 0 6px rgba(245, 158, 11, 0)",
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
              className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-amber-500 rounded-full"
            />
          </motion.div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs font-medium text-amber-600">Paid: ₦9,000</span>
          <span className="text-xs text-gray-500">Total: ₦153,000</span>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.3)"
        }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-semibold py-3 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        type="button"
        aria-label="Make additional payment"
      >
        Make Additional Payment
      </motion.button>
    </motion.div>
  )
}