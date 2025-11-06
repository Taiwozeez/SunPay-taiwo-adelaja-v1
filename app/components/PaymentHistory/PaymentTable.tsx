"use client"

import { useState } from "react"

export default function PaymentTable() {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const payments = [
    { date: "2025-11-01", amount: "₦2,000", keycode: "228-445-078-788-688", status: "Successful" },
    { date: "2025-11-02", amount: "₦3,500", keycode: "445-567-123-456-890", status: "Failed" },
    { date: "2025-11-03", amount: "₦1,200", keycode: "789-234-098-765-432", status: "Successful" },
    { date: "2025-11-04", amount: "₦5,000", keycode: "234-987-345-678-901", status: "Successful" },
    { date: "2025-11-05", amount: "₦1,800", keycode: "111-222-333-444-555", status: "Failed" },
    { date: "2025-11-06", amount: "₦7,000", keycode: "666-777-888-999-000", status: "Successful" },
    { date: "2025-11-07", amount: "₦2,750", keycode: "123-456-789-012-345", status: "Successful" },
    { date: "2025-11-08", amount: "₦3,100", keycode: "321-654-987-210-543", status: "Failed" },
    { date: "2025-11-09", amount: "₦4,600", keycode: "654-987-321-654-987", status: "Successful" },
    { date: "2025-11-10", amount: "₦2,300", keycode: "567-890-123-456-789", status: "Successful" },
  ]

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-16 bg-white">
      <div className="max-w-[1500px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-6 sm:gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Payment History
          </h2>

          {/* Calendar Filters */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 w-full sm:w-auto">
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="fromDate" className="text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="Select start date"
                title="Select the start date for filtering payments"
                className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-[200px]"
              />
            </div>

            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="toDate" className="text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="Select end date"
                title="Select the end date for filtering payments"
                className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-[200px]"
              />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="relative overflow-x-auto rounded-2xl shadow-lg border border-yellow-200 bg-white scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-100">
          <div className="absolute bottom-2 right-4 text-xs text-gray-400 md:hidden animate-pulse">
            ← Scroll →
          </div>

          <table className="w-full min-w-[1000px] text-left border-collapse">
            <thead className="bg-yellow-400 text-white">
              <tr>
                <th className="py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  Date
                </th>
                <th className="py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  Keycode
                </th>
                <th className="py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {payments.map((payment, index) => (
                <tr
                  key={index}
                  className="hover:bg-yellow-50 transition duration-150 ease-in-out"
                >
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-gray-800 text-sm sm:text-base whitespace-nowrap">
                    {payment.date}
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 font-medium text-gray-900 text-sm sm:text-base whitespace-nowrap">
                    {payment.amount}
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 font-mono text-gray-700 text-sm sm:text-base whitespace-nowrap">
                    {payment.status === "Successful" ? payment.keycode : "N/A"}
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 whitespace-nowrap">
                    {payment.status === "Successful" ? (
                      <span className="inline-block rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs sm:text-sm font-semibold">
                        Successful
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs sm:text-sm font-semibold">
                        Failed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
