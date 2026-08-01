"use client";

import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Clock3, Sparkles, TrendingUp } from "lucide-react";
import { ThemeToggle } from '@/components/layout/theme-toggle'

export default function StudentCoursesPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please sign in to view your assigned courses.");
        setLoading(false);
        router.replace("/student-login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data?.user ?? response.data?.student ?? response.data ?? null);
      } catch (err: any) {
        console.error("Failed to load courses", err);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          setError("Please sign in again to view your assigned courses.");
        } else {
          setError("Your assigned courses could not be loaded.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [router]);

  const courses = profile?.courses || [];
  const currentCourse = profile?.course || (courses[0]?.title ?? "No course assigned");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 md:p-8 flex items-center justify-center">
        <div className="rounded-[32px] border border-white/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-8 text-center shadow-xl backdrop-blur-xl">
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 md:p-8">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="rounded-[32px] border border-white/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-8 shadow-xl backdrop-blur-xl mt-12 md:mt-0"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300">
              <BookOpen size={16} />
              Assigned Courses
            </div>
            <h1 className="mt-3 text-3xl font-black text-slate-800 dark:text-white">Your current learning path</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Explore the programs assigned to you and continue mastering each milestone.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 px-4 py-3 text-white">
            <p className="text-sm">Current focus</p>
            <p className="text-lg font-semibold">{currentCourse}</p>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-6 text-sm text-slate-600 dark:text-slate-400">
            {error}
          </div>
        ) : courses.length === 0 ? (
          <div className="mt-8 rounded-[24px] border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-10 text-center">
            <Sparkles className="mx-auto text-slate-400 dark:text-slate-500" size={40} />
            <h2 className="mt-4 text-xl font-semibold text-slate-800 dark:text-white">No courses assigned yet</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Once your admin assigns a course, it will appear here automatically.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {courses.map((item: any, index: number) => (
              <div key={`${item.title}-${index}`} className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">{item.title || "Course"}</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.description || "No description available yet."}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {item.status || "Active"}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Clock3 size={16} />
                  <span>{item.duration || "Duration pending"}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <TrendingUp size={16} />
                  <span>{item.progress || "Progress tracking ready"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
