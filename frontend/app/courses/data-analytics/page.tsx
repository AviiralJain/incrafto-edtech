
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CourseDetail } from '@/components/course-detail'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

const dataAnalyticsCourse = {
  title: 'Data Analytics',

  brochure: '/dataanalytics.pdf',

  description:
    'Learn Data Analytics with practical industry-focused training. Master Excel, SQL, Python, Power BI, visualization, reporting, and real-world business analytics projects.',

  overview:
    'The Data Analytics program by InCrafto equips learners with analytical and technical skills required to work with business data and generate actionable insights. Learn Excel, SQL, Python, Power BI, statistics, dashboards, reporting, and visualization techniques using practical project-based learning and real-world datasets.',

  syllabus: [
    {
      title: '1. Excel & Business Analytics',
      topics: [
        'Advanced Excel',
        'Pivot Tables & Charts',
        'Data Cleaning',
        'Business Reporting',
        'Dashboard Creation',
      ],
    },

    {
      title: '2. SQL & Database Management',
      topics: [
        'SQL Fundamentals',
        'Database Queries',
        'Joins & Relationships',
        'CRUD Operations',
        'Data Filtering & Aggregation',
      ],
    },

    {
      title: '3. Python for Data Analytics',
      topics: [
        'Python Fundamentals',
        'NumPy',
        'Pandas',
        'Data Manipulation',
        'Data Cleaning Techniques',
      ],
    },

    {
      title: '4. Data Visualization',
      topics: [
        'Power BI',
        'Interactive Dashboards',
        'Visualization Techniques',
        'Business Intelligence Reporting',
      ],
    },

    {
      title: '5. Statistics & Analytics',
      topics: [
        'Descriptive Statistics',
        'Probability Basics',
        'Trend Analysis',
        'Data Interpretation',
      ],
    },

    {
      title: '6. Industry Projects & Deployment',
      topics: [
        'Real-World Analytics Projects',
        'Sales & Marketing Analysis',
        'Business Case Studies',
        'Capstone Project',
        'Git & GitHub',
      ],
    },
  ],

  tools: [
    'Excel',
    'SQL',
    'Python',
    'Power BI',
    'NumPy',
    'Pandas',
    'GitHub',
    'Jupyter Notebook',
    'Git',
  ],

  features: [
    'Live Interactive Classes',
    'Weekly Assignments & Projects',
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

export default function DataAnalyticsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CourseDetail {...dataAnalyticsCourse} />
      <TestimonialsSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

