'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Sarah Johnson',
    company: 'TechStart Inc.',
    role: 'CEO',
    content: 'Rankoraa transformed our online presence completely. The website they built not only looks stunning but has increased our conversions by 150%. Their attention to detail and professionalism is unmatched.',
    avatar: '/professional-woman-headshot.png',
    rating: 5
  },
  {
    name: 'Michael Chen',
    company: 'E-Commerce Plus',
    role: 'Founder',
    content: 'Working with Rankoraa was a game-changer for our business. They delivered a WooCommerce site that handles our high traffic seamlessly. The team is responsive, creative, and truly understands business needs.',
    avatar: '/professional-man-headshot.png',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    company: 'Creative Studio',
    role: 'Creative Director',
    content: 'The custom website Rankoraa created for us perfectly captures our brand essence. Every interaction feels smooth and engaging. Our clients constantly compliment us on our web presence.',
    avatar: '/creative-professional-woman.png',
    rating: 5
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden bg-transparent">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-15 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="text-shimmer">Clients</span> Say
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our amazing clients have to say about working with us.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main testimonial card with glassmorphism */}
          <div className={`glass-morphism rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 ${isAnimating ? 'animate-drop-out' : 'animate-drop-in'}`}>
            <div className="p-6 sm:p-8 md:p-12">
              <div className="text-center">
                {/* Animated stars */}
                <div className="flex justify-center mb-6 sm:mb-8">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-400 fill-current animate-bounce-in mx-1" 
                      style={{ animationDelay: `${i * 150}ms` }} 
                    />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className={`text-lg sm:text-xl md:text-2xl text-gray-800 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-medium transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
                  {`"${testimonials[currentIndex].content}"`}
                </blockquote>
                
                {/* Author */}
                <div className={`flex items-center justify-center space-x-4 sm:space-x-6 transition-all duration-700 ${isAnimating ? 'opacity-0 transform translate-y-12' : 'opacity-100 transform translate-y-0'}`}>
                  <div className="glass-morphism rounded-full p-1 border border-white/30">
                    <Image
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      width={64}
                      height={64}
                      className="rounded-full sm:w-[72px] sm:h-[72px] md:w-[80px] md:h-[80px]"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base sm:text-lg md:text-xl text-gray-800">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-purple-600 font-semibold text-sm sm:text-base">
                      {testimonials[currentIndex].role}
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm">
                      {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons: hidden on tablets and mobiles (show only on lg+) */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 glass-morphism p-4 rounded-full hover-glow hover-lift transition-all duration-300 border border-white/20 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 glass-morphism p-4 rounded-full hover-glow hover-lift transition-all duration-300 border border-white/20 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                disabled={isAnimating}
                className={`transition-all duration-500 rounded-full border-2 ${
                  index === currentIndex 
                    ? 'w-10 sm:w-12 h-3 sm:h-4 bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 animate-pulse-glow' 
                    : 'w-3 sm:w-4 h-3 sm:h-4 glass-morphism border-white/30 hover:scale-125 hover:border-purple-300'
                }`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
