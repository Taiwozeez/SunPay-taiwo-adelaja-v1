"use client"

import { CompanyStatCard } from "../../components/Company/stat-card"
import { CompaniesTable } from "../../components/Company/companies-table"
import { EngagementChart } from "../../components/Company/engagement-chart"

export default function CompanyPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Company Management</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-company" className="text-sm text-gray-600">
            Sort By:
          </label>
          <select
            id="sort-company"
            aria-label="Sort companies by time period"
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <CompanyStatCard title="Total Companies" value="156" subtitle="+12 this month" subtitleColor="green" />
        <CompanyStatCard title="Active in Queue" value="56" subtitle="56% participation rate" subtitleColor="blue" />
        <CompanyStatCard title="Total Colleagues" value="2,847" subtitle="Across all companies" subtitleColor="green" />
        <CompanyStatCard
          title="Average Queue Participation"
          value="2.4"
          subtitle="colleague per queue"
          subtitleColor="blue"
        />
      </div>

      {/* Companies Table */}
      <CompaniesTable />

      {/* Engagement Chart */}
      <EngagementChart />
    </div>
  )
}
