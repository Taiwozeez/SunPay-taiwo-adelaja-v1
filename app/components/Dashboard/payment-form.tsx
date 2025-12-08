"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiCheck, HiOutlineClipboardCopy, HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { BsBank2 } from "react-icons/bs"
import Image from "next/image"

// USSD codes mapping
const ussdCodes: Record<string, string> = {
  "AB Microfinance Bank": "389",
  "Access Bank": "901",
  "Accion Microfinance Bank": "572",
  "Wema Bank": "945",
  "Ecobank": "326",
  "FCMB": "329",
  "First Bank": "894",
  "GTBank": "737",
  "Interswitch": "322",
  "UBA": "919",
  "Unity Bank": "7799",
  "Zenith Bank": "966",
  "Polaris Bank": "833",
  "Keystone Bank": "7111",
  "Union Bank": "826",
  "Sterling Bank": "822",
  "Stanbic Bank": "909",
  "Heritage Bank": "745",
  "Fidelity Bank": "770",
  "Jaiz Bank": "773"
}

// Payment hint data
const paymentHints = [
  {
    id: 1,
    title: "Card Payment",
    content: "Enter your Lamp number, amount and debit card details and click on make payment to proceed.",
  },
  {
    id: 2,
    title: "USSD Payment",
    content: "Enter your Lamp Number and search for bank name to generate your USSD code for your bank, copy or dial to make payment.",
  },
  {
    id: 3,
    title: "Virtual Account",
    content: "Click on generate virtual account to generate your virtual account to make payment.",
  }
]

export function PaymentForm() {
  const [payWith, setPayWith] = useState<"card" | "virtualAccount" | "ussd">("card")
  const [lampNo, setLampNo] = useState("")
  const [amount, setAmount] = useState("")
  const [virtualAccount, setVirtualAccount] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [waveKey, setWaveKey] = useState(0)
  const [copied, setCopied] = useState(false)
  const [copiedUSSD, setCopiedUSSD] = useState(false)
  const [bankSearch, setBankSearch] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [showUSSDMessage, setShowUSSDMessage] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isValidLampNo, setIsValidLampNo] = useState(false)
  const [ussdCodeToDial, setUssdCodeToDial] = useState("")
  const [currentHintIndex, setCurrentHintIndex] = useState(0)

  // Customer verification data
  const customerData = {
    name: "Taiwo Adelaja",
  }

  // Auto-slide for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHintIndex((prev) => (prev + 1) % paymentHints.length)
    }, 13000) // Change every 13 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveKey((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (bankSearch.trim()) {
      const filtered = Object.keys(ussdCodes).filter(bank =>
        bank.toLowerCase().includes(bankSearch.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [bankSearch])

  // Verify lamp number
  useEffect(() => {
    if (lampNo.length === 9) {
      const isValid = /^\d{9}$/.test(lampNo)
      setIsValidLampNo(isValid)
      
      // If USSD is selected and bank is chosen, update USSD code
      if (payWith === "ussd" && selectedBank && ussdCodes[selectedBank] && isValid) {
        const ussdCode = `*${ussdCodes[selectedBank]}*000*697+${lampNo}#`
        setUssdCodeToDial(ussdCode)
      }
    } else {
      setIsValidLampNo(false)
    }
  }, [lampNo, selectedBank, payWith])

  const generateVirtualAccount = () => {
    if (isGenerating) return

    setIsGenerating(true)

    setTimeout(() => {
      const account = Math.floor(1000000000 + Math.random() * 9000000000).toString()
      setVirtualAccount(account)
      setIsGenerating(false)
    }, 1500)
  }

  const handleCopyAccount = () => {
    if (!virtualAccount) return

    navigator.clipboard.writeText(virtualAccount)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyUSSD = () => {
    if (!ussdCodeToDial && !selectedBank) return

    const codeToCopy = ussdCodeToDial || `*${ussdCodes[selectedBank]}*000*697+${lampNo ? lampNo : "LampNumber"}#`
    navigator.clipboard.writeText(codeToCopy)
    setCopiedUSSD(true)
    setTimeout(() => setCopiedUSSD(false), 2000)
  }

  const handleGetUSSD = () => {
    if (!bankSearch.trim()) {
      return
    }

    const bankName = Object.keys(ussdCodes).find(bank =>
      bank.toLowerCase().includes(bankSearch.toLowerCase())
    )

    if (bankName) {
      setSelectedBank(bankName)
      setShowUSSDMessage(true)
      
      // Generate USSD code with lamp number if available and valid
      if (lampNo.length === 9 && /^\d{9}$/.test(lampNo)) {
        const ussdCode = `*${ussdCodes[bankName]}*000*697+${lampNo}#`
        setUssdCodeToDial(ussdCode)
      }
    }
  }

  const handleSuggestionClick = (bank: string) => {
    setBankSearch(bank)
    setSuggestions([])
    setSelectedBank(bank)
    
    // Generate USSD code with lamp number if available and valid
    if (lampNo.length === 9 && /^\d{9}$/.test(lampNo) && ussdCodes[bank]) {
      const ussdCode = `*${ussdCodes[bank]}*000*697+${lampNo}#`
      setUssdCodeToDial(ussdCode)
    }
  }

  // Function to dial USSD code (for mobile)
  const handleDialUSSD = () => {
    if (!ussdCodeToDial) return
    
    // For mobile devices, this will trigger the dialer
    window.location.href = `tel:${ussdCodeToDial}`
    
    // For demo purposes, show an alert
    alert(`Dialing USSD code: ${ussdCodeToDial}\n\nOn a real mobile device, this would open your phone dialer.`)
  }

  const nextHint = () => {
    setCurrentHintIndex((prev) => (prev + 1) % paymentHints.length)
  }

  const prevHint = () => {
    setCurrentHintIndex((prev) => (prev - 1 + paymentHints.length) % paymentHints.length)
  }

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
        damping: 12,
      },
    },
  }

  const waveVariants = {
    wave: {
      rotate: [0, 14, -8, 14, -4, 10, 0],
      transition: {
        duration: 1,
        ease: "easeInOut" as const,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
      },
    },
    rest: {
      rotate: 0,
    },
  }

  const buttonTap = {
    scale: 0.95,
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      height: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  const loadingVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear" as const,
      },
    },
  }

  const copyButtonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  const pulseAnimation = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
      },
    },
  }

  const checkmarkVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  }

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  const dueDate = new Date("2025-12-22")
  const today = new Date()
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-card rounded-2xl border border-border shadow-xl shadow-primary/5 p-4 sm:p-6 lg:p-8"
    >
      {/* Welcome Message with Wave Animation */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center mb-5 sm:mb-7 lg:mb-8">
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Hi, {customerData.name}!</h1>
          <motion.div
            key={waveKey}
            variants={waveVariants}
            animate="wave"
            className="text-xl sm:text-2xl lg:text-3xl"
            style={{ transformOrigin: "70% 70%" }}
          >
            👋
          </motion.div>
        </motion.div>

  

        {/* Payment Method Hints Carousel - Simplified */}
        <motion.div
          variants={itemVariants}
          className="relative mb-3 sm:mb-4 h-24 sm:h-28 overflow-hidden"
        >
          <AnimatePresence initial={false} custom={1}>
            <motion.div
              key={currentHintIndex}
              custom={1}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              <div 
                className="h-full rounded-2xl border-2 p-4 flex flex-col justify-center items-center text-center"
                style={{ 
                  borderColor: '#7f1d1d', // Wine border color
                  backgroundColor: '#fef2f2', // Light wine/red background
                  color: '#7f1d1d' // Wine text color
                }}
              >
                <h3 className="font-bold text-sm sm:text-base mb-2">
                  {paymentHints[currentHintIndex].title}
                </h3>
                <p className="text-xs sm:text-sm leading-tight">
                  {paymentHints[currentHintIndex].content}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Simplified Dots Indicator Only */}
          {/* <div className="absolute inset-x-0 bottom-2 flex justify-center">
            <div className="flex gap-2">
              {paymentHints.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHintIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentHintIndex 
                      ? 'w-6' 
                      : ''
                  }`}
                  style={{ 
                    backgroundColor: index === currentHintIndex ? '#7f1d1d' : '#dc2626',
                    opacity: index === currentHintIndex ? 1 : 0.5
                  }}
                />
              ))}
            </div>
          </div> */}
        </motion.div>

        <motion.p variants={itemVariants} className="text-muted-foreground text-xs mb-2 sm:mb-3">
          Make payment on your device
        </motion.p>

        {/* Due Date Reminder */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-muted px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mt-1 sm:mt-2 border border-border"
        >
          <motion.div variants={pulseAnimation} initial="initial" animate="pulse" className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-medium text-foreground">
              <span className="font-bold text-primary">{daysUntilDue} days left</span> • Due: 22-Dec-2025
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enter Lamp No. with verification */}
      <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
        <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">Enter Lamp No.</label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          placeholder="e.g. 003842109"
          value={lampNo}
          onChange={(e) => setLampNo(e.target.value.replace(/\D/g, '').slice(0, 9))}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all bg-input text-foreground placeholder-muted-foreground ${
            lampNo.length === 9 && isValidLampNo
              ? "border-green-500 focus:ring-green-500 focus:border-green-500"
              : lampNo.length > 0
              ? "border-border focus:ring-ring focus:border-accent"
              : "border-border focus:ring-ring focus:border-accent"
          }`}
        />
        
        {/* Customer info verification */}
        {lampNo.length === 9 && isValidLampNo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2 p-2.5 sm:p-3 bg-green-50 border border-green-200 rounded-xl"
          >
            <p className="text-xs sm:text-sm font-semibold text-green-800 mb-0.5 sm:mb-1">Customer Verified</p>
            <p className="text-xs text-green-700">Name: {customerData.name}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Enter Amount */}
      <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
        <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">Enter Amount</label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          placeholder="₦0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent transition-all bg-input text-foreground placeholder-muted-foreground"
        />
      </motion.div>

      {/* Pay With - Updated with 3 options */}
      <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
        <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">Pay With</label>
        <motion.div
          layout
          className="grid grid-cols-3 rounded-xl overflow-hidden border border-border shadow-sm bg-muted"
        >
          <motion.button
            layout
            onClick={() => setPayWith("card")}
            whileTap={buttonTap}
            className={`py-2.5 sm:py-3.5 text-xs font-semibold transition-all relative ${
              payWith === "card"
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xs sm:text-sm">Use Card</span>
          </motion.button>

          <motion.button
            layout
            onClick={() => {
              setPayWith("ussd")
              if (lampNo.length === 9 && selectedBank && ussdCodes[selectedBank]) {
                const ussdCode = `*${ussdCodes[selectedBank]}*000*697+${lampNo}#`
                setUssdCodeToDial(ussdCode)
              }
            }}
            whileTap={buttonTap}
            className={`py-2.5 sm:py-3.5 text-xs font-semibold transition-all relative border-x border-border ${
              payWith === "ussd"
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xs sm:text-sm">USSD</span>
          </motion.button>

          <motion.button
            layout
            onClick={() => {
              setPayWith("virtualAccount")
              if (!virtualAccount) {
                generateVirtualAccount()
              }
            }}
            whileTap={buttonTap}
            className={`py-2.5 sm:py-3.5 text-xs font-semibold transition-all relative ${
              payWith === "virtualAccount"
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xs sm:text-sm">Virtual Account</span>
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
            className="mb-5 sm:mb-6 overflow-hidden"
          >
            <motion.label variants={itemVariants} className="block text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">
              Enter Card Details
            </motion.label>

            {/* Card Logos */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <motion.div
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-10 h-7 sm:w-12 sm:h-8 rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-card border border-border relative"
              >
                <Image 
                  src="/images/visaLogo.png" 
                  alt="VISA" 
                  fill
                  className="object-contain p-0.5 sm:p-1"
                  sizes="40px"
                  priority
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-10 h-7 sm:w-12 sm:h-8 rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-card border border-border relative"
              >
                <Image 
                  src="/images/mastercardLogo.png" 
                  alt="MasterCard" 
                  fill
                  className="object-contain p-0.5 sm:p-1"
                  sizes="40px"
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-10 h-7 sm:w-12 sm:h-8 rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-card border border-border relative"
              >
                <Image 
                  src="/images/VerveLogo.png" 
                  alt="VERVE" 
                  fill
                  className="object-contain p-0.5 sm:p-1"
                  sizes="40px"
                />
              </motion.div>
            </motion.div>

            {/* Card Number */}
            <motion.input
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
              type="text"
              placeholder="Card Number"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-border rounded-xl mb-2.5 sm:mb-3 focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent transition-all bg-input text-foreground placeholder-muted-foreground"
            />

            {/* MM/YY and CVV */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                placeholder="MM/YY"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent transition-all bg-input text-foreground placeholder-muted-foreground"
              />
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                placeholder="CVV"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent transition-all bg-input text-foreground placeholder-muted-foreground"
              />
            </motion.div>
          </motion.div>
        )}

        {/* USSD Payment Option */}
        {payWith === "ussd" && (
          <motion.div
            key="ussd"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-5 sm:mb-6 overflow-hidden"
          >
            <motion.div
              className="border border-border rounded-2xl bg-gradient-to-br from-secondary via-muted to-secondary shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm sm:text-base font-bold text-foreground">USSD Payment</h3>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <span className="text-primary-foreground text-sm sm:text-base lg:text-lg font-bold">*</span>
                  </div>
                </div>

                {/* Search for Bank */}
                <div className="mb-3 sm:mb-4 relative">
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1 sm:mb-2">
                    Type your bank name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    placeholder="e.g., Access Bank, Zenith Bank..."
                    value={bankSearch}
                    onChange={(e) => {
                      setBankSearch(e.target.value)
                      setShowUSSDMessage(false)
                    }}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent transition-all bg-input text-foreground placeholder-muted-foreground"
                  />
                  
                  {/* Bank Suggestions */}
                  {suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-10 w-full mt-1 bg-card border border-border rounded-xl shadow-lg max-h-48 overflow-y-auto"
                    >
                      {suggestions.map((bank) => (
                        <motion.button
                          key={bank}
                          whileHover={{ backgroundColor: "rgba(var(--secondary), 0.5)" }}
                          onClick={() => handleSuggestionClick(bank)}
                          className="w-full px-3 py-2 text-left text-xs sm:text-sm text-foreground hover:bg-secondary transition-colors first:rounded-t-xl last:rounded-b-xl border-b border-border last:border-b-0"
                        >
                          <div className="flex justify-between items-center">
                            <span className="truncate pr-2">{bank}</span>
                            <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded flex-shrink-0">
                              {ussdCodes[bank]}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Get USSD Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGetUSSD}
                  disabled={!bankSearch.trim()}
                  className={`w-full mb-3 sm:mb-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                    bankSearch.trim()
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-accent hover:to-primary"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Get USSD Code
                </motion.button>

                {/* USSD Instruction */}
                <AnimatePresence>
                  {showUSSDMessage && selectedBank && ussdCodes[selectedBank] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-card rounded-xl p-3 sm:p-4 lg:p-5 border border-border"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-foreground mb-2 sm:mb-3">
                        Payment Instruction
                      </h4>
                      <div className="space-y-2.5 sm:space-y-3">
                        <div className="bg-muted rounded-lg p-3 sm:p-4">
                          <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                            Dear customer, to make payment through{" "}
                            <span className="font-bold">({selectedBank})</span> dial{" "}
                            <span className="font-mono bg-primary/20 px-1.5 py-0.5 rounded text-xs sm:text-sm font-bold">
                              *{ussdCodes[selectedBank]}*000*697+{lampNo ? lampNo : "LampNumber"}#
                            </span>
                            , then enter your transfer PIN to complete the payment.
                          </p>
                        </div>
                        
                        <div className="bg-primary/10 rounded-lg p-3 sm:p-4">
                          <h5 className="text-xs font-bold text-foreground mb-1.5 sm:mb-2">
                            Full USSD Code:
                          </h5>
                          <div className="space-y-2.5 sm:space-y-3">
                            <code className="text-sm sm:text-base font-mono font-bold text-foreground break-all">
                              {ussdCodeToDial || `*${ussdCodes[selectedBank]}*000*697+${lampNo ? lampNo : "LampNumber"}#`}
                            </code>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <div className="flex gap-2">
                                <motion.button
                                  variants={copyButtonVariants}
                                  whileHover="hover"
                                  whileTap="tap"
                                  onClick={handleCopyUSSD}
                                  className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all flex-1 ${
                                    copiedUSSD
                                      ? "bg-green-600 hover:bg-green-700 text-white"
                                      : "bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground"
                                  }`}
                                >
                                  <AnimatePresence mode="wait">
                                    {copiedUSSD ? (
                                      <motion.div
                                        key="copied"
                                        variants={checkmarkVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="flex items-center justify-center gap-1.5"
                                      >
                                        <HiCheck className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Copied</span>
                                      </motion.div>
                                    ) : (
                                      <motion.div
                                        key="copy"
                                        variants={checkmarkVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="flex items-center justify-center gap-1.5"
                                      >
                                        <HiOutlineClipboardCopy className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Copy</span>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.button>
                                
                                {ussdCodeToDial && lampNo.length === 9 && (
                                  <motion.button
                                    variants={copyButtonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={handleDialUSSD}
                                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold shadow-md flex-1"
                                  >
                                    <span className="text-sm">📱</span>
                                    <span className="hidden sm:inline">Dial</span>
                                  </motion.button>
                                )}
                              </div>
                            </div>
                            
                            {lampNo && lampNo.length === 9 && (
                              <p className="text-xs text-green-600 mt-1 font-medium">
                                ✓ Lamp number <span className="font-bold">{lampNo}</span> included
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Virtual Account Details */}
        {payWith === "virtualAccount" && (
          <motion.div
            key="virtualAccount"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-5 sm:mb-6 overflow-hidden"
          >
            <motion.div
              className="border border-border rounded-2xl bg-gradient-to-br from-secondary via-muted to-secondary shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm sm:text-base font-bold text-foreground">Virtual Account Details</h3>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <BsBank2 className="text-primary-foreground text-sm sm:text-base lg:text-lg" />
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
                        className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary border-t-transparent rounded-full mb-3 sm:mb-4"
                      />
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xs sm:text-sm font-medium text-foreground text-center"
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
                      <div className="space-y-4 sm:space-y-5">
                        {/* Account Number */}
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3">
                            Account Number
                          </p>
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                          >
                            <div className="bg-card rounded-xl p-3 sm:p-4 border border-border shadow-sm">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3">
                                <div className="flex items-center gap-2.5 sm:gap-3 w-full">
                                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-md">
                                    <BsBank2 className="text-primary-foreground text-xs sm:text-sm" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-lg sm:text-xl lg:text-2xl font-bold font-mono text-foreground tracking-wider break-all">
                                      {virtualAccount}
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <motion.button
                                      variants={copyButtonVariants}
                                      whileHover="hover"
                                      whileTap="tap"
                                      onClick={handleCopyAccount}
                                      className={`flex items-center justify-center gap-1.5 transition-all shadow-md rounded-xl ${
                                        copied
                                          ? "bg-green-600 hover:bg-green-700 text-white"
                                          : "bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground"
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
                                            className="flex items-center justify-center gap-1.5 p-2 sm:p-2.5 lg:px-3 lg:py-2"
                                          >
                                            <HiCheck className="w-3.5 h-3.5" />
                                            <span className="hidden sm:inline text-xs font-semibold">Copied</span>
                                          </motion.div>
                                        ) : (
                                          <motion.div
                                            key="copy"
                                            variants={checkmarkVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="flex items-center justify-center gap-1.5 p-2 sm:p-2.5 lg:px-3 lg:py-2"
                                          >
                                            <HiOutlineClipboardCopy className="w-3.5 h-3.5" />
                                            <span className="hidden sm:inline text-xs font-semibold">Copy</span>
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

                        {/* Bank and Account Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-card rounded-xl p-3 sm:p-4 border border-border">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                              Bank Name
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-foreground">SunPay Bank</p>
                          </div>
                          <div className="bg-card rounded-xl p-3 sm:p-4 border border-border">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                              Account Name
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-foreground">SunPay/Taiwo Adelaja</p>
                          </div>
                        </div>

                        {/* Transfer Instructions */}
                        <div className="bg-primary/10 rounded-xl p-3 sm:p-4 border border-primary/20">
                          <p className="text-xs text-foreground font-medium">
                            Transfer the exact amount to this account. Your payment will be confirmed automatically
                            within 5 minutes.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        whileHover={{
          scale: 1.02,
          boxShadow: "0 15px 30px -5px rgba(247, 216, 26, 0.35)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          if (payWith === "ussd" && ussdCodeToDial && lampNo.length === 9) {
            handleDialUSSD()
          }
        }}
        disabled={payWith === "ussd" && (!ussdCodeToDial || lampNo.length !== 9)}
        className={`w-full font-bold py-3.5 sm:py-4 rounded-xl transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm sm:text-base ${
          payWith === "ussd" && ussdCodeToDial && lampNo.length === 9
            ? "bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground"
            : payWith === "ussd"
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground"
        }`}
        type="button"
      >
        {payWith === "card" ? "Pay Now" : 
         payWith === "ussd" ? "I've Dialed the USSD Code" : 
         "I've Made the Transfer"}
      </motion.button>
    </motion.div>
  )
}