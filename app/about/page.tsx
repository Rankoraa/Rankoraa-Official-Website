import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Users, Clock, Heart, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'Somil Athole',
    role: 'Co-Founder & Lead Designer/Developer',
    bio: 'Full-stack developer with 8+ years of experience building scalable web applications. Passionate about clean code and user experience.',
    image: '/professional-developer-headshot.png',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Mayank Padhi',
    role: 'Co-Founder & Lead Developer',
    bio: 'Creative designer who transforms complex ideas into beautiful, intuitive interfaces. Specializes in user research and design systems.',
    image: '/professional-designer-headshot.png',
    linkedin: '#',
    twitter: '#'
  }
]

const timeline = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'Started as a freelance web development service with a focus on small businesses.'
  },
  {
    year: '2021',
    title: 'Team Expansion',
    description: 'Grew to a team of 4 specialists covering design, development, and project management.'
  },
  {
    year: '2022',
    title: '50+ Projects Completed',
    description: 'Reached a major milestone with over 50 successful projects across various industries.'
  },
  {
    year: '2023',
    title: 'Award Recognition',
    description: 'Received "Best Web Development Agency" award from the local business association.'
  },
  {
    year: '2024',
    title: 'Continued Growth',
    description: 'Expanding services and building long-term partnerships with amazing clients.'
  }
]

const stats = [
  { icon: Users, number: '50+', label: 'Happy Clients' },
  { icon: Award, number: '100+', label: 'Projects Completed' },
  { icon: Clock, number: '4+', label: 'Years Experience' },
  { icon: Heart, number: '99%', label: 'Client Satisfaction' }
]

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About <span className="gradient-text">Rankoraa</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're a passionate team of web developers and designers dedicated to creating 
              beautiful, functional websites that help businesses thrive in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To empower businesses of all sizes with stunning, high-performance websites that 
                drive real results. We believe that great web design should be accessible to everyone, 
                not just large corporations.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every project we take on is an opportunity to build something amazing and help our 
                clients achieve their goals. We're not just developers – we're partners in your success.
              </p>
            </div>
            <div className="animate-slide-in-right">
              <Image
                src="/team-collaboration-workspace.png"
                alt="Team collaboration"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The talented individuals behind every successful project. We're passionate about 
              what we do and love working with amazing clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={member.name}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                      <a href={member.linkedin} className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                      <a href={member.twitter} className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
                        <Twitter className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted web development partner. 
              Here's how we've grown over the years.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div 
                    key={item.year}
                    className="relative flex items-start animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10">
                      {item.year}
                    </div>
                    <div className="ml-8 bg-white p-6 rounded-lg shadow-lg flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We'd love to hear about your project and discuss how we can help bring your vision to life. 
              Let's create something amazing together.
            </p>
            <Button size="lg" className="gradient-bg text-white hover:opacity-90 transition-all duration-300">
              Start Your Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
