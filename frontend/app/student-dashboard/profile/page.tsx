"use client";

import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, UserRound, CalendarDays, BookOpen, Sparkles } from "lucide-react";
import { ThemeToggle } from '@/components/layout/theme-toggle'

export default function StudentProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please sign in to view your profile.");
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
        console.error("Failed to load profile", err);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          setError("Please sign in again to view your profile.");
        } else {
          setError("Your profile could not be loaded.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const joinedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 md:p-8 flex items-center justify-center">
        <div className="rounded-[32px] border border-white/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-8 text-center shadow-xl backdrop-blur-xl">
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Loading profile...</p>
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
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-sm font-medium text-green-700 dark:text-green-300">
              <UserRound size={16} />
              Student Profile
            </div>
            <h1 className="mt-3 text-3xl font-black text-slate-800 dark:text-white">Welcome, {profile?.name || "Student"}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">Your learning identity and course details are synced from the backend.</p>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-6 text-sm text-slate-600 dark:text-slate-400">
            {error}
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-3 shadow-sm">
                  <UserRound className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-white">{profile?.name || "Student"}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Enrolled learner</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/70 dark:bg-slate-900/50 p-4">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Mail size={16} />
                    <span className="text-sm">Email</span>
                  </div>
                  <p className="mt-2 font-semibold text-slate-800 dark:text-white">{profile?.email || "Not provided"}</p>
                </div>
                <div className="rounded-2xl bg-white/70 dark:bg-slate-900/50 p-4">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <BookOpen size={16} />
                    <span className="text-sm">Enrolled Course</span>
                  </div>
                  <p className="mt-2 font-semibold text-slate-800 dark:text-white">{profile?.course || "No course assigned"}</p>
                </div>
                <div className="rounded-2xl bg-white/70 dark:bg-slate-900/50 p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <CalendarDays size={16} />
                    <span className="text-sm">Date Joined</span>
                  </div>
                  <p className="mt-2 font-semibold text-slate-800 dark:text-white">{joinedDate}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 p-6">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <Sparkles size={18} />
                <h3 className="font-semibold">Profile highlights</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li>• Learning progress is updated from the backend profile data.</li>
                <li>• Course and placement information appear dynamically when available.</li>
                <li>• You can extend this view with more fields as your API grows.</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
