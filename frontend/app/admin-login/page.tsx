"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { clearStoredAuth, getStoredAuth, setStoredAuth } from '@/lib/auth';
import { ThemeToggle } from '@/components/layout/theme-toggle'

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getStoredAuth();
    const role = auth?.user?.role?.toLowerCase();

    if (!auth?.token) {
      return;
    }

    if (role === "admin") {
      router.replace("/admin/dashboard");
    } else if (role === "student") {
      router.replace("/student-dashboard");
    } else if (role === "teacher") {
      router.replace("/teacher-dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      clearStoredAuth();
      setStoredAuth(res.data.token, res.data.user);

      const role = res?.data?.user?.role?.toLowerCase();

      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else if (role === "student") {
        router.replace("/student-dashboard");
      } else if (role === "teacher") {
        router.replace("/teacher-dashboard");
      } else {
        setError("Access denied for this account role.");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Invalid credentials or Server is offline."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      {/* Background Effects */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex w-1/2 flex-col justify-center px-20 text-slate-900 dark:text-white"
        >
          <h1 className="text-5xl font-bold leading-tight">
            System Administration
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            Control the entire platform, manage users, monitor analytics,
            and ensure smooth operations from the command center.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" />
              Student Management
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" />
              Teacher Management
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" />
              Course Administration
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" />
              Reports & Analytics
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex w-full lg:w-1/2 items-center justify-center px-6"
        >
          <div className="w-full max-w-md rounded-3xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-slate-600 dark:text-slate-400">
              Restricted access. Authorized personnel only.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400 text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link
                  href="#"
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white text-center transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div 
              className="mt-6 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 text-sm text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-purple-500/20 transition"
              onClick={() => {
                setEmail("admin@incrafto.com");
                setPassword("admin123");
              }}
            >
              <p className="font-semibold text-slate-900 dark:text-white mb-1 flex justify-between items-center">
                <span>Demo Credentials</span>
                <span className="text-xs text-purple-400 font-normal">Click to auto-fill</span>
              </p>
              <p>Email: admin@incrafto.com</p>
              <p>Password: admin123</p>
            </div>

            <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
              Unauthorized access attempts are logged and monitored.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}