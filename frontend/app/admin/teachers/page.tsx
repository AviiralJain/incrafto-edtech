'use client'

import { useEffect, useState } from 'react'
import { GraduationCap, Search } from 'lucide-react'

import { DataTable } from '../../admin/_components/data-table'
import { StatsCard } from '../../admin/_components/stats-card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { createResource, deleteResource, listResource, updateResource } from '@/lib/admin-api'

type Teacher = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  specialization: string
  status: string
}

type TeacherFormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  specialization: string
  status: string
}

const emptyTeacherForm: TeacherFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  specialization: '',
  status: 'active',
}

function fullName(teacher: Teacher) {
  return `${teacher.firstName} ${teacher.lastName}`.trim()
}

function statusClass(status: string) {
  const value = status.toLowerCase()
  if (value === 'active') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (value === 'on-leave') return 'bg-amber-50 text-amber-700 border-amber-200'
  return 'bg-rose-50 text-rose-700 border-rose-200'
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<TeacherFormState>(emptyTeacherForm)

  async function loadTeachers() {
    try {
      setLoading(true)
      setError(null)
      const response = await listResource<Teacher>('/api/teachers', {
        q: search,
        page,
        limit: 10,
      })
      setTeachers(response.data)
      setTotal(response.pagination.total)
      setTotalPages(response.pagination.totalPages || 1)
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to load teachers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTeachers()
  }, [page, search])

  function openCreateDialog() {
    setEditingTeacher(null)
    setForm(emptyTeacherForm)
    setDialogOpen(true)
  }

  function openEditDialog(teacher: Teacher) {
    setEditingTeacher(teacher)
    setForm({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      phone: teacher.phone,
      specialization: teacher.specialization,
      status: teacher.status,
    })
    setDialogOpen(true)
  }

  async function handleSubmit() {
    try {
      setSaving(true)
      const payload = { ...form }

      if (editingTeacher) {
        await updateResource<Teacher>(`/api/teachers/${editingTeacher._id}`, payload)
      } else {
        await createResource<Teacher>('/api/teachers', payload)
      }

      setDialogOpen(false)
      await loadTeachers()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to save teacher')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(teacher: Teacher) {
    if (!window.confirm(`Delete ${fullName(teacher)}?`)) return

    try {
      await deleteResource<Teacher>(`/api/teachers/${teacher._id}`)
      await loadTeachers()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete teacher')
    }
  }

  const stats = [
    {
      label: 'Faculty',
      value: String(total),
      description: 'Records loaded from API',
      trend: `${teachers.length} visible`,
      tone: 'emerald' as const,
      icon: GraduationCap,
    },
    {
      label: 'Active',
      value: String(teachers.filter((teacher) => teacher.status === 'active').length),
      description: 'Current page only',
      trend: 'Live view',
      tone: 'sky' as const,
      icon: GraduationCap,
    },
    {
      label: 'On Leave',
      value: String(teachers.filter((teacher) => teacher.status === 'on-leave').length),
      description: 'Current page only',
      trend: 'Live view',
      tone: 'amber' as const,
      icon: GraduationCap,
    },
  ]

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-4xl bg-linear-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-10 text-white mb-8" style={{ borderRadius: '36px' }}>
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Teachers</span>
            <h1 className="text-6xl font-black mt-6 leading-tight">Faculty workload and allocation</h1>
            <p className="text-xl text-blue-100 mt-4 max-w-2xl">
              Track mentor assignments, subjects, and delivery capacity.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white">
            <Search className="h-4 w-4" />
            <span>Search mentors or subjects</span>
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
        title="Teacher roster"
        description="Monitor teaching load and status from one table."
        loading={loading}
        error={error}
        onRetry={loadTeachers}
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
                placeholder="Search teachers"
                className="h-8 w-48 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button type="button" onClick={openCreateDialog} className="rounded-full px-5">
              Create Teacher
            </Button>
          </div>
        }
        columns={[
          { key: 'name', header: 'Teacher' },
          { key: 'subject', header: 'Specialization' },
          { key: 'email', header: 'Email' },
          { key: 'phone', header: 'Phone' },
          { key: 'status', header: 'Status' },
          { key: 'actions', header: 'Actions', className: 'text-right' },
        ]}
        rows={teachers.map((teacher) => ({
          id: teacher._id,
          name: (
            <div>
              <p className="font-semibold text-slate-900">{fullName(teacher)}</p>
              <p className="text-xs text-slate-500">Mentor profile</p>
            </div>
          ),
          subject: teacher.specialization,
          email: teacher.email,
          phone: teacher.phone,
          status: (
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(teacher.status)}`}>
              {teacher.status}
            </span>
          ),
          actions: (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => openEditDialog(teacher)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(teacher)}
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
            <DialogTitle>{editingTeacher ? 'Edit Teacher' : 'Create Teacher'}</DialogTitle>
            <DialogDescription>Manage teacher details and availability.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} placeholder="First name" />
            <Input value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} placeholder="Last name" />
            <Input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" type="email" />
            <Input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone" />
            <Input value={form.specialization} onChange={(event) => setForm({ ...form, specialization: event.target.value })} placeholder="Specialization" className="sm:col-span-2" />
            <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
              <SelectTrigger className="w-full sm:col-span-2">
                <SelectValue placeholder="Teacher status" />
              </SelectTrigger>
              <SelectContent>
                {['active', 'inactive', 'on-leave'].map((status) => (
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
              {editingTeacher ? 'Update Teacher' : 'Create Teacher'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
