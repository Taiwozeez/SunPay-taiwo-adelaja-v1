"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface QueuesTableRow {
  id: string
  queueId: string
  company: string
  colleagues: number
  action: string
  deliveryFeeSplit: string
  status: string
}

const queuesData: QueuesTableRow[] = [
  {
    id: "1",
    queueId: "QORD-436",
    company: "TechCorp",
    colleagues: 8,
    action: "QUEUE CLOSED",
    deliveryFeeSplit: "₦333 per person",
    status: "DISPATCHED",
  },
  {
    id: "2",
    queueId: "QORD-437",
    company: "Innovate Labs",
    colleagues: 8,
    action: "MEMBER JOINED",
    deliveryFeeSplit: "333 per person",
    status: "PENDING",
  },
  {
    id: "3",
    queueId: "QORD-438",
    company: "Digital Solutions",
    colleagues: 8,
    action: "COMPLETED",
    deliveryFeeSplit: "333 per person",
    status: "COMPLETED",
  },
  {
    id: "4",
    queueId: "QORD-439",
    company: "StartupHub",
    colleagues: 8,
    action: "QUEUE CREATED",
    deliveryFeeSplit: "333 per person",
    status: "DISPATCHED",
  },
  {
    id: "5",
    queueId: "QORD-440",
    company: "CreativeWorks",
    colleagues: 8,
    action: "QUEUE CLOSED",
    deliveryFeeSplit: "333 per person",
    status: "DISPATCHED",
  },
  {
    id: "6",
    queueId: "QORD-441",
    company: "CreativeWorks",
    colleagues: 8,
    action: "QUEUE CLOSED",
    deliveryFeeSplit: "333 per person",
    status: "DISPATCHED",
  },
  {
    id: "7",
    queueId: "QORD-442",
    company: "CreativeWorks",
    colleagues: 8,
    action: "QUEUE CLOSED",
    deliveryFeeSplit: "333 per person",
    status: "DISPATCHED",
  },
  {
    id: "8",
    queueId: "QORD-443",
    company: "CreativeWorks",
    colleagues: 8,
    action: "QUEUE CLOSED",
    deliveryFeeSplit: "333 per person",
    status: "DISPATCHED",
  },
  {
    id: "9",
    queueId: "QORD-444",
    company: "CreativeWorks",
    colleagues: 8,
    action: "QUEUE CLOSED",
    deliveryFeeSplit: "333 per person",
    status: "DISPATCHED",
  },
  {
    id: "10",
    queueId: "QORD-445",
    company: "CreativeWorks",
    colleagues: 8,
    action: "QUEUE CLOSED",
    deliveryFeeSplit: "333 per person",
    status: "DISPATCHED",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "DISPATCHED":
      return { bg: "#FAF6FA", text: "#B8A0C4" }
    case "PENDING":
      return { bg: "#FFF4CC", text: "#B8860D" }
    case "COMPLETED":
      return { bg: "#EDF7EE", text: "#4A8F5E" }
    default:
      return { bg: "#F0F0F0", text: "#666" }
  }
}

const getActionBadgeColor = (action: string) => {
  switch (action) {
    case "QUEUE CLOSED":
      return { bg: "#FAF6FA", text: "#B8A0C4" }
    case "MEMBER JOINED":
      return { bg: "#FFF4CC", text: "#B8860D" }
    case "COMPLETED":
      return { bg: "#EDF7EE", text: "#4A8F5E" }
    case "QUEUE CREATED":
      return { bg: "#FAF6FA", text: "#B8A0C4" }
    default:
      return { bg: "#F0F0F0", text: "#666" }
  }
}

export function QueuesTable() {
  const [category, setCategory] = useState("All")
  const [status, setStatus] = useState("All")

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Queues</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search Queues..."
              className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 w-40"
            />
            <div className="flex items-center gap-2">
              <label htmlFor="queue-status" className="text-sm text-gray-600">
                Status:
              </label>
              <select
                id="queue-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option>All</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="queue-category" className="text-sm text-gray-600">
                Category:
              </label>
              <select
                id="queue-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
            <TableHead className="font-bold text-gray-900">QUEUE ID</TableHead>
            <TableHead className="font-bold text-gray-900">COMPANY</TableHead>
            <TableHead className="font-bold text-gray-900">NO. OF COLLEAGUES</TableHead>
            <TableHead className="font-bold text-gray-900">ACTION</TableHead>
            <TableHead className="font-bold text-gray-900">DELIVERY FEE SPLIT</TableHead>
            <TableHead className="font-bold text-gray-900">STATUS</TableHead>
            <TableHead className="font-bold text-gray-900">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queuesData.map((row) => {
            const statusColor = getStatusColor(row.status)
            const actionColor = getActionBadgeColor(row.action)
            return (
              <TableRow key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <TableCell className="text-sm font-medium text-gray-900">{row.queueId}</TableCell>
                <TableCell className="text-sm text-gray-600">{row.company}</TableCell>
                <TableCell className="text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="8" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="16" cy="12" r="2" />
                    </svg>
                    {row.colleagues} colleagues
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-900 font-medium">{row.action}</TableCell>
                <TableCell className="text-sm text-gray-900 font-medium">{row.deliveryFeeSplit}</TableCell>
                <TableCell>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>
                  {row.status === "DISPATCHED" && (
                    <button
                      className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: "#B8A0C4" }}
                    >
                      TRACK
                    </button>
                  )}
                  {row.status === "PENDING" && (
                    <button
                      className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: "#B8860D" }}
                    >
                      ALERT
                    </button>
                  )}
                  {row.status === "COMPLETED" && (
                    <button
                      className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: "#00D9CC" }}
                    >
                      INVOICE
                    </button>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
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
