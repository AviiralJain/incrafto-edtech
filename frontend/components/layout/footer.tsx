
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowUpRight,
} from 'lucide-react'

const footerLinks = {
  courses: [
    {
      label: 'Full Stack Developer with AI',
      href: '/courses/fullstack-developer',
    },
    {
      label: 'Java Full Stack Development',
      href: '/courses/java-fullstack',
    },
    {
      label: 'Python Full Stack Developer',
      href: '/courses/python-fullstack',
    },
    {
      label: 'Data Science',
      href: '/courses/data-science',
    },
    {
      label: 'Digital Marketing',
      href: '/courses/digital-marketing',
    },
  ],

  company: [
    {
      label: 'About Us',
      href: '/about',
    },
    {
      label: 'Placements',
      href: '/placements',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
    {
      label: 'Login',
      href: '/login',
    },
  ],

  resources: [
    {
      label: 'Blog',
      href: '#',
    },
    {
      label: 'FAQs',
      href: '#',
    },
    {
      label: 'Privacy Policy',
      href: '#',
    },
    {
      label: 'Terms of Service',
      href: '#',
    },
  ],
}

const socialLinks = [
  {
    icon: Facebook,
    href: 'https://www.facebook.com/incrafto',
    label: 'Facebook',
  },
  {
    icon: Twitter,
    href: '#',
    label: 'Twitter',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/incraftoindia/',
    label: 'LinkedIn',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/incraftoindia/',
    label: 'Instagram',
  },
  {
    icon: Youtube,
    href: 'https://www.youtube.com/@incraftoindia',
    label: 'YouTube',
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0F172A] text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

      {/* Top border */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="relative z-10">

        {/* Main content */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">

            {/* Brand */}
            <div className="lg:col-span-2">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >

                {/* Logo + Name */}
                <Link
                  href="/"
                  className="mb-6 flex items-center gap-3"
                >

                  <Image
                    src="/logo.png"
                    alt="InCrafto Logo"
                    width={45}
                    height={45}
                    className="h-11 w-auto object-contain"
                  />

                  <span className="text-3xl font-bold gradient-text">
                    InCrafto
                  </span>

                </Link>

                {/* Description */}
                <p className="mb-6 max-w-sm text-slate-400">
                  Empowering Innovation. Fueling Growth.
                  Transform your career with India&apos;s
                  most awarded EdTech training company.
                </p>

                {/* Contact */}
                <div className="space-y-3">

                  <a
                    href="mailto:info@incrafto.in"
                    className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-cyan-400"
                  >
                    <Mail className="h-5 w-5" />
                    <span>info@incrafto.in</span>
                  </a>

                  <a
                    href="tel:9211567120"
                    className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-cyan-400"
                  >
                    <Phone className="h-5 w-5" />
                    <span>9211567120</span>
                  </a>

                  <div className="flex items-start gap-3 text-slate-400">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>India</span>
                  </div>

                </div>

                {/* Social */}
                <div className="mt-6 flex gap-4">

                  {socialLinks.map((social) => (

                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-cyan-500/30 hover:bg-white/10"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5 text-slate-400" />
                    </motion.a>

                  ))}

                </div>

              </motion.div>

            </div>

            {/* Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
            >

              <h3 className="mb-6 text-lg font-semibold">
                Courses
              </h3>

              <ul className="space-y-3">

                {footerLinks.courses.map((link) => (

                  <li key={link.label}>

                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-slate-400 transition-colors hover:text-cyan-400"
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight className="h-3 w-3 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>

                  </li>

                ))}

              </ul>

            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
            >

              <h3 className="mb-6 text-lg font-semibold">
                Company
              </h3>

              <ul className="space-y-3">

                {footerLinks.company.map((link) => (

                  <li key={link.label}>

                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-slate-400 transition-colors hover:text-cyan-400"
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight className="h-3 w-3 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>

                  </li>

                ))}

              </ul>

            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
            >

              <h3 className="mb-6 text-lg font-semibold">
                Resources
              </h3>

              <ul className="space-y-3">

                {footerLinks.resources.map((link) => (

                  <li key={link.label}>

                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-slate-400 transition-colors hover:text-cyan-400"
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight className="h-3 w-3 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>

                  </li>

                ))}

              </ul>

            </motion.div>

          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">

            <p>
              &copy; {new Date().getFullYear()} Incrafto.
              All rights reserved.
            </p>

            <div className="flex items-center gap-6">

              <Link
                href="#"
                className="transition-colors hover:text-cyan-400"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="transition-colors hover:text-cyan-400"
              >
                Terms of Service
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  )
}

