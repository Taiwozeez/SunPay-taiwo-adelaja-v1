"use client"

import { RidersStatCard } from "../../components/Riders/stat-card"
import { RidersTable } from "../../components/Riders/riders-table"

export default function RidersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Riders Management</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-riders" className="text-sm text-gray-600">
            Sort By:
          </label>
          <select
            id="sort-riders"
            aria-label="Sort riders by time period"
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <RidersStatCard title="Total Riders" value="156" subtitle="12 new this month" subtitleColor="green" />
        <RidersStatCard title="Active Riders Now" value="56" subtitle="Online Status" subtitleColor="green" />
        <RidersStatCard title="Pending Application" value="12" subtitle="Need Review" subtitleColor="orange" />
        <RidersStatCard
          title="Average Rating"
          value="4.8"
          subtitle="0.3 decline vs last month"
          subtitleColor="orange"
        />
      </div>

      {/* Riders Table */}
      <RidersTable />
    </div>
  )
}
