"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Mail,
  Phone,
  TrendingUp,
  Award,
  UserCheck,
} from "lucide-react";

const students = [
  {
    id: 1,
    name: "Harshita Singh",
    email: "harshita@gmail.com",
    attendance: 96,
    assignments: 9,
    performance: 94,
    status: "Top Performer",
  },
  {
    id: 2,
    name: "Aviral Jain",
    email: "aviral@gmail.com",
    attendance: 91,
    assignments: 8,
    performance: 89,
    status: "Excellent",
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    attendance: 98,
    assignments: 10,
    performance: 97,
    status: "Top Performer",
  },
  {
    id: 4,
    name: "Abhishek Singh",
    email: "abhishek@gmail.com",
    attendance: 82,
    assignments: 7,
    performance: 84,
    status: "Good",
  },
];

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-8">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[36px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-10 text-white mb-8"
      >
        <h1 className="text-5xl font-black">
          Student Management
        </h1>

        <p className="text-xl text-blue-100 mt-4">
          Monitor student performance, attendance,
          assignments and placement readiness.
        </p>

        <div className="flex gap-10 mt-8">

          <div>
            <p>Total Students</p>
            <h2 className="text-4xl font-black">
              78
            </h2>
          </div>

          <div>
            <p>Attendance Rate</p>
            <h2 className="text-4xl font-black">
              91%
            </h2>
          </div>

          <div>
            <p>Top Performers</p>
            <h2 className="text-4xl font-black">
              12
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
            title: "Attendance",
            value: "91%",
            icon: UserCheck,
          },
          {
            title: "Performance",
            value: "89%",
            icon: TrendingUp,
          },
          {
            title: "Placements Ready",
            value: "24",
            icon: Award,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          >
            <item.icon size={28} />

            <h3 className="mt-4 text-gray-500">
              {item.title}
            </h3>

            <p className="text-4xl font-black">
              {item.value}
            </p>

          </div>
        ))}

      </div>

      {/* Search */}

      <div className="bg-white rounded-3xl p-5 shadow-xl mb-8">

        <div className="flex items-center gap-3">

          <Search />

          <input
            placeholder="Search student..."
            className="w-full outline-none"
          />

        </div>

      </div>

      {/* Students Table */}

      <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

        <h2 className="text-3xl font-bold mb-8">
          Class Students
        </h2>

        <div className="space-y-4">

          {students.map((student) => (
            <motion.div
              key={student.id}
              whileHover={{ scale: 1.01 }}
              className="p-6 rounded-3xl border bg-white"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-bold">
                    {student.name}
                  </h3>

                  <p className="text-gray-500">
                    {student.email}
                  </p>

                </div>

                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">
                  {student.status}
                </span>

              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">

                <div>

                  <p className="text-gray-500">
                    Attendance
                  </p>

                  <h4 className="text-2xl font-bold">
                    {student.attendance}%
                  </h4>

                </div>

                <div>

                  <p className="text-gray-500">
                    Assignments
                  </p>

                  <h4 className="text-2xl font-bold">
                    {student.assignments}/10
                  </h4>

                </div>

                <div>

                  <p className="text-gray-500">
                    Performance
                  </p>

                  <h4 className="text-2xl font-bold">
                    {student.performance}%
                  </h4>

                </div>

              </div>

              <div className="flex gap-3 mt-6">

                <Link
  href={`/teacher-dashboard/classes/1/students/${student.id}`}
>
  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl">
    View Profile
  </button>
</Link>

                <button className="border px-5 py-3 rounded-xl flex items-center gap-2">
                  <Mail size={16} />
                  Message
                </button>

                <button className="border px-5 py-3 rounded-xl flex items-center gap-2">
                  <Phone size={16} />
                  Contact
                </button>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </div>
  );
}