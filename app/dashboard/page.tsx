"use client"

import { PaymentForm } from "../components/Dashboard/payment-form"
import { PaymentProgress } from "../components/Dashboard/payment-progress"
import { RecentTransactions } from "../components/Dashboard/transactions-table"
import { SolarProductStatus } from "../components/Dashboard/solarProducts"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm text-gray-600">
            Sort By:
          </label>
          <select
            id="sort-select"
            aria-label="Sort dashboard by time period"
            className="text-sm px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
          >
            <option>All time</option>
            <option>This month</option>
            <option>This week</option>
          </select>
        </div>
      </div>

      {/* Top Row: Payment Form + Payment Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentForm />
        <PaymentProgress />
      </div>

      {/* Mobile View: Solar Product Status first, then Recent Transactions */}
      <div className="block lg:hidden space-y-6">
        <SolarProductStatus />
        <RecentTransactions />
      </div>

      {/* Desktop View: Original layout */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <SolarProductStatus />
      </div>
    </div>
  )
}