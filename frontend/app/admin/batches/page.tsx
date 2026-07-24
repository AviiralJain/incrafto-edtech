'use client'

import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, Layers, Search } from 'lucide-react'

import { DataTable } from '../../admin/_components/data-table'
import { StatsCard } from '../../admin/_components/stats-card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { createResource, deleteResource, listResource, updateResource } from '@/lib/admin-api'

type Course = { _id: string; name: string }

type Batch = {
  _id: string
  name: string
  courseId: Course | string
  startDate: string
  endDate: string
  status: string
}

type BatchFormState = {
  name: string
  courseId: string
  startDate: string
  endDate: string
  status: string
}

const emptyBatchForm: BatchFormState = {
  name: '',
  courseId: '',
  startDate: '',
  endDate: '',
  status: 'upcoming',
}

function statusClass(status: string) {
  const value = status.toLowerCase()
  if (value === 'ongoing') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (value === 'completed') return 'bg-slate-100 text-slate-700 border-slate-200'
  if (value === 'paused') return 'bg-amber-50 text-amber-700 border-amber-200'
  return 'bg-blue-50 text-blue-700 border-blue-200'
}

function resolveCourseName(courseId: Course | string, courseLookup: Record<string, string>) {
  if (typeof courseId === 'object') return courseId.name
  return courseLookup[courseId] || courseId
}

export default function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<BatchFormState>(emptyBatchForm)

  useEffect(() => {
    let active = true

    async function loadCourses() {
      try {
        const response = await listResource<Course>('/api/courses', { limit: 100 })
        if (!active) return
        setCourses(response.data)
      } catch (lookupError) {
        if (!active) return
        setError(lookupError instanceof Error ? lookupError.message : 'Failed to load courses')
      }
    }

    loadCourses()

    return () => {
      active = false
    }
  }, [])

  const courseLookup = useMemo(
    () => Object.fromEntries(courses.map((course) => [course._id, course.name])),
    [courses],
  )

  async function loadBatches() {
    try {
      setLoading(true)
      setError(null)
      const response = await listResource<Batch>('/api/batches', {
        q: search,
        page,
        limit: 10,
      })
      setBatches(response.data)
      setTotal(response.pagination.total)
      setTotalPages(response.pagination.totalPages || 1)
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to load batches')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBatches()
  }, [page, search])

  function openCreateDialog() {
    setEditingBatch(null)
    setForm(emptyBatchForm)
    setDialogOpen(true)
  }

  function openEditDialog(batch: Batch) {
    setEditingBatch(batch)
    setForm({
      name: batch.name,
      courseId: typeof batch.courseId === 'object' ? batch.courseId._id : batch.courseId,
      startDate: batch.startDate ? batch.startDate.slice(0, 10) : '',
      endDate: batch.endDate ? batch.endDate.slice(0, 10) : '',
      status: batch.status,
    })
    setDialogOpen(true)
  }

  async function handleSubmit() {
    try {
      setSaving(true)
      const payload = { ...form }

      if (editingBatch) {
        await updateResource<Batch>(`/api/batches/${editingBatch._id}`, payload)
      } else {
        await createResource<Batch>('/api/batches', payload)
      }

      setDialogOpen(false)
      await loadBatches()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to save batch')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(batch: Batch) {
    if (!window.confirm(`Delete ${batch.name}?`)) return

    try {
      await deleteResource<Batch>(`/api/batches/${batch._id}`)
      await loadBatches()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete batch')
    }
  }

  const stats = [
    {
      label: 'Live Batches',
      value: String(total),
      description: 'Records loaded from API',
      trend: `${batches.length} visible`,
      tone: 'emerald' as const,
      icon: Layers,
    },
    {
      label: 'Upcoming',
      value: String(batches.filter((batch) => batch.status === 'upcoming').length),
      description: 'Current page only',
      trend: 'Live view',
      tone: 'amber' as const,
      icon: CalendarDays,
    },
    {
      label: 'Ongoing',
      value: String(batches.filter((batch) => batch.status === 'ongoing').length),
      description: 'Current page only',
      trend: 'Live view',
      tone: 'sky' as const,
      icon: Layers,
    },
  ]

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-4xl bg-linear-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-10 text-white mb-8" style={{ borderRadius: '36px' }}>
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <p className="bg-white/20 w-fit px-4 py-2 rounded-full text-sm">Batches</p>
        <h1 className="text-6xl font-black mt-6 leading-tight">Batch scheduling and lifecycle</h1>
        <p className="text-xl text-blue-100 mt-4 max-w-2xl">
          Manage live cohorts, mentor ownership, and batch progression.
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
        title="Batch tracker"
        description="A single source of truth for batch status."
        loading={loading}
        error={error}
        onRetry={loadBatches}
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
                placeholder="Search batches"
                className="h-8 w-48 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button type="button" onClick={openCreateDialog} className="rounded-full px-5">
              Create Batch
            </Button>
          </div>
        }
        columns={[
          { key: 'name', header: 'Batch' },
          { key: 'course', header: 'Course' },
          { key: 'startDate', header: 'Start Date' },
          { key: 'endDate', header: 'End Date' },
          { key: 'status', header: 'Status' },
          { key: 'actions', header: 'Actions', className: 'text-right' },
        ]}
        rows={batches.map((batch) => ({
          id: batch._id,
          name: <p className="font-semibold text-slate-900">{batch.name}</p>,
          course: resolveCourseName(batch.courseId, courseLookup),
          startDate: batch.startDate ? batch.startDate.slice(0, 10) : '-',
          endDate: batch.endDate ? batch.endDate.slice(0, 10) : '-',
          status: (
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(batch.status)}`}>
              {batch.status}
            </span>
          ),
          actions: (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => openEditDialog(batch)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(batch)}
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
            <DialogTitle>{editingBatch ? 'Edit Batch' : 'Create Batch'}</DialogTitle>
            <DialogDescription>Manage batch dates, course mapping, and lifecycle state.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Batch name" />
            <Select value={form.courseId} onValueChange={(value) => setForm({ ...form, courseId: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={courses.length ? 'Select course' : 'Loading courses'} />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course._id} value={course._id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} type="date" />
            <Input value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} type="date" />
            <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
              <SelectTrigger className="w-full sm:col-span-2">
                <SelectValue placeholder="Batch status" />
              </SelectTrigger>
              <SelectContent>
                {['upcoming', 'ongoing', 'completed', 'paused'].map((status) => (
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
              {editingBatch ? 'Update Batch' : 'Create Batch'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
