
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CourseDetail } from '@/components/course-detail'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

const hrManagementCourse = {
  title: 'Human Resource Management',

  description:
    'Learn Human Resource Management with practical industry-focused training. Master recruitment, employee management, HR operations, communication, payroll, and corporate workplace practices.',

  overview:
    'The Human Resource Management program by InCrafto equips learners with the practical skills required to manage recruitment, employee relations, organizational communication, payroll processes, HR operations, and workplace management. Learn modern HR practices, corporate communication, talent acquisition, and business professionalism through real-world case studies and practical training.',

  syllabus: [
    {
      title: '1. HR Fundamentals',
      topics: [
        'Introduction to Human Resource Management',
        'Roles & Responsibilities of HR',
        'Organizational Structure',
        'Workplace Ethics',
        'Corporate Communication',
      ],
    },

    {
      title: '2. Recruitment & Talent Acquisition',
      topics: [
        'Hiring Process',
        'Interview Coordination',
        'Resume Screening',
        'Talent Acquisition Strategies',
        'Job Portals & Recruitment Platforms',
      ],
    },

    {
      title: '3. Employee Management',
      topics: [
        'Employee Engagement',
        'Performance Management',
        'Conflict Resolution',
        'Workplace Policies',
        'Team Coordination',
      ],
    },

    {
      title: '4. Payroll & HR Operations',
      topics: [
        'Payroll Management',
        'Attendance & Leave Management',
        'HR Documentation',
        'Employee Records Management',
      ],
    },

    {
      title: '5. Business Communication & Soft Skills',
      topics: [
        'Professional Communication',
        'Email Writing',
        'Presentation Skills',
        'Corporate Etiquette',
        'Leadership Skills',
      ],
    },

    {
      title: '6. Practical Training & Industry Projects',
      topics: [
        'HR Case Studies',
        'Mock Interviews',
        'Corporate HR Projects',
        'Capstone Project',
      ],
    },
  ],

  tools: [
    'MS Excel',
    'Google Workspace',
    'LinkedIn',
    'Job Portals',
    'HRMS Basics',
    'Payroll Tools',
  ],

  features: [
    'Live Interactive Classes',
    'Weekly Assignments & Practical Projects',
    'Real-Time Doubt Support',
    'Resume & LinkedIn Optimization',
    'Interview Preparation',
    'Placement Assistance',
  ],

  certification: [
    'InCrafto Certificate of Completion',
    'HR Case Study Projects',
    'Interview Preparation Sessions',
    'Placement Assistance',
    'Career Support',
  ],
}

export default function HRManagementPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CourseDetail {...hrManagementCourse} />
      <TestimonialsSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

