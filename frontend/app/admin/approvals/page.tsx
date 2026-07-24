import { ClipboardCheck, ShieldCheck } from 'lucide-react'

import { DataTable } from '../../admin/_components/data-table'
import { StatsCard } from '../../admin/_components/stats-card'

const approvals = [
  { id: 1, item: 'React Hooks Tutorial', type: 'Content', priority: 'High', status: 'Pending' },
  { id: 2, item: 'Teacher onboarding docs', type: 'Teacher', priority: 'Medium', status: 'Pending' },
  { id: 3, item: 'Batch completion proof', type: 'Batch', priority: 'Low', status: 'Approved' },
  { id: 4, item: 'Certificate request', type: 'Certificate', priority: 'High', status: 'Pending' },
]

export default function ApprovalsPage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-4xl bg-linear-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-10 text-white mb-8" style={{ borderRadius: '36px' }}>
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <p className="bg-white/20 w-fit px-4 py-2 rounded-full text-sm">Approvals</p>
        <h1 className="text-6xl font-black mt-6 leading-tight">Review queue and moderation</h1>
        <p className="text-xl text-blue-100 mt-4 max-w-2xl">
          Handle content review, teacher onboarding, and certificate validations.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatsCard label="Pending" value="27" description="Items awaiting action" trend="5 urgent" tone="rose" icon={ShieldCheck} />
        <StatsCard label="Approved" value="154" description="Cleared this month" trend="+18" tone="emerald" icon={ClipboardCheck} />
        <StatsCard label="Rejected" value="9" description="Needs correction" trend="-2" tone="amber" icon={ShieldCheck} />
      </section>

      <DataTable
        title="Approval queue"
        description="Moderation items across the platform."
        columns={[
          { key: 'item', header: 'Item' },
          { key: 'type', header: 'Type' },
          { key: 'priority', header: 'Priority' },
          { key: 'status', header: 'Status' },
        ]}
        rows={approvals.map((approval) => ({
          ...approval,
          status: (
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {approval.status}
            </span>
          ),
        }))}
      />
    </div>
  )
}
