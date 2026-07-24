'use client'

import { Bell, Menu, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { ThemeToggle } from '@/components/layout/theme-toggle'

import { adminNavigation } from './admin-navigation'

type AdminHeaderProps = {
  onMenuClick: () => void
}

function getCurrentSection(pathname: string) {
  const entry = adminNavigation.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  )

  if (entry) {
    return entry.label
  }

  return 'Dashboard'
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname()
  const section = getCurrentSection(pathname)

  return (
    <header className="px-6 pt-6 sm:px-8 sm:pt-8">
      <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-4xl p-5 sm:p-6 shadow-xl mb-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/80 text-slate-600 transition hover:text-slate-950 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-500">Admin / {section}</p>
            <h2 className="text-3xl font-bold text-gray-900">Manage InCrafto</h2>
          </div>

          <div className="hidden w-full max-w-md items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 md:flex">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, courses, teachers..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>

          <ThemeToggle />

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/80 text-slate-600 transition hover:text-slate-950"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          <div className="hidden items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2 lg:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-sm font-semibold text-white">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500">Super admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
