"use client";

import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCheck, Clock3, Sparkles, BadgeCheck } from "lucide-react";

export default function StudentAssignmentsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAssignments = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please sign in to view your assignments.");
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
        console.error("Failed to load assignments", err);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          setError("Please sign in again to view your assignments.");
        } else {
          setError("We could not load your assignments right now.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, [router]);

  const assignments = profile?.assignments || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff] p-6 md:p-8 flex items-center justify-center">
        <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl">
          <p className="text-lg font-semibold text-slate-700">Loading assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff] p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              <ClipboardCheck size={16} />
              Assignment Tracker
            </div>
            <h1 className="mt-3 text-3xl font-black text-slate-800">Your assignment board</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Track deadlines, submission progress, and what still needs attention.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 px-4 py-3 text-white">
            <p className="text-sm">Focus score</p>
            <p className="text-2xl font-bold">{assignments.length ? "On track" : "Fresh start"}</p>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
            {error}
          </div>
        ) : assignments.length === 0 ? (
          <div className="mt-8 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <Sparkles className="mx-auto text-slate-400" size={40} />
            <h2 className="mt-4 text-xl font-semibold text-slate-800">No assignments yet</h2>
            <p className="mt-2 text-sm text-slate-500">Your teacher will publish tasks here once they are assigned.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {assignments.map((item: any, index: number) => (
              <div key={`${item.title}-${index}`} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">{item.title || "Untitled assignment"}</h2>
                    <p className="mt-1 text-sm text-slate-500">{item.description || "No description provided"}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Submitted" ? "bg-emerald-100 text-emerald-700" : item.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                    {item.status || "Pending"}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <Clock3 size={16} />
                  <span>Due: {item.dueDate || "TBD"}</span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <BadgeCheck size={16} />
                  <span>Submission: {item.status || "Pending"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
