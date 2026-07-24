"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearStoredAuth, getStoredAuth } from '@/lib/auth';

export default function AdminDashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = getStoredAuth();
    const role = auth?.user?.role?.toLowerCase();

    if (!auth?.token) {
      router.replace("/admin-login");
      return;
    }

    if (role === "admin") {
      router.replace("/admin/dashboard");
    } else if (role === "student") {
      router.replace("/student-dashboard");
    } else if (role === "teacher") {
      router.replace("/teacher-dashboard");
    } else {
      clearStoredAuth();
      router.replace("/admin-login");
    }
  }, [router]);

  return null;
}