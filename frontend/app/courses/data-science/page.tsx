
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CourseDetail } from '@/components/course-detail'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

const dataScienceCourse = {
  title: 'Data Science',

  brochure: '/datascience.pdf',

  description:
    'Learn Data Science with practical industry-focused training. Master Python, Machine Learning, Data Analytics, AI tools, and real-world projects with expert mentorship.',

  overview:
    'The Data Science program by InCrafto equips learners with the technical and analytical skills required to work with real-world data and AI-powered technologies. Learn Python programming, data analysis, visualization, statistics, machine learning, and predictive modeling using modern industry tools and practical project-based learning.',

  syllabus: [
    {
      title: '1. Python Programming',
      topics: [
        'Python Fundamentals',
        'Variables, Data Types & Operators',
        'Functions & Modules',
        'Object-Oriented Programming',
        'Exception Handling',
        'File Handling',
      ],
    },

    {
      title: '2. Data Analysis & Visualization',
      topics: [
        'NumPy',
        'Pandas',
        'Data Cleaning Techniques',
        'Exploratory Data Analysis',
        'Matplotlib',
        'Seaborn',
      ],
    },

    {
      title: '3. Statistics & Mathematics',
      topics: [
        'Descriptive Statistics',
        'Probability Concepts',
        'Data Distribution',
        'Hypothesis Testing',
        'Linear Algebra Basics',
      ],
    },

    {
      title: '4. Machine Learning',
      topics: [
        'Supervised Learning',
        'Unsupervised Learning',
        'Regression Algorithms',
        'Classification Models',
        'Clustering Techniques',
        'Model Evaluation',
      ],
    },

    {
      title: '5. Artificial Intelligence',
      topics: [
        'AI Fundamentals',
        'Deep Learning Basics',
        'Neural Networks Introduction',
        'AI-Powered Workflows',
      ],
    },

    {
      title: '6. Database Management',
      topics: [
        'SQL Fundamentals',
        'Database Connectivity',
        'CRUD Operations',
        'Data Warehousing Basics',
      ],
    },

    {
      title: '7. Industry Projects & Deployment',
      topics: [
        'Real-World Data Science Projects',
        'Capstone Project',
        'Git & GitHub',
        'Project Deployment',
      ],
    },
  ],

  tools: [
    'Python',
    'NumPy',
    'Pandas',
    'Matplotlib',
    'Seaborn',
    'Scikit-learn',
    'Jupyter Notebook',
    'SQL',
    'TensorFlow',
    'GitHub',
    'Git',
  ],

  features: [
    'Live Interactive Classes',
    'Weekly Assignments & Industry Projects',
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

export default function DataSciencePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CourseDetail {...dataScienceCourse} />
      <TestimonialsSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

