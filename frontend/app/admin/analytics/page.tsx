import { Activity, BarChart3, TrendingUp } from 'lucide-react'

import { StatsCard } from '../../admin/_components/stats-card'
import { AdminCard } from '../../admin/_components/stats-card'

const channels = [
  { label: 'Admissions', value: '78%' },
  { label: 'Placements', value: '91%' },
  { label: 'Certificate delivery', value: '98%' },
  { label: 'Support response', value: '86%' },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-4xl bg-linear-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-10 text-white mb-8" style={{ borderRadius: '36px' }}>
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-4xl blur-2xl" />
        <p className="bg-white/20 w-fit px-4 py-2 rounded-full text-sm">Analytics</p>
        <h1 className="text-6xl font-black mt-6 leading-tight">Operational metrics and trends</h1>
        <p className="text-xl text-blue-100 mt-4 max-w-2xl">
          Review institute performance across admissions, delivery, and placement outcomes.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatsCard label="Engagement" value="87%" description="Weekly active users" trend="+6%" tone="sky" icon={Activity} />
        <StatsCard label="Conversions" value="24%" description="Leads to admissions" trend="+3%" tone="emerald" icon={BarChart3} />
        <StatsCard label="Outcome Score" value="94" description="Composite health index" trend="Trending up" tone="violet" icon={TrendingUp} />
      </section>

      <AdminCard className="p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Channel performance</h2>
        <div className="space-y-4">
          {channels.map((channel) => (
            <div key={channel.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>{channel.label}</span>
                <span>{channel.value}</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-linear-to-r from-sky-500 to-cyan-400"
                  style={{ width: channel.value }}
                />
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  )
}
