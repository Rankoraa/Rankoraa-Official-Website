import Image from 'next/image'

const clients = [
  { name: 'TechCorp', logo: '/abstract-tech-logo.png' },
  { name: 'StartupXYZ', logo: '/abstract-startup-logo.png' },
  { name: 'E-Commerce Plus', logo: '/ecommerce-logo.png' },
  { name: 'Creative Agency', logo: '/creative-agency-logo.png' },
  { name: 'Local Business', logo: '/local-business-logo.png' },
  { name: 'Global Brand', logo: '/global-brand-logo.png' }
]

export default function ClientShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by <span className="text-shimmer">Amazing</span> Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We've had the privilege of working with incredible businesses across various industries.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <div 
              key={client.name}
              className="neomorphic flex items-center justify-center p-6 rounded-2xl hover-lift hover-glow transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={`${client.name} logo`}
                width={120}
                height={60}
                className="opacity-60 hover:opacity-100 transition-opacity duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 text-gray-600 neomorphic px-8 py-4 rounded-2xl">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white animate-pulse-glow" style={{ animationDelay: `${i * 200}ms` }}></div>
              ))}
            </div>
            <span className="text-lg font-medium">50+ Happy Clients</span>
          </div>
        </div>
      </div>
    </section>
  )
}
