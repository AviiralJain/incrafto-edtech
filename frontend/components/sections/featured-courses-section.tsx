'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  Code,
  Database,
  BarChart3,
  Megaphone,
  Users,
  Building2,
} from 'lucide-react'
import Link from 'next/link'

const courses = [
  {
    title: 'Full Stack Developer with AI',
    icon: Code,
    href: '/courses/fullstack-developer',
    featured: true,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Java Full Stack Development',
    icon: Code,
    href: '/courses/java-fullstack',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Python Full Stack Developer',
    icon: Code,
    href: '/courses/python-fullstack',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Data Science',
    icon: Database,
    href: '/courses/data-science',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Digital Marketing',
    icon: Megaphone,
    href: '/courses/digital-marketing',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Data Analytics',
    icon: BarChart3,
    href: '/courses/data-analytics',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Human Resource Management',
    icon: Users,
    href: '/courses/hr-management',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    title: 'Corporate Training',
    icon: Building2,
    href: '/courses/corporate-training',
    gradient: 'from-slate-500 to-gray-600',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export function FeaturedCoursesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 15, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">
              Career-Focused Programs
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Featured Courses
          </h2>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg text-balance">
            Upgrade your skills with our career-focused courses in Technology,
            Animation, and Professional Training — from web development and
            Python to 2D/3D animation, VFX, and digital marketing.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {courses.map((course) => (
            <motion.div
              key={course.title}
              variants={itemVariants}
              className={`group ${
                course.featured
                  ? 'md:col-span-2 md:row-span-2'
                  : ''
              }`}
            >
              <Link href={course.href}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                  }}
                  className={`relative h-full min-h-[200px] ${
                    course.featured ? 'md:min-h-[420px]' : ''
                  } rounded-2xl bg-card/90 border border-border/60 overflow-hidden cursor-pointer shadow-sm transition-colors`}
                >
                  {/* Dark footer-color hover background */}
                  <div className="absolute inset-0 bg-[#0F172A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Clean border glow */}
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-cyan-500/20 -z-10" />

                  <div className="relative h-full p-6 flex flex-col">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <course.icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-semibold mb-2 group-hover:text-white transition-colors ${
                        course.featured
                          ? 'text-2xl lg:text-3xl'
                          : 'text-lg'
                      }`}
                    >
                      {course.title}
                    </h3>

                    {course.featured && (
                      <p className="text-muted-foreground group-hover:text-slate-300 mb-4 text-balance transition-colors">
                        Master the complete web development stack with
                        cutting-edge AI integration. Build scalable,
                        intelligent applications.
                      </p>
                    )}

                    {/* CTA */}
                    <div className="mt-auto flex items-center gap-2 text-primary group-hover:text-white font-medium transition-colors">
                      <span>View more</span>

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}