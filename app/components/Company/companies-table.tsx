"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CompaniesTableRow {
  id: string
  name: string
  dateCreated: string
  colleagues: number
  activeQueues: number
  totalOrders: number
  queueParticipation: string
}

const companiesData: CompaniesTableRow[] = [
  {
    id: "1",
    name: "TechCorp",
    dateCreated: "2025-11-10",
    colleagues: 245,
    activeQueues: 45,
    totalOrders: 45,
    queueParticipation: "78%",
  },
  {
    id: "2",
    name: "Digital Solutions Inc",
    dateCreated: "2025-11-10",
    colleagues: 100,
    activeQueues: 12,
    totalOrders: 45,
    queueParticipation: "78%",
  },
  {
    id: "3",
    name: "FinServe Group",
    dateCreated: "2025-11-10",
    colleagues: 5,
    activeQueues: 3,
    totalOrders: 45,
    queueParticipation: "78%",
  },
  {
    id: "4",
    name: "Creative Agency Ltd",
    dateCreated: "2025-11-10",
    colleagues: 212,
    activeQueues: 1,
    totalOrders: 45,
    queueParticipation: "78%",
  },
  {
    id: "5",
    name: "MediaCo Partners",
    dateCreated: "2025-11-10",
    colleagues: 179,
    activeQueues: 0,
    totalOrders: 45,
    queueParticipation: "78%",
  },
  {
    id: "6",
    name: "BizStart Ventures",
    dateCreated: "2025-11-10",
    colleagues: 92,
    activeQueues: 0,
    totalOrders: 45,
    queueParticipation: "78%",
  },
  {
    id: "7",
    name: "HealthPlus Systems",
    dateCreated: "2025-11-10",
    colleagues: 179,
    activeQueues: 0,
    totalOrders: 45,
    queueParticipation: "78%",
  },
  {
    id: "8",
    name: "EduSmart Academy",
    dateCreated: "2025-11-10",
    colleagues: 300,
    activeQueues: 0,
    totalOrders: 45,
    queueParticipation: "78%",
  },
  {
    id: "9",
    name: "EduSmart Academy",
    dateCreated: "2025-11-10",
    colleagues: 200,
    activeQueues: 0,
    totalOrders: 45,
    queueParticipation: "78%",
  },
  {
    id: "10",
    name: "EduSmart Academy",
    dateCreated: "2025-11-10",
    colleagues: 12,
    activeQueues: 0,
    totalOrders: 45,
    queueParticipation: "78%",
  },
]

export function CompaniesTable() {
  const [category, setCategory] = useState("All")
  const [status, setStatus] = useState("All")

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">All Companies</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search Company..."
              className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 w-40"
            />
            <div className="flex items-center gap-2">
              <label htmlFor="company-category" className="text-sm text-gray-600">
                Category:
              </label>
              <select
                id="company-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option>All</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="company-status" className="text-sm text-gray-600">
                Status:
              </label>
              <select
                id="company-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option>All</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow style={{ backgroundColor: "#FFF4CC" }}>
            <TableHead className="font-bold text-gray-900">COMPANY</TableHead>
            <TableHead className="font-bold text-gray-900">DATE CREATED</TableHead>
            <TableHead className="font-bold text-gray-900">COLLEAGUES</TableHead>
            <TableHead className="font-bold text-gray-900">ACTIVE QUEUES</TableHead>
            <TableHead className="font-bold text-gray-900">TOTAL ORDERS</TableHead>
            <TableHead className="font-bold text-gray-900">QUEUE PARTICIPATION</TableHead>
            <TableHead className="font-bold text-gray-900">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companiesData.map((row) => (
            <TableRow key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
              <TableCell className="text-sm font-medium text-gray-900">{row.name}</TableCell>
              <TableCell className="text-sm text-gray-600">{row.dateCreated}</TableCell>
              <TableCell className="text-sm text-gray-900 font-medium">{row.colleagues}</TableCell>
              <TableCell className="text-sm text-gray-900 font-medium">{row.activeQueues}</TableCell>
              <TableCell className="text-sm text-gray-900 font-medium">{row.totalOrders}</TableCell>
              <TableCell className="text-sm text-gray-900 font-medium">{row.queueParticipation}</TableCell>
              <TableCell>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-600">Showing 1-10 of 100</span>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">←</button>
          <button className="p-2 px-3 bg-teal-400 text-white rounded-lg">1</button>
          <button className="p-2 px-3 text-gray-600 hover:bg-gray-100 rounded-lg">2</button>
          <button className="p-2 px-3 text-gray-600 hover:bg-gray-100 rounded-lg">...</button>
          <button className="p-2 px-3 text-gray-600 hover:bg-gray-100 rounded-lg">100</button>
          <button className="p-2 text-gray-400 hover:text-gray-600">→</button>
        </div>
      </div>
    </div>
  )
}
