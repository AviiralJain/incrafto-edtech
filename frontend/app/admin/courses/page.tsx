'use client'

import { useEffect, useState } from 'react'
import { BookOpen, Layers, Search } from 'lucide-react'

import { DataTable } from '../../admin/_components/data-table'
import { StatsCard } from '../../admin/_components/stats-card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner'
import { createResource, deleteResource, listResource, updateResource } from '@/lib/admin-api'

type Course = {
  _id: string
  name: string
  description: string
  status: string
}

type CourseFormState = {
  name: string
  description: string
  status: string
}

const emptyCourseForm: CourseFormState = {
  name: '',
  description: '',
  status: 'active',
}

function statusClass(status: string) {
  const value = status.toLowerCase()
  if (value === 'active') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (value === 'draft') return 'bg-amber-50 text-amber-700 border-amber-200'
  return 'bg-rose-50 text-rose-700 border-rose-200'
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<CourseFormState>(emptyCourseForm)

  async function loadCourses() {
    try {
      setLoading(true)
      setError(null)
      const response = await listResource<Course>('/api/courses', {
        q: search,
        page,
        limit: 10,
      })
      setCourses(response.data)
      setTotal(response.pagination.total)
      setTotalPages(response.pagination.totalPages || 1)
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [page, search])

  function openCreateDialog() {
    setEditingCourse(null)
    setForm(emptyCourseForm)
    setDialogOpen(true)
  }

  function openEditDialog(course: Course) {
    setEditingCourse(course)
    setForm({
      name: course.name,
      description: course.description || '',
      status: course.status,
    })
    setDialogOpen(true)
  }

  async function handleSubmit() {
    try {
      setSaving(true)
      const payload = { ...form }

      if (editingCourse) {
        await updateResource<Course>(`/api/courses/${editingCourse._id}`, payload)
      } else {
        await createResource<Course>('/api/courses', payload)
      }

      setDialogOpen(false)
      await loadCourses()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to save course')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(course: Course) {
    if (!window.confirm(`Delete ${course.name}?`)) return

    try {
      await deleteResource<Course>(`/api/courses/${course._id}`)
      await loadCourses()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete course')
    }
  }

  const stats = [
    {
      label: 'Active Courses',
      value: String(total),
      description: 'Records loaded from API',
      trend: `${courses.length} visible`,
      tone: 'sky' as const,
      icon: BookOpen,
    },
    {
      label: 'Running',
      value: String(courses.filter((course) => course.status === 'active').length),
      description: 'Current page only',
      trend: 'Live view',
      tone: 'emerald' as const,
      icon: BookOpen,
    },
    {
      label: 'Draft',
      value: String(courses.filter((course) => course.status === 'draft').length),
      description: 'Current page only',
      trend: 'Live view',
      tone: 'amber' as const,
      icon: Layers,
    },
  ]

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-4xl bg-linear-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-10 text-white mb-8" style={{ borderRadius: '36px' }}>
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <p className="bg-white/20 w-fit px-4 py-2 rounded-full text-sm">Courses</p>
        <h1 className="text-6xl font-black mt-6 leading-tight">Course catalog management</h1>
        <p className="text-xl text-blue-100 mt-4 max-w-2xl">
          Maintain program inventory, batch counts, and delivery readiness.
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
        title="Course inventory"
        description="Overview of programs and their delivery status."
        loading={loading}
        error={error}
        onRetry={loadCourses}
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
                placeholder="Search courses"
                className="h-8 w-48 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button type="button" onClick={openCreateDialog} className="rounded-full px-5">
              Create Course
            </Button>
          </div>
        }
        columns={[
          { key: 'name', header: 'Course' },
          { key: 'description', header: 'Description' },
          { key: 'status', header: 'Status' },
          { key: 'actions', header: 'Actions', className: 'text-right' },
        ]}
        rows={courses.map((course) => ({
          id: course._id,
          name: <p className="font-semibold text-slate-900">{course.name}</p>,
          description: course.description || 'No description',
          status: (
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(course.status)}`}>
              {course.status}
            </span>
          ),
          actions: (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => openEditDialog(course)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(course)}
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
            <DialogTitle>{editingCourse ? 'Edit Course' : 'Create Course'}</DialogTitle>
            <DialogDescription>Manage course details and lifecycle state.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Course name" />
            <Textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Course description" />
            <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Course status" />
              </SelectTrigger>
              <SelectContent>
                {['active', 'inactive', 'draft'].map((status) => (
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
              {editingCourse ? 'Update Course' : 'Create Course'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
