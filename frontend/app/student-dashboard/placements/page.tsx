"use client";

import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, CalendarDays, ClipboardList, Sparkles, TrendingUp } from "lucide-react";

export default function StudentPlacementsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPlacements = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please sign in to access your placement dashboard.");
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
        console.error("Failed to load placements", err);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          setError("Please sign in again to access your placement dashboard.");
        } else {
          setError("Placement data could not be loaded.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadPlacements();
  }, [router]);

  const placements = profile?.placements || [];
  const resumeScore = profile?.resumeScore || 78;
  const applicationsCount = profile?.applicationsCount || placements.length || 0;
  const interviewsCount = profile?.interviewsCount || 0;
  const offersCount = profile?.offersCount || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff] p-6 md:p-8 flex items-center justify-center">
        <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl">
          <p className="text-lg font-semibold text-slate-700">Loading placement dashboard...</p>
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
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
              <Briefcase size={16} />
              Placement Dashboard
            </div>
            <h1 className="mt-3 text-3xl font-black text-slate-800">Career progress at a glance</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Track applications, interviews, resume health, and offers in one place.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 px-4 py-3 text-white">
            <p className="text-sm">Resume score</p>
            <p className="text-2xl font-bold">{resumeScore}%</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-sm text-slate-500">Applications</p>
            <p className="mt-2 text-2xl font-bold text-slate-800">{applicationsCount}</p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-sm text-slate-500">Interviews</p>
            <p className="mt-2 text-2xl font-bold text-slate-800">{interviewsCount}</p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-sm text-slate-500">Offers</p>
            <p className="mt-2 text-2xl font-bold text-slate-800">{offersCount}</p>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
            {error}
          </div>
        ) : placements.length === 0 ? (
          <div className="mt-8 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <Sparkles className="mx-auto text-slate-400" size={40} />
            <h2 className="mt-4 text-xl font-semibold text-slate-800">No placement activity yet</h2>
            <p className="mt-2 text-sm text-slate-500">Start applying to opportunities and they will appear here.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {placements.map((item: any, index: number) => (
              <div key={`${item.company}-${index}`} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">{item.company || "Opportunity"}</h2>
                    <p className="mt-1 text-sm text-slate-500">{item.role || "Role pending"}</p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {item.status || "Applied"}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <CalendarDays size={16} />
                  <span>Interview: {item.interviewDate || "Awaiting schedule"}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <ClipboardList size={16} />
                  <span>Resume score: {item.resumeScore || resumeScore}%</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <TrendingUp size={16} />
                  <span>Offer status: {item.offerStatus || "In progress"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
