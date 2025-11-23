"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DayBoxProps {
  days: number;
  label: string;
  isActive: boolean;
  isFirstBox?: boolean;
  index: number;
}

const DayBox: React.FC<DayBoxProps> = ({
  days,
  label,
  isActive,
  isFirstBox = false,
  index,
}) => {
  return (
    <motion.div 
      className="relative flex items-center gap-4 sm:gap-6 py-3 sm:py-4 group"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: index * 0.2
      }}
    >
      {/* Main box */}
      <motion.div
        className={`
          relative flex flex-col items-center justify-center rounded-xl 
          border-2 transition-all duration-500 z-10
          ${
            isFirstBox
              ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-100"
              : "border-yellow-400 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50"
          }
          ${isFirstBox ? "w-16 h-16 sm:w-20 sm:h-20" : "w-14 h-14 sm:w-16 sm:h-16"}
        `}
        whileHover={{ 
          scale: 1.1,
          rotate: isActive ? 0 : 2,
          transition: { type: "spring" as const, stiffness: 400, damping: 10 }
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: isActive ? 1.15 : 1,
          y: isActive ? -5 : 0,
          borderWidth: isActive ? "3px" : "2px",
          boxShadow: isActive 
            ? "0 10px 25px -5px rgba(245, 158, 11, 0.4), 0 10px 10px -5px rgba(245, 158, 11, 0.04)"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
        }}
        transition={{
          type: "spring" as const,
          stiffness: 300,
          damping: 20,
          duration: 0.5
        }}
      >
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center z-20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: "spring" as const,
                stiffness: 500,
                damping: 15
              }}
            >
              <motion.div 
                className="w-2 h-2 bg-white rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.span
          className={`font-bold ${
            isFirstBox
              ? "text-yellow-800 text-lg sm:text-xl"
              : "text-gray-700 text-sm sm:text-base"
          }`}
          animate={{
            color: isActive 
              ? (isFirstBox ? "rgb(146 64 14)" : "rgb(55 65 81)") 
              : (isFirstBox ? "rgb(120 53 15)" : "rgb(75 85 99)"),
            scale: isActive ? 1.2 : 1
          }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
        >
          {days}
        </motion.span>

        {/* Pulse effect for active box */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-yellow-400"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [1, 1.2, 1.3]
              }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
              style={{
                background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(245,158,11,0) 70%)"
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Label */}
      <motion.div 
        className="flex flex-col"
        animate={{
          x: isActive ? 10 : 0
        }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
      >
        <motion.span
          className={`font-semibold ${
            isFirstBox ? "text-yellow-800 text-base sm:text-lg" : "text-gray-700 text-sm sm:text-base"
          }`}
          animate={{
            color: isActive 
              ? (isFirstBox ? "rgb(146 64 14)" : "rgb(55 65 81)") 
              : (isFirstBox ? "rgb(120 53 15)" : "rgb(75 85 99)"),
            scale: isActive ? 1.05 : 1
          }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
        >
          {label}
        </motion.span>
        
        {/* Subtle highlight for active label */}
        {isActive && (
          <motion.div
            className="h-1 bg-yellow-400 rounded-full mt-1"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const Details: React.FC = () => {
  const [activeBox, setActiveBox] = useState<number>(0);
  const [progress] = useState<number>(5.9);
  const [, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveBox((prev) => (prev + 1) % 5);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const dayData = [
    { days: 30, label: "30 days (1 month)" },
    { days: 91, label: "91 days (3 months)" },
    { days: 182, label: "182 days (6 months)" },
    { days: 274, label: "274 days (9 months)" },
    { days: 364, label: "364 days (12 months)" },
  ];

  const paymentDetails = [
    { label: "Minimum Payment", value: "2,400 NGN" },
    { label: "Unlock Price", value: "153,000 NGN" },
    {
      label: "Nominal Term",
      value: "420 days",
      subtext: "(1 year, 1 month, 24 days)",
    },
    { label: "Total Paid", value: "9,000 NGN" },
    { label: "Outstanding Balance", value: "144,000 NGN" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const progressBarVariants = {
    initial: { width: "0%" },
    animate: { 
      width: `${progress}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl w-full items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Payment Dashboard */}
        <motion.div 
          className="lg:w-2/5 w-full order-1 lg:order-1"
          variants={itemVariants}
        >
          <motion.div 
            className="bg-white rounded-2xl border-2 border-yellow-400 p-6 sm:p-8"
            whileHover={{ 
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
          >
            <div className="mb-6 pb-4 border-b border-amber-200">
              <motion.h2 
                className="text-xl sm:text-2xl font-bold text-black"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Payment Dashboard
              </motion.h2>
            </div>

            <div className="space-y-5">
              {paymentDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between items-center gap-4 p-3 hover:bg-amber-50/50 transition-colors rounded-lg"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "rgba(254, 243, 199, 0.5)"
                  }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                >
                  <div className="flex-1">
                    <span className="text-amber-700 font-medium text-xs sm:text-sm block">
                      {detail.label}
                    </span>
                    {detail.subtext && (
                      <span className="text-amber-500 text-xs">
                        {detail.subtext}
                      </span>
                    )}
                  </div>
                  <motion.span
                    className={`font-bold text-right flex-1 text-sm sm:text-base ${
                      detail.label.includes("Outstanding Balance")
                        ? "text-red-600"
                        : detail.label.includes("Total Paid")
                        ? "text-green-600"
                        : "text-amber-900"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring" as const, stiffness: 500, damping: 10 }}
                  >
                    {detail.value}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <motion.div 
              className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-yellow-100 rounded-xl border-2 border-yellow-400"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between text-xs sm:text-sm text-amber-700 mb-3">
                <span className="font-semibold">Payment Progress</span>
                <motion.span 
                  className="font-bold text-amber-700"
                  key={progress}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" as const, stiffness: 500, damping: 15 }}
                >
                  {progress}%
                </motion.span>
              </div>

              <div className="w-full bg-amber-200 rounded-full h-3 sm:h-4 relative overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full rounded-full relative"
                  variants={progressBarVariants}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div 
                    className="w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 shadow-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(255, 255, 255, 0.7)",
                        "0 0 0 10px rgba(255, 255, 255, 0)",
                        "0 0 0 0 rgba(255, 255, 255, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                </motion.div>
              </div>

              <div className="flex justify-between text-xs sm:text-sm text-amber-600 mt-2">
                <span className="font-medium">9,000 NGN paid</span>
                <span className="font-medium">153,000 NGN total</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Pay Early Save More Monitor */}
        <motion.div 
          className="lg:w-3/5 w-full order-2 lg:order-2 flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.div 
            className="text-center mb-6 sm:mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-2xl sm:text-4xl font-bold text-black mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Pay Early Save More Monitor
            </motion.h1>
          </motion.div>

          <motion.div 
            className="relative bg-white rounded-2xl border-2 border-yellow-400 p-6 sm:p-8 w-full max-w-lg"
            whileHover={{ 
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.25)"
            }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
          >
            <div className="flex flex-col">
              {dayData.map((item, index) => (
                <DayBox
                  key={index}
                  days={item.days}
                  label={item.label}
                  isActive={activeBox === index}
                  isFirstBox={index === 0}
                  index={index}
                />
              ))}
            </div>

            {/* Animated Progress Line */}
            <motion.div 
              className="absolute left-16 sm:left-20 top-20 sm:top-24 bottom-20 sm:bottom-24 w-1 bg-gradient-to-b from-yellow-400 via-amber-400 to-orange-400 z-0 rounded-full"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.5,
                ease: "easeOut"
              }}
            />
          </motion.div>

          {/* Status indicator */}
          <motion.div 
            className="mt-8 sm:mt-12 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-500 to-yellow-600 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-white border-2 border-yellow-400 shadow-lg"
              animate={{
                y: [0, -5, 0],
                boxShadow: [
                  "0 4px 6px -1px rgba(245, 158, 11, 0.3), 0 2px 4px -1px rgba(245, 158, 11, 0.2)",
                  "0 20px 25px -5px rgba(245, 158, 11, 0.4), 0 10px 10px -5px rgba(245, 158, 11, 0.2)",
                  "0 4px 6px -1px rgba(245, 158, 11, 0.3), 0 2px 4px -1px rgba(245, 158, 11, 0.2)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.span 
                className="font-medium sm:font-semibold text-sm sm:text-base"
                key={activeBox}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" as const, stiffness: 500, damping: 15 }}
              >
                Active Phase: {dayData[activeBox].label}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Details;