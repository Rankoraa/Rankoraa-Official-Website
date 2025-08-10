import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Globe, Zap, Shield, Check, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: ShoppingCart,
    title: 'WooCommerce Websites',
    description: 'Powerful e-commerce solutions that convert visitors into customers with seamless shopping experiences.',
    features: [
      'Custom WooCommerce development',
      'Payment gateway integration',
      'Inventory management system',
      'Mobile-responsive design',
      'SEO optimization',
      'Performance optimization'
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Globe,
    title: 'Simple 3-5 Page Websites',
    description: 'Clean, professional websites perfect for small businesses and personal brands.',
    features: [
      'Custom design & development',
      'Content management system',
      'Contact forms & integrations',
      'Social media integration',
      'Basic SEO setup',
      'Mobile optimization'
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Zap,
    title: 'Custom Dynamic Sites',
    description: 'Advanced web applications with custom functionality tailored to your unique business needs.',
    features: [
      'Custom web application development',
      'Database design & integration',
      'User authentication systems',
      'API development & integration',
      'Advanced functionality',
      'Scalable architecture'
    ],
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Shield,
    title: 'Maintenance & Care Plans',
    description: 'Keep your website secure, updated, and performing at its best with our ongoing support.',
    features: [
      'Regular security updates',
      'Performance monitoring',
      'Content updates',
      'Backup management',
      'Technical support',
      'Analytics reporting'
    ],
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
]

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 dark:text-slate-900">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              From simple websites to complex e-commerce platforms, we deliver solutions that grow with your business. 
              Every project is crafted with attention to detail and built for performance.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {services.map((service, index) => (
              <Card 
                key={service.title}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full ${service.bgColor} mb-5 sm:mb-6`}>
                    <service.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${service.color}`} />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-slate-200 mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className={`w-5 h-5 ${service.color} flex-shrink-0`} />
                        <span className="text-black dark:text-slate-200 text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full gradient-bg text-white bg-slate-900 hover:bg-slate-700 dark:text-black dark:bg-slate-100 dark:hover:bg-slate-300 transition-all duration-300">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">
              Let's discuss your project and create something amazing together. 
              Get a free consultation and quote today.
            </p>
            <Button size="lg" className="gradient-bg text-slate-900 bg-slate-200 hover:bg-slate-300 hover:opacity-90 transition-all duration-300">
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
