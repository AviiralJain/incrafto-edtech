'use client'

import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Search, Users } from 'lucide-react'

import { DataTable } from '../../admin/_components/data-table'
import { StatsCard } from '../../admin/_components/stats-card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { getAdminSummary, listResource, createResource, updateResource, deleteResource } from '@/lib/admin-api'

type Student = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  courseId: string
  batchId: string
  placementStatus: string
  attendance: number
  status: string
}

type Course = { _id: string; name: string }
type Batch = { _id: string; name: string }

type StudentFormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  courseId: string
  batchId: string
  placementStatus: string
  attendance: string
  status: string
}

const emptyStudentForm: StudentFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  courseId: '',
  batchId: '',
  placementStatus: 'not-placed',
  attendance: '0',
  status: 'active',
}

function fullName(student: Student) {
  return `${student.firstName} ${student.lastName}`.trim()
}

function statusClass(status: string) {
  const value = status.toLowerCase()
  if (value === 'active') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (value === 'inactive' || value === 'suspended') return 'bg-rose-50 text-rose-700 border-rose-200'
  if (value === 'graduated' || value === 'placed') return 'bg-blue-50 text-blue-700 border-blue-200'
  return 'bg-slate-100 text-slate-700 border-slate-200'
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<StudentFormState>(emptyStudentForm)

  useEffect(() => {
    let active = true

    async function loadLookupData() {
      try {
        const [courseResponse, batchResponse] = await Promise.all([
          listResource<Course>('/api/courses', { limit: 100 }),
          listResource<Batch>('/api/batches', { limit: 100 }),
        ])

        if (!active) return

        setCourses(courseResponse.data)
        setBatches(batchResponse.data)
      } catch (lookupError) {
        if (!active) return
        setError(lookupError instanceof Error ? lookupError.message : 'Failed to load lookup data')
      }
    }

    loadLookupData()

    return () => {
      active = false
    }
  }, [])

  const courseLookup = useMemo(
    () => Object.fromEntries(courses.map((course) => [course._id, course.name])),
    [courses],
  )

  const batchLookup = useMemo(
    () => Object.fromEntries(batches.map((batch) => [batch._id, batch.name])),
    [batches],
  )

  async function loadStudents() {
    try {
      setLoading(true)
      setError(null)
      const response = await listResource<Student>('/api/students', {
        q: search,
        page,
        limit: 10,
      })
      setStudents(response.data)
      setTotal(response.pagination.total)
      setTotalPages(response.pagination.totalPages || 1)
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to load students')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [page, search])

  function openCreateDialog() {
    setEditingStudent(null)
    setForm(emptyStudentForm)
    setDialogOpen(true)
  }

  function openEditDialog(student: Student) {
    setEditingStudent(student)
    setForm({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      courseId: student.courseId,
      batchId: student.batchId,
      placementStatus: student.placementStatus,
      attendance: String(student.attendance ?? 0),
      status: student.status,
    })
    setDialogOpen(true)
  }

  async function handleSubmit() {
    try {
      setSaving(true)
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        courseId: form.courseId,
        batchId: form.batchId,
        placementStatus: form.placementStatus,
        attendance: Number(form.attendance),
        status: form.status,
      }

      if (editingStudent) {
        await updateResource<Student>(`/api/students/${editingStudent._id}`, payload)
      } else {
        await createResource<Student>('/api/students', payload)
      }

      setDialogOpen(false)
      await loadStudents()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to save student')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(student: Student) {
    if (!window.confirm(`Delete ${fullName(student)}?`)) return

    try {
      await deleteResource<Student>(`/api/students/${student._id}`)
      await loadStudents()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete student')
    }
  }

  const stats = [
    {
      label: 'Total Students',
      value: String(total),
      description: 'Records loaded from API',
      trend: `${students.length} visible`,
      tone: 'sky' as const,
      icon: Users,
    },
    {
      label: 'Active Students',
      value: String(students.filter((student) => student.status === 'active').length),
      description: 'Current page only',
      trend: 'Live view',
      tone: 'emerald' as const,
      icon: Users,
    },
    {
      label: 'Placement Ready',
      value: String(students.filter((student) => student.placementStatus === 'placed' || student.placementStatus === 'interviewing').length),
      description: 'Current page only',
      trend: 'Live view',
      tone: 'rose' as const,
      icon: BookOpen,
    },
  ]

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-4xl bg-linear-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-10 text-white mb-8" style={{ borderRadius: '36px' }}>
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Students</span>
            <h1 className="text-6xl font-black mt-6 leading-tight">Student records and progress</h1>
            <p className="text-xl text-blue-100 mt-4 max-w-2xl">
              Manage enrollments, track learning progress, and monitor placement readiness.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white">
            <Search className="h-4 w-4" />
            <span>Search, filter, or export student data</span>
          </div>
        </div>
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
        title="Student directory"
        description="A unified view of learner status across all batches."
        loading={loading}
        error={error}
        onRetry={loadStudents}
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
                placeholder="Search students"
                className="h-8 w-48 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button type="button" onClick={openCreateDialog} className="rounded-full px-5">
              Create Student
            </Button>
          </div>
        }
        columns={[
          { key: 'name', header: 'Student' },
          { key: 'course', header: 'Course' },
          { key: 'batch', header: 'Batch' },
          { key: 'attendance', header: 'Attendance' },
          { key: 'placement', header: 'Placement' },
          { key: 'status', header: 'Status' },
          { key: 'actions', header: 'Actions', className: 'text-right' },
        ]}
        rows={students.map((student) => ({
          id: student._id,
          name: (
            <div>
              <p className="font-semibold text-slate-900">{fullName(student)}</p>
              <p className="text-xs text-slate-500">{student.email}</p>
            </div>
          ),
          course: courseLookup[student.courseId] || student.courseId || 'Unassigned',
          batch: batchLookup[student.batchId] || student.batchId || 'Unassigned',
          attendance: `${student.attendance ?? 0}%`,
          placement: (
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(student.placementStatus)}`}>
              {student.placementStatus}
            </span>
          ),
          status: (
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(student.status)}`}>
              {student.status}
            </span>
          ),
          actions: (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => openEditDialog(student)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(student)}
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
            <DialogTitle>{editingStudent ? 'Edit Student' : 'Create Student'}</DialogTitle>
            <DialogDescription>Manage student enrollment details and placement tracking.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} placeholder="First name" />
            <Input value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} placeholder="Last name" />
            <Input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" type="email" />
            <Input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone" />
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
            <Select value={form.batchId} onValueChange={(value) => setForm({ ...form, batchId: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={batches.length ? 'Select batch' : 'Loading batches'} />
              </SelectTrigger>
              <SelectContent>
                {batches.map((batch) => (
                  <SelectItem key={batch._id} value={batch._id}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={form.placementStatus} onValueChange={(value) => setForm({ ...form, placementStatus: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Placement status" />
              </SelectTrigger>
              <SelectContent>
                {['not-placed', 'in-progress', 'interviewing', 'placed'].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input value={form.attendance} onChange={(event) => setForm({ ...form, attendance: event.target.value })} placeholder="Attendance" type="number" min={0} max={100} />
            <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Student status" />
              </SelectTrigger>
              <SelectContent>
                {['active', 'inactive', 'graduated', 'suspended'].map((status) => (
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
              {editingStudent ? 'Update Student' : 'Create Student'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
