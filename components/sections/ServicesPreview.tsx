import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart, Globe, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: ShoppingCart,
    title: 'WooCommerce Websites',
    description: 'Powerful e-commerce solutions that convert visitors into customers with seamless shopping experiences.',
    color: 'text-purple-600'
  },
  {
    icon: Globe,
    title: 'Simple 3-5 Page Websites',
    description: 'Clean, professional websites perfect for small businesses and personal brands.',
    color: 'text-blue-600'
  },
  {
    icon: Zap,
    title: 'Custom Dynamic Sites',
    description: 'Advanced web applications with custom functionality tailored to your unique business needs.',
    color: 'text-green-600'
  },
  {
    icon: Shield,
    title: 'Maintenance & Care Plans',
    description: 'Keep your website secure, updated, and performing at its best with our ongoing support.',
    color: 'text-orange-600'
  }
]

export default function ServicesPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-shimmer">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From simple websites to complex e-commerce platforms, we deliver solutions that grow with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className="neomorphic group hover-lift hover-glow transition-all duration-500 rounded-3xl p-8 text-center animate-bounce-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full neomorphic-inset mb-6 group-hover:animate-rotate-in transition-all duration-500`}>
                <service.icon className={`w-8 h-8 ${service.color} group-hover:scale-125 transition-transform duration-300`} />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-shimmer transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="neomorphic-button px-8 py-4 rounded-2xl text-purple-600 font-semibold hover-glow hover-lift group">
            View All Services
            <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
