'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GraduationCap, BriefcaseBusiness } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { useRouter } from 'next/navigation'

export default function RoleSelectionPage() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl rounded-[32px] border border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-10"
        >
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">
              Choose your portal
            </p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Welcome to InCrafto
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
              Continue as a student to access your learning dashboard or sign in as a teacher to manage your classes.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <button
              onClick={() => router.push('/student-login')}
              className="group rounded-3xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/10 p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/80 dark:hover:bg-white/15"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                <GraduationCap size={26} />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">Student</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Access your courses, assignments, placements, and learning progress from one dashboard.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-300">
                Continue to Student Login
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </button>

            <button
              onClick={() => router.push('/teacher-login')}
              className="group rounded-3xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/10 p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:bg-white/80 dark:hover:bg-white/15"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-500/20">
                <BriefcaseBusiness size={26} />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">Teacher</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Lead classes, review assignments, and keep students on track from your dedicated teacher portal.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-300">
                Continue to Teacher Login
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-slate-600 dark:text-slate-400 transition hover:text-slate-900 dark:hover:text-white">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
