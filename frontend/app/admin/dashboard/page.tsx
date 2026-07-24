'use client'

import { BarChart3, Briefcase, GraduationCap, LayoutDashboard, ShieldCheck, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

import { DashboardWidgets } from '../_components/dashboard-widgets'
import { StatsCard } from '../_components/stats-card'
import { getAdminSummary } from '@/lib/admin-api'

type SummaryState = {
  totalStudents: number
  totalTeachers: number
  totalCourses: number
  totalBatches: number
  totalPlacements: number
}

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<SummaryState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadSummary() {
      try {
        setLoading(true)
        setError(null)
        const response = await getAdminSummary()

        if (!isMounted) return
        setSummary(response.data)
      } catch (fetchError) {
        if (!isMounted) return
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to load dashboard summary')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadSummary()

    return () => {
      isMounted = false
    }
  }, [])

  const stats = [
    {
      label: 'Total Students',
      value: loading ? '...' : String(summary?.totalStudents ?? 0),
      description: 'Enrolled across active programs',
      trend: 'Live summary',
      tone: 'sky' as const,
      icon: Users,
    },
    {
      label: 'Total Teachers',
      value: loading ? '...' : String(summary?.totalTeachers ?? 0),
      description: 'Faculty and mentors onboarded',
      trend: 'Live summary',
      tone: 'emerald' as const,
      icon: GraduationCap,
    },
    {
      label: 'Active Courses',
      value: loading ? '...' : String(summary?.totalCourses ?? 0),
      description: 'Programs currently available',
      trend: 'Live summary',
      tone: 'amber' as const,
      icon: LayoutDashboard,
    },
    {
      label: 'Batches',
      value: loading ? '...' : String(summary?.totalBatches ?? 0),
      description: 'Cohorts under management',
      trend: 'Live summary',
      tone: 'violet' as const,
      icon: Briefcase,
    },
    {
      label: 'Placements',
      value: loading ? '...' : String(summary?.totalPlacements ?? 0),
      description: 'Placement records tracked',
      trend: 'Live summary',
      tone: 'rose' as const,
      icon: ShieldCheck,
    },
    {
      label: 'Analytics Health',
      value: loading ? '...' : '98%',
      description: 'Platform visibility score',
      trend: loading ? 'Loading' : 'All systems green',
      tone: 'slate' as const,
      icon: BarChart3,
    },
  ]

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-4xl bg-linear-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-10 text-white mb-8" style={{ borderRadius: '36px' }}>
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 w-full">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            Super admin overview
          </span>
          <h1 className="text-6xl font-black mt-6 leading-tight">
            Welcome Back
          </h1>
          <p className="text-xl text-blue-100 mt-4">
            This dashboard centralizes institute operations with route-based panels for every core admin workflow.
          </p>
        </div>
      </section>

      {error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </section>

      <DashboardWidgets />
    </div>
  )
}
