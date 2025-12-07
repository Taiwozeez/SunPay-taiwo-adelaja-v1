"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import Image from "next/image"
import {
  HiLightningBolt,
  HiSun,
  HiChartBar,
  HiTrendingUp,
  HiClock,
  HiCurrencyDollar,
  HiCog,
  HiDocumentText,
  HiSupport,
  HiCheckCircle,
  HiTag,
  HiCalendar,
  HiShieldCheck,
} from "react-icons/hi"
import { BsBatteryFull, BsThermometerHalf } from "react-icons/bs"

// Generic solar product interface
interface SolarProduct {
  id: number
  name: string
  type: string
  imagePath: string
  status: string
  batteryLevel?: number
  lastCharged?: string
  dailyConsumption?: number
  dailyGeneration?: number
  gridUsage?: number
  currentLoad?: number
  efficiency?: number
  temperature?: number
  voltage?: number
  cycles?: number
  chargeRate?: number
  dischargeRate?: number
  health?: number
  serialNumber?: string
  installationDate?: string
  warrantyExpiry?: string
  dueDate?: string
  lampNo?: string
  registrationDate?: string
}

// Chart data union type
type PaymentDataItem =
  | { month: string; amount: number; status: string }
  | { year: string; amount: number; status: string }

// Current customer's device - PowerPlay Pro
const currentCustomerDevice: SolarProduct = {
  id: 1,
  name: "PowerPlay Pro",
  type: "Solar Inverter System",
  imagePath: "/images/powerplay.jpg",
  status: "System Active",
  batteryLevel: 85,
  lastCharged: "2 hours ago",
  dailyConsumption: 12.5,
  dailyGeneration: 8.2,
  gridUsage: 4.3,
  currentLoad: 2.1,
  efficiency: 94,
  temperature: 36,
  voltage: 240,
  cycles: 1250,
  lampNo: "123456789",
  registrationDate: "15 Jan 2024",
  dueDate: "15 Feb 2025",
}

// Troubleshooting issues
const troubleshootingIssues = [
  {
    code: "E0",
    title: "Battery Temperature High",
    description: "Battery temperature exceeds safe operating limits",
    solution: "Remove all wires and wait for the battery to cool down",
  },
  {
    code: "E1",
    title: "Low Battery Voltage",
    description: "Battery voltage below minimum threshold",
    solution: "Charge the battery or check for loose connections",
  },
  {
    code: "E2",
    title: "Overload Protection",
    description: "System load exceeds rated capacity",
    solution: "Reduce connected load or check for short circuits",
  },
  {
    code: "E3",
    title: "Communication Error",
    description: "Communication failure between components",
    solution: "Check all cable connections and restart the system",
  },
]

export function SolarProductDetail() {
  const [timeFrame, setTimeFrame] = useState<"monthly" | "yearly">("monthly")
  const [imageError, setImageError] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "payment" | "maintenance">("overview")
  const [showAllIssues, setShowAllIssues] = useState(false)

  const product = currentCustomerDevice

  const getBatteryColor = (percentage: number) => {
    if (percentage >= 75) return "#10b981"
    if (percentage >= 50) return "#F7D81A"
    if (percentage >= 25) return "#f97316"
    return "#ef4444"
  }

  const generatePaymentData = (): PaymentDataItem[] => {
    if (timeFrame === "monthly") {
      return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => ({
        month,
        amount: 24000 + Math.random() * 6000,
        status: i < 5 ? "Paid" : "Pending",
      }))
    } else {
      return ["2022", "2023", "2024"].map((year, i) => ({
        year,
        amount: 288000 + Math.random() * 72000,
        status: i < 2 ? "Paid" : "Pending",
      }))
    }
  }

  const paymentData = generatePaymentData()

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-card rounded-2xl border-2 border-border shadow-xl shadow-primary/5 overflow-hidden"
    >
      {/* Product Image and Name Section */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-br from-secondary via-muted to-secondary p-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Product Image */}
          <div className="relative w-48 h-48 bg-white rounded-2xl flex items-center justify-center p-4 border-2 border-[#F7D81A]/30 shadow-xl">
            {!imageError ? (
              <div className="relative w-full h-full">
                <Image
                  src={product.imagePath || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  priority
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl mb-2" aria-hidden="true">
                  ⚡
                </div>
                <p className="text-sm text-gray-500 text-center">Image unavailable</p>
              </div>
            )}
          </div>

          {/* Product Name and Status - Right side of image */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h2>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-medium text-emerald-700">{product.status}</span>
            </div>
            <p className="text-gray-600 mt-3">{product.type}</p>
          </div>
        </div>
      </motion.div>

      {/* Product Info Cards - Smaller text - KEEPING COLORFUL */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {/* Lamp Number - Blue */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <HiTag className="w-3 h-3 text-blue-500" />
              </div>
              <span className="text-[10px] text-gray-500 truncate">Lamp Number</span>
            </div>
            <div className="text-sm font-bold text-gray-900 truncate">#{product.lampNo}</div>
          </div>

          {/* Registration Date - Green */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <HiCalendar className="w-3 h-3 text-green-500" />
              </div>
              <span className="text-[10px] text-gray-500 truncate">Registration Date</span>
            </div>
            <div className="text-sm font-bold text-gray-900 truncate">{product.registrationDate}</div>
          </div>

          {/* Due Date - Amber */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-3 border border-amber-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                <HiClock className="w-3 h-3 text-amber-500" />
              </div>
              <span className="text-[10px] text-gray-500 truncate">Due Date</span>
            </div>
            <div className="text-sm font-bold text-gray-900 truncate">{product.dueDate}</div>
          </div>

          {/* Warranty - Purple */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 border border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                <HiShieldCheck className="w-3 h-3 text-purple-500" />
              </div>
              <span className="text-[10px] text-gray-500 truncate">Warranty</span>
            </div>
            <div className="text-sm font-bold text-gray-900 truncate">3 Years</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b-2 border-border mb-6" role="tablist" aria-label="Product information tabs">
          <div className="flex gap-6">
            {(["overview", "payment", "maintenance"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                role="tab"
                id={`tab-${tab}`}
                aria-controls={`panel-${tab}`}
                aria-selected={activeTab === tab}
                tabIndex={activeTab === tab ? 0 : -1}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
              id="panel-overview"
              role="tabpanel"
              aria-labelledby="tab-overview"
              tabIndex={0}
            >
              {/* Overview Cards - 3x3 Grid - KEEPING COLORFUL */}
              <div className="grid grid-cols-3 gap-2">
                {/* Row 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-2 border border-blue-200">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center shrink-0">
                      <HiLightningBolt className="w-3 h-3 text-blue-500" />
                    </div>
                    <span className="text-[10px] text-gray-500 truncate">Consumption</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {product.dailyConsumption}
                    <span className="text-[10px] text-gray-500 ml-1">kWh</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-white rounded-lg p-2 border border-amber-200">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-5 h-5 bg-amber-100 rounded flex items-center justify-center shrink-0">
                      <HiSun className="w-3 h-3 text-amber-500" />
                    </div>
                    <span className="text-[10px] text-gray-500 truncate">Generation</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {product.dailyGeneration}
                    <span className="text-[10px] text-gray-500 ml-1">kWh</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-2 border border-purple-200">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center shrink-0">
                      <HiChartBar className="w-3 h-3 text-purple-500" />
                    </div>
                    <span className="text-[10px] text-gray-500 truncate">Grid Usage</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {product.gridUsage}
                    <span className="text-[10px] text-gray-500 ml-1">kWh</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-2 border border-green-200">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                      <HiTrendingUp className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-[10px] text-gray-500 truncate">Efficiency</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {product.efficiency}
                    <span className="text-[10px] text-gray-500 ml-1">%</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-white rounded-lg p-2 border border-red-200">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-5 h-5 bg-red-100 rounded flex items-center justify-center shrink-0">
                      <BsThermometerHalf className="w-3 h-3 text-red-500" />
                    </div>
                    <span className="text-[10px] text-gray-500 truncate">Temperature</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {product.temperature}°<span className="text-[10px] text-gray-500">C</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-2 border border-indigo-200">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center shrink-0">
                      <HiLightningBolt className="w-3 h-3 text-indigo-500" />
                    </div>
                    <span className="text-[10px] text-gray-500 truncate">Current Load</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {product.currentLoad}
                    <span className="text-[10px] text-gray-500 ml-1">kW</span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-lg p-2 border border-yellow-200">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-5 h-5 bg-yellow-100 rounded flex items-center justify-center shrink-0">
                      <HiCurrencyDollar className="w-3 h-3 text-yellow-600" />
                    </div>
                    <span className="text-[10px] text-gray-500 truncate">Voltage</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {product.voltage}
                    <span className="text-[10px] text-gray-500 ml-1">V</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-white rounded-lg p-2 border border-cyan-200">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-5 h-5 bg-cyan-100 rounded flex items-center justify-center shrink-0">
                      <HiClock className="w-3 h-3 text-cyan-500" />
                    </div>
                    <span className="text-[10px] text-gray-500 truncate">Cycles</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 truncate">{product.cycles}</div>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-white rounded-lg p-2 border border-pink-200">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-5 h-5 bg-pink-100 rounded flex items-center justify-center shrink-0">
                      <BsBatteryFull className="w-3 h-3 text-pink-500" />
                    </div>
                    <span className="text-[10px] text-gray-500 truncate">Battery</span>
                  </div>
                  <div
                    className="text-sm font-bold text-gray-900 truncate"
                    style={{ color: getBatteryColor(product.batteryLevel || 0) }}
                  >
                    {product.batteryLevel}%
                  </div>
                </div>
              </div>

              {/* Troubleshooting Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Common Issues</h3>
                <div className="space-y-3">
                  {troubleshootingIssues
                    .slice(0, showAllIssues ? troubleshootingIssues.length : 2)
                    .map((issue, index) => (
                      <motion.div
                        key={issue.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-red-600">{issue.code}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 mb-1">{issue.title}</h4>
                            <p className="text-xs text-gray-600 mb-2">{issue.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-green-600">Solution:</span>
                              <span className="text-xs text-gray-700">{issue.solution}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>

                {troubleshootingIssues.length > 2 && (
                  <button
                    type="button"
                    onClick={() => setShowAllIssues(!showAllIssues)}
                    className="mt-4 text-sm text-[#C9A800] hover:text-[#B09700] font-medium focus:outline-none focus:ring-2 focus:ring-[#F7D81A] focus:ring-offset-2 rounded"
                    aria-label={showAllIssues ? "View less issues" : "View more issues"}
                  >
                    {showAllIssues ? "View Less" : "View More Issues"}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "payment" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
              id="panel-payment"
              role="tabpanel"
              aria-labelledby="tab-payment"
              tabIndex={0}
              hidden={activeTab !== "payment"}
            >
              {/* Time Frame Selector */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Payment Analysis</h3>
                <div className="flex gap-2">
                  {(["monthly", "yearly"] as const).map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setTimeFrame(tf)}
                      className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                        timeFrame === tf
                          ? "bg-[#F7D81A]/20 text-[#C9A800]"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                      aria-label={`Show ${tf} view`}
                    >
                      {tf.charAt(0).toUpperCase() + tf.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Chart */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="h-64 flex items-end gap-4 justify-between">
                  {paymentData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 h-full justify-end">
                      <div className="flex flex-col items-center h-full w-full justify-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{
                            height: `${Math.min(100, (item.amount / (timeFrame === "monthly" ? 40000 : 400000)) * 100)}%`,
                          }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                          className={`w-10 rounded-t-lg ${
                            item.status === "Paid"
                              ? "bg-gradient-to-t from-green-400 to-green-300"
                              : "bg-gradient-to-t from-[#F7D81A] to-[#FAEB5E]"
                          }`}
                        />
                      </div>
                      <div className="mt-2 text-center w-full">
                        <span className="text-xs text-gray-500 block truncate">
                          {timeFrame === "monthly"
                            ? (item as { month: string }).month
                            : (item as { year: string }).year}
                        </span>
                        <div className="text-xs font-medium mt-1 truncate">
                          {item.status === "Paid" ? (
                            <span className="text-green-600">₦{Math.round(item.amount).toLocaleString()}</span>
                          ) : (
                            <span className="text-[#C9A800]">₦{Math.round(item.amount).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
                  <p className="text-sm text-green-600 mb-1 truncate">Total Paid</p>
                  <p className="text-lg font-bold text-gray-900 truncate">₦120,000</p>
                </div>
                <div className="bg-[#FFFEF0] rounded-xl p-4 border border-[#F7D81A]/30 text-center">
                  <p className="text-sm text-[#C9A800] mb-1 truncate">Current Due</p>
                  <p className="text-lg font-bold text-gray-900 truncate">₦2,400</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
                  <p className="text-sm text-blue-600 mb-1 truncate">Remaining</p>
                  <p className="text-lg font-bold text-gray-900 truncate">₦144,000</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "maintenance" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
              id="panel-maintenance"
              role="tabpanel"
              aria-labelledby="tab-maintenance"
              tabIndex={0}
              hidden={activeTab !== "maintenance"}
            >
              {/* System Health */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
                    <p className="text-sm text-gray-500">All systems operating normally</p>
                  </div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <HiCheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Maintenance Schedule */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Schedule</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F7D81A]/20 rounded-lg flex items-center justify-center">
                        <HiCog className="w-5 h-5 text-[#C9A800]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Next Service</p>
                        <p className="text-sm text-gray-500">Routine maintenance check</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">15 Mar 2025</p>
                      <p className="text-sm text-[#C9A800]">In 3 months</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <HiDocumentText className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Warranty Renewal</p>
                        <p className="text-sm text-gray-500">Extended warranty option</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">15 Jan 2027</p>
                      <p className="text-sm text-gray-500">In 2 years</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Contact */}
              <div className="bg-[#FFFEF0] rounded-xl p-6 border border-[#F7D81A]/30">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our support team is available 24/7 for any technical assistance.
                </p>
                <button
                  type="button"
                  className="bg-[#F7D81A] hover:bg-[#E5C816] text-gray-900 font-medium px-6 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#F7D81A] focus:ring-offset-2 flex items-center gap-2"
                  aria-label="Contact support team"
                >
                  <HiSupport className="w-5 h-5" />
                  Contact Support
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
