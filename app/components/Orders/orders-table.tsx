"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OrdersTableRow {
  id: string
  time: string
  colleagues: number
  company: string
  type: string
  amount: string
  status: "ON_DELIVERY" | "NEW_ORDER" | "DELIVERED" | "INVOICE" | "TRACK"
}

const ordersData: OrdersTableRow[] = [
  {
    id: "#8472",
    time: "2:43 PM",
    colleagues: 8,
    company: "TechCorp",
    type: "INDIVIDUAL ORDER",
    amount: "₦33,333",
    status: "ON_DELIVERY",
  },
  {
    id: "#8471",
    time: "2:38 PM",
    colleagues: 5,
    company: "Innovate Labs",
    type: "QUEUED ORDER",
    amount: "₦33,333",
    status: "NEW_ORDER",
  },
  {
    id: "#8470",
    time: "2:31 PM",
    colleagues: 12,
    company: "Digital Solutions",
    type: "QUEUED ORDER",
    amount: "₦33,333",
    status: "DELIVERED",
  },
  {
    id: "#8469",
    time: "2:25 PM",
    colleagues: 3,
    company: "StartupHub",
    type: "INDIVIDUAL ORDER",
    amount: "₦33,333",
    status: "ON_DELIVERY",
  },
  {
    id: "#8468",
    time: "2:18 PM",
    colleagues: 7,
    company: "CreativeWorks",
    type: "INDIVIDUAL ORDER",
    amount: "₦33,333",
    status: "NEW_ORDER",
  },
  {
    id: "#8467",
    time: "2:12 PM",
    colleagues: 2,
    company: "MegaMind Inc",
    type: "QUEUED ORDER",
    amount: "₦33,333",
    status: "DELIVERED",
  },
  {
    id: "#8467",
    time: "2:09 PM",
    colleagues: 5,
    company: "Naruto Uzumaki Inc",
    type: "INDIVIDUAL ORDER",
    amount: "₦33,333",
    status: "ON_DELIVERY",
  },
  {
    id: "#8466",
    time: "2:01 PM",
    colleagues: 5,
    company: "Izuku Midoriya Inc",
    type: "INDIVIDUAL ORDER",
    amount: "₦33,333",
    status: "NEW_ORDER",
  },
  {
    id: "#8465",
    time: "1:59 PM",
    colleagues: 5,
    company: "Akatsuki Inc",
    type: "INDIVIDUAL ORDER",
    amount: "₦33,333",
    status: "DELIVERED",
  },
]

const statusStyles = {
  ON_DELIVERY: { bg: "#FAF6FA", text: "#D291DC", label: "ON DELIVERY" },
  NEW_ORDER: { bg: "#FFF4CC", text: "#F59E0B", label: "NEW ORDER" },
  DELIVERED: { bg: "#EDF7EE", text: "#10B981", label: "DELIVERED" },
  INVOICE: { bg: "#FFF4CC", text: "#F59E0B", label: "INVOICE" },
  TRACK: { bg: "#FAF6FA", text: "#D291DC", label: "TRACK" },
}

export function OrdersTable() {
  const [category, setCategory] = useState("All")
  const [status, setStatus] = useState("All")

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="category-filter" className="text-sm text-gray-600">
                Category:
              </label>
              <select
                id="category-filter"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option>All</option>
                <option>Individual</option>
                <option>Queued</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="status-filter" className="text-sm text-gray-600">
                Status:
              </label>
              <select
                id="status-filter"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option>All</option>
                <option>On Delivery</option>
                <option>New Order</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow style={{ backgroundColor: "#FFF4CC" }}>
            <TableHead className="font-bold text-gray-900">ORDER ID</TableHead>
            <TableHead className="font-bold text-gray-900">TIME</TableHead>
            <TableHead className="font-bold text-gray-900">NO. OF COLLEAGUES</TableHead>
            <TableHead className="font-bold text-gray-900">COMPANY</TableHead>
            <TableHead className="font-bold text-gray-900">ORDER TYPE</TableHead>
            <TableHead className="font-bold text-gray-900">AMOUNT</TableHead>
            <TableHead className="font-bold text-gray-900">STATUS</TableHead>
            <TableHead className="font-bold text-gray-900">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersData.map((row) => (
            <TableRow key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
              <TableCell className="text-sm font-medium text-gray-900">{row.id}</TableCell>
              <TableCell className="text-sm text-gray-600">{row.time}</TableCell>
              <TableCell className="text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
                  </svg>
                  {row.colleagues} colleagues
                </span>
              </TableCell>
              <TableCell className="text-sm text-gray-900 font-medium">{row.company}</TableCell>
              <TableCell className="text-sm text-gray-600">{row.type}</TableCell>
              <TableCell className="text-sm text-gray-900 font-medium">{row.amount}</TableCell>
              <TableCell>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: statusStyles[row.status].bg,
                    color: statusStyles[row.status].text,
                  }}
                >
                  {statusStyles[row.status].label}
                </span>
              </TableCell>
              <TableCell>
                <button className="text-gray-400 hover:text-gray-600 text-xl">⋮</button>
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
