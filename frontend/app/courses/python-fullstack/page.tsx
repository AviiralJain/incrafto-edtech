
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CourseDetail } from '@/components/course-detail'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

const pythonFullStackCourse = {
  title: 'Python Full Stack Developer',

  brochure: '/python.pdf',

  description:
    'Learn complete Python Full Stack Development with frontend, backend, databases, APIs, and deployment using practical projects and industry-focused training.',

  overview:
    'The Python Full Stack Developer program by InCrafto equips learners with frontend and backend development skills using Python technologies. Learn HTML, CSS, JavaScript, React.js, Core Python, Django, REST APIs, MySQL, GitHub, deployment, and real-world project development.',

  syllabus: [
    {
      title: '1. Frontend Development',
      topics: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'Responsive Web Design',
        'React.js Basics',
      ],
    },

    {
      title: '2. Python Programming',
      topics: [
        'Python Fundamentals',
        'Data Types & Operators',
        'Functions & Modules',
        'OOP Concepts',
        'Exception Handling',
        'File Handling',
      ],
    },

    {
      title: '3. Advanced Python',
      topics: [
        'Collections & Iterators',
        'Decorators',
        'Generators',
        'Regular Expressions',
        'Multithreading',
      ],
    },

    {
      title: '4. Django Framework',
      topics: [
        'Django Basics',
        'MVC Architecture',
        'Models, Views & Templates',
        'Authentication & Authorization',
        'REST API Development',
      ],
    },

    {
      title: '5. Database Management',
      topics: [
        'MySQL',
        'CRUD Operations',
        'Database Connectivity',
        'ORM Integration',
      ],
    },

    {
      title: '6. Deployment & Projects',
      topics: [
        'Git & GitHub',
        'Project Deployment',
        'Industry Projects',
        'Capstone Project',
      ],
    },
  ],

  tools: [
    'Python',
    'Django',
    'MySQL',
    'React.js',
    'GitHub',
    'REST APIs',
    'HTML5',
    'CSS3',
    'JavaScript',
    'Git',
  ],

  features: [
    'Live classes',
    'Weekly assignments & projects',
    'Doubt support',
    'Resume optimization',
    'Placement assistance',
  ],

  certification: [
    'InCrafto Certificate of Completion',
    'Interview Preparation',
    'Capstone Projects',
    'Placement Support',
  ],
}

export default function PythonFullStackPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CourseDetail {...pythonFullStackCourse} />
      <TestimonialsSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

