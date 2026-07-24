'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Eye, CheckCircle2, Zap, Globe, Clock, Award, Users } from 'lucide-react'

const features = [
  { icon: Clock, text: '10+ Years of Industry Mastery' },
  { icon: Globe, text: '500+ Global Clients Across 20+ Industries' },
  { icon: Users, text: '11,000+ Man-Days of Training Delivered' },
  { icon: Award, text: "India's Most Awarded EdTech Training Company" },
  { icon: Zap, text: 'Tailor-Made Learning Paths Designed for Maximum ROI' },
  { icon: CheckCircle2, text: 'Live Online + 24/7 On-Demand Support' },
  { icon: Target, text: 'Measurable Outcomes, Real Business Impact' },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-background text-foreground">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: 'spring', damping: 15, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/70 text-primary mb-6 shadow-sm"
            >
              <Zap className="h-4 w-4" />
              <span className="text-sm font-semibold">Craft Your Career</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About Incrafto
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Empowering Innovation. Fueling Growth.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              At Incrafto, we don&apos;t just train—we transform. With over a decade of expertise in professional training and development, we are a next-generation EdTech powerhouse that empowers individuals and organizations to thrive in an ever-evolving digital world.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether it&apos;s cutting-edge IT skills, future-ready digital marketing, strategic leadership, or business excellence, our customized corporate training solutions are designed to unlock potential, drive performance, and accelerate growth.
            </p>

            <p className="text-xl font-semibold text-primary">
              We deliver results—not just certifications.
            </p>
          </motion.div>

          {/* Right content - Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Mission Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-6 rounded-2xl bg-card/80 border border-border/70 backdrop-blur-sm shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
              </div>
              <p className="text-muted-foreground">
                To bridge the gap between knowledge and execution by providing customized, high-impact training programs that enhance capabilities and build future-ready professionals and businesses.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-6 rounded-2xl bg-card/80 border border-border/70 backdrop-blur-sm shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Our Vision</h3>
              </div>
              <p className="text-muted-foreground">
                To be the most trusted and results-driven corporate learning partner globally, shaping the workforce of tomorrow through innovation, technology, and excellence.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Why Top Brands Trust Incrafto */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
            Why Top Brands Trust Incrafto
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/80 border border-border/70 hover:border-primary/30 transition-colors shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="text-sm text-muted-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
