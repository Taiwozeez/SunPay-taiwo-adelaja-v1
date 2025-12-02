"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface UsersTableRow {
  id: string
  name: string
  company: string
  email: string
  orders: number
  lastActive: string
  status: "ACTIVE" | "INACTIVE"
}

const usersData: UsersTableRow[] = [
  {
    id: "1",
    name: "Abdul Abubakor Abdul",
    company: "TechCorp",
    email: "abdul@techcorp.com",
    orders: 45,
    lastActive: "2 days ago",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Philip Nzube Nwabilii",
    company: "Innovate Labs",
    email: "philip@innovatelabs.com",
    orders: 12,
    lastActive: "1 hour ago",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Okonicha Michelle Buchi",
    company: "Digital Solutions",
    email: "buchi@digitalsolutions.com",
    orders: 3,
    lastActive: "Offline",
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "Abraham Anthony",
    company: "StartupHub",
    email: "anthony@startupub.com",
    orders: 1,
    lastActive: "5 days ago",
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "Loveth Danjuma Idundu",
    company: "CreativeWorks",
    email: "loveth@creativeworks.com",
    orders: 0,
    lastActive: "0",
    status: "ACTIVE",
  },
  {
    id: "6",
    name: "Loveth Danjuma Idundu",
    company: "CreativeWorks",
    email: "loveth@creativeworks.com",
    orders: 0,
    lastActive: "0",
    status: "ACTIVE",
  },
  {
    id: "7",
    name: "Loveth Danjuma Idundu",
    company: "CreativeWorks",
    email: "loveth@creativeworks.com",
    orders: 0,
    lastActive: "0",
    status: "ACTIVE",
  },
  {
    id: "8",
    name: "Loveth Danjuma Idundu",
    company: "CreativeWorks",
    email: "loveth@creativeworks.com",
    orders: 0,
    lastActive: "0",
    status: "ACTIVE",
  },
  {
    id: "9",
    name: "Loveth Danjuma Idundu",
    company: "CreativeWorks",
    email: "loveth@creativeworks.com",
    orders: 0,
    lastActive: "0",
    status: "ACTIVE",
  },
  {
    id: "10",
    name: "Loveth Danjuma Idundu",
    company: "CreativeWorks",
    email: "loveth@creativeworks.com",
    orders: 0,
    lastActive: "0",
    status: "ACTIVE",
  },
]

export function UsersTable() {
  const [category, setCategory] = useState("All")
  const [status, setStatus] = useState("All")

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search Users..."
              className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 w-40"
            />
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
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow style={{ backgroundColor: "#FFF4CC" }}>
            <TableHead className="font-bold text-gray-900">USERS</TableHead>
            <TableHead className="font-bold text-gray-900">COMPANY</TableHead>
            <TableHead className="font-bold text-gray-900">EMAILS</TableHead>
            <TableHead className="font-bold text-gray-900">ORDERS</TableHead>
            <TableHead className="font-bold text-gray-900">LAST ACTIVE</TableHead>
            <TableHead className="font-bold text-gray-900">STATUS</TableHead>
            <TableHead className="font-bold text-gray-900">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((row) => (
            <TableRow key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
              <TableCell className="text-sm font-medium text-gray-900">{row.name}</TableCell>
              <TableCell className="text-sm text-gray-600">{row.company}</TableCell>
              <TableCell className="text-sm text-gray-600">{row.email}</TableCell>
              <TableCell className="text-sm text-gray-900 font-medium">{row.orders}</TableCell>
              <TableCell className="text-sm text-gray-600">{row.lastActive}</TableCell>
              <TableCell>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {row.status}
                </span>
              </TableCell>
              <TableCell>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
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
