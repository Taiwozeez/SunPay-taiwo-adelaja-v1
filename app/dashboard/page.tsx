"use client"

import { useState } from "react"
import { StatCard } from "../components/Dashboard/stat-card"
import { OrderActivityChart } from "../components/Dashboard/order-activity-chart"
import { DeliveryEfficiencyChart } from "../components/Dashboard/delivery-efficiency-chart"
import { CompanyEngagement } from "../components/Dashboard/company-engagement"
import { QueueActivity } from "../components/Dashboard/queue-activity"
import { QueueEventsTable } from "../components/Dashboard/queue-events-table"
import { RiderEventsTable } from "../components/Dashboard/rider-events-table"

export default function DashboardPage() {
  const [eventType, setEventType] = useState("queue")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm text-gray-600">
            Sort By:
          </label>
          <select
            id="sort-select"
            aria-label="Sort dashboard by time period"
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Active Orders"
          value="127"
          trend={{ value: "+2.45% vs yesterday", positive: true }}
          icon="/images/active-order.png"
        />
        <StatCard title="Active Queues" value="43" subtitle="8 forming, 35 active" icon="/images/active-qeue.png" />
        <StatCard title="Active Riders" value="56" subtitle="12 on delivery" icon="/images/active-rider.png" />
        <StatCard title="Total Revenue" value="500,000" subtitle="Today's earnings" icon="/images/naira.png" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <OrderActivityChart />
        </div>
        <DeliveryEfficiencyChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <CompanyEngagement />
        </div>
        <QueueActivity />
      </div>

      {/* Table - Display Queue or Rider table based on eventType state */}
      {eventType === "queue" ? (
        <QueueEventsTable onEventTypeChange={setEventType} />
      ) : (
        <RiderEventsTable onEventTypeChange={setEventType} />
      )}
    </div>
  )
}