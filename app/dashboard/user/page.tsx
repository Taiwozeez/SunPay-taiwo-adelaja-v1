"use client"

import { UsersStatCard } from "../../components/User/stat-card"
import { UsersTable } from "../../components/User/users-table"
import { RegistrationsChart } from "../../components/User/registrations-chart"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-users" className="text-sm text-gray-600">
            Sort By:
          </label>
          <select
            id="sort-users"
            aria-label="Sort users by time period"
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <UsersStatCard title="Total Users" value="4,567" subtitle="15% increase vs last month" subtitleColor="green" />
        <UsersStatCard
          title="Active App Users"
          value="3,120"
          subtitle="Currently active in app"
          subtitleColor="green"
        />
        <UsersStatCard title="Companies with Users" value="156" subtitle="12 new this quarter" subtitleColor="green" />
        <UsersStatCard
          title="Average Orders per User"
          value="7.2"
          subtitle="0.3 decline vs last month"
          subtitleColor="red"
        />
      </div>

      {/* Users Table */}
      <UsersTable />

      {/* Registrations Chart */}
      <RegistrationsChart />
    </div>
  )
}
