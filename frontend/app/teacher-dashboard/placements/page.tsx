"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  TrendingUp,
  Users,
  DollarSign,
  Building2,
  Award,
} from "lucide-react";

const companies = [
  {
    name: "Google",
    package: "₹28 LPA",
    applied: 12,
    interviewed: 3,
    selected: 2,
  },
  {
    name: "Microsoft",
    package: "₹24 LPA",
    applied: 18,
    interviewed: 5,
    selected: 4,
  },
  {
    name: "Amazon",
    package: "₹22 LPA",
    applied: 22,
    interviewed: 8,
    selected: 5,
  },
];

export default function PlacementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-cyan-50 p-8">

      {/* Hero Section */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[40px] bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 p-10 text-white mb-8"
      >
        <h1 className="text-6xl font-black">
          Placement Command Center
        </h1>

        <p className="text-xl text-emerald-100 mt-4 max-w-3xl">
          Monitor placement performance, company hiring,
          interview pipelines and student readiness from
          one powerful dashboard.
        </p>

        <div className="grid md:grid-cols-5 gap-8 mt-10">

          <div>
            <p className="text-emerald-100">
              Placement Rate
            </p>

            <h2 className="text-4xl font-black">
              87%
            </h2>
          </div>

          <div>
            <p className="text-emerald-100">
              Students Placed
            </p>

            <h2 className="text-4xl font-black">
              78
            </h2>
          </div>

          <div>
            <p className="text-emerald-100">
              Highest Package
            </p>

            <h2 className="text-4xl font-black">
              ₹28L
            </h2>
          </div>

          <div>
            <p className="text-emerald-100">
              Average Package
            </p>

            <h2 className="text-4xl font-black">
              ₹9.4L
            </h2>
          </div>

          <div>
            <p className="text-emerald-100">
              Active Drives
            </p>

            <h2 className="text-4xl font-black">
              12
            </h2>
          </div>

        </div>

      </motion.div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {[
          {
            title: "Companies",
            value: "42",
            icon: Building2,
          },
          {
            title: "Students Eligible",
            value: "124",
            icon: Users,
          },
          {
            title: "Offers Released",
            value: "96",
            icon: Award,
          },
          {
            title: "Growth",
            value: "+18%",
            icon: TrendingUp,
          },
        ].map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -6 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          >
            <item.icon
              size={32}
              className="text-emerald-600"
            />

            <h3 className="mt-4 text-gray-500">
              {item.title}
            </h3>

            <p className="text-4xl font-black">
              {item.value}
            </p>

          </motion.div>
        ))}

      </div>

      {/* Funnel + Salary Section */}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        {/* Placement Funnel */}

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            Placement Funnel
          </h2>

          <div className="space-y-4">

            {[
              {
                label: "Registered",
                value: 178,
              },
              {
                label: "Eligible",
                value: 124,
              },
              {
                label: "Applied",
                value: 103,
              },
              {
                label: "Interviewed",
                value: 82,
              },
              {
                label: "Selected",
                value: 78,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-gradient-to-r from-emerald-50 to-cyan-50 p-5"
              >
                <div className="flex justify-between">

                  <span className="font-semibold">
                    {item.label}
                  </span>

                  <span className="font-black">
                    {item.value}
                  </span>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Salary Insights */}

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            Salary Insights
          </h2>

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-3xl bg-green-50 p-6">
              <DollarSign className="mb-3" />

              <p className="text-gray-500">
                Highest Package
              </p>

              <h3 className="text-4xl font-black">
                ₹28L
              </h3>
            </div>

            <div className="rounded-3xl bg-blue-50 p-6">
              <Briefcase className="mb-3" />

              <p className="text-gray-500">
                Average Package
              </p>

              <h3 className="text-4xl font-black">
                ₹9.4L
              </h3>
            </div>

            <div className="rounded-3xl bg-purple-50 p-6">

              <p className="text-gray-500">
                Median Package
              </p>

              <h3 className="text-4xl font-black">
                ₹7.8L
              </h3>

            </div>

            <div className="rounded-3xl bg-orange-50 p-6">

              <p className="text-gray-500">
                Offers Released
              </p>

              <h3 className="text-4xl font-black">
                96
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Company Pipeline */}

      <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

        <h2 className="text-3xl font-bold mb-8">
          Company Pipeline
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">

          {companies.map((company) => (
            <motion.div
              key={company.name}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-white p-6 border"
            >

              <h3 className="text-2xl font-bold">
                {company.name}
              </h3>

              <p className="text-emerald-600 font-semibold mt-2">
                {company.package}
              </p>

              <div className="mt-6 space-y-3">

                <div className="flex justify-between">
                  <span>Applied</span>
                  <span>{company.applied}</span>
                </div>

                <div className="flex justify-between">
                  <span>Interviewed</span>
                  <span>{company.interviewed}</span>
                </div>

                <div className="flex justify-between">
                  <span>Selected</span>
                  <span>{company.selected}</span>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

{/* PART 2 STARTS HERE */}
{/* Placement Ready Students + Upcoming Drives */}

<div className="grid lg:grid-cols-2 gap-8 mt-8 mb-8">

  {/* Top Students */}

  <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

    <h2 className="text-3xl font-bold mb-8">
      Placement Ready Students
    </h2>

    {[
      {
        name: "Harshita Singh",
        score: 96,
        dsa: 94,
        aptitude: 97,
      },
      {
        name: "Priya Sharma",
        score: 98,
        dsa: 99,
        aptitude: 96,
      },
      {
        name: "Aviral Jain",
        score: 92,
        dsa: 90,
        aptitude: 91,
      },
    ].map((student) => (
      <div
        key={student.name}
        className="rounded-3xl bg-white p-5 mb-4 border"
      >

        <div className="flex justify-between">

          <h3 className="text-xl font-bold">
            {student.name}
          </h3>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
            Ready
          </span>

        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">

          <div>
            <p className="text-gray-500">
              Score
            </p>

            <h4 className="font-bold">
              {student.score}
            </h4>
          </div>

          <div>
            <p className="text-gray-500">
              DSA
            </p>

            <h4 className="font-bold">
              {student.dsa}
            </h4>
          </div>

          <div>
            <p className="text-gray-500">
              Aptitude
            </p>

            <h4 className="font-bold">
              {student.aptitude}
            </h4>
          </div>

        </div>

      </div>
    ))}

  </div>

  {/* Upcoming Drives */}

  <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

    <h2 className="text-3xl font-bold mb-8">
      Upcoming Drives
    </h2>

    {[
      {
        date: "25 June",
        company: "Google Hiring Challenge",
      },
      {
        date: "28 June",
        company: "Microsoft Interview",
      },
      {
        date: "02 July",
        company: "Amazon SDE Hiring",
      },
      {
        date: "10 July",
        company: "Flipkart Placement Drive",
      },
    ].map((drive) => (
      <div
        key={drive.company}
        className="flex gap-5 mb-8"
      >

        <div>

          <div className="w-4 h-4 rounded-full bg-emerald-600" />

          <div className="w-[2px] h-16 bg-emerald-200 mx-auto" />

        </div>

        <div>

          <p className="text-emerald-600 font-semibold">
            {drive.date}
          </p>

          <h4 className="text-xl font-bold">
            {drive.company}
          </h4>

        </div>

      </div>
    ))}

  </div>

</div>

{/* Interview Analytics */}

<div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl mb-8">

  <h2 className="text-3xl font-bold mb-8">
    Placement Analytics
  </h2>

  {[
    {
      label: "Placement Rate",
      value: 87,
    },
    {
      label: "Interview Success",
      value: 76,
    },
    {
      label: "Resume Completion",
      value: 92,
    },
    {
      label: "Mock Interview Score",
      value: 84,
    },
  ].map((item) => (
    <div
      key={item.label}
      className="mb-6"
    >

      <div className="flex justify-between mb-2">

        <span>{item.label}</span>

        <span>{item.value}%</span>

      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${item.value}%`,
          }}
          transition={{
            duration: 1.2,
          }}
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
        />

      </div>

    </div>
  ))}

</div>

{/* Quick Actions */}

<div className="grid md:grid-cols-4 gap-4 mb-8">

  <button className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-4 rounded-2xl">
    Create Placement Drive
  </button>

  <button className="bg-white py-4 rounded-2xl shadow-lg">
    Add Company
  </button>

  <button className="bg-white py-4 rounded-2xl shadow-lg">
    Mock Interviews
  </button>

  <button className="bg-white py-4 rounded-2xl shadow-lg">
    Export Report
  </button>

</div>

{/* AI Placement Insights */}

<div className="rounded-[32px] bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 p-8 text-white">

  <h2 className="text-3xl font-black mb-4">
    Placement Insights
  </h2>

  <div className="space-y-3 text-lg">

    <p>
      • Placement rate increased by 18% compared to last semester.
    </p>

    <p>
      • React and Full Stack students have the highest hiring success.
    </p>

    <p>
      • Google and Microsoft drives generated most offers this month.
    </p>

    <p>
      • 24 students are predicted to receive offers within the next 30 days.
    </p>

  </div>

</div>
</div>
);
}