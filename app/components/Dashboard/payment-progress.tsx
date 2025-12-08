"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { IoFlash } from "react-icons/io5"

export function PaymentProgress() {
  // Updated payment figures in Naira
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const progressBarVariants: Variants = {
    initial: { width: "0%" },
    animate: {
      width: `${progress}%`,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.3,
      },
    },
  }

  const statItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  }

  const pulseVariants: Variants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 0,
        ease: "easeInOut",
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

  // Helper function to format large numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-NG').format(num);
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-card rounded-2xl p-6 border-2 border-border shadow-xl shadow-primary/5"
    >
      <motion.h2 variants={itemVariants} className="text-xl font-bold text-foreground mb-6 text-center">
        Payment Progress
      </motion.h2>

      {/* Main Progress Circle */}
      <motion.div variants={itemVariants} className="relative w-48 h-48 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-8 border-muted" />

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#F7D81A" />
              <stop offset="100%" stopColor="#22c55e" />
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
            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - progress / 100) }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.5,
            }}
            transform="rotate(-90 50 50)"
            filter="url(#glow)"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div variants={pulseVariants} initial="initial" animate="pulse" className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.7,
              }}
              className="text-4xl font-bold text-foreground mb-1"
            >
              {progress.toFixed(1)}%
            </motion.div>
            <div className="text-xs text-muted-foreground font-medium">Complete</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -bottom-6 left-0 right-0 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-1.5 rounded-full border border-border">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-green-500" />
            <span className="text-xs font-semibold text-foreground">
              {formatNaira(totalPaid)} paid • {formatNaira(unlockPrice)} total
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          variants={statItemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200 hover:border-amber-300 transition-colors"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Minimum Payment</div>
          <div className="text-lg font-bold text-gray-900">{formatNaira(minimumPayment)}</div>
          <div className="text-xs text-gray-500 mt-1">Monthly minimum</div>
        </motion.div>

        <motion.div
          variants={statItemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 hover:border-green-300 transition-colors"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Unlock Price</div>
          <div className="text-lg font-bold text-gray-900">{formatNaira(unlockPrice)}</div>
          <div className="text-xs text-gray-500 mt-1">Full ownership</div>
        </motion.div>

        <motion.div
          variants={statItemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 hover:border-blue-300 transition-colors"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Nominal Term</div>
          <div className="text-lg font-bold text-gray-900">{remainingTermDays} days</div>
          <div className="text-xs text-gray-500 mt-1">{formatTerm(remainingTermDays)} remaining</div>
        </motion.div>

        <motion.div
          variants={statItemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200 hover:border-purple-300 transition-colors"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Total Paid</div>
          <div className="text-lg font-bold text-gray-900">{formatNaira(totalPaid)}</div>
          <div className="text-xs text-gray-500 mt-1">{paidMonths} payments made</div>
        </motion.div>
      </motion.div>

      {/* Outstanding Balance */}
      <motion.div variants={itemVariants} className="relative overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-muted opacity-50" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute h-full bg-gradient-to-r from-primary/10 to-accent/10"
        />
        <div className="relative p-4 rounded-xl border-2 border-border bg-card/80 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-muted-foreground font-medium mb-1">Outstanding Balance</div>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 1,
                }}
                className="text-2xl font-bold text-foreground"
              >
                {formatNaira(outstandingBalance)}
              </motion.div>
            </div>
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 1.1,
              }}
              aria-hidden="true"
            >
              <IoFlash className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-2 text-xs text-muted-foreground"
          >
            <span className="font-semibold text-primary">Remaining balance</span> to unlock full ownership
            <div className="mt-1 text-gray-600">
              At {formatNaira(minimumPayment)} per month: {remainingMonths} payments remaining
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2 font-medium">
          <span>₦0</span>
          <span>{formatNaira(unlockPrice)}</span>
        </div>
        <div className="h-3.5 bg-muted rounded-full overflow-hidden border border-border">
          <motion.div
            variants={progressBarVariants}
            initial="initial"
            animate="animate"
            className="h-full bg-gradient-to-r from-orange-400 via-primary to-green-400 rounded-full relative"
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
              className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-card border-3 border-primary rounded-full shadow-lg"
            />
          </motion.div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs font-semibold text-primary">Paid: {formatNaira(totalPaid)}</span>
          <span className="text-xs text-muted-foreground font-medium">Remaining: {formatNaira(outstandingBalance)}</span>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 15px 30px -5px rgba(247, 216, 26, 0.35)",
        }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground font-bold py-4 rounded-xl transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        type="button"
        aria-label="Make additional payment"
      >
        Make Additional Payment
      </motion.button>
    </motion.div>
  )
}