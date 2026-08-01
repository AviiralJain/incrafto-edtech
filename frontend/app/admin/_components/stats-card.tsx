import type { ComponentType, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

type StatsCardProps = {
  label: string
  value: string
  icon: ComponentType<{ className?: string }>
  description: string
  trend?: string
  tone?: 'sky' | 'emerald' | 'amber' | 'rose' | 'violet' | 'slate'
}

const toneClasses: Record<NonNullable<StatsCardProps['tone']>, string> = {
  sky: 'from-sky-500/15 to-cyan-500/10 text-sky-700 border-sky-200',
  emerald: 'from-emerald-500/15 to-teal-500/10 text-emerald-700 border-emerald-200',
  amber: 'from-amber-500/15 to-orange-500/10 text-amber-700 border-amber-200',
  rose: 'from-rose-500/15 to-pink-500/10 text-rose-700 border-rose-200',
  violet: 'from-violet-500/15 to-purple-500/10 text-violet-700 border-violet-200',
  slate: 'from-slate-500/15 to-slate-400/10 text-slate-700 border-slate-200',
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  description,
  trend,
  tone = 'sky',
}: StatsCardProps) {
  return (
    <AdminCard
      className={cn(
        'p-6 transition-all hover:-translate-y-2',
        toneClasses[tone],
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-2 text-4xl font-black text-gray-900">
            {value}
          </p>
        </div>

        <div className={cn('w-14 h-14 rounded-2xl bg-linear-to-r flex items-center justify-center text-white', tone === 'sky' && 'from-blue-500 to-cyan-500', tone === 'emerald' && 'from-green-500 to-emerald-500', tone === 'amber' && 'from-orange-500 to-red-500', tone === 'rose' && 'from-purple-500 to-pink-500', tone === 'violet' && 'from-purple-500 to-purple-600', tone === 'slate' && 'from-slate-500 to-slate-600')}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
        <p className="text-green-500">{description}</p>
        {trend ? <p className="font-medium text-blue-600">{trend}</p> : null}
      </div>
    </AdminCard>
  )
}

export function AdminCard({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl',
        className,
      )}
    >
      {children}
    </div>
  )
}
