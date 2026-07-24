
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CourseDetail } from '@/components/course-detail'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

const corporateTrainingCourse = {
  title: 'Corporate Training',

  description:
    'Enhance professional skills with industry-focused Corporate Training programs designed to improve communication, leadership, productivity, teamwork, and workplace efficiency.',

  overview:
    'The Corporate Training program by InCrafto equips students and working professionals with practical corporate skills required in modern workplaces. Learn professional communication, leadership, business etiquette, teamwork, presentation skills, workplace management, productivity enhancement, and industry-ready soft skills through practical sessions, corporate case studies, and real-world activities.',

  syllabus: [
    {
      title: '1. Professional Communication',
      topics: [
        'Corporate Communication Skills',
        'Professional Email Writing',
        'Verbal & Non-Verbal Communication',
        'Business Presentation Skills',
        'Public Speaking',
      ],
    },

    {
      title: '2. Soft Skills Development',
      topics: [
        'Personality Development',
        'Confidence Building',
        'Interpersonal Skills',
        'Time Management',
        'Problem Solving Skills',
      ],
    },

    {
      title: '3. Leadership & Team Management',
      topics: [
        'Leadership Skills',
        'Team Coordination',
        'Conflict Resolution',
        'Decision Making',
        'Workplace Collaboration',
      ],
    },

    {
      title: '4. Corporate Workplace Training',
      topics: [
        'Corporate Etiquette',
        'Workplace Ethics',
        'Professional Behavior',
        'Office Productivity',
        'Business Environment Understanding',
      ],
    },

    {
      title: '5. Interview & Career Preparation',
      topics: [
        'Resume Building',
        'LinkedIn Optimization',
        'Mock Interviews',
        'HR Interview Preparation',
        'Group Discussions',
      ],
    },

    {
      title: '6. Practical Sessions & Industry Activities',
      topics: [
        'Corporate Case Studies',
        'Real-Time Activities',
        'Industry Interaction Sessions',
        'Capstone Activities',
      ],
    },
  ],

  tools: [
    'MS Excel',
    'Google Workspace',
    'LinkedIn',
    'Presentation Tools',
    'Business Communication Tools',
  ],

  features: [
    'Live Interactive Sessions',
    'Practical Corporate Activities',
    'Weekly Assignments',
    'Real-Time Doubt Support',
    'Resume & LinkedIn Optimization',
    'Interview Preparation',
    'Placement Assistance',
  ],

  certification: [
    'InCrafto Certificate of Completion',
    'Corporate Training Projects',
    'Interview Preparation Sessions',
    'Placement Assistance',
    'Career Support',
  ],
}

export default function CorporateTrainingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CourseDetail {...corporateTrainingCourse} />
      <TestimonialsSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

