"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  ClipboardCheck,
  FileText,
  BookOpen,
  TrendingUp,
} from "lucide-react";

export default function ClassWorkspace() {
  const params = useParams();

  const classId = params.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-8">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-[36px] p-10 text-white mb-8"
      >
        <h1 className="text-5xl font-black">
          Full Stack Development
        </h1>

        <p className="mt-4 text-blue-100">
          Workspace ID: {classId}
        </p>

        <div className="grid grid-cols-4 gap-6 mt-8">

          <div>
            <p>Students</p>
            <h2 className="text-3xl font-bold">78</h2>
          </div>

          <div>
            <p>Attendance</p>
            <h2 className="text-3xl font-bold">89%</h2>
          </div>

          <div>
            <p>Assignments</p>
            <h2 className="text-3xl font-bold">8</h2>
          </div>

          <div>
            <p>Placement Ready</p>
            <h2 className="text-3xl font-bold">24</h2>
          </div>

        </div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <Users size={28} />
          <h3 className="mt-4">Students</h3>
          <p className="text-4xl font-black">78</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <ClipboardCheck size={28} />
          <h3 className="mt-4">Attendance</h3>
          <p className="text-4xl font-black">89%</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <FileText size={28} />
          <h3 className="mt-4">Assignments</h3>
          <p className="text-4xl font-black">8</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <TrendingUp size={28} />
          <h3 className="mt-4">Performance</h3>
          <p className="text-4xl font-black">91%</p>
        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold mb-6">
            Today's Tasks
          </h2>

          <div className="space-y-4">

            <div className="p-4 bg-blue-50 rounded-2xl">
              Review React Assignment
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl">
              Take Attendance
            </div>

            <div className="p-4 bg-green-50 rounded-2xl">
              Upload Lecture Notes
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold mb-6">
            Upcoming Classes
          </h2>

          <div className="space-y-4">

            <div className="p-4 bg-slate-50 rounded-2xl">
              React Hooks - 11:00 AM
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl">
              Node.js APIs - 02:00 PM
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <button className="w-full p-4 rounded-2xl bg-blue-50">
              Create Assignment
            </button>

            <button className="w-full p-4 rounded-2xl bg-purple-50">
              Upload Resource
            </button>

            <button className="w-full p-4 rounded-2xl bg-green-50">
              Take Attendance
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}