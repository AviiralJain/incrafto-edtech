'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { AdminLayout as AdminShell } from './_components/admin-shell'
import { clearStoredAuth, getStoredAuth } from '@/lib/auth'

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const auth = getStoredAuth()
    const role = auth?.user?.role?.toLowerCase()

    if (!auth?.token) {
      router.replace('/admin-login')
      return
    }

    if (role !== 'admin') {
      clearStoredAuth()

      if (role === 'student') {
        router.replace('/student-login')
      } else if (role === 'teacher') {
        router.replace('/teacher-login')
      } else {
        router.replace('/admin-login')
      }
    }
  }, [router])

  return <AdminShell>{children}</AdminShell>
}
