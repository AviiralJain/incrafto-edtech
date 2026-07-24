"use client";

import { motion } from "framer-motion";
import {
  Award,
  Users,
  CheckCircle,
  Download,
  FileBadge,
  Star,
} from "lucide-react";

const certificates = [
  {
    student: "Harshita Singh",
    course: "Full Stack Development",
    issueDate: "20 June 2026",
    score: "94%",
    status: "Issued",
  },
  {
    student: "Aviral Jain",
    course: "Data Analytics",
    issueDate: "18 June 2026",
    score: "91%",
    status: "Issued",
  },
  {
    student: "Priya Sharma",
    course: "Python Programming",
    issueDate: "22 June 2026",
    score: "97%",
    status: "Pending Verification",
  },
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-8">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[36px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-10 text-white mb-8"
      >
        <h1 className="text-5xl font-black">
          Certificate Management
        </h1>

        <p className="text-xl text-blue-100 mt-4">
          Generate, verify and manage student certificates.
        </p>

        <div className="flex gap-10 mt-8">

          <div>
            <p>Total Certificates</p>
            <h2 className="text-4xl font-black">
              112
            </h2>
          </div>

          <div>
            <p>Issued</p>
            <h2 className="text-4xl font-black">
              98
            </h2>
          </div>

          <div>
            <p>Pending</p>
            <h2 className="text-4xl font-black">
              14
            </h2>
          </div>

        </div>

      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        {[
          {
            title: "Certificates",
            value: "112",
            icon: Award,
          },
          {
            title: "Issued",
            value: "98",
            icon: CheckCircle,
          },
          {
            title: "Students",
            value: "178",
            icon: Users,
          },
          {
            title: "Verified",
            value: "95%",
            icon: Star,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          >
            <item.icon size={28} />

            <h3 className="mt-4 text-gray-500">
              {item.title}
            </h3>

            <p className="text-4xl font-black">
              {item.value}
            </p>

          </div>
        ))}

      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl">
          Generate Certificate
        </button>

        <button className="bg-white py-4 rounded-2xl shadow">
          Bulk Generate
        </button>

        <button className="bg-white py-4 rounded-2xl shadow">
          Verify Certificate
        </button>

        <button className="bg-white py-4 rounded-2xl shadow">
          Download Reports
        </button>

      </div>

      {/* Certificates */}

      <div className="space-y-6">

        {certificates.map((certificate, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.01 }}
            className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold">
                  {certificate.student}
                </h2>

                <p className="text-gray-500 mt-2">
                  {certificate.course}
                </p>

              </div>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">
                {certificate.status}
              </span>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">

              <div>

                <p className="text-gray-500">
                  Issue Date
                </p>

                <h3 className="text-xl font-bold">
                  {certificate.issueDate}
                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Final Score
                </p>

                <h3 className="text-xl font-bold">
                  {certificate.score}
                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Certificate ID
                </p>

                <h3 className="text-xl font-bold">
                  INC-{1000 + index}
                </h3>

              </div>

            </div>

            <div className="flex gap-4 mt-6">

              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl">
                View Certificate
              </button>

              <button className="border px-5 py-3 rounded-xl flex items-center gap-2">
                <Download size={16} />
                Download
              </button>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}