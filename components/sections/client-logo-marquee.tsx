'use client'

import Image from 'next/image'

const clients = [
  { name: 'TechCorp', logo: '/abstract-tech-logo.png' },
  { name: 'StartupXYZ', logo: '/abstract-startup-logo.png' },
  { name: 'E-Commerce Plus', logo: '/ecommerce-logo.png' },
  { name: 'Creative Agency', logo: '/creative-agency-logo.png' },
  { name: 'Local Business', logo: '/local-business-logo.png' },
  { name: 'Global Brand', logo: '/global-brand-logo.png' },
]

export default function ClientLogoMarquee() {
  const items = [...clients, ...clients, ...clients]

  return (
    <section aria-label="Our Clients" className="pt-10 pb-10 sm:pt-12 sm:pb-12 md:pt-14 md:pb-14 lg:py-16 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Title removed intentionally per request */}

        {/* Row 1 */}
        <div className="relative overflow-hidden fade-mask">
          <div className="marquee-track" aria-hidden="false">
            {items.map((client, idx) => (
              <div key={`${client.name}-${idx}`} className="mx-8 sm:mx-10 lg:mx-14 flex items-center justify-center flex-none">
                <Image
                  src={client.logo || '/placeholder.svg'}
                  alt={`${client.name} logo`}
                  width={200}
                  height={70}
                  className="h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto opacity-85 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative overflow-hidden fade-mask mt-6 sm:mt-8">
          <div className="marquee-track reverse" aria-hidden="false">
            {items.map((client, idx) => (
              <div key={`row2-${client.name}-${idx}`} className="mx-8 sm:mx-10 lg:mx-14 flex items-center justify-center flex-none">
                <Image
                  src={client.logo || '/placeholder.svg'}
                  alt={`${client.name} logo`}
                  width={200}
                  height={70}
                  className="h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto opacity-85 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
