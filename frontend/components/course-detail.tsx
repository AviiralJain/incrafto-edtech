'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, CheckCircle2, Download, Clock, Users, Award, Briefcase, BookOpen, Code, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EnquiryModal } from '@/components/modals/enquiry-modal'

interface SyllabusItem {
  title: string
  topics: string[]
}

interface CourseDetailProps {
  title: string
  description: string
  overview: string
  brochure?: string
  syllabus: SyllabusItem[]
  tools: string[]
  features: string[]
  certification: string[]
  demoVideos?: DemoVideo[]
}

interface DemoVideo {
  title: string
  description: string
  youtubeId: string
}

export function CourseDetail({
  title,
  description,
  overview,
  brochure,
  syllabus,
  tools,
  features,
  certification,
  demoVideos = [],
}: CourseDetailProps) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
  const [openSections, setOpenSections] = useState<number[]>([0])

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Left content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-sm font-semibold">Ai Based Program</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
                    {title}
                  </h1>

                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                    {description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        size="lg"
                        onClick={() => setIsEnquiryOpen(true)}
                        className="h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 glow"
                      >
                        <Play className="mr-2 h-5 w-5" />
                        Enroll Now
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
  <a href={brochure} download target="_blank">
    <Button
      size="lg"
      className="h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 glow"
    >
      <Download className="mr-2 h-5 w-5" />
      Download Brochure
    </Button>
  </a>
</motion.div>
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <QuickStat icon={Clock} label="Duration" value="6 Months" />
                    <QuickStat icon={Users} label="Batch Size" value="Limited" />
                    <QuickStat icon={Award} label="Certificate" value="Yes" />
                    <QuickStat icon={Briefcase} label="Placement" value="100%" />
                  </div>
                </motion.div>
              </div>

              {/* Right sidebar - Enquiry form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-[380px] sticky top-24"
              >
                <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-xl">
                  <h3 className="text-xl font-bold mb-4">Quick Enquiry</h3>
                  <QuickEnquiryForm courseTitle={title} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Course Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    Course Overview
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {overview}
                  </p>
                </motion.div>

                {/* What You Get */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    What You Get
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Demo Videos */}
{demoVideos.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Play className="h-5 w-5 text-primary" />
      </div>
      Course Demo Videos
    </h2>

    <p className="text-muted-foreground mb-6">
      Explore sample lessons and project demonstrations from this course.
    </p>

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {demoVideos.map((video, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -5 }}
          className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg"
        >
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              allowFullScreen
            />
          </div>

          <div className="p-4">
            <h3 className="font-semibold mb-2">
              {video.title}
            </h3>

            <p className="text-sm text-muted-foreground">
              {video.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}

                {/* Course Syllabus */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    Course Syllabus
                  </h2>
                  <div className="space-y-4">
                    {syllabus.map((section, index) => (
                      <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="border border-border/50 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleSection(index)}
                          className="w-full flex items-center justify-between p-4 bg-card hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <span className="font-semibold text-left">{section.title}</span>
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              openSections.includes(index) ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openSections.includes(index) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <ul className="p-4 space-y-2 bg-secondary/30">
                                {section.topics.map((topic) => (
                                  <li
                                    key={topic}
                                    className="flex items-start gap-3 text-muted-foreground"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span>{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Certification */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    Certification & Career Support
                  </h2>
                  <div className="space-y-3">
                    {certification.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 text-green-700"
                      >
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Tools */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Tools You Will Master</h2>
                  <div className="flex flex-wrap gap-3">
                    {tools.map((tool, index) => (
                      <motion.span
                        key={tool}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 rounded-full bg-secondary text-sm font-medium"
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right sidebar - Sticky placement support */}
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="p-6 rounded-2xl bg-card border border-border/50"
                  >
                    <h3 className="text-xl font-bold mb-4">Placement Support</h3>
                    <p className="text-muted-foreground mb-4">
                      Mock interviews, resume help, referrals, and tie-ups with hiring partners. You focus on learning — we take care of your placement.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Mock Interviews
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Resume Optimization
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Hiring Partner Network
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="p-6 rounded-2xl bg-primary/10 border border-primary/20"
                  >
                    <h3 className="text-xl font-bold mb-4">Learn from Mentors Who&apos;ve Done It</h3>
                    <p className="text-muted-foreground">
                      Our instructors are industry professionals working in top companies, not just teachers.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <EnquiryModal open={isEnquiryOpen} onOpenChange={setIsEnquiryOpen} />
    </>
  )
}

function QuickStat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border/50">
      <Icon className="h-5 w-5 text-primary mb-2" />
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  )
}

function QuickEnquiryForm({ courseTitle }: { courseTitle: string }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: courseTitle,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('[v0] Form submitted:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Full Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
          className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Phone Number</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone"
          className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Course Interested In</label>
        <input
          type="text"
          value={formData.course}
          readOnly
          className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border/50 text-muted-foreground"
        />
      </div>
      <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 font-semibold">
        Enquire Now
      </Button>
    </form>
  )
}
