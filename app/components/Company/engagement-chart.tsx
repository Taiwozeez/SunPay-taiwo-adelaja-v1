"use client"

export function EngagementChart() {
  const companies = [
    { name: "TechCorp", queues: 47, participation: 78 },
    { name: "TechCorp", queues: 47, participation: 78 },
    { name: "Health Plus", queues: 40, participation: 50 },
    { name: "MediaCo", queues: 40, participation: 50 },
    { name: "Creative", queues: 40, participation: 50 },
    { name: "LogiTrans", queues: 40, participation: 50 },
    { name: "RetailHub", queues: 40, participation: 50 },
    { name: "PropTech", queues: 40, participation: 50 },
    { name: "GreenEnergy", queues: 40, participation: 50 },
    { name: "Digital", queues: 40, participation: 50 },
  ]

  const maxQueues = Math.max(...companies.map((c) => c.queues))

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Company Engagement - Top 10 by Queue Participation</h2>

      <div className="space-y-4">
        {companies.map((company, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-24 text-sm text-gray-600 truncate">{company.name}</div>
            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden h-10">
                <div
                  className="bg-teal-500 h-full flex items-center justify-center relative"
                  style={{ width: `${(company.queues / maxQueues) * 100}%` }}
                >
                  {company.queues > 0 && (
                    <span className="text-white text-xs font-semibold">{company.queues} queues</span>
                  )}
                </div>
              </div>
              <div className="w-12 text-right text-sm text-gray-600">{company.participation}%</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-teal-500"></div>
          <span className="text-sm text-gray-600">Number of Queues created</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-200"></div>
          <span className="text-sm text-gray-600">Colleagues adoption rate</span>
        </div>
      </div>
    </div>
  )
}
