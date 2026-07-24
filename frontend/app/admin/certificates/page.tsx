import { Award, ClipboardCheck, Search } from 'lucide-react'

import { DataTable } from '../../admin/_components/data-table'
import { StatsCard } from '../../admin/_components/stats-card'

const certificates = [
  { id: 1, student: 'Meera Patel', course: 'Data Science', issued: 'Yes', status: 'Verified' },
  { id: 2, student: 'Aarav Sharma', course: 'Full Stack Developer', issued: 'Yes', status: 'Pending hash' },
  { id: 3, student: 'Kabir Rao', course: 'Python Full Stack', issued: 'No', status: 'Queued' },
  { id: 4, student: 'Ananya Singh', course: 'Digital Marketing', issued: 'Yes', status: 'Verified' },
]

export default function CertificatesPage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-4xl bg-linear-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-10 text-white mb-8" style={{ borderRadius: '36px' }}>
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Certificates</span>
            <h1 className="text-6xl font-black mt-6 leading-tight">Certificate issuance workflow</h1>
            <p className="text-xl text-blue-100 mt-4 max-w-2xl">
              Track verification, issuance, and pending certificate batches.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white">
            <Search className="h-4 w-4" />
            <span>Search by student or certificate id</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatsCard label="Issued" value="863" description="Certificates released" trend="+68" tone="emerald" icon={Award} />
        <StatsCard label="Pending" value="27" description="Awaiting final review" trend="-12" tone="amber" icon={ClipboardCheck} />
        <StatsCard label="Verified" value="98%" description="Validation success rate" trend="Stable" tone="sky" icon={Award} />
      </section>

      <DataTable
        title="Certificate register"
        description="Keep certificate delivery and verification current."
        columns={[
          { key: 'student', header: 'Student' },
          { key: 'course', header: 'Course' },
          { key: 'issued', header: 'Issued' },
          { key: 'status', header: 'Status' },
        ]}
        rows={certificates.map((certificate) => ({
          ...certificate,
          status: (
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {certificate.status}
            </span>
          ),
        }))}
      />
    </div>
  )
}
