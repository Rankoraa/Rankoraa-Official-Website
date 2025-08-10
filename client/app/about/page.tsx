import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Users, Clock, Heart, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'Somil Athole',
    role: 'Co-Founder & Lead Developer',
    bio: 'Full-stack engineer building fast, SEO-first web applications for ambitious brands.',
    image: '/professional-developer-headshot.png',
    linkedin: 'http://linkedin.com/in/somil-athole-39915a15a/',
    twitter: 'https://x.com/somil_athole',
  },
  {
    name: 'Mayank Padhi',
    role: 'Co-Founder & Lead Developer',
    bio: 'Designs bold, conversion-focused interfaces for modern web products.',
    image: '/professional-designer-headshot.png',
    linkedin: 'http://linkedin.com/in/somil-athole-39915a15a/',
    twitter: 'https://x.com/mayankpadhi2',
  },
]

const stats = [
  { icon: Users, number: '50+', label: 'Happy Clients' },
  { icon: Award, number: '100+', label: 'Projects Completed' },
  { icon: Clock, number: '4+', label: 'Years Experience' },
  { icon: Heart, number: '99%', label: 'Client Satisfaction' },
]

const timeline = [
  { year: '2020', title: 'Company Founded', description: 'Born in Mumbai to help local businesses go digital.' },
  { year: '2021', title: 'Team Expansion', description: 'Scaled capabilities across dev, design, and SEO.' },
  { year: '2022', title: '50+ Projects', description: 'Milestone projects across India and beyond.' },
  { year: '2023', title: 'Recognition', description: 'Trusted by startups and enterprises alike.' },
  { year: '2024', title: 'Momentum', description: 'Driving growth with performance and SEO-first builds.' },
]

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#0b0b0f] dark:via-slate-900 dark:to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-display), var(--font-body)' }}>
              About <span className="gradient-text">Rankoraa</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 font-semibold">
              Mumbai’s boutique IT services agency building modern websites with Web Development, Design, and SEO at the core.
            </p>
          </div>
        </div>
      </section>

      {/* Team (2 cards centered) */}
      <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 md:pt-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-display), var(--font-body)' }}>
              Meet Our <span className="text-shimmer">Team</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto font-semibold">
              The people behind Rankoraa’s bold builds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.name} className="border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl sm:text-2xl font-extrabold">{member.name}</h3>
                  <p className="text-purple-700 dark:text-purple-300 font-bold mb-2">{member.role}</p>
                  <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base font-semibold">{member.bio}</p>
                  <div className="flex gap-3 mt-4">
                    <a href={member.linkedin} className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.twitter} className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 md:pt-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                  <stat.icon className="w-7 h-7 text-purple-700 dark:text-purple-300" />
                </div>
                <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-1">{stat.number}</div>
                <div className="text-gray-700 dark:text-gray-300 text-sm sm:text-base font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      {/* <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 md:pt-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-display), var(--font-body)' }}>
              Our <span className="text-shimmer">Journey</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto font-semibold">
              Built in Mumbai. Delivering globally.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-900/40"></div>
              <div className="space-y-8">
                {timeline.map((item) => (
                  <div key={item.year} className="relative flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-700 dark:bg-purple-500 rounded-full flex items-center justify-center text-white font-extrabold text-lg">
                      {item.year}
                    </div>
                    <div className="ml-6 bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg flex-1">
                      <h3 className="text-xl font-extrabold">{item.title}</h3>
                      <p className="text-gray-700 dark:text-gray-200 font-semibold">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="pt-8 pb-12 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Work Together?</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 mb-6 sm:mb-8 font-semibold">
              Let’s build something bold with Web Dev, Design, and SEO.
            </p>
            <Button className="gradient-bg text-white hover:opacity-90 transition-all duration-300">
              Start Your Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
