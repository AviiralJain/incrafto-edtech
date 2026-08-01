"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Download,
  ClipboardCheck,
} from "lucide-react";
import { ThemeToggle } from '@/components/layout/theme-toggle'

const students = [
  {
    id: 1,
    name: "Harshita Singh",
    attendance: 96,
    status: "Present",
    lastSeen: "Today",
  },
  {
    id: 2,
    name: "Aviral Jain",
    attendance: 91,
    status: "Present",
    lastSeen: "Today",
  },
  {
    id: 3,
    name: "Priya Sharma",
    attendance: 98,
    status: "Present",
    lastSeen: "Today",
  },
  {
    id: 4,
    name: "Abhishek Singh",
    attendance: 82,
    status: "Absent",
    lastSeen: "Yesterday",
  },
];

export default function AttendancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[36px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-10 text-white mb-8"
      >
        <h1 className="text-5xl font-black">
          Attendance Management
        </h1>

        <p className="text-xl text-blue-100 mt-4">
          Monitor attendance, track engagement,
          and maintain classroom discipline.
        </p>

        <div className="flex gap-10 mt-8">

          <div>
            <p>Today's Attendance</p>
            <h2 className="text-4xl font-black">
              89%
            </h2>
          </div>

          <div>
            <p>Present</p>
            <h2 className="text-4xl font-black">
              65
            </h2>
          </div>

          <div>
            <p>Absent</p>
            <h2 className="text-4xl font-black">
              13
            </h2>
          </div>

        </div>
      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        {[
          {
            title: "Students",
            value: "78",
            icon: Users,
          },
          {
            title: "Present",
            value: "65",
            icon: UserCheck,
          },
          {
            title: "Absent",
            value: "13",
            icon: UserX,
          },
          {
            title: "Attendance Rate",
            value: "89%",
            icon: ClipboardCheck,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          >
            <item.icon size={28} className="text-slate-900 dark:text-white" />

            <h3 className="mt-4 text-gray-500 dark:text-gray-400">
              {item.title}
            </h3>

            <p className="text-4xl font-black text-slate-900 dark:text-white">
              {item.value}
            </p>

          </div>
        ))}
      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl">
          Mark Attendance
        </button>

        <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl py-4 shadow">
          Mark All Present
        </button>

        <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl py-4 shadow">
          Export Report
        </button>

        <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl py-4 shadow flex items-center justify-center gap-2">
          <Download size={18} />
          Download CSV
        </button>

      </div>

      {/* Student Attendance */}

      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl mb-8">

        <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
          Student Attendance Records
        </h2>

        <div className="space-y-4">

          {students.map((student) => (
            <motion.div
              key={student.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border dark:border-slate-800"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {student.name}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400">
                    Attendance: {student.attendance}%
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full ${
                    student.status === "Present"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {student.status}
                </span>

              </div>

              <div className="mt-4 text-gray-500 dark:text-gray-400">
                Last Attendance: {student.lastSeen}
              </div>

            </motion.div>
          ))}

        </div>

      </div>

      {/* Weekly Analytics */}

      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

        <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
          Weekly Attendance Overview
        </h2>

        <div className="space-y-5">

          {[
            { day: "Monday", value: 92 },
            { day: "Tuesday", value: 89 },
            { day: "Wednesday", value: 91 },
            { day: "Thursday", value: 88 },
            { day: "Friday", value: 94 },
          ].map((item) => (
            <div key={item.day}>

              <div className="flex justify-between mb-2 text-slate-900 dark:text-white">

                <span>{item.day}</span>

                <span>{item.value}%</span>

              </div>

              <div className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{
                    width: `${item.value}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}