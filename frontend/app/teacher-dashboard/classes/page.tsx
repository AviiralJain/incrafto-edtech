"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Calendar,
  ClipboardCheck,
  TrendingUp,
  ChevronRight,
  Clock,
  Star,
} from "lucide-react";
import { ThemeToggle } from '@/components/layout/theme-toggle'

const stats = [
  {
    title: "Active Classes",
    value: "4",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Total Students",
    value: "178",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Attendance",
    value: "91%",
    icon: ClipboardCheck,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Assignments",
    value: "24",
    icon: Calendar,
    color: "from-orange-500 to-red-500",
  },
];

const classes = [
  {
    id: 1,
    name: "Full Stack Development",
    students: 78,
    attendance: 89,
    progress: 72,
    assignments: 8,
    satisfaction: 92,
    nextClass: "Today • 11:00 AM",
  },
  {
    id: 2,
    name: "Data Analytics",
    students: 50,
    attendance: 91,
    progress: 64,
    assignments: 5,
    satisfaction: 88,
    nextClass: "Today • 02:00 PM",
  },
  {
    id: 3,
    name: "Python Programming",
    students: 42,
    attendance: 94,
    progress: 81,
    assignments: 4,
    satisfaction: 95,
    nextClass: "Tomorrow • 10:00 AM",
  },
];

export default function MyClassesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
  {/* Hero Section */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-10 text-white mb-8"
  >
    <h1 className="text-6xl font-black">
      My Classes
    </h1>
    <p className="text-xl text-blue-100 mt-4">
      Manage classes, track student progress,
      review assignments and monitor outcomes.
    </p>
    <div className="flex gap-6 mt-8">
      <div>
        <p className="text-blue-100">Classes</p>
        <h2 className="text-3xl font-bold">4</h2>
      </div>
      <div>
        <p className="text-blue-100">Students</p>
        <h2 className="text-3xl font-bold">178</h2>
      </div>
      <div>
        <p className="text-blue-100">Attendance</p>
        <h2 className="text-3xl font-bold">91%</h2>
      </div>
    </div>
  </motion.div>
  {/* Stats Cards */}
  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
    {stats.map((item) => (
      <div
        key={item.title}
        className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800 rounded-3xl p-6 shadow-xl"
      >
        <item.icon size={28} className="text-slate-900 dark:text-white" />
        <h3 className="mt-4 text-slate-500 dark:text-slate-400">
          {item.title}
        </h3>
        <p className="text-4xl font-black text-slate-900 dark:text-white">
          {item.value}
        </p>
      </div>
    ))}
  </div>
  {/* Premium Cards */}
  <div className="grid lg:grid-cols-3 gap-6">
    {classes.map((course) => (
      <motion.div
        key={course.id}
        whileHover={{ y: -8 }}
        className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800 rounded-[32px] p-6 shadow-xl"
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {course.name}
          </h2>
          <Star className="text-yellow-500" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Students</p>
            <h3 className="text-slate-900 dark:text-white font-bold">{course.students}</h3>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Attendance</p>
            <h3 className="text-slate-900 dark:text-white font-bold">{course.attendance}%</h3>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Assignments</p>
            <h3 className="text-slate-900 dark:text-white font-bold">{course.assignments}</h3>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Satisfaction</p>
            <h3 className="text-slate-900 dark:text-white font-bold">{course.satisfaction}%</h3>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between mb-2 text-slate-900 dark:text-white font-medium">
            <span>Course Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{
                width: `${course.progress}%`,
              }}
            />
          </div>
        </div>
        <div className="mt-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-slate-900 dark:text-white font-medium">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-blue-600 dark:text-blue-400" />
            <span>{course.nextClass}</span>
          </div>
        </div>
        <Link href={`/teacher-dashboard/classes/${course.id}`}>
  <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl">
    Open Workspace
  </button>
</Link>
      </motion.div>
    ))}
  </div>
</div>

);
}