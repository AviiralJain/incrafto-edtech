'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home, LogOut, PanelLeft } from 'lucide-react'

import { cn } from '@/lib/utils'

import { adminNavigation } from './admin-navigation'

type AdminSidebarProps = {
  mobileOpen: boolean
  onMobileOpenChange: (open: boolean) => void
}

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminSidebar({
  mobileOpen,
  onMobileOpenChange,
}: AdminSidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 lg:block">
          <div>
            <h1 className="text-3xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InCrafto
            </h1>
            <p className="mt-2 text-gray-500">
              Super Admin Panel
            </p>
          </div>

          <button
            type="button"
            onClick={() => onMobileOpenChange(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-slate-500 transition hover:text-slate-950 lg:hidden"
            aria-label="Close sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {adminNavigation.map((item) => {
          const active = isActiveRoute(pathname, item.href)

          return (
            <motion.div
              key={item.href}
              whileHover={{ x: 8 }}
              className={cn(
                'group flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer',
                active
                  ? 'bg-linear-to-r from-blue-500 to-purple-500 text-white'
                  : 'hover:bg-linear-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white',
              )}
            >
              <Link
                href={item.href}
                onClick={() => onMobileOpenChange(false)}
                className="flex w-full items-center gap-4"
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      <div className="p-5">
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-5 text-white">
          <h3 className="font-bold text-lg">Institute Growth</h3>
          <p className="text-sm mt-2 text-blue-100">+24% growth this quarter</p>
        </div>
      </div>
    </>
  )

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white/80 backdrop-blur-xl border-r border-white/60">
        {sidebarContent}
      </aside>

      <div
        className={cn(
          'fixed inset-0 z-50 bg-slate-950/40 transition-opacity duration-200 lg:hidden',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
        onClick={() => onMobileOpenChange(false)}
      >
        <aside
          className={cn(
            'absolute left-0 top-0 flex h-full w-[min(88vw,18rem)] flex-col bg-white/95 backdrop-blur-xl border-r border-white/60 shadow-2xl transition-transform duration-200',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          onClick={(event) => event.stopPropagation()}
        >
          {sidebarContent}
        </aside>
      </div>
    </>
  )
}
