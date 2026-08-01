"use client";

import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Download, Sparkles } from "lucide-react";

export default function StudentCertificatesPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCertificates = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please sign in to view your certificates.");
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
        console.error("Failed to load certificates", err);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          setError("Please sign in again to view your certificates.");
        } else {
          setError("Certificates could not be loaded right now.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, [router]);

  const certificates = profile?.certificates || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff] p-6 md:p-8 flex items-center justify-center">
        <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl">
          <p className="text-lg font-semibold text-slate-700">Loading certificates...</p>
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
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
              <Award size={16} />
              Certificates
            </div>
            <h1 className="mt-3 text-3xl font-black text-slate-800">Issued achievement certificates</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Download proof of completion for your learning milestones.
            </p>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
            {error}
          </div>
        ) : certificates.length === 0 ? (
          <div className="mt-8 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <Sparkles className="mx-auto text-slate-400" size={40} />
            <h2 className="mt-4 text-xl font-semibold text-slate-800">No certificates available</h2>
            <p className="mt-2 text-sm text-slate-500">Complete your enrolled modules to unlock downloadable certificates.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {certificates.map((item: any, index: number) => (
              <div key={`${item.title}-${index}`} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">{item.title || "Completion Certificate"}</h2>
                    <p className="mt-1 text-sm text-slate-500">Issued on {item.issuedAt || "TBD"}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.status || "Issued"}
                  </span>
                </div>

                <button className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                  <Download size={16} />
                  Download Certificate
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
