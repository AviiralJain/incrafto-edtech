import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedCoursesSection } from '@/components/sections/featured-courses-section'
import { CategoriesSection } from '@/components/sections/categories-section'
import { AboutSection } from '@/components/sections/about-section'
import { PlacementsSection } from '@/components/sections/placements-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CTASection } from '@/components/sections/cta-section'
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedCoursesSection />
      <CategoriesSection />
      <AboutSection />
      <PlacementsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
