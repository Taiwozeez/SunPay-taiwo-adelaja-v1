"use client"

import { motion } from "framer-motion"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start gap-12">
        {/* Left Side - Video-style Image */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <div className="relative w-full max-w-lg rounded-xl overflow-hidden shadow-lg">
            <img
              src="/images/man-phone2.jpg"
              alt="Video Preview"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Radar Ping */}
                <motion.span 
                  className="absolute inline-flex h-20 w-20 rounded-full bg-green-400 opacity-40"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <motion.span 
                  className="absolute inline-flex h-16 w-16 rounded-full bg-green-400 opacity-50"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.3
                  }}
                />
                
                <motion.button 
                  className="relative z-10 bg-white rounded-full p-5 shadow-lg"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 25px rgba(0, 0, 0, 0.1)",
                      "0 15px 35px rgba(34, 197, 94, 0.2)",
                      "0 10px 25px rgba(0, 0, 0, 0.1)"
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
                    className="h-10 w-10 text-green-500"
                    viewBox="0 0 64 64"
                    fill="currentColor"
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.circle 
                      cx="32" 
                      cy="32" 
                      r="32" 
                      fill="white" 
                      opacity="0.3"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.polygon 
                      points="26,20 26,44 46,32" 
                      fill="green"
                      animate={{
                        fill: ["#10b981", "#34d399", "#10b981"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Steps */}
        <div className="flex-1">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
            How does it work
          </h2>
          <p className="text-gray-700 mb-8">
            Easily manage your wallet and payments. Follow these simple steps to start receiving and adding money securely.
          </p>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="text-4xl font-bold text-yellow-400">1</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Sign Up Your Account</h3>
                <p className="text-gray-600">
                  Register a new account, log in, and set up your profile with your bank or card details.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="text-4xl font-bold text-yellow-400">2</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Go to Make Payment</h3>
                <p className="text-gray-600">
                  Navigate to the &quot;Make Payment&quot; section to pay bills, lamp numbers, or other services instantly using your wallet or card.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="text-4xl font-bold text-yellow-400">3</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Add Money</h3>
                <p className="text-gray-600">
                  Go to the &quot;Add Money&quot; section to fund your wallet from your bank account or card quickly and securely.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className="text-4xl font-bold text-yellow-400">4</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Track & Manage</h3>
                <p className="text-gray-600">
                  Monitor your transactions, view wallet balance, and manage payments efficiently from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}