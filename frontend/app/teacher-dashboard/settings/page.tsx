"use client";

import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Lock,
  Moon,
  Globe,
  Smartphone,
  Key,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-8">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[40px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-10 text-white mb-8"
      >
        <h1 className="text-5xl font-black">
          Settings & Preferences
        </h1>

        <p className="text-xl text-indigo-100 mt-4">
          Manage your profile, security, notifications and teaching preferences.
        </p>
      </motion.div>

      {/* Profile Card */}

      <div className="grid lg:grid-cols-3 gap-8 mb-8">

        <div className="lg:col-span-1 bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
              RS
            </div>

            <h2 className="text-2xl font-bold mt-5">
              Rahul Sharma
            </h2>

            <p className="text-gray-500">
              Senior Full Stack Instructor
            </p>

            <button className="mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl">
              Upload Photo
            </button>

          </div>

        </div>

        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-6">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              placeholder="Full Name"
              defaultValue="Rahul Sharma"
              className="p-4 rounded-2xl border"
            />

            <input
              placeholder="Email"
              defaultValue="rahul@incrafto.com"
              className="p-4 rounded-2xl border"
            />

            <input
              placeholder="Phone Number"
              defaultValue="+91 9876543210"
              className="p-4 rounded-2xl border"
            />

            <input
              placeholder="Department"
              defaultValue="Computer Science"
              className="p-4 rounded-2xl border"
            />

          </div>

        </div>

      </div>

      {/* Settings Grid */}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        {/* Notifications */}

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <div className="flex items-center gap-3 mb-6">
            <Bell />
            <h2 className="text-2xl font-bold">
              Notifications
            </h2>
          </div>

          <div className="space-y-4">

            <label className="flex justify-between">
              Assignment Alerts
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between">
              Placement Updates
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between">
              Student Messages
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between">
              Attendance Alerts
              <input type="checkbox" />
            </label>

          </div>

        </div>

        {/* Security */}

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <div className="flex items-center gap-3 mb-6">
            <Shield />
            <h2 className="text-2xl font-bold">
              Security
            </h2>
          </div>

          <div className="space-y-4">

            <button className="w-full border p-4 rounded-2xl text-left">
              Change Password
            </button>

            <button className="w-full border p-4 rounded-2xl text-left">
              Two-Factor Authentication
            </button>

            <button className="w-full border p-4 rounded-2xl text-left">
              Login Activity
            </button>

          </div>

        </div>

      </div>

      {/* Preferences */}

      <div className="grid lg:grid-cols-3 gap-8 mb-8">

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <Moon className="mb-4" />

          <h3 className="text-xl font-bold">
            Appearance
          </h3>

          <p className="text-gray-500 mt-2">
            Dark mode and dashboard themes.
          </p>

        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <Globe className="mb-4" />

          <h3 className="text-xl font-bold">
            Language
          </h3>

          <p className="text-gray-500 mt-2">
            English (India)
          </p>

        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">

          <Smartphone className="mb-4" />

          <h3 className="text-xl font-bold">
            Devices
          </h3>

          <p className="text-gray-500 mt-2">
            3 active devices connected.
          </p>

        </div>

      </div>

      {/* API & Integrations */}

      <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl mb-8">

        <div className="flex items-center gap-3 mb-6">
          <Key />
          <h2 className="text-3xl font-bold">
            Connected Services
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="border rounded-2xl p-5">
            Google Meet
          </div>

          <div className="border rounded-2xl p-5">
            Zoom
          </div>

          <div className="border rounded-2xl p-5">
            Microsoft Teams
          </div>

        </div>

      </div>

      {/* Save Button */}

      <div className="flex justify-end">

        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </button>

      </div>

    </div>
  );
}