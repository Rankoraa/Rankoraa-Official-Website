import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-200 rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pink-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up-stagger">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              We Build
              <span className="text-shimmer block animate-pulse-glow">Rankoraa</span>
              Websites
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Transform your digital presence with stunning, high-performance websites that captivate your audience and drive real business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="neomorphic-button px-8 py-4 rounded-2xl text-purple-600 font-semibold hover-glow hover-lift group">
                Get Free Quote
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button className="glass-morphism px-8 py-4 rounded-2xl text-purple-600 font-semibold hover-lift group">
                <Play className="mr-2 w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                Watch Our Work
              </button>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="relative z-10 neomorphic rounded-3xl p-8 animate-morph">
              <Image
                src="/modern-website-mockup.png"
                alt="Modern website design mockup"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl hover-lift"
                priority
              />
            </div>
            {/* Enhanced floating elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse-glow"></div>
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-40 animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
