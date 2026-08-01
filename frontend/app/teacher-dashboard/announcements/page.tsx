"use client";

import { motion } from "framer-motion";
import {
  Megaphone,
  Bell,
  Calendar,
  Users,
  Plus,
} from "lucide-react";

const announcements = [
  {
    title: "Placement Drive Registration",
    description:
      "Registration for upcoming placement drive is now open.",
    date: "24 June 2026",
    audience: "Final Year Students",
  },
  {
    title: "React Workshop",
    description:
      "Advanced React workshop scheduled for next week.",
    date: "28 June 2026",
    audience: "Web Development Batch",
  },
  {
    title: "Assignment Deadline",
    description:
      "All pending assignments must be submitted before Friday.",
    date: "26 June 2026",
    audience: "All Students",
  },
];

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-8">

      {/* Hero Section */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[36px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-10 text-white mb-8"
      >
        <h1 className="text-5xl font-black">
          Announcements
        </h1>

        <p className="text-xl text-blue-100 mt-4">
          Share important updates, notices and events with students.
        </p>

        <div className="flex gap-10 mt-8">

          <div>
            <p>Total Notices</p>
            <h2 className="text-4xl font-black">24</h2>
          </div>

          <div>
            <p>Active</p>
            <h2 className="text-4xl font-black">12</h2>
          </div>

          <div>
            <p>This Month</p>
            <h2 className="text-4xl font-black">8</h2>
          </div>

        </div>
      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        {[
          {
            title: "Announcements",
            value: "24",
            icon: Megaphone,
          },
          {
            title: "Students Reached",
            value: "178",
            icon: Users,
          },
          {
            title: "Active Notices",
            value: "12",
            icon: Bell,
          },
          {
            title: "Events",
            value: "5",
            icon: Calendar,
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

      {/* Action Buttons */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-medium">
          Create Announcement
        </button>

        <button className="bg-white py-4 rounded-2xl shadow-lg">
          Send Notification
        </button>

        <button className="bg-white py-4 rounded-2xl shadow-lg">
          View History
        </button>

      </div>

      {/* Announcement List */}

      <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

        <h2 className="text-3xl font-bold mb-8">
          Recent Announcements
        </h2>

        <div className="space-y-6">

          {announcements.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-3xl p-6 border"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mt-3">
                    {item.description}
                  </p>

                </div>

                <Plus />
              </div>

              <div className="flex gap-8 mt-6 text-gray-500">

                <span>{item.date}</span>

                <span>{item.audience}</span>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </div>
  );
}