"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { HiUser, HiEye, HiEyeOff } from "react-icons/hi"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [isPhoneFocused, setIsPhoneFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const phoneRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  // Auto-focus phone input on mount
  useEffect(() => {
    phoneRef.current?.focus()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  const formVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        duration: 0.8,
        delay: 0.3,
      },
    },
  }

  const inputVariants = {
    focused: {
      y: -25,
      scale: 0.8,
      color: "#F7D81A",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      },
    },
    unfocused: {
      y: 0,
      scale: 1,
      color: "#6b7280",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      },
    },
  }

  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(247, 216, 26, 0.3), 0 2px 4px -1px rgba(247, 216, 26, 0.2)",
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(247, 216, 26, 0.4), 0 10px 10px -5px rgba(247, 216, 26, 0.2)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
    loading: {
      scale: 0.95,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const floatingParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }))

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/lady-phone.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-[#F7D81A] rounded-full opacity-20"
            style={{
              left: `${particle.x}%`,
              top: "-10px",
            }}
            animate={{
              y: [0, "100vh"],
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "linear" as const,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
          variants={formVariants}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#F7D81A] to-[#E5C816] p-8 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring" as const,
                stiffness: 200,
                damping: 15,
                delay: 0.5,
              }}
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <HiUser className="w-8 h-8 text-[#F7D81A]" />
              </div>
            </motion.div>
            <motion.h1
              className="text-3xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Welcome Back
            </motion.h1>
            <motion.p
              className="text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Sign in to your SunPay account
            </motion.p>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Number Input */}
              <div className="relative">
                <motion.label
                  htmlFor="phone"
                  variants={inputVariants}
                  animate={isPhoneFocused || phoneNumber ? "focused" : "unfocused"}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none origin-left bg-white px-2 text-gray-500 z-10"
                >
                  Phone Number
                </motion.label>
                <motion.input
                  ref={phoneRef}
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onFocus={() => setIsPhoneFocused(true)}
                  onBlur={() => setIsPhoneFocused(false)}
                  className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-4 text-gray-900 placeholder-transparent focus:border-[#F7D81A] focus:ring-2 focus:ring-[#F7D81A]/30 outline-none transition-all"
                  placeholder="Phone Number"
                  required
                />
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-[#F7D81A] pointer-events-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isPhoneFocused ? 1 : 0,
                    scale: isPhoneFocused ? 1 : 0.8,
                  }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <motion.label
                  htmlFor="password"
                  variants={inputVariants}
                  animate={isPasswordFocused || password ? "focused" : "unfocused"}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none origin-left bg-white px-2 text-gray-500 z-10"
                >
                  Password
                </motion.label>
                <motion.input
                  ref={passwordRef}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-4 pr-12 text-gray-900 placeholder-transparent focus:border-[#F7D81A] focus:ring-2 focus:ring-[#F7D81A]/30 outline-none transition-all"
                  placeholder="Password"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F7D81A] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <HiEye className="w-5 h-5" /> : <HiEyeOff className="w-5 h-5" />}
                </motion.button>
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-[#F7D81A] pointer-events-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isPasswordFocused ? 1 : 0,
                    scale: isPasswordFocused ? 1 : 0.8,
                  }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <motion.a
                  href="/forgot-password"
                  className="text-[#F7D81A] hover:text-[#E5C816] text-sm font-medium transition-colors"
                  whileHover={{ x: 2 }}
                >
                  Forgot Password?
                </motion.a>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                variants={buttonVariants}
                initial="initial"
                whileHover={!isLoading ? "hover" : undefined}
                whileTap={!isLoading ? "tap" : undefined}
                animate={isLoading ? "loading" : "initial"}
                className="w-full bg-gradient-to-r from-[#F7D81A] to-[#E5C816] text-gray-900 font-bold py-4 rounded-xl relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      className="flex items-center justify-center"
                    >
                      <motion.div
                        className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" as const }}
                      />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Sign In
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Button Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" as const }}
                />
              </motion.button>
            </form>

            {/* Sign Up Link */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-white/80">
                Don&apos;t have an account?{" "}
                <motion.a
                  href="/sign-up"
                  className="text-[#F7D81A] hover:text-[#E5C816] font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Sign Up
                </motion.a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
