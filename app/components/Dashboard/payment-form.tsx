"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PaymentForm() {
  const [payWith, setPayWith] = useState<"card" | "virtualAccount">("card")
  const [lampNo, setLampNo] = useState("")
  const [amount, setAmount] = useState("")
  const [virtualAccount, setVirtualAccount] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [waveKey, setWaveKey] = useState(0)
  const [copied, setCopied] = useState(false)

  // Wave animation effect every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveKey(prev => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Function to generate a random 10-digit account number with loading state
  const generateVirtualAccount = () => {
    if (isGenerating) return
    
    setIsGenerating(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const account = Math.floor(1000000000 + Math.random() * 9000000000).toString()
      setVirtualAccount(account)
      setIsGenerating(false)
    }, 1500)
  }

  // Calculate days until due date
  const dueDate = new Date("2025-12-22")
  const today = new Date()
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  // Handle copy to clipboard
  const handleCopyAccount = () => {
    if (!virtualAccount) return
    
    navigator.clipboard.writeText(virtualAccount)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Animation variants with proper TypeScript types
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  }

  const waveVariants = {
    wave: {
      rotate: [0, 14, -8, 14, -4, 10, 0],
      transition: {
        duration: 1,
        ease: "easeInOut" as const,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1]
      }
    },
    rest: {
      rotate: 0
    }
  }

  const buttonTap = {
    scale: 0.95
  }

  const switchVariants = {
    active: {
      scale: 1,
      backgroundColor: "#fbbf24",
      color: "#111827",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    },
    inactive: {
      scale: 1,
      backgroundColor: "#ffffff",
      color: "#4b5563",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      height: 0
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  const loadingVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear" as const
      }
    }
  }

  const copyButtonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }

  const pulseAnimation = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  const checkmarkVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 }
  }

  return (
    <div className="min-h-screen p-4 bg-white flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Welcome Message with Wave Animation - Mobile Responsive */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-6 sm:mb-8"
        >
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Hi, Taiwo Adelaja!
            </h1>
            <motion.div
              key={waveKey}
              variants={waveVariants}
              animate="wave"
              className="text-2xl sm:text-3xl"
              style={{ transformOrigin: "70% 70%" }}
            >
              👋
            </motion.div>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-xs sm:text-sm mb-1"
          >
            Make payment on your device
          </motion.p>
          
          {/* Due Date Reminder */}
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full mt-2"
          >
            <motion.div
              variants={pulseAnimation}
              initial="initial"
              animate="pulse"
              className="flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-xs font-medium text-amber-800">
                <span className="font-bold">{daysUntilDue} days left</span> • Due: 22-Dec-2025
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enter Lamp No. */}
        <motion.div 
          variants={itemVariants}
          className="mb-4 sm:mb-6"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter Lamp No.</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            placeholder="e.g. 003842109"
            value={lampNo}
            onChange={(e) => setLampNo(e.target.value)}
            className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-white"
          />
        </motion.div>

        {/* Enter Amount */}
        <motion.div 
          variants={itemVariants}
          className="mb-4 sm:mb-6"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter Amount</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            placeholder="₦0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-white"
          />
        </motion.div>

        {/* Pay With - Card first, Virtual Account second */}
        <motion.div 
          variants={itemVariants}
          className="mb-4 sm:mb-6"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Pay With</label>
          <motion.div 
            layout
            className="flex flex-col sm:flex-row rounded-xl overflow-hidden border border-gray-200 shadow-sm"
          >
            <motion.button
              layout
              variants={switchVariants}
              animate={payWith === "card" ? "active" : "inactive"}
              onClick={() => setPayWith("card")}
              whileTap={buttonTap}
              className="flex-1 py-3 text-sm font-medium transition-all relative"
            >
              <motion.span
                layoutId="paymentTab"
                className="absolute inset-0 bg-amber-400 rounded-lg"
                style={{ zIndex: -1 }}
              />
              <span className="relative z-10">Use Card</span>
            </motion.button>
            
            <motion.button
              layout
              variants={switchVariants}
              animate={payWith === "virtualAccount" ? "active" : "inactive"}
              onClick={() => {
                setPayWith("virtualAccount")
                if (!virtualAccount) {
                  generateVirtualAccount()
                }
              }}
              whileTap={buttonTap}
              className="flex-1 py-3 text-sm font-medium transition-all relative border-t sm:border-t-0 sm:border-l border-gray-200"
            >
              <motion.span
                layoutId="paymentTab"
                className="absolute inset-0 bg-amber-400 rounded-lg"
                style={{ zIndex: -1 }}
              />
              <span className="relative z-10 text-xs sm:text-sm">Generate Virtual Account</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Card Details */}
          {payWith === "card" && (
            <motion.div
              key="card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-6 sm:mb-8 overflow-hidden"
            >
              <motion.label 
                variants={itemVariants}
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Enter Card Details
              </motion.label>

              {/* Card Logos */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center gap-2 sm:gap-3 mb-4"
              >
                <motion.div
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="w-10 sm:w-12 h-7 sm:h-8 rounded-md overflow-hidden shadow-sm flex items-center justify-center bg-white p-1"
                >
                  <div className="relative w-full h-full">
                    <div className="w-full h-full bg-blue-900 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="w-10 sm:w-12 h-7 sm:h-8 rounded-md overflow-hidden shadow-sm flex items-center justify-center bg-white p-1"
                >
                  <div className="relative w-full h-full">
                    <div className="w-full h-full bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MC</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="w-10 sm:w-12 h-7 sm:h-8 rounded-md overflow-hidden shadow-sm flex items-center justify-center bg-white p-1"
                >
                  <div className="relative w-full h-full">
                    <div className="w-full h-full bg-blue-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VERVE</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Card Number */}
              <motion.input
                variants={itemVariants}
                whileFocus={{ scale: 1.01 }}
                type="text"
                placeholder="Card Number"
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-white"
              />

              {/* MM/YY and CVV */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  placeholder="MM/YY"
                  className="flex-1 px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-white"
                />
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  placeholder="CVV"
                  className="flex-1 px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-white mt-2 sm:mt-0"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Virtual Account Details - Enhanced Version */}
          {payWith === "virtualAccount" && (
            <motion.div
              key="virtualAccount"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-6 sm:mb-8 overflow-hidden"
            >
              <motion.div 
                className="border-2 border-amber-300 rounded-2xl bg-amber-50 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">Virtual Account Details</h3>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-base sm:text-lg">🏦</span>
                    </div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {isGenerating ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-6 sm:py-8"
                      >
                        <motion.div
                          variants={loadingVariants}
                          initial="initial"
                          animate="animate"
                          className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-amber-400 border-t-transparent rounded-full mb-4"
                        />
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-sm font-medium text-gray-700 text-center px-2"
                        >
                          Generating secure virtual account...
                        </motion.p>
                      </motion.div>
                    ) : virtualAccount ? (
                      <motion.div
                        key="account"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Account Information Card */}
                        <div className="space-y-4 sm:space-y-5">
                          {/* Account Number - Highlighted */}
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">Account Number</p>
                            <motion.div
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="relative"
                            >
                              <div className="bg-amber-100 rounded-xl p-3 sm:p-4 border-2 border-amber-300">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                  <div className="flex items-center gap-3 w-full">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                                      <span className="text-white text-sm font-bold">🏦</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-lg sm:text-xl font-bold font-mono text-gray-900 tracking-wider break-all">
                                        {virtualAccount}
                                      </div>
                                    </div>
                                    {/* Copy Button - Small on mobile, larger on desktop */}
                                    <div className="flex-shrink-0">
                                      <motion.button
                                        variants={copyButtonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        onClick={handleCopyAccount}
                                        className={`flex items-center justify-center gap-1 sm:gap-2 transition-all shadow-sm ${
                                          copied 
                                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                                            : 'bg-amber-500 hover:bg-amber-600 text-white'
                                        }`}
                                      >
                                        <AnimatePresence mode="wait">
                                          {copied ? (
                                            <motion.div
                                              key="copied"
                                              variants={checkmarkVariants}
                                              initial="initial"
                                              animate="animate"
                                              exit="exit"
                                              className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:px-3 sm:py-2 rounded-lg"
                                            >
                                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                              </svg>
                                              <span className="hidden sm:inline text-xs font-medium">Copied</span>
                                            </motion.div>
                                          ) : (
                                            <motion.div
                                              key="copy"
                                              variants={checkmarkVariants}
                                              initial="initial"
                                              animate="animate"
                                              exit="exit"
                                              className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:px-3 sm:py-2 rounded-lg"
                                            >
                                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                              </svg>
                                              <span className="hidden sm:inline text-xs font-medium">Copy</span>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </motion.button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </div>

                          {/* Bank and Account Name in responsive grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Bank Name</p>
                              <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                className="text-sm sm:text-base font-bold text-gray-900 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent"
                              >
                                Sunpay
                              </motion.div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Account Name</p>
                              <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                className="text-sm sm:text-base font-bold text-gray-900"
                              >
                                Taiwo Adelaja
                              </motion.div>
                            </div>
                          </div>
                        </div>

                        {/* Simple Instruction */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="mt-4 text-center"
                        >
                          <p className="text-xs text-gray-600 px-2">
                            Transfer the exact amount to this account for automatic confirmation
                          </p>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="generate"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-6 sm:py-8"
                      >
                        <motion.button
                          whileHover={{ 
                            scale: 1.05, 
                            boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.3)"
                          }}
                          whileTap={buttonTap}
                          onClick={generateVirtualAccount}
                          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-xl transition-all shadow-lg text-base sm:text-lg w-full sm:w-auto"
                        >
                          Generate Virtual Account
                        </motion.button>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-xs sm:text-sm text-gray-500 mt-4 max-w-md mx-auto px-2"
                        >
                          Create a secure virtual account number for your transaction
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Only show Pay button for card payments */}
        {payWith === "card" && (
          <motion.button
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)"
            }}
            whileTap={buttonTap}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-bold py-3 sm:py-4 rounded-xl transition-all shadow-md mb-4 text-base sm:text-lg"
          >
            Pay with Card
          </motion.button>
        )}

        {/* Report an Issue */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full text-center text-xs sm:text-sm text-amber-600 hover:text-amber-700 font-medium"
        >
          Report an Issue
        </motion.button>
      </motion.div>
    </div>
  )
}