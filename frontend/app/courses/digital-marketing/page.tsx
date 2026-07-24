
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CourseDetail } from '@/components/course-detail'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

const digitalMarketingCourse = {
  title: 'Digital Marketing',

  brochure: '/digitalmarketing.pdf',

  description:
    'Master Digital Marketing with SEO, Social Media Marketing, Google Ads, Meta Ads, content strategy, branding, analytics, and AI-powered marketing tools through practical industry-focused training.',

  overview:
    'The Digital Marketing program by InCrafto equips learners with practical knowledge of modern digital marketing strategies, branding, advertising, analytics, and AI-powered marketing workflows. Learn SEO, Social Media Marketing, Google Ads, Meta Ads, content creation, email marketing, performance marketing, and campaign optimization through real-world projects and hands-on training.',

  syllabus: [
    {
      title: '1. Digital Marketing Fundamentals',
      topics: [
        'Introduction to Digital Marketing',
        'Branding & Online Presence',
        'Marketing Funnels',
        'Consumer Behavior',
        'Digital Marketing Strategy',
      ],
    },

    {
      title: '2. Search Engine Optimization (SEO)',
      topics: [
        'On-Page SEO',
        'Off-Page SEO',
        'Technical SEO',
        'Keyword Research',
        'Website Optimization',
        'SEO Tools & Analytics',
      ],
    },

    {
      title: '3. Social Media Marketing',
      topics: [
        'Instagram Marketing',
        'Facebook Marketing',
        'LinkedIn Marketing',
        'Content Planning',
        'Audience Engagement',
        'Social Media Strategy',
      ],
    },

    {
      title: '4. Performance Marketing',
      topics: [
        'Google Ads',
        'Meta Ads',
        'Campaign Optimization',
        'Lead Generation',
        'Conversion Tracking',
      ],
    },

    {
      title: '5. Content & Email Marketing',
      topics: [
        'Content Creation Strategy',
        'Copywriting Basics',
        'Email Marketing Campaigns',
        'Marketing Automation',
      ],
    },

    {
      title: '6. Analytics & AI Tools',
      topics: [
        'Google Analytics',
        'Performance Tracking',
        'Marketing Reports',
        'AI-Powered Marketing Tools',
        'AI Content Workflows',
      ],
    },

    {
      title: '7. Industry Projects & Practical Training',
      topics: [
        'Real-World Marketing Campaigns',
        'Business Branding Projects',
        'Live Campaign Analysis',
        'Capstone Project',
      ],
    },
  ],

  tools: [
    'Google Ads',
    'Meta Ads Manager',
    'Google Analytics',
    'Canva',
    'SEMrush',
    'ChatGPT',
    'WordPress',
    'Mailchimp',
    'Instagram',
    'Facebook',
    'LinkedIn',
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
    'Industry-Level Marketing Projects',
    'Interview Preparation Sessions',
    'Placement Assistance',
    'Career Support',
  ],
}

export default function DigitalMarketingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CourseDetail {...digitalMarketingCourse} />
      <TestimonialsSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

