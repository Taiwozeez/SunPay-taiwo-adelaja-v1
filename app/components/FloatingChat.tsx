"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingChat() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1000)
    const hideTimer = setTimeout(() => setShowMessage(false), 7000)
    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  // Animation variants
const messageVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    x: 50,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const
    }
  }
};

  const chatButtonVariants = {
    rest: {
      scale: 1,
      y: 0,
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  const pulseVariants = {
    pulse1: {
      scale: [1, 1.5, 1],
      opacity: [0.4, 0, 0.4],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }
    },
    pulse2: {
      scale: [1, 1.8, 1],
      opacity: [0.5, 0, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
        delay: 0.3
      }
    }
  }

  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 flex items-end space-x-2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.5
      }}
    >
      {/* Pop-out message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="bg-white text-gray-900 shadow-lg rounded-xl px-4 py-2 text-sm font-medium flex items-center gap-2"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.span 
              className="text-lg"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              👋
            </motion.span>
            <span>Hi, need help?</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Icon with enhanced Radar Ping */}
      <Link href="/help" aria-label="Go to Help page">
        <motion.div 
          className="relative flex items-center justify-center"
          animate={floatAnimation}
        >
          {/* First (larger) radar ping */}
          <motion.span 
            className="absolute inline-flex h-16 w-16 rounded-full bg-yellow-400 opacity-40"
            variants={pulseVariants}
            animate="pulse1"
          />
          {/* Second (smaller) radar ping */}
          <motion.span 
            className="absolute inline-flex h-12 w-12 rounded-full bg-yellow-400 opacity-50"
            variants={pulseVariants}
            animate="pulse2"
          />
          
          <motion.button 
            className="relative z-10 bg-yellow-400 text-gray-900 rounded-full p-3 shadow-lg"
            variants={chatButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate={{
              boxShadow: [
                "0 10px 25px rgba(0, 0, 0, 0.15)",
                "0 15px 35px rgba(245, 158, 11, 0.3)",
                "0 10px 25px rgba(0, 0, 0, 0.15)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ 
                scale: 1.1,
                rotate: 5
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </Link>
    </motion.div>
  )
}