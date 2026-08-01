"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { getStoredAuth } from '@/lib/auth'
import axios from 'axios'
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  Bell,
  Search,
  FileText,
  Settings,
  GraduationCap,
  Video,
  ClipboardCheck,
  Megaphone,
  Award,
  Briefcase,
  Menu,
  Home,
  User,
  ChevronRight,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";

export default function TeacherDashboard() {
  const router = useRouter();

  const [teacher, setTeacher] = useState<{
    firstName?: string;
    lastName?: string;
    specialization?: string;
    totalStudents?: number;
    totalBatches?: number;
    totalAssignments?: number;
    totalContent?: number;
    batches?: Array<{ _id: string; name: string; course: { name: string } | null; status: string }>;
    recentStudents?: Array<{ name: string; status: string; attendance: string }>;
  } | null>(null);

  useEffect(() => {
    const auth = getStoredAuth();
    const role = auth?.user?.role?.toLowerCase();

    if (!auth?.token) {
      router.replace('/teacher-login');
      return;
    }

    if (role === 'student') {
      router.replace('/student-dashboard');
      return;
    }

    if (role === 'admin') {
      router.replace('/admin-dashboard');
      return;
    }

    axios
      .get('http://localhost:5000/api/teacher/dashboard', {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((response) => {
        if (response?.data?.data) {
          const d = response.data.data;
          setTeacher({
            firstName: d.teacher?.firstName,
            lastName: d.teacher?.lastName,
            specialization: d.teacher?.specialization,
            totalStudents: d.stats?.totalStudents,
            totalBatches: d.stats?.totalBatches,
            totalAssignments: d.stats?.totalAssignments,
            totalContent: d.stats?.totalContent,
            batches: d.batches,
            recentStudents: d.recentStudents?.slice(0, 4).map((s: any) => ({
              name: `${s.firstName} ${s.lastName}`,
              status: s.placementStatus || 'Placement Ready',
              attendance:
  s.attendance !== undefined && s.attendance !== null
    ? `${s.attendance}%`
    : "—",
            })),
          });
        }
      })
      .catch((error) => {
        console.error('Failed to load teacher dashboard', error);
      });
  }, [router]);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: BookOpen, label: "My Classes" },
    { icon: Users, label: "Students" },
    { icon: ClipboardCheck, label: "Attendance" },
    { icon: FileText, label: "Assignments" },
    { icon: Video, label: "Content Library" },
    { icon: Megaphone, label: "Announcements" },
    { icon: Calendar, label: "Schedule Classes" },
    { icon: FileText, label: "Resources" },
    { icon: FileText, label: "Reports" },
    { icon: Award, label: "Certificates" },
    { icon: Briefcase, label: "Placements" },
    { icon: Settings, label: "Settings" },
  ];

  const teacherFullName =
    teacher?.firstName && teacher?.lastName
      ? `${teacher.firstName} ${teacher.lastName}`
      : 'Rahul Sharma';
  const teacherInitials =
    teacher?.firstName && teacher?.lastName
      ? `${teacher.firstName[0]}${teacher.lastName[0]}`
      : 'RS';
  const teacherTitle = teacher?.specialization || 'Senior Instructor';

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">

  <div className="fixed inset-0 overflow-hidden pointer-events-none">

    <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

  </div>

  <div className="relative flex">

    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-white/70 backdrop-blur-xl border-r border-white/50">

      <div className="p-8">

        <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
          InCrafto
        </h1>

        <p className="text-gray-500 mt-2">
          Teacher Portal
        </p>

      </div>

      <nav className="flex-1 px-5 space-y-2">

        {[
        {
  icon: Home,
  label: "Dashboard",
  href: "/teacher-dashboard",
},
{
  icon: BookOpen,
  label: "My Classes",
  href: "/teacher-dashboard/classes",
},
          {
            icon: Users,
            label: "Students",
          },
         {
  icon: ClipboardCheck,
  label: "Attendance",
  href: "/teacher-dashboard/attendance",
},
         {
  icon: FileText,
  label: "Assignments",
  href: "/teacher-dashboard/assignments",
},
          {
            icon: Video,
            label: "Content Library",
          },
          {
            icon: Megaphone,
            label: "Announcements",
          },
          {
            icon: Calendar,
            label: "Schedule",
          },
          {
            icon: Award,
            label: "Certificates",
          },
          {
            icon: Briefcase,
            label: "Placements",
          },
          {
            icon: Settings,
            label: "Settings",
          },
       ].map((item, index) => (
  <Link
    key={item.label}
  href={
  item.label === "My Classes"
    ? "/teacher-dashboard/classes"
    : item.label === "Students"
    ? "/teacher-dashboard/classes/1/students"
    : item.label === "Attendance"
    ? "/teacher-dashboard/attendance"
    : item.label === "Assignments"

    ? "/teacher-dashboard/assignments"
    : item.label === "Content Library"
    ? "/teacher-dashboard/content"
    : item.label === "Announcements"
    ? "/teacher-dashboard/announcements"
    : item.label === "Schedule"
    ? "/teacher-dashboard/schedule"
    : item.label === "Certificates"
    ? "/teacher-dashboard/certificates"
    : item.label === "Placements"
    ? "/teacher-dashboard/placements"
    : item.label === "Settings"
    ? "/teacher-dashboard/settings"
    : "#"
}
  >
    <motion.div
      whileHover={{
        x: 8,
      }}
      className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
        index === 0
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl"
          : "hover:bg-white"
      }`}
    >
      <item.icon size={20} />

      <span className="font-medium">
        {item.label}
      </span>

    </motion.div>
  </Link>
))}

      </nav>

      <div className="p-6">

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-5 text-white">

          <h3 className="font-bold text-lg">
            Teaching Excellence
          </h3>

          <p className="text-sm text-blue-100 mt-2">
            89% average student satisfaction
          </p>

        </div>

      </div>

    </aside>

    <main className="flex-1 p-8">

      {/* Top Navbar */}

<div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-5 shadow-xl mb-8">

  <div className="flex justify-between items-center">

    {/* Search */}

    <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-2xl w-[400px]">

      <Search size={20} />

      <input
        placeholder="Search students, classes, assignments..."
        className="bg-transparent outline-none w-full"
      />

    </div>

    {/* Right Side */}

    <div className="flex items-center gap-4">

      <button className="relative bg-white p-3 rounded-2xl shadow">

        <Bell size={20} />

        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
          5
        </span>

      </button>

      <ThemeToggle />

      <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow">

        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">

          {teacherInitials}

        </div>

        <div>

          <p className="font-semibold">
            {teacherFullName}
          </p>

          <p className="text-sm text-gray-500">
            {teacherTitle}
          </p>

        </div>

      </div>

    </div>

  </div>

</div>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-10 text-white mb-8"
      >

        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10">

          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            🚀 Teacher Dashboard
          </span>

          <h1 className="text-6xl font-black mt-6 leading-tight">
            Welcome Back
          </h1>

          <p className="text-xl text-blue-100 mt-4 max-w-2xl">
            Manage classes, track student performance,
            review assignments and drive placement success.
          </p>

          <div className="flex gap-4 mt-8">

            <button className="bg-white text-blue-600 px-7 py-4 rounded-2xl font-bold">
              Manage Classes
            </button>

            <button className="border border-white/30 px-7 py-4 rounded-2xl">
              View Reports
            </button>

          </div>

        </div>

      </motion.div>

            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">

        {[
          {
            title: "Total Students",
            value: teacher?.totalStudents !== undefined ? String(teacher.totalStudents) : "128",
            icon: Users,
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "Active Classes",
            value: teacher?.totalBatches !== undefined ? String(teacher.totalBatches) : "2",
            icon: BookOpen,
            color: "from-purple-500 to-pink-500",
          },
          {
            title: "Today's Classes",
            value: "3",
            icon: Calendar,
            color: "from-green-500 to-emerald-500",
          },
          {
            title: "Pending Reviews",
            value: teacher?.totalAssignments !== undefined ? String(teacher.totalAssignments) : "14",
            icon: ClipboardCheck,
            color: "from-orange-500 to-red-500",
          },
          {
            title: "Announcements",
            value: "6",
            icon: Bell,
            color: "from-indigo-500 to-violet-500",
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl"
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white mb-4`}
            >
              <item.icon size={24} />
            </div>

            <h3 className="text-gray-500 text-sm">
              {item.title}
            </h3>

            <p className="text-4xl font-black text-gray-900 mt-2">
              {item.value}
            </p>

            <div className="flex items-center gap-2 mt-3 text-green-500 text-sm">
              <TrendingUp size={16} />
              <span>+12% this month</span>
            </div>

          </motion.div>
        ))}

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 shadow-xl"
        >

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              Teaching Performance
            </h2>

            <Star className="text-yellow-500" />

          </div>

          <div className="space-y-6">

            {[
              {
                title: "Student Satisfaction",
                value: 89,
              },
              {
                title: "Attendance Rate",
                value: 92,
              },
              {
                title: "Assignment Completion",
                value: 84,
              },
              {
                title: "Placement Readiness",
                value: 78,
              },
            ].map((item) => (
              <div key={item.title}>

                <div className="flex justify-between mb-3">

                  <span className="font-medium">
                    {item.title}
                  </span>

                  <span className="font-bold text-blue-600">
                    {item.value}%
                  </span>

                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${item.value}%`,
                    }}
                    transition={{
                      duration: 1.2,
                    }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />

                </div>

              </div>
            ))}

          </div>

        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 shadow-xl"
        >

          <h2 className="text-3xl font-bold mb-8">
            Weekly Overview
          </h2>

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-3xl bg-blue-50 p-6">
              <Clock className="text-blue-600 mb-3" />
              <p className="text-gray-500">
                Teaching Hours
              </p>
              <h3 className="text-4xl font-black mt-2">
                24
              </h3>
            </div>

            <div className="rounded-3xl bg-purple-50 p-6">
              <ClipboardCheck className="text-purple-600 mb-3" />
              <p className="text-gray-500">
                Reviewed
              </p>
              <h3 className="text-4xl font-black mt-2">
                46
              </h3>
            </div>

            <div className="rounded-3xl bg-green-50 p-6">
              <Video className="text-green-600 mb-3" />
              <p className="text-gray-500">
                Videos Uploaded
              </p>
              <h3 className="text-4xl font-black mt-2">
                38
              </h3>
            </div>

            <div className="rounded-3xl bg-orange-50 p-6">
              <Award className="text-orange-600 mb-3" />
              <p className="text-gray-500">
                Certificates
              </p>
              <h3 className="text-4xl font-black mt-2">
                112
              </h3>
            </div>

          </div>

        </motion.div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 shadow-xl"
        >

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              My Classes
            </h2>

            <button className="text-blue-600 flex items-center gap-2">
              View All
              <ChevronRight size={18} />
            </button>

          </div>

          <div className="space-y-5">

            {(teacher?.batches && teacher.batches.length > 0
              ? teacher.batches.map((b) => ({
                  name: b.course?.name || b.name,
                  students: '—',
                  attendance: '—',
                }))
              : [
                  { name: "Full Stack Development", students: "78", attendance: "89%" },
                  { name: "Data Analytics", students: "50", attendance: "91%" },
                ]
            ).map((course) => (
              <motion.div
                key={course.name}
                whileHover={{
                  scale: 1.02,
                }}
                className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50"
              >

                <h3 className="text-xl font-bold">
                  {course.name}
                </h3>

                <div className="flex gap-6 mt-4 text-gray-600">

                  <span>
                    👨‍🎓 {course.students} Students
                  </span>

                  <span>
                    📊 {course.attendance}
                  </span>

                </div>

                <div className="flex gap-3 mt-5">

                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl">
                    Manage Class
                  </button>

                  <button className="border px-5 py-3 rounded-xl">
                    Analytics
                  </button>

                </div>

              </motion.div>
            ))}

          </div>

        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 shadow-xl"
        >

          <h2 className="text-3xl font-bold mb-8">
            Top Students
          </h2>

          <div className="space-y-4">

            {(teacher?.recentStudents && teacher.recentStudents.length > 0
              ? teacher.recentStudents
              : [
                  { name: "Harshita Singh", status: "Placement Ready", attendance: "92%" },
                  { name: "Aviral Jain", status: "Placement Ready", attendance: "92%" },
                  { name: "Priya Sharma", status: "Placement Ready", attendance: "92%" },
                  { name: "Abhishek Singh", status: "Placement Ready", attendance: "92%" },
                ]
            ).map((student) => (
              <div
                key={student.name}
                className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-all"
              >

                <div>
                  <h4 className="font-semibold">
                    {student.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {student.status}
                  </p>
                </div>

                <span className="text-green-600 font-bold">
                  {student.attendance}
                </span>

              </div>
            ))}

          </div>

        </motion.div>

      </div>

            <div className="grid lg:grid-cols-3 gap-8">

        <div className="space-y-8">

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 shadow-xl"
          >

            <h2 className="text-2xl font-bold mb-6">
              Quick Actions
            </h2>

            <div className="space-y-4">

              {[
                "🎥 Upload Lecture",
                "📝 Create Assignment",
                "📅 Schedule Class",
                "📢 Send Announcement",
                "🎓 Generate Certificates",
              ].map((item) => (
                <button
                  key={item}
                  className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-lg transition-all"
                >
                  {item}
                </button>
              ))}

            </div>

          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 shadow-xl"
          >

            <h2 className="text-2xl font-bold mb-6">
              Teacher Insights
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">
                <span>Average Attendance</span>
                <span className="font-bold text-green-600">
                  89%
                </span>
              </div>

              <div className="flex justify-between">
                <span>Assignments Reviewed</span>
                <span className="font-bold">
                  246
                </span>
              </div>

              <div className="flex justify-between">
                <span>Resources Uploaded</span>
                <span className="font-bold">
                  {teacher?.totalContent ?? 24}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Placement Sessions</span>
                <span className="font-bold">
                  12
                </span>
              </div>

            </div>

          </motion.div>

        </div>

        <div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 shadow-xl h-full"
          >

            <h2 className="text-2xl font-bold mb-8">
              Today's Teaching Schedule
            </h2>

            <div className="space-y-6">

              {[
                {
                  time: "11:00 AM",
                  title: "React.js Hooks",
                },
                {
                  time: "02:00 PM",
                  title: "Node.js Express",
                },
                {
                  time: "05:00 PM",
                  title: "Placement Workshop",
                },
              ].map((item) => (
                <div
                  key={item.time}
                  className="flex gap-4"
                >

                  <div className="flex flex-col items-center">

                    <div className="w-4 h-4 rounded-full bg-blue-600" />

                    <div className="w-[2px] h-16 bg-blue-200" />

                  </div>

                  <div>

                    <p className="text-blue-600 font-semibold">
                      {item.time}
                    </p>

                    <h4 className="font-bold text-lg">
                      {item.title}
                    </h4>

                  </div>

                </div>
              ))}

            </div>

            <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold">
              Add New Class
            </button>

          </motion.div>

        </div>

        <div className="space-y-8">

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 shadow-xl"
          >

            <h2 className="text-2xl font-bold mb-6">
              Announcements
            </h2>

            <div className="space-y-4">

              {[
                "📢 Placement Drive on 15 June",
                "📢 New React Module Added",
                "📢 Assignment Deadline Extended",
                "📢 Holiday Notice",
              ].map((item) => (
                <div
                  key={item}
                  className="p-4 rounded-2xl bg-blue-50"
                >
                  {item}
                </div>
              ))}

            </div>

          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 shadow-xl"
          >

            <h2 className="text-2xl font-bold mb-6">
              Activity Timeline
            </h2>

            <div className="space-y-5">

              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-2" />
                <p>Assignment Reviewed</p>
              </div>

              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 mt-2" />
                <p>Lecture Uploaded</p>
              </div>

              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500 mt-2" />
                <p>Attendance Submitted</p>
              </div>

              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-500 mt-2" />
                <p>Certificate Approved</p>
              </div>

              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-pink-500 mt-2" />
                <p>Placement Session Conducted</p>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
      <div className="grid lg:grid-cols-2 gap-8 mt-8">

  {/* Performance Chart */}

  <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

    <h2 className="text-2xl font-bold mb-6">
      Weekly Performance
    </h2>

    <div className="space-y-5">

      {[
        { day: "Mon", value: 75 },
        { day: "Tue", value: 88 },
        { day: "Wed", value: 92 },
        { day: "Thu", value: 84 },
        { day: "Fri", value: 96 },
      ].map((item) => (

        <div key={item.day}>

          <div className="flex justify-between mb-2">
            <span>{item.day}</span>
            <span>{item.value}%</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full">

            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${item.value}%` }}
            />

          </div>

        </div>

      ))}

    </div>

  </div>

  {/* Recent Activity */}

  <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

    <h2 className="text-2xl font-bold mb-6">
      Recent Activity
    </h2>

    <div className="space-y-4">

      <div className="p-4 rounded-2xl bg-blue-50">
        📚 React Assignment Submitted
      </div>

      <div className="p-4 rounded-2xl bg-green-50">
        ✅ Attendance Marked for Full Stack Batch
      </div>

      <div className="p-4 rounded-2xl bg-purple-50">
        🏆 Certificate Issued to 12 Students
      </div>

      <div className="p-4 rounded-2xl bg-orange-50">
        💼 New Placement Drive Added
      </div>

    </div>

  </div>

</div>

    </main>

  </div>

</div>
  );
}