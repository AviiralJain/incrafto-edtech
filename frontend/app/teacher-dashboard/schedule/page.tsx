"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Video,
  BookOpen,
  Plus,
} from "lucide-react";
import { ThemeToggle } from '@/components/layout/theme-toggle'

const classes = [
  {
    subject: "React Development",
    time: "10:00 AM",
    date: "25 June 2026",
    students: 42,
    mode: "Online",
  },
  {
    subject: "Data Analytics",
    time: "02:00 PM",
    date: "25 June 2026",
    students: 50,
    mode: "Offline",
  },
  {
    subject: "Python Programming",
    time: "04:00 PM",
    date: "26 June 2026",
    students: 38,
    mode: "Online",
  },
];

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[36px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-10 text-white mb-8"
      >
        <h1 className="text-5xl font-black">
          Schedule Classes
        </h1>

        <p className="text-xl text-blue-100 mt-4">
          Organize upcoming classes, workshops, lectures and live sessions.
        </p>

        <div className="flex gap-10 mt-8">

          <div>
            <p>Total Classes</p>
            <h2 className="text-4xl font-black">
              24
            </h2>
          </div>

          <div>
            <p>This Week</p>
            <h2 className="text-4xl font-black">
              8
            </h2>
          </div>

          <div>
            <p>Students Enrolled</p>
            <h2 className="text-4xl font-black">
              178
            </h2>
          </div>

        </div>
      </motion.div>

      {/* Stats Cards */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        {[
          {
            title: "Scheduled Classes",
            value: "24",
            icon: Calendar,
          },
          {
            title: "Live Sessions",
            value: "6",
            icon: Video,
          },
          {
            title: "Students",
            value: "178",
            icon: Users,
          },
          {
            title: "Hours This Week",
            value: "32",
            icon: Clock,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl text-slate-900 dark:text-white"
          >
            <item.icon size={28} />

            <h3 className="mt-4 text-gray-500 dark:text-gray-400">
              {item.title}
            </h3>

            <p className="text-4xl font-black">
              {item.value}
            </p>

          </div>
        ))}

      </div>

      {/* Action Buttons */}

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-medium">
          Create New Class
        </button>

        <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-4 rounded-2xl shadow-lg">
          Schedule Workshop
        </button>

        <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-4 rounded-2xl shadow-lg">
          Create Meeting Link
        </button>

        <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-4 rounded-2xl shadow-lg">
          View Calendar
        </button>

      </div>

      {/* Upcoming Classes */}

      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

        <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
          Upcoming Classes
        </h2>

        <div className="space-y-6">

          {classes.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border dark:border-slate-800"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {item.subject}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    {item.date}
                  </p>

                </div>

                <Plus className="text-slate-900 dark:text-white" />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">

                <div>

                  <p className="text-gray-500 dark:text-gray-400">
                    Time
                  </p>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.time}
                  </h4>

                </div>

                <div>

                  <p className="text-gray-500 dark:text-gray-400">
                    Students
                  </p>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.students}
                  </h4>

                </div>

                <div>

                  <p className="text-gray-500 dark:text-gray-400">
                    Mode
                  </p>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.mode}
                  </h4>

                </div>

              </div>

              <div className="flex gap-4 mt-6">

                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl">
                  Start Class
                </button>

                <button className="border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
                  Edit Schedule
                </button>

                <button className="border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
                  View Students
                </button>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
}