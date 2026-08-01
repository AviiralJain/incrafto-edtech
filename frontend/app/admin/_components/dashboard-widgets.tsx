import { CalendarDays, ClipboardCheck, Clock3, Sparkles, TrendingUp, UserPlus } from 'lucide-react'

import { AdminCard } from './stats-card'

const approvals = [
  {
    title: 'React Hooks Tutorial',
    tag: 'Course draft',
    meta: 'Pending review by content team',
  },
  {
    title: 'Certificate batch #24',
    tag: 'Certificates',
    meta: 'Awaiting admin verification',
  },
  {
    title: 'New teacher onboarding',
    tag: 'Teachers',
    meta: 'Document verification in progress',
  },
]

const activity = [
  '24 new students enrolled today',
  'Placements board updated with 6 companies',
  '3 batches marked complete',
  'Pending certificates reduced by 18%',
]

const actions = [
  { label: 'Add Student', icon: UserPlus },
  { label: 'Issue Certificate', icon: ClipboardCheck },
  { label: 'Schedule Batch', icon: CalendarDays },
  { label: 'Review Approvals', icon: Clock3 },
]

export function DashboardWidgets() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <AdminCard className="p-8 xl:col-span-2">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 p-3 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Approval queue</h2>
              <p className="mt-1 text-gray-500">Items that need attention from the admin team.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {approvals.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.meta}</p>
              </div>
              <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </AdminCard>

      <div className="space-y-6">
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                className="rounded-2xl p-4 bg-linear-to-r from-blue-50 to-purple-50 hover:shadow-lg text-left"
              >
                <action.icon className="h-5 w-5 text-blue-600" />
                <span className="mt-3 block text-sm font-semibold text-gray-900">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AdminCard className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-2xl bg-linear-to-r from-purple-500 to-pink-500 p-3 text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
              <p className="mt-1 text-gray-500">Operational highlights from the last 24 hours.</p>
            </div>
          </div>

          <div className="space-y-3">
            {activity.map((entry) => (
              <div
                key={entry}
                className="rounded-2xl bg-linear-to-r from-slate-50 to-purple-50 px-4 py-3 text-sm text-gray-700"
              >
                {entry}
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  )
}
