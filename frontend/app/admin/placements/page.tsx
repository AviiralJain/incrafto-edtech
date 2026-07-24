'use client'

import { useEffect, useMemo, useState } from 'react'
import { Briefcase, Building2, Search, TrendingUp } from 'lucide-react'

import { DataTable } from '../../admin/_components/data-table'
import { StatsCard } from '../../admin/_components/stats-card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { createResource, deleteResource, listResource, updateResource } from '@/lib/admin-api'

type Student = { _id: string; firstName: string; lastName: string }

type Placement = {
  _id: string
  studentId: Student | string
  company: string
  package: string
  role: string
  status: string
  placementDate: string
}

type PlacementFormState = {
  studentId: string
  company: string
  package: string
  role: string
  status: string
  placementDate: string
}

const emptyPlacementForm: PlacementFormState = {
  studentId: '',
  company: '',
  package: '',
  role: '',
  status: 'pending',
  placementDate: '',
}

function fullName(student: Student | string, lookup: Record<string, string>) {
  if (typeof student === 'object') return `${student.firstName} ${student.lastName}`.trim()
  return lookup[student] || student
}

function statusClass(status: string) {
  const value = status.toLowerCase()
  if (value === 'placed') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (value === 'offered') return 'bg-blue-50 text-blue-700 border-blue-200'
  if (value === 'interviewing') return 'bg-amber-50 text-amber-700 border-amber-200'
  if (value === 'rejected') return 'bg-rose-50 text-rose-700 border-rose-200'
  return 'bg-slate-100 text-slate-700 border-slate-200'
}

export default function PlacementsPage() {
  const [placements, setPlacements] = useState<Placement[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPlacement, setEditingPlacement] = useState<Placement | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<PlacementFormState>(emptyPlacementForm)

  useEffect(() => {
    let active = true

    async function loadStudents() {
      try {
        const response = await listResource<Student>('/api/students', { limit: 100 })
        if (!active) return
        setStudents(response.data)
      } catch (lookupError) {
        if (!active) return
        setError(lookupError instanceof Error ? lookupError.message : 'Failed to load students')
      }
    }

    loadStudents()

    return () => {
      active = false
    }
  }, [])

  const studentLookup = useMemo(
    () => Object.fromEntries(students.map((student) => [student._id, `${student.firstName} ${student.lastName}`.trim()])),
    [students],
  )

  async function loadPlacements() {
    try {
      setLoading(true)
      setError(null)
      const response = await listResource<Placement>('/api/placements', {
        q: search,
        page,
        limit: 10,
      })
      setPlacements(response.data)
      setTotal(response.pagination.total)
      setTotalPages(response.pagination.totalPages || 1)
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to load placements')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlacements()
  }, [page, search])

  function openCreateDialog() {
    setEditingPlacement(null)
    setForm(emptyPlacementForm)
    setDialogOpen(true)
  }

  function openEditDialog(placement: Placement) {
    setEditingPlacement(placement)
    setForm({
      studentId: typeof placement.studentId === 'object' ? placement.studentId._id : placement.studentId,
      company: placement.company,
      package: placement.package,
      role: placement.role,
      status: placement.status,
      placementDate: placement.placementDate ? placement.placementDate.slice(0, 10) : '',
    })
    setDialogOpen(true)
  }

  async function handleSubmit() {
    try {
      setSaving(true)
      const payload = { ...form }

      if (editingPlacement) {
        await updateResource<Placement>(`/api/placements/${editingPlacement._id}`, payload)
      } else {
        await createResource<Placement>('/api/placements', payload)
      }

      setDialogOpen(false)
      await loadPlacements()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to save placement')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(placement: Placement) {
    if (!window.confirm(`Delete placement for ${fullName(placement.studentId, studentLookup)}?`)) return

    try {
      await deleteResource<Placement>(`/api/placements/${placement._id}`)
      await loadPlacements()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete placement')
    }
  }

  const stats = [
    {
      label: 'Placed Students',
      value: String(total),
      description: 'Records loaded from API',
      trend: `${placements.length} visible`,
      tone: 'emerald' as const,
      icon: Briefcase,
    },
    {
      label: 'Hiring Partners',
      value: String(new Set(placements.map((placement) => placement.company)).size),
      description: 'Current page only',
      trend: 'Live view',
      tone: 'sky' as const,
      icon: Building2,
    },
    {
      label: 'Interviewing',
      value: String(placements.filter((placement) => placement.status === 'interviewing').length),
      description: 'Current page only',
      trend: 'Live view',
      tone: 'amber' as const,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-4xl bg-linear-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-10 text-white mb-8" style={{ borderRadius: '36px' }}>
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <p className="bg-white/20 w-fit px-4 py-2 rounded-full text-sm">Placements</p>
        <h1 className="text-6xl font-black mt-6 leading-tight">Placement performance and pipeline</h1>
        <p className="text-xl text-blue-100 mt-4 max-w-2xl">
          Track hiring partners, interview status, and student outcomes.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </section>

      {error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <DataTable
        title="Placement tracker"
        description="Monitor each candidate through the placement funnel."
        loading={loading}
        error={error}
        onRetry={loadPlacements}
        pagination={{
          page,
          totalPages,
          total,
          onPageChange: (nextPage) => setPage(nextPage),
        }}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setPage(1)
                }}
                placeholder="Search placements"
                className="h-8 w-48 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button type="button" onClick={openCreateDialog} className="rounded-full px-5">
              Create Placement
            </Button>
          </div>
        }
        columns={[
          { key: 'student', header: 'Student' },
          { key: 'company', header: 'Company' },
          { key: 'role', header: 'Role' },
          { key: 'package', header: 'Package' },
          { key: 'status', header: 'Status' },
          { key: 'placementDate', header: 'Date' },
          { key: 'actions', header: 'Actions', className: 'text-right' },
        ]}
        rows={placements.map((placement) => ({
          id: placement._id,
          student: <p className="font-semibold text-slate-900">{fullName(placement.studentId, studentLookup)}</p>,
          company: placement.company,
          role: placement.role,
          package: placement.package,
          status: (
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(placement.status)}`}>
              {placement.status}
            </span>
          ),
          placementDate: placement.placementDate ? placement.placementDate.slice(0, 10) : '-',
          actions: (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => openEditDialog(placement)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(placement)}
                className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
              >
                Delete
              </button>
            </div>
          ),
        }))}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPlacement ? 'Edit Placement' : 'Create Placement'}</DialogTitle>
            <DialogDescription>Track hiring progress and offer details.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <Select value={form.studentId} onValueChange={(value) => setForm({ ...form, studentId: value })}>
              <SelectTrigger className="w-full sm:col-span-2">
                <SelectValue placeholder={students.length ? 'Select student' : 'Loading students'} />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student._id} value={student._id}>
                    {`${student.firstName} ${student.lastName}`.trim()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} placeholder="Company" />
            <Input value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} placeholder="Role" />
            <Input value={form.package} onChange={(event) => setForm({ ...form, package: event.target.value })} placeholder="Package" />
            <Input value={form.placementDate} onChange={(event) => setForm({ ...form, placementDate: event.target.value })} type="date" />
            <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
              <SelectTrigger className="w-full sm:col-span-2">
                <SelectValue placeholder="Placement status" />
              </SelectTrigger>
              <SelectContent>
                {['pending', 'interviewing', 'offered', 'placed', 'rejected'].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={saving}>
              {saving ? <Spinner className="h-4 w-4" /> : null}
              {editingPlacement ? 'Update Placement' : 'Create Placement'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
