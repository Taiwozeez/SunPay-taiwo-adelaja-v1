"use client"

import { StatCard } from "../../components/Orders/stat-card"
import { OrdersTable } from "../../components/Orders/orders-table"
import { OrdersActivityChart } from "../../components/Orders/activity-chart"

export default function OrdersManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-orders" className="text-sm text-gray-600">
            Sort By:
          </label>
          <select
            id="sort-orders"
            aria-label="Sort orders by time period"
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="New Order" value="23 orders" icon="/warning-icon.png" />
        <StatCard title="Preparing" value="45 orders" icon="/fire-icon.png" />
        <StatCard title="Out for Delivery" value="18 orders" icon="/delivery-truck-icon.png" />
        <StatCard title="Delivery Today" value="342 orders" icon="/checkmark-circle-icon.jpg" />
      </div>

      {/* Orders Table */}
      <OrdersTable />

      {/* Order Activity Chart */}
      <OrdersActivityChart />
    </div>
  )
}