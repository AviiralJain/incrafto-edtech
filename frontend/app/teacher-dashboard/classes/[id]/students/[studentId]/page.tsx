"use client";

import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Award,
  TrendingUp,
  ClipboardCheck,
  BookOpen,
  Briefcase,
  Calendar,
} from "lucide-react";

export default function StudentProfilePage() {
  const student = {
    name: "Harshita Singh",
    email: "harshita@gmail.com",
    phone: "+91 9876543210",
    attendance: 96,
    performance: 94,
    assignments: 9,
    placementScore: 91,
    certificates: 12,
    completedCourses: 8,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-8">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[36px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-10 text-white mb-8"
      >
        <h1 className="text-5xl font-black">
          {student.name}
        </h1>

        <p className="text-xl text-blue-100 mt-3">
          Student Performance Dashboard
        </p>

        <div className="flex gap-10 mt-8">

          <div>
            <p>Attendance</p>
            <h2 className="text-4xl font-black">
              {student.attendance}%
            </h2>
          </div>

          <div>
            <p>Performance</p>
            <h2 className="text-4xl font-black">
              {student.performance}%
            </h2>
          </div>

          <div>
            <p>Placement Score</p>
            <h2 className="text-4xl font-black">
              {student.placementScore}%
            </h2>
          </div>

        </div>
      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        {[
          {
            title: "Assignments",
            value: student.assignments,
            icon: ClipboardCheck,
          },
          {
            title: "Certificates",
            value: student.certificates,
            icon: Award,
          },
          {
            title: "Courses",
            value: student.completedCourses,
            icon: BookOpen,
          },
          {
            title: "Placement Ready",
            value: "Yes",
            icon: Briefcase,
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

      {/* Student Details */}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            Student Details
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <User />
              <span>{student.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail />
              <span>{student.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone />
              <span>{student.phone}</span>
            </div>

          </div>

        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            Performance Metrics
          </h2>

          {[
            {
              label: "Attendance",
              value: student.attendance,
            },
            {
              label: "Assignments",
              value: 90,
            },
            {
              label: "Placement Readiness",
              value: student.placementScore,
            },
            {
              label: "Overall Performance",
              value: student.performance,
            },
          ].map((item) => (
            <div key={item.label} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{item.label}</span>

                <span>{item.value}%</span>

              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full">

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

      {/* Activity */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="p-4 rounded-2xl bg-blue-50">
              React Assignment Submitted
            </div>

            <div className="p-4 rounded-2xl bg-green-50">
              Attendance Marked Present
            </div>

            <div className="p-4 rounded-2xl bg-purple-50">
              Placement Workshop Attended
            </div>

          </div>

        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            Teacher Actions
          </h2>

          <div className="space-y-4">

            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl">
              Send Message
            </button>

            <button className="w-full border py-4 rounded-2xl">
              View Assignments
            </button>

            <button className="w-full border py-4 rounded-2xl">
              Placement Report
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}