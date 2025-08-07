'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Sarah Johnson',
    company: 'TechStart Inc.',
    role: 'CEO',
    content: 'Lovable transformed our online presence completely. The website they built not only looks stunning but has increased our conversions by 150%. Their attention to detail and professionalism is unmatched.',
    avatar: '/professional-woman-headshot.png',
    rating: 5
  },
  {
    name: 'Michael Chen',
    company: 'E-Commerce Plus',
    role: 'Founder',
    content: 'Working with Lovable was a game-changer for our business. They delivered a WooCommerce site that handles our high traffic seamlessly. The team is responsive, creative, and truly understands business needs.',
    avatar: '/professional-man-headshot.png',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    company: 'Creative Studio',
    role: 'Creative Director',
    content: 'The custom website Lovable created for us perfectly captures our brand essence. Every interaction feels smooth and engaging. Our clients constantly compliment us on our web presence.',
    avatar: '/creative-professional-woman.png',
    rating: 5
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What Our <span className="text-shimmer">Clients</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our amazing clients have to say about working with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="neomorphic rounded-3xl hover-glow">
            <div className="p-8 md:p-12">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse-glow" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed animate-fade-in">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4 animate-scale-in">
                  <div className="neomorphic-inset rounded-full p-1">
                    <Image
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">{testimonials[currentIndex].name}</div>
                    <div className="text-gray-600">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 neomorphic-button p-4 rounded-full hover-glow hover-lift transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 neomorphic-button p-4 rounded-full hover-glow hover-lift transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'neomorphic-button bg-gradient-to-r from-purple-400 to-pink-400 scale-125 animate-pulse-glow' 
                    : 'neomorphic-inset hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
