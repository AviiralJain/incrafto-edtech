"use client";

import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Save, Settings2 } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff] p-6 md:p-8 flex items-center justify-center">
        <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl">
          <p className="text-lg font-semibold text-slate-700">Preparing settings...</p>
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
        <div className="flex items-center gap-2">
          <Settings2 className="text-slate-700" size={20} />
          <h1 className="text-3xl font-black text-slate-800">Account settings</h1>
        </div>
        <p className="mt-2 text-sm text-slate-600">Update your profile details and password securely.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
            <h2 className="text-lg font-semibold text-slate-800">Profile details</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Full name</label>
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Email address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
            <h2 className="text-lg font-semibold text-slate-800">Change password</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Current password</label>
                <div className="flex items-center rounded-2xl border border-slate-300 bg-white px-3 py-3">
                  <Lock size={16} className="mr-2 text-slate-400" />
                  <input
                    type="password"
                    value={form.currentPassword}
                    onChange={(event) => setForm({ ...form, currentPassword: event.target.value })}
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">New password</label>
                <input
                  type="password"
                  value={form.newPassword}
                  onChange={(event) => setForm({ ...form, newPassword: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Confirm password</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none"
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
