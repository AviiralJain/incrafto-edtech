"use client";

import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Save, Settings2 } from "lucide-react";
import { ThemeToggle } from '@/components/layout/theme-toggle'

export default function StudentSettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please sign in to update your settings.");
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

        const student = response.data?.user ?? response.data?.student ?? response.data ?? null;
        setProfile(student);
        setForm((prev) => ({ ...prev, name: student?.name || "", email: student?.email || "" }));
      } catch (err) {
        console.error("Failed to load profile", err);
        setError("Settings could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not signed in.");
      return;
    }

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      setSaving(true);
      await axios.put(
        "http://localhost:5000/api/auth/profile",
        {
          name: form.name,
          email: form.email,
          currentPassword: form.currentPassword || undefined,
          newPassword: form.newPassword || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Settings updated successfully.");
    } catch (err: any) {
      console.error("Failed to update settings", err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        setError("Please sign in again to update your settings.");
      } else {
        setError("We could not save your changes. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 md:p-8 flex items-center justify-center">
        <div className="rounded-[32px] border border-white/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-8 text-center shadow-xl backdrop-blur-xl">
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Preparing settings...</p>
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
        <div className="flex items-center gap-2">
          <Settings2 className="text-slate-700 dark:text-slate-300" size={20} />
          <h1 className="text-3xl font-black text-slate-800 dark:text-white">Account settings</h1>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Update your profile details and password securely.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 p-5">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Profile details</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-400">Full name</label>
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-400">Email address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 p-5">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Change password</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-400">Current password</label>
                <div className="flex items-center rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-3">
                  <Lock size={16} className="mr-2 text-slate-400 dark:text-slate-500" />
                  <input
                    type="password"
                    value={form.currentPassword}
                    onChange={(event) => setForm({ ...form, currentPassword: event.target.value })}
                    className="w-full outline-none bg-transparent text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-400">New password</label>
                <input
                  type="password"
                  value={form.newPassword}
                  onChange={(event) => setForm({ ...form, newPassword: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-400">Confirm password</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
            {success ? <p className="text-sm text-emerald-600">{success}</p> : null}
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
