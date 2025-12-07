"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { HiUser, HiEye, HiEyeOff, HiCheck, HiX } from "react-icons/hi"

export default function SignUpPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPhoneFocused, setIsPhoneFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const phoneRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    strength += requirements.length ? 1 : 0
    strength += requirements.uppercase ? 1 : 0
    strength += requirements.lowercase ? 1 : 0
    strength += requirements.number ? 1 : 0
    strength += requirements.special ? 1 : 0

    return {
      strength,
      requirements,
      percentage: (strength / 5) * 100,
    }
  }

  const passwordStrength = getPasswordStrength(password)
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordStrength.strength < 3) {
      alert("Please choose a stronger password")
      return
    }

    if (!passwordsMatch) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate signup process
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

  const getStrengthColor = (percentage: number) => {
    if (percentage < 40) return "bg-red-500"
    if (percentage < 70) return "bg-[#F7D81A]"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength === 0) return "Very Weak"
    if (strength === 1) return "Weak"
    if (strength === 2) return "Fair"
    if (strength === 3) return "Good"
    if (strength === 4) return "Strong"
    return "Very Strong"
  }

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
              Create Account
            </motion.h1>
            <motion.p
              className="text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Join SunPay today
            </motion.p>
          </div>

          {/* Sign Up Form */}
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

              {/* Password Strength Indicator */}
              <AnimatePresence>
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white/80 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Password Strength</span>
                      <span
                        className={`text-sm font-bold ${
                          passwordStrength.strength < 2
                            ? "text-red-600"
                            : passwordStrength.strength < 4
                              ? "text-[#D4B818]"
                              : "text-green-600"
                        }`}
                      >
                        {getStrengthText(passwordStrength.strength)}
                      </span>
                    </div>

                    {/* Strength Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${getStrengthColor(passwordStrength.percentage)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength.percentage}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    {/* Requirements */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div
                        className={`flex items-center gap-1 ${passwordStrength.requirements.length ? "text-green-600" : "text-red-600"}`}
                      >
                        <span>• 8+ characters</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${passwordStrength.requirements.uppercase ? "text-green-600" : "text-red-600"}`}
                      >
                        <span>• Uppercase letter</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${passwordStrength.requirements.lowercase ? "text-green-600" : "text-red-600"}`}
                      >
                        <span>• Lowercase letter</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${passwordStrength.requirements.number ? "text-green-600" : "text-red-600"}`}
                      >
                        <span>• Number</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${passwordStrength.requirements.special ? "text-green-600" : "text-red-600"}`}
                      >
                        <span>• Special character</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confirm Password Input */}
              <div className="relative">
                <motion.label
                  htmlFor="confirmPassword"
                  variants={inputVariants}
                  animate={isConfirmPasswordFocused || confirmPassword ? "focused" : "unfocused"}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none origin-left bg-white px-2 text-gray-500 z-10"
                >
                  Confirm Password
                </motion.label>
                <motion.input
                  ref={confirmPasswordRef}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setIsConfirmPasswordFocused(true)}
                  onBlur={() => setIsConfirmPasswordFocused(false)}
                  className={`w-full bg-white border-2 rounded-xl px-4 py-4 pr-12 text-gray-900 placeholder-transparent focus:ring-2 focus:ring-[#F7D81A]/30 outline-none transition-all ${
                    confirmPassword
                      ? passwordsMatch
                        ? "border-green-400"
                        : "border-red-400"
                      : "border-gray-300 focus:border-[#F7D81A]"
                  }`}
                  placeholder="Confirm Password"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F7D81A] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showConfirmPassword ? <HiEye className="w-5 h-5" /> : <HiEyeOff className="w-5 h-5" />}
                </motion.button>

                {/* Password Match Indicator */}
                <AnimatePresence>
                  {confirmPassword && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-10 top-1/2 -translate-y-1/2"
                    >
                      {passwordsMatch ? (
                        <HiCheck className="w-5 h-5 text-green-500" />
                      ) : (
                        <HiX className="w-5 h-5 text-red-500" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || passwordStrength.strength < 3 || !passwordsMatch}
                variants={buttonVariants}
                initial="initial"
                whileHover={!isLoading && passwordStrength.strength >= 3 && passwordsMatch ? "hover" : undefined}
                whileTap={!isLoading && passwordStrength.strength >= 3 && passwordsMatch ? "tap" : undefined}
                animate={isLoading ? "loading" : "initial"}
                className={`w-full font-bold py-4 rounded-xl relative overflow-hidden transition-all ${
                  passwordStrength.strength >= 3 && passwordsMatch && !isLoading
                    ? "bg-gradient-to-r from-[#F7D81A] to-[#E5C816] text-gray-900"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
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
                      Create Account
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Button Shine Effect */}
                {passwordStrength.strength >= 3 && passwordsMatch && !isLoading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" as const }}
                  />
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-white/80">
                Already have an account?{" "}
                <motion.a
                  href="/login"
                  className="text-[#F7D81A] hover:text-[#E5C816] font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Sign In
                </motion.a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
