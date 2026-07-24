
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CourseDetail } from '@/components/course-detail'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

const javaFullStackCourse = {
  title: 'Java Full Stack Development',

  description:
    'Learn complete Java Full Stack Development with frontend, backend, databases, APIs, and deployment using real-world projects and industry-focused training.',

  overview:
    'The Java Full Stack Development program by InCrafto equips learners with complete frontend and backend development skills using Java technologies. Learn HTML, CSS, JavaScript, React.js, Core Java, Advanced Java, Spring Boot, REST APIs, MySQL, Hibernate, GitHub, deployment, and real-world project development.',

  syllabus: [
    {
      title: '1. Web Development Foundations',
      topics: [
        'Introduction to Web Development & the Internet',
        'HTML5 (Semantic Tags, Forms, Tables)',
        'CSS3 (Flexbox, Grid, Animations, Variables)',
        'Responsive Web Design',
        'Accessibility & SEO Best Practices',
      ],
    },

    {
      title: '2. Version Control & Collaboration',
      topics: [
        'Git Basics: Commit, Branch, Merge',
        'GitHub: Remote Repositories, Workflows',
        'Industry Collaboration Practices',
      ],
    },

    {
      title: '3. JavaScript Programming',
      topics: [
        'Core Concepts: Data Types, Functions, Arrays, Objects',
        'DOM Manipulation & Events',
        'Asynchronous JS: Promises, Async/Await',
      ],
    },
  ],

  tools: [
    'Java',
    'Spring Boot',
    'Hibernate',
    'MySQL',
    'React.js',
    'Tailwind CSS',
    'GitHub',
    'JWT',
    'REST APIs',
  ],

  features: [
    'Live classes',
    'Weekly assignments & real projects',
    'Doubt support on WhatsApp / Telegram',
    'Resume & LinkedIn optimization',
    'Placement Support Assistance',
  ],

  certification: [
    'InCrafto Certificate of Completion',
    'Job Assistance & Interview Preparation',
    'Live Doubt Sessions with Industry Experts',
    'Capstone & Case Study Projects',
    'Internship/Placement Opportunities',
  ],
}

export default function JavaFullStackPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CourseDetail {...javaFullStackCourse} />
      <TestimonialsSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

