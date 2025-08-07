import Hero from '@/components/sections/Hero'
import ServicesPreview from '@/components/sections/ServicesPreview'
import ClientLogoMarquee from '@/components/sections/client-logo-marquee'
import BlogTeaser from '@/components/sections/BlogTeaser'
import Testimonials from '@/components/sections/Testimonials'
import ParallaxWrapper from '@/components/ParallaxWrapper'
import MouseFollower from '@/components/MouseFollower'

export default function Home() {
  return (
    <div className="pt-16 relative">
      <MouseFollower />
      <Hero />
      <ParallaxWrapper speed={0.3}>
        <ServicesPreview />
      </ParallaxWrapper>
      <ParallaxWrapper speed={0.2}>
        <ClientLogoMarquee />
      </ParallaxWrapper>
      <ParallaxWrapper speed={0.4}>
        <BlogTeaser />
      </ParallaxWrapper>
      <ParallaxWrapper speed={0.1}>
        <Testimonials />
      </ParallaxWrapper>
    </div>
  )
}
