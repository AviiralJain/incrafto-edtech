'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Award, TrendingUp, Building2, Briefcase } from 'lucide-react'

const placements = [
  {
    name: 'Fanish Chandra',
    role: 'Software Developer',
    package: '17 LPA',
    company: 'Ltimindtree',
    image: '/placements/fanish.png',
  },
  {
    name: 'Bhupendra Tripathi',
    role: 'Software Developer',
    package: '8.5 LPA',
    company: 'Accenture',
    image: '/placements/bhupendra.png',
  },
  {
    name: 'Shivam Arora',
    role: 'Software Engineer',
    package: '8 LPA',
    company: 'Motherson technology and services ltd',
    image: '/placements/shivam.png',
  },
]

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = target / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export function PlacementsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
          >
            <Award className="h-4 w-4" />
            <span className="text-sm font-semibold">Career Success</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Best placements offered
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            We provide best career guidance along with appropriate placements.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <StatCard
            icon={TrendingUp}
            value={<AnimatedCounter target={17} suffix="+ LPA" />}
            label="Highest Package"
          />
          <StatCard
            icon={Building2}
            value={<AnimatedCounter target={500} suffix="+" />}
            label="Hiring Partners"
          />
          <StatCard
            icon={Award}
            value={<AnimatedCounter target={95} suffix="%" />}
            label="Placement Rate"
          />
          <StatCard
            icon={Briefcase}
            value={<AnimatedCounter target={17350} suffix="+" />}
            label="Students Placed"
          />
        </motion.div>

        {/* Placement cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
  {placements.map((placement, index) => (
    <motion.div
      key={placement.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="relative pt-20 pb-8 px-8 rounded-3xl bg-[#0F172A] border border-slate-700 text-white shadow-xl hover:shadow-2xl hover:border-cyan-500/40 transition-all duration-300 overflow-visible min-h-[340px]"      >
        {/* Image */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2">
          <img
            src={placement.image}
            alt={placement.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-orange-500 bg-white shadow-xl"
          />
        </div>

        {/* Name */}
        <div className="text-center mb-5 mt-4">
          <h3 className="text-3xl font-bold">
            {placement.name}
          </h3>

          <p className="mt-2 text-white/90 text-lg">
            Job Profile : {placement.role}
          </p>
        </div>

        {/* Package */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-green-600 font-bold text-lg shadow-md">
            <TrendingUp className="h-5 w-5" />
            Package : {placement.package}
          </div>
        </div>

        {/* Company */}
        <div className="flex items-start gap-3 text-white">
          <Building2 className="h-5 w-5 mt-1 flex-shrink-0" />
          <span className="text-lg">
            Company : {placement.company}
          </span>
        </div>
      </motion.div>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  )
}

function StatCard({ icon: Icon, value, label }: { icon: React.ElementType; value: React.ReactNode; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-2xl bg-card border border-border/50 text-center"
    >
      <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}
