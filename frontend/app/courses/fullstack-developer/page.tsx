import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CourseDetail } from '@/components/course-detail'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

const fullStackCourse = {
  title: 'Full Stack Development with AI',
  brochure: '/fullstack.pdf',
  description: 'Learn the essentials of Full Stack Web Development with an engaging, practical learning approach. Engage in project-based learning and benefit from qualified instructors.',
  overview: 'The Full Stack Development with AI program by InCrafto equips learners with end-to-end web development skills. You will master frontend and backend technologies like HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, MySQL, along with AI integration using modern tools, enabling you to build scalable, responsive, and intelligent applications.',
  syllabus: [
    {
      title: 'Web Development Foundations',
      topics: [
        'Introduction to Web Development & the Internet',
        'HTML5 (Semantic Tags, Forms, Tables)',
        'CSS3 (Flexbox, Grid, Animations, Variables)',
        'Responsive Web Design',
        'Accessibility & SEO Best Practices',
      ],
    },
    {
      title: 'Version Control & Collaboration',
      topics: [
        'Git Basics: Commit, Branch, Merge',
        'GitHub: Remote Repositories, Workflows',
        'Industry Collaboration Practices',
      ],
    },
    {
      title: 'JavaScript Programming',
      topics: [
        'Core Concepts: Data Types, Functions, Arrays, Objects',
        'DOM Manipulation & Events',
        'Asynchronous JS: Promises, Async/Await',
        'Storage APIs & Memory Optimization',
      ],
    },
    {
      title: 'React.js Frontend Development',
      topics: [
        'React Fundamentals: Components, Props, State, Hooks',
        'React Router & Navigation',
        'Redux for State Management',
        'Styling with Tailwind CSS',
        'Form Handling, Validation, Responsive UI',
        'Real Projects: RecipeStack, Kanban Board',
      ],
    },
    {
      title: 'Backend Development: Node.js & Express',
      topics: [
        'Node.js: CLI, File Handling, Web Servers',
        'Express.js: Routing, Middleware, Authentication (Passport.js)',
        'MVC Architecture',
        'REST API Development',
        'Templating with Pug',
        'MongoDB with Mongoose ODM',
        'MySQL with Sequelize ORM',
        'Deployment using Render & MongoDB Atlas',
      ],
    },
    {
      title: 'AI-Powered Development',
      topics: [
        'AI Tools Setup for Web Development',
        'Writing Effective Prompts',
        'HTML/CSS/JS Generation using AI',
        'AI-Assisted Database Query Writing',
        'AI in React & Express Development',
        'AI-Powered Full Stack Project Development',
      ],
    },
    {
      title: 'Advanced Topics',
      topics: [
        'Using Next.js for SSR & Routing',
        'Component Optimization',
        'Lazy Loading & Suspense',
        'Authentication: OAuth, Magic Link, Google Auth',
        'Security, Error Handling, and Advanced Patterns',
      ],
    },
    {
      title: 'Capstone & Industry Projects',
      topics: [
        'School/College Event Management System',
        'RecipeStack: Multi-page App with Auth',
        'Gmail & OYO UI Clones with Tailwind',
        'Language Translator with Google Translate API',
        'AI-Powered Full Stack Capstone Project',
      ],
    },
  ],
  tools: [
    'React.js', 'Redux', 'Tailwind CSS', 'GitHub', 'Node.js', 'Express',
    'MongoDB', 'Mongoose', 'MySQL', 'Sequelize', 'Pug', 'Passport.js',
    'JWT', 'Next.js', 'Docker', 'OpenAI APIs', 'Render', 'Git',
  ],
  features: [
    'Live classes',
    'Weekly assignments & real projects',
    'Doubt support on WhatsApp / Telegram',
    'Resume & LinkedIn optimization',
    'Placement Support Assistance',
  ],
  demoVideos: [
  {
    title: 'Frontend Development with React',
    description: 'Learn React, Tailwind CSS, routing, state management, and responsive UI development.',
    youtubeId: 'Vi9bxu-M-ag',
  },
  {
    title: 'Backend Development with Node.js',
    description: 'Build REST APIs, authentication systems, and databases using Express, MongoDB, and MySQL.',
    youtubeId: 'aRUhd1Wd3Sw',
  },
  {
    title: 'AI-Powered Full Stack Projects',
    description: 'Create intelligent applications using React, Node.js, databases, and AI tools.',
    youtubeId: 'ofHYRdWQESo',
  },
],
  certification: [
    'InCrafto Certificate of Completion',
    'Job Assistance & Interview Preparation',
    'Live Doubt Sessions with Industry Experts',
    'Capstone & Case Study Projects',
    'Internship/Placement Opportunities',
  ],
}

export default function FullStackDeveloperPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CourseDetail {...fullStackCourse} />
      <TestimonialsSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
