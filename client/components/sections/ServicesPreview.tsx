import { ShoppingCart, Globe, Zap, Shield, Search } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Search,
    title: 'SEO & Growth',
    description: 'Technical SEO and content strategy to rank higher and convert better.',
    color: 'text-emerald-600',
  },
  {
    icon: Globe,
    title: 'Web Design',
    description: 'Bold, conversion-focused UI/UX for modern web applications.',
    color: 'text-blue-600',
  },
  {
    icon: Zap,
    title: 'Web Development',
    description: 'Fast, scalable, SEO-first builds with modern frameworks.',
    color: 'text-purple-600',
  },
  {
    icon: ShoppingCart,
    title: 'WooCommerce',
    description: 'High-performing storefronts optimized for conversions.',
    color: 'text-orange-600',
  },
]

export default function ServicesPreview() {
  return (
    <section className="pt-8 pb-12 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-display), var(--font-body)' }}>
            Our <span className="text-shimmer">Services</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto font-semibold">
            Rankoraa — Mumbai-based IT services for Web Dev, Design, SEO, and scalable e‑commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="neomorphic group hover-lift hover-glow transition-all duration-500 rounded-3xl p-6 sm:p-7 lg:p-8 text-center animate-bounce-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full neomorphic-inset mb-5 sm:mb-6 group-hover:animate-rotate-in transition-all duration-500">
                <service.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${service.color} group-hover:scale-125 transition-transform duration-300`} />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold mb-3 group-hover:text-shimmer transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300 text-sm sm:text-base font-semibold">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/services"
            className="neomorphic-button px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-purple-700 dark:text-purple-200 font-extrabold hover-glow hover-lift inline-flex items-center"
          >
            View All Services
            <span className="ml-2 transform transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
