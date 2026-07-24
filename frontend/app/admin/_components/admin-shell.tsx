'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

import { AdminHeader } from './admin-header'
import { AdminSidebar } from './admin-sidebar'

type AdminLayoutProps = {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-linear-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff] text-slate-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative flex">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
      />

        <div className="flex-1 lg:pl-64">
          <AdminHeader onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

export { AdminLayout as AdminShell }
