"use client"

import { QueueStatCard } from "../../components/Queue/stat-card"
import { QueuesTable } from "../../components/Queue/queues-table"

export default function QueueManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">QUEUE MANAGEMENT</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-queue" className="text-sm text-gray-600">
            Sort By:
          </label>
          <select
            id="sort-queue"
            aria-label="Sort queues by time period"
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <QueueStatCard title="Total Queues" value="156" subtitle="+12 this month" subtitleColor="green" />
        <QueueStatCard title="Total Orders in Queues" value="56" subtitle="This month" subtitleColor="green" />
        <QueueStatCard title="Currently Active" value="10" subtitle="12 forming, 31 active" subtitleColor="blue" />
        <QueueStatCard
          title="Average Colleagues (completed)"
          value="6.4"
          subtitle="per completed queue"
          subtitleColor="blue"
        />
      </div>

      {/* Queues Table */}
      <QueuesTable />
    </div>
  )
}
