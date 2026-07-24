'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Pravin Kumar',
    role: 'Engineer',
    content: 'Java aur Python ki training industry-level thi. Projects ne meri understanding ko next level pe le gaya!',
    rating: 5,
  },
  {
    name: 'Pravin Kumar',
    role: 'Engineer',
    content: 'The 2D animation course was super creative. I learned real industry tools used by professionals',
    rating: 5,
  },
  {
    name: 'Anita Verma',
    role: 'Software Tester',
    content: 'Corporate sessions helped improve my soft skills and team communication. Very professional setup',
    rating: 5,
  },
  {
    name: 'Anshul Kumar',
    role: 'Engineer',
    content: 'Industrial training ne mujhe real-time projects pe kaam karna sikhaya. Confidence boost ho gaya',
    rating: 4,
  },
]

// Duplicate for seamless loop
const allTestimonials = [...testimonials, ...testimonials]

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      <div className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 15, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
          >
            <Quote className="h-4 w-4" />
            <span className="text-sm font-semibold">Student Success Stories</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What our learners have to say?
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Real feedback from our students who transformed their careers with Incrafto.
          </p>
        </motion.div>

        {/* Marquee container */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* First row - left to right */}
          <div className="flex gap-6 mb-6 animate-marquee hover:[animation-play-state:paused]">
            {allTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
            ))}
          </div>
          
          {/* Second row - right to left */}
          <div className="flex gap-6 [animation-direction:reverse] animate-marquee hover:[animation-play-state:paused]">
            {[...allTestimonials].reverse().map((testimonial, index) => (
              <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="flex-shrink-0 w-[350px] p-6 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300"
    >
      {/* Quote icon */}
      <Quote className="h-8 w-8 text-primary/20 mb-4" />
      
      {/* Content */}
      <p className="text-foreground/80 mb-6 line-clamp-3">
        {testimonial.content}
      </p>
      
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < testimonial.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-muted-foreground/30'
            }`}
          />
        ))}
      </div>
      
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-foreground">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  )
}
