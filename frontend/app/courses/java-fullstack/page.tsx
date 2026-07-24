
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CourseDetail } from '@/components/course-detail'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

const javaFullStackCourse = {
  title: 'Java Full Stack Development',
  
  brochure: '/java.pdf',

  description:
    'Learn Java Full Stack Development with practical industry-focused training. Master frontend, backend, databases, APIs, Spring Boot, and real-world application development.',

  overview:
    'The Java Full Stack Development program by InCrafto equips learners with frontend and backend development skills using modern Java technologies. Learn HTML, CSS, JavaScript, React.js, Core Java, Advanced Java, Spring Boot, REST APIs, MySQL, Hibernate, deployment, and real-world project development using practical learning approaches and industry-focused training.',

  syllabus: [
    {
      title: '1. Frontend Development',
      topics: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'Responsive Web Design',
        'React.js Fundamentals',
        'Frontend UI Development',
      ],
    },

    {
      title: '2. Core Java',
      topics: [
        'Java Fundamentals',
        'OOP Concepts',
        'Exception Handling',
        'Collections Framework',
        'File Handling',
        'Multithreading',
      ],
    },

    {
      title: '3. Advanced Java',
      topics: [
        'JDBC',
        'Servlets',
        'JSP',
        'MVC Architecture',
        'Session Management',
      ],
    },

    {
      title: '4. Spring Boot Backend Development',
      topics: [
        'Spring Core',
        'Spring Boot',
        'REST API Development',
        'Authentication & Authorization',
        'JWT Security',
      ],
    },

    {
      title: '5. Database Management',
      topics: [
        'MySQL',
        'Hibernate ORM',
        'CRUD Operations',
        'Database Connectivity',
      ],
    },

    {
      title: '6. Deployment & Industry Projects',
      topics: [
        'Git & GitHub',
        'Project Deployment',
        'Real-World Java Projects',
        'Capstone Project',
      ],
    },
  ],

  tools: [
    'Java',
    'Spring Boot',
    'Hibernate',
    'MySQL',
    'React.js',
    'GitHub',
    'REST APIs',
    'HTML5',
    'CSS3',
    'JavaScript',
    'JWT',
    'Git',
  ],

  features: [
    'Live Interactive Classes',
    'Weekly Assignments & Real Projects',
    'Real-Time Doubt Support',
    'Resume & LinkedIn Optimization',
    'Interview Preparation',
    'Placement Assistance',
  ],

  certification: [
    'InCrafto Certificate of Completion',
    'Industry-Level Capstone Projects',
    'Interview Preparation Sessions',
    'Placement Assistance',
    'Career Support',
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

