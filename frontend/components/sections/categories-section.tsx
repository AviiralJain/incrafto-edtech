'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Code, Database, BarChart3, Megaphone, Users, Building2, Cpu, Briefcase } from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    title: 'Full Stack Developer with AI',
    icon: Cpu,
    href: '/courses/fullstack-developer',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Java Full Stack Development',
    icon: Code,
    href: '/courses/java-fullstack',
    color: 'from-orange-500 to-amber-400',
  },
  {
    title: 'Python Full Stack Developer',
    icon: Code,
    href: '/courses/python-fullstack',
    color: 'from-green-500 to-emerald-400',
  },
  {
    title: 'Data Science',
    icon: Database,
    href: '/courses/data-science',
    color: 'from-purple-500 to-violet-400',
  },
  {
    title: 'Data Analytics',
    icon: BarChart3,
    href: '/courses/data-analytics',
    color: 'from-indigo-500 to-blue-400',
  },
  {
    title: 'Digital Marketing',
    icon: Megaphone,
    href: '/courses/digital-marketing',
    color: 'from-pink-500 to-rose-400',
  },
  {
    title: 'Human Resource Management',
    icon: Users,
    href: '/courses/hr-management',
    color: 'from-teal-500 to-cyan-400',
  },
  {
    title: 'Corporate Training',
    icon: Building2,
    href: '/courses/corporate-training',
    color: 'from-slate-400 to-gray-500',
  },
]

export function CategoriesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden bg-[#0F172A]">
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 mb-6"
          >
            <Briefcase className="h-4 w-4" />
            <span className="text-sm font-semibold">Project-Based Learning</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
            Explore Our High-Demand Categories
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            The most effective project-based immersive learning experience.
          </p>
        </motion.div>

        {/* Categories grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={category.href}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Gradient glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg shadow-${category.color}/20`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {category.title}
                  </h3>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-cyan-400 transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
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
