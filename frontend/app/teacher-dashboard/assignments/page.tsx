"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FileText,
  ClipboardCheck,
  Clock,
  TrendingUp,
  Plus,
  Download,
  X,
} from "lucide-react";
import { ThemeToggle } from '@/components/layout/theme-toggle'

interface Assignment {
  _id?: string;
  id?: number;
  title: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: string;
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalStudents, setTotalStudents] = useState(78);

  // Fetch assignments on mount
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(res.data);
    } catch (err) {
      console.error("Failed to fetch assignments, using static defaults.", err);
      // Fallback fallback defaults if backend endpoint isn't fully set up yet
      setAssignments([
        { id: 1, title: "React Dashboard Project", dueDate: "2026-06-25", submissions: 65, totalStudents: 78, status: "Active" },
        { id: 2, title: "Node.js REST API", dueDate: "2026-06-30", submissions: 54, totalStudents: 78, status: "Active" },
        { id: 3, title: "MongoDB Database Design", dueDate: "2026-07-15", submissions: 22, totalStudents: 78, status: "Pending" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    try {
      const token = localStorage.getItem("token");
      const newAssignmentData = {
        title,
        dueDate,
        totalStudents: Number(totalStudents),
        submissions: 0,
        status: "Active",
      };

      const res = await axios.post(
        "http://localhost:5000/api/assignments",
        newAssignmentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Add new assignment to UI state and reset form
      setAssignments((prev) => [res.data, ...prev]);
      setTitle("");
      setDueDate("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating assignment", err);
      alert("Failed to save assignment. Make sure your server is online.");
    }
  };

  // Aggregated Stat Summary Counters
  const totalCount = assignments.length;
  const activeCount = assignments.filter((a) => a.status === "Active").length;
  const pendingCount = assignments.filter((a) => a.status === "Pending").length;
  const totalSubmissions = assignments.reduce((sum, a) => sum + a.submissions, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[36px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-10 text-white mb-8 shadow-xl"
      >
        <h1 className="text-5xl font-black">Assignment Management</h1>
        <p className="text-xl text-blue-100 mt-4">
          Create, review and grade assignments across all classes dynamically.
        </p>

        <div className="flex gap-10 mt-8">
          <div>
            <p className="text-sm text-blue-100">Total Assignments</p>
            <h2 className="text-4xl font-black">{totalCount}</h2>
          </div>
          <div>
            <p className="text-sm text-blue-100">Submitted</p>
            <h2 className="text-4xl font-black">{totalSubmissions}</h2>
          </div>
          <div>
            <p className="text-sm text-blue-100">Pending Review</p>
            <h2 className="text-4xl font-black">{pendingCount}</h2>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Counter Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Assignments", value: totalCount, icon: FileText },
          { title: "Active", value: activeCount, icon: ClipboardCheck },
          { title: "Pending", value: pendingCount, icon: Clock },
          { title: "Average Score", value: "84%", icon: TrendingUp },
        ].map((item) => (
          <div key={item.title} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40 dark:border-slate-800">
            <item.icon size={28} className="text-blue-600 dark:text-blue-400" />
            <h3 className="mt-4 text-gray-500 dark:text-gray-400 font-medium">{item.title}</h3>
            <p className="text-4xl font-black text-slate-800 dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Action triggers */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl flex justify-center items-center gap-2 font-bold shadow-lg hover:opacity-95 transition-all"
        >
          <Plus size={18} />
          Create Assignment
        </button>
        <button className="bg-white dark:bg-slate-900 py-4 rounded-2xl shadow font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
          Review Submissions
        </button>
        <button className="bg-white dark:bg-slate-900 py-4 rounded-2xl shadow font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
          Grade Assignments
        </button>
        <button className="bg-white dark:bg-slate-900 py-4 rounded-2xl shadow flex justify-center items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
          <Download size={18} />
          Export Grades
        </button>
      </div>

      {/* Render Lists */}
      <div className="space-y-6 mb-8">
        {loading ? (
          <p className="text-slate-500 text-center py-4">Syncing assignments...</p>
        ) : (
          assignments.map((assignment, index) => (
            <motion.div
              key={assignment._id || assignment.id || index}
              whileHover={{ scale: 1.01 }}
              className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/50 dark:border-slate-800"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{assignment.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Due: {assignment.dueDate}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full font-semibold text-sm ${
                    assignment.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {assignment.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Submissions</p>
                  <h3 className="text-3xl font-black text-slate-800 dark:text-white">
                    {assignment.submissions} / {assignment.totalStudents}
                  </h3>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Completion</p>
                  <h3 className="text-3xl font-black text-slate-800 dark:text-white">
                    {assignment.totalStudents > 0
                      ? Math.round((assignment.submissions / assignment.totalStudents) * 100)
                      : 0}
                    %
                  </h3>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl font-medium shadow">
                  View
                </button>
                <button className="border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-5 py-3 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                  Grade
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* POPUP ACTION MODAL VIEW */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-[32px] w-full max-w-md p-8 shadow-2xl border border-slate-100 dark:border-slate-800 relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-6">New Assignment</h3>

              <form onSubmit={handleCreateAssignment} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Redux State Integration"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Target Class Batch Size (Students)
                  </label>
                  <input
                    type="number"
                    value={totalStudents}
                    onChange={(e) => setTotalStudents(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg transition hover:opacity-95"
                >
                  Publish Project Track
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}